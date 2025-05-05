import { defineStore } from 'pinia';
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

// Initialize Supabase client
const SUPABASE_URL = 'https://wmhpulllzyarvfatyfuw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtaHB1bGxsenlhcnZmYXR5ZnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjcyODU5NiwiZXhwIjoyMDU4MzA0NTk2fQ.PY8wgMW8hx-hRAsnKr1wTXh3PqiMavav0ljB3SvnMps';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const useVisitStore = defineStore('visit', {
  state: () => ({
    barbers: ref([]),
    services: ref([]),
    pendingVisits: ref([]),
    todaysVisits: ref([]),
    queuedVisits: ref([]),
    loading: ref(false),
    error: ref(null),
  }),

  actions: {
    async loadBarbers() {
      try {
        const { data, error } = await supabase
          .from('barbershop_barbers')
          .select('id, name');

        if (error) throw error;
        this.barbers = data;
        return data;
      } catch (error) {
        console.error('Error loading barbers:', error);
        this.error = 'Failed to load barbers';
        return [];
      }
    },

    async loadServices() {
      try {
        const { data, error } = await supabase
          .from('barbershop_services')
          .select('id, name, default_price');

        if (error) throw error;
        this.services = data;
        return data;
      } catch (error) {
        console.error('Error loading services:', error);
        this.error = 'Failed to load services';
        return [];
      }
    },

    addPendingVisit() {
      const newVisit = {
        barber: null,
        services: [],
        phone: '',
        total: 0,
      };
      this.pendingVisits.unshift(newVisit);
    },
    
    cancelPendingVisit(index) {
      this.pendingVisits.splice(index, 1);
    },

    calculateTotal(serviceIds) {
      return serviceIds.reduce((sum, sId) => {
        const service = this.services.find(s => s.id === sId);
        return sum + (service ? service.default_price : 0);
      }, 0);
    },

    async confirmVisit(visitData) {
      try {
        // Step 1: Insert into visits table
        const { data: visitInserted, error: visitError } = await supabase
          .from('barbershop_visits')
          .insert([{
            visit_time: new Date().toISOString(),
            total_amount: visitData.total,
            customer_id: null, // or set to an ID if customer login system exists
            phone: visitData.phone // Added phone field
          }])
          .select(); // so you can get the inserted id
    
        if (visitError) throw visitError;
    
        const visitId = visitInserted[0].id;
    
        // Step 2: Insert into visit_service table for each service
        const visitServices = visitData.services.map(serviceId => ({
          visit_id: visitId,
          service_id: serviceId,
          barber_id: visitData.barber,
          amount: this.services.find(s => s.id === serviceId)?.default_price || 0,
        }));
    
        const { error: serviceError } = await supabase
          .from('barbershop_visit_services')
          .insert(visitServices);
    
        if (serviceError) throw serviceError;
    
        // Step 3: Add to today's visits
        this.todaysVisits.push({
          id: visitId,
          barber: this.barbers.find(b => b.id === visitData.barber),
          services: visitData.services.map(sId => this.services.find(s => s.id === sId)),
          total: visitData.total,
          time: new Date(),
          phone: visitData.phone
        });
    
        // Step 4: Remove from pending visits
        const index = this.pendingVisits.findIndex(v => v === visitData);
        if (index !== -1) {
          this.pendingVisits.splice(index, 1);
        }
    
      } catch (error) {
        console.error('Error confirming visit:', error);
        this.error = 'Failed to confirm visit';
      }
    },

    // Queue functionality
    queueVisit(visitData) {
      // Make sure total is included and correctly calculated
      const queuedVisit = {
        ...visitData,
        queuedAt: new Date()
      };
      
      // Add the visit to the queued visits array
      this.queuedVisits.push(queuedVisit);
      
      // Remove from pending visits
      const index = this.pendingVisits.findIndex(v => 
        v.barber === visitData.barber && 
        JSON.stringify(v.services) === JSON.stringify(visitData.services)
      );
      if (index !== -1) {
        this.pendingVisits.splice(index, 1);
      }
    },
    
    removeFromQueue(index) {
      this.queuedVisits.splice(index, 1);
    },
    
    async confirmQueuedVisit(index) {
      try {
        const visitData = this.queuedVisits[index];
    
        // Step 1: Insert into visits table
        const { data: visitInserted, error: visitError } = await supabase
          .from('barbershop_visits')
          .insert([{
            visit_time: new Date().toISOString(),
            total_amount: visitData.total,
            customer_id: null,
            phone: visitData.phone // Added phone field
          }])
          .select();
    
        if (visitError) throw visitError;
    
        const visitId = visitInserted[0].id;
    
        // Step 2: Insert services
        const visitServices = visitData.services.map(serviceId => ({
          visit_id: visitId,
          service_id: serviceId,
          barber_id: visitData.barber,
          amount: this.services.find(s => s.id === serviceId)?.default_price || 0,
        }));
    
        const { error: serviceError } = await supabase
          .from('barbershop_visit_services')
          .insert(visitServices);
    
        if (serviceError) throw serviceError;
    
        // Step 3: Add to today's visits
        this.todaysVisits.push({
          id: visitId,
          barber: this.barbers.find(b => b.id === visitData.barber),
          services: visitData.services.map(sId => this.services.find(s => s.id === sId)),
          total: visitData.total,
          time: new Date(),
          phone: visitData.phone
        });
    
        // Step 4: Remove from queue
        this.queuedVisits.splice(index, 1);
    
        return true;
      } catch (error) {
        console.error('Error confirming queued visit:', error);
        this.error = 'Failed to confirm queued visit';
        return false;
      }
    },

    async loadTodaysVisits() {
      this.loading = true;
      this.error = null;
      try {
        // Fixed table name to match the rest of your code
        const today = new Date().toISOString().split('T')[0];
        
        // First get the visit IDs from today
        const { data: visitsData, error: visitsError } = await supabase
          .from('barbershop_visits')
          .select('id, visit_time, total_amount, phone')
          .gte('visit_time', `${today}T00:00:00`)
          .lt('visit_time', `${today}T23:59:59`);
        
        if (visitsError) throw visitsError;
        
        if (!visitsData || visitsData.length === 0) {
          this.todaysVisits = [];
          return;
        }
        
        // Now get the services for these visits
        const visitIds = visitsData.map(visit => visit.id);
        const { data: servicesData, error: servicesError } = await supabase
          .from('barbershop_visit_services')
          .select('visit_id, service_id, barber_id')
          .in('visit_id', visitIds);
        
        if (servicesError) throw servicesError;
        
        // Combine the data
        const formattedVisits = visitsData.map(visit => {
          const visitServices = servicesData.filter(s => s.visit_id === visit.id);
          const serviceIds = visitServices.map(s => s.service_id);
          const barberId = visitServices.length > 0 ? visitServices[0].barber_id : null;
          
          return {
            id: visit.id,
            time: new Date(visit.visit_time),
            total: visit.total_amount,
            phone: visit.phone || 'N/A',
            barber: this.barbers.find(b => b.id === barberId) || { name: 'N/A' },
            services: serviceIds.map(id => this.services.find(s => s.id === id) || { name: 'Unknown Service' })
          };
        });
        
        this.todaysVisits = formattedVisits;
      } catch (error) {
        console.error('Error loading today\'s visits:', error);
        this.error = 'Failed to load today\'s visits';
      } finally {
        this.loading = false;
      }
    },
  },

  // Persist state to localStorage
  persist: {
    paths: ['pendingVisits', 'barbers', 'services', 'todaysVisits', 'queuedVisits'],
  },
});