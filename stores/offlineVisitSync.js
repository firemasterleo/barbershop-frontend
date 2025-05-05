// offlineVisitSync.js
import localforage from 'localforage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wmhpulllzyarvfatyfuw.supabase.co';
const SUPABASE_KEY = 'your-key-here';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Set up a localForage store
const offlineStore = localforage.createInstance({
  name: 'visit-sync',
  storeName: 'offline_visits'
});

export async function addOfflineVisit(visit) {
  const existing = (await offlineStore.getItem('visits')) || [];
  existing.push({ ...visit, createdAt: new Date().toISOString() });
  await offlineStore.setItem('visits', existing);
}

export async function getOfflineVisits() {
  return (await offlineStore.getItem('visits')) || [];
}

export async function removeOfflineVisit(index) {
  const visits = await getOfflineVisits();
  visits.splice(index, 1);
  await offlineStore.setItem('visits', visits);
}

// Confirm all offline visits
export async function syncAllOfflineVisitsToSupabase(services, barbers) {
  const visits = await getOfflineVisits();
  const synced = [];

  for (let i = 0; i < visits.length; i++) {
    const visit = visits[i];

    try {
      const { data: visitInserted, error: visitError } = await supabase
        .from('barbershop_visits')
        .insert([{
          visit_time: new Date().toISOString(),
          total_amount: visit.total,
          customer_id: null,
          phone: visit.phone || null,
        }])
        .select();

      if (visitError) throw visitError;

      const visitId = visitInserted[0].id;

      const visitServices = visit.services.map(serviceId => ({
        visit_id: visitId,
        service_id: serviceId,
        barber_id: visit.barber,
        amount: services.find(s => s.id === serviceId)?.default_price || 0,
      }));

      const { error: serviceError } = await supabase
        .from('barbershop_visit_services')
        .insert(visitServices);

      if (serviceError) throw serviceError;

      synced.push(i); // track successfully synced index
    } catch (err) {
      console.error(`Failed to sync visit #${i}`, err);
    }
  }

  // Remove synced visits
  for (let i = synced.length - 1; i >= 0; i--) {
    visits.splice(synced[i], 1);
  }

  await offlineStore.setItem('visits', visits);
}