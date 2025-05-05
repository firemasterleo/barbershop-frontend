<template>
    <div class="ddhaul-dashboard">
      <h1>DDHaul Vehicle Documentation Dashboard</h1>
      
      <div class="status-filters">
        <button 
          v-for="(label, status) in statusFilters" 
          :key="status"
          :class="['filter-btn', { active: currentFilter === status }]"
          @click="setFilter(status)"
        >
          {{ label }}
        </button>
      </div>
      
      <div class="dashboard-content">
        <div v-if="loading" class="loading">
          <p>Loading vehicle documentation data...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <h3>Error loading data</h3>
          <p>{{ error }}</p>
          <button @click="fetchVehicleData">Try Again</button>
        </div>
        
        <div v-else-if="!filteredVehicles.length" class="no-data">
          <p>No vehicles with {{ currentFilter === 'all' ? '' : currentFilter + ' ' }}expiring documents found.</p>
        </div>
        
        <div v-else class="vehicles-table-container">
          <table class="vehicles-table">
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Vehicle Name</th>
                <th>Driver Name</th>
                <th>Documents Expiring</th>
                <th>Last Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in filteredVehicles" :key="vehicle.vehicle_number">
                <td>{{ vehicle.vehicle_number }}</td>
                <td>{{ vehicle.vehicle_name }}</td>
                <td>{{ vehicle.driver_name }}</td>
                <td>
                  <div class="doc-status-list">
                    <div 
                      v-for="doc in vehicle.soon_to_expire_docs" 
                      :key="`${vehicle.vehicle_number}-${doc.name}`"
                      :class="['doc-status', getDocStatusClass(doc.days_left)]"
                    >
                      <span class="doc-name">{{ doc.name }}</span>
                      <span class="doc-expiry">
                        {{ doc.days_left > 0 ? `${doc.days_left} days left` : 'EXPIRED' }}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{{ formatDate(vehicle.review_date) }}</td>
                <td>
                  <button @click="viewDetails(vehicle)" class="action-btn details-btn">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Vehicle Details Modal -->
      <div v-if="selectedVehicle" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ selectedVehicle.vehicle_name }} ({{ selectedVehicle.vehicle_number }})</h2>
            <button @click="selectedVehicle = null" class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <div class="vehicle-details">
              <p><strong>Driver:</strong> {{ selectedVehicle.driver_name }}</p>
              <p><strong>Last Review:</strong> {{ formatDate(selectedVehicle.review_date, true) }}</p>
            </div>
            
            <h3>Document Status</h3>
            <table class="doc-details-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Notification Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doc in selectedVehicle.soon_to_expire_docs" :key="doc.name">
                  <td>{{ doc.name }}</td>
                  <td>{{ formatDate(doc.expiry_date) }}</td>
                  <td :class="getDocStatusClass(doc.days_left)">
                    {{ getDocStatusText(doc.days_left) }}
                  </td>
                  <td>
                    <div class="notification-status">
                      <span :class="['status-dot', { notified: doc.notified_30 }]" title="30-day notification">30d</span>
                      <span :class="['status-dot', { notified: doc.notified_10 }]" title="10-day notification">10d</span>
                      <span :class="['status-dot', { notified: doc.notified_expired }]" title="Expired notification">Exp</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button @click="selectedVehicle = null">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabase = createClient(
    'https://wmhpulllzyarvfatyfuw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtaHB1bGxsenlhcnZmYXR5ZnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjcyODU5NiwiZXhwIjoyMDU4MzA0NTk2fQ.PY8wgMW8hx-hRAsnKr1wTXh3PqiMavav0ljB3SvnMps'
  );
  
  const vehicles = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const selectedVehicle = ref(null);
  const currentFilter = ref('all');
  
  const statusFilters = {
    all: 'All Documents',
    expired: 'Expired',
    critical: 'Critical (< 10 days)',
    warning: 'Warning (< 30 days)'
  };
  
  const filteredVehicles = computed(() => {
    if (currentFilter.value === 'all') {
      return vehicles.value;
    }
  
    return vehicles.value.filter(vehicle =>
      vehicle.soon_to_expire_docs.some(doc => {
        if (currentFilter.value === 'expired') return doc.days_left <= 0;
        if (currentFilter.value === 'critical') return doc.days_left > 0 && doc.days_left <= 10;
        if (currentFilter.value === 'warning') return doc.days_left > 10 && doc.days_left <= 30;
        return false;
      })
    );
  });
  
  const fetchVehicleData = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      const { data, error: fetchError } = await supabase
        .from('vehicle_docs_review')
        .select('*')
        .order('review_date', { ascending: false });
  
      if (fetchError) throw fetchError;
  
      vehicles.value = data;
      console.log('Fetched vehicle data:', data);
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      error.value = err.message || 'Failed to load vehicle data';
    } finally {
      loading.value = false;
    }
  };
  
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
  
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
  
    return date.toLocaleDateString('en-US', options);
  };
  
  const getDocStatusClass = daysLeft => {
    if (daysLeft <= 0) return 'expired';
    if (daysLeft <= 10) return 'critical';
    return 'warning';
  };
  
  const getDocStatusText = daysLeft => {
    if (daysLeft <= 0) return 'EXPIRED';
    if (daysLeft <= 10) return 'Critical';
    return 'Warning';
  };
  
  const viewDetails = vehicle => {
    selectedVehicle.value = { ...vehicle };
  };
  
  const setFilter = status => {
    currentFilter.value = status;
  };
  
  onMounted(() => {
    fetchVehicleData();
  });
  </script>
  
  
  <style scoped>
  .ddhaul-dashboard {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    color: #2c3e50;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  
  .status-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .filter-btn {
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  
  .filter-btn:hover {
    background-color: #e0e0e0;
  }
  
  .filter-btn.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
  
  .dashboard-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .loading, .error, .no-data {
    padding: 40px;
    text-align: center;
    color: #666;
  }
  
  .error {
    color: #d32f2f;
  }
  
  .vehicles-table-container {
    overflow-x: auto;
  }
  
  .vehicles-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .vehicles-table th,
  .vehicles-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .vehicles-table th {
    background-color: #f5f7fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .vehicles-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .doc-status-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .doc-status {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  .doc-status.warning {
    background-color: #fff9c4;
    color: #856404;
  }
  
  .doc-status.critical {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .doc-status.expired {
    background-color: #d32f2f;
    color: white;
    font-weight: bold;
  }
  
  .action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.2s;
  }
  
  .details-btn {
    background-color: #2196f3;
    color: white;
  }
  
  .details-btn:hover {
    background-color: #1976d2;
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 18px;
    color: #2c3e50;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
  }
  
  .modal-body {
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
  }
  
  .modal-footer {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-footer button {
    padding: 8px 16px;
    background-color: #ddd;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .vehicle-details {
    margin-bottom: 20px;
  }
  
  .doc-details-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .doc-details-table th,
  .doc-details-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .doc-details-table th {
    background-color: #f5f7fa;
    font-weight: 600;
  }
  
  .notification-status {
    display: flex;
    gap: 8px;
  }
  
  .status-dot {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 11px;
    background-color: #eee;
    color: #666;
  }
  
  .status-dot.notified {
    background-color: #4caf50;
    color: white;
  }
  
  /* Status text styling */
  .warning {
    color: #ff9800;
  }
  
  .critical {
    color: #f44336;
  }
  
  .expired {
    color: white;
    background-color: #d32f2f;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
  }
  </style>