<template>
  <div class="barbers">
    <h1 class="barbers__title">My Daily Summary</h1>
    
    <!-- Date Selector -->
    <div class="date-selector">
      <button 
        v-for="option in dateOptions" 
        :key="option.label"
        :class="['date-selector__btn', { 'date-selector__btn--active': activeOption === option.label }]"
        @click="selectDateRange(option)"
      >
        {{ option.label }}
      </button>
    </div>
    
    <!-- Error State -->
    <div v-if="error" class="error-state">
      <p>{{ error }}</p>
      <button class="btn btn--primary" @click="fetchBarberData">Retry</button>
    </div>
    
    <!-- Loading State -->
    <div v-else-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading data...</p>
    </div>
    
    <div v-else>
      <!-- Selected Barber's Details -->
      <div v-if="selectedBarber" class="barber-details">
        <div class="barber-header">
          <div class="barber-header__info">
            <div class="barber-header__avatar">
              <span>{{ getInitials(selectedBarber.barber_name) }}</span>
            </div>
            <h2 class="barber-header__name">{{ selectedBarber.barber_name }}</h2>
          </div>
        </div>
        
        <!-- Summary Cards -->
        <div class="summary-cards">
          <div class="summary-card">
            <div class="summary-card__content">
              <p class="summary-card__title">Total Visits</p>
              <p class="summary-card__value">{{ selectedBarber.visit_count }}</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-card__content">
              <p class="summary-card__title">Total Service Revenue</p>
              <p class="summary-card__value">{{ formatCurrency(selectedBarber.total_earnings) }}</p>
            </div>
          </div>
          <div class="summary-card">
            <div class="summary-card__content">
              <p class="summary-card__title">Estimated Earnings</p>
              <p class="summary-card__value">{{ formatCurrency(selectedBarber.total_earnings * 0.4) }}</p>
            </div>
          </div>
        </div>
        
        <!-- Revenue Chart -->
        <div class="chart-section">
          <h2 class="section-title">Revenue Trend</h2>
          <div ref="chartContainer" class="chart-container"></div>
        </div>
        
        <!-- Visit List -->
        <div class="visits-section">
          <h2 class="section-title">
            {{ activeOption === 'Today' ? "Today's Visits" : 
               activeOption === 'Last 7 Days' ? "Visits (Last 7 Days)" : 
               "Visits (Last 30 Days)" }}
          </h2>
          
          <div v-if="selectedBarberVisits.length === 0" class="no-visits">
            <p>No visits recorded for this period</p>
          </div>
          
          <div v-else class="visits-list">
            <div class="visit-card" v-for="visit in selectedBarberVisits" :key="visit.visit_id">
              <div class="visit-card__header">
                <div class="visit-card__time">
                  {{ formatDateTime(visit.timestamp) }}
                </div>
                <div class="visit-card__client">
                  <span class="material-symbols-outlined">person</span>
                  {{ formatPhoneNumber(visit.phone_number) }}
                </div>
              </div>
              
              <div class="visit-card__services">
                <div class="service-item" v-for="service in visit.services" :key="service.service_id">
                  <span class="service-item__name">{{ service.service_name }}</span>
                  <span class="service-item__price">{{ formatCurrency(service.price) }}</span>
                </div>
              </div>
              
              <div class="visit-card__total">
                <span>Total</span>
                <span>{{ formatCurrency(getVisitTotal(visit)) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../utils/supabaseClient';
import * as echarts from 'echarts';

// Get the route to access the barber_id parameter
const route = useRoute();
const individualBarberId = ref(null);
const chartInstance = ref(null);
const chartContainer = ref(null);
const chartData = ref([]);

// Initialize on mount
onMounted(() => {
  // Get the barber_id directly from the route params
  if (route.params.barber_id) {
    individualBarberId.value = route.params.barber_id;
    console.log('Barber ID from route:', individualBarberId.value);
    
    // Set default date to today and fetch data
    selectDateRange(dateOptions[0]);
  } else {
    console.warn('No barber_id provided in route params');
    error.value = 'No barber ID provided. Please use your specific URL to access your records.';
    isLoading.value = false;
  }
});

// Date range options (updated to include 7 and 30 days)
const dateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' }
];

const activeOption = ref('Today');
const startDate = ref(new Date());
const endDate = ref(new Date());
const isLoading = ref(true);
const error = ref(null);

// Barbers data
const barbers = ref([]);
const selectedBarber = ref(null);
const barberVisits = ref({});

// Watch for data changes to update chart
watch(
  [selectedBarber, activeOption], 
  () => {
    if (selectedBarber.value && chartData.value.length > 0) {
      nextTick(() => renderChart());
    }
  }
);

// Select date range
const selectDateRange = (option) => {
  activeOption.value = option.label;
  
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  endDate.value = today;
  
  const start = new Date(today);
  start.setHours(0, 0, 0, 0); // Start of today
  
  if (option.value === 'today') {
    startDate.value = start;
  } else if (option.value === '7days') {
    start.setDate(today.getDate() - 6); // Last 7 days including today
    startDate.value = start;
  } else if (option.value === '30days') {
    start.setDate(today.getDate() - 29); // Last 30 days including today
    startDate.value = start;
  }
  
  // Fetch new data with the selected date range
  fetchBarberData();
};

// Format date for Supabase query
const formatDateForQuery = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get selected barber visits
const selectedBarberVisits = computed(() => {
  if (!selectedBarber.value) return [];
  return barberVisits.value[selectedBarber.value.barber_id] || [];
});

// Format currency helper for Naira
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(value || 0);
};

// Format time from timestamp
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Format date and time for multi-day views
const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  
  // If today option, show only time
  if (activeOption.value === 'Today') {
    return formatTime(timestamp);
  }
  
  // For multi-day views, show date and time
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }) + ' ' + formatTime(timestamp);
};

// Format phone number
const formatPhoneNumber = (phone) => {
  if (!phone) return 'Walk-in client';
  // Basic formatting - could be enhanced based on your needs
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
};

// Get barber name initials
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Calculate total price for a visit
const getVisitTotal = (visit) => {
  if (!visit.services || visit.services.length === 0) return 0;
  return visit.services.reduce((acc, service) => acc + service.price, 0);
};

// Prepare data for chart
const prepareChartData = (visits, dateRange) => {
  // For 'today', show hourly data
  if (dateRange === 'Today') {
    const hourlyData = Array(24).fill().map((_, i) => {
      return {
        hour: i,
        label: `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? 'AM' : 'PM'}`,
        revenue: 0
      };
    });
    
    // Aggregate data by hour
    visits.forEach(visit => {
      const visitDate = new Date(visit.timestamp);
      const hour = visitDate.getHours();
      const total = getVisitTotal(visit);
      hourlyData[hour].revenue += total;
    });
    
    return hourlyData;
  } 
  // For 7 or 30 days, show daily data
  else {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    const dayCount = (dateRange === 'Last 7 Days') ? 7 : 30;
    
    // Create array with one entry per day
    const dailyData = [];
    for (let i = 0; i < dayCount; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      
      dailyData.push({
        date: date,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: 0
      });
    }
    
    // Aggregate data by date
    visits.forEach(visit => {
      const visitDate = new Date(visit.timestamp);
      const dayIndex = Math.floor((visitDate - start) / (24 * 60 * 60 * 1000));
      if (dayIndex >= 0 && dayIndex < dailyData.length) {
        const total = getVisitTotal(visit);
        dailyData[dayIndex].revenue += total;
      }
    });
    
    return dailyData;
  }
};

// Render chart using ECharts
const renderChart = () => {
  if (!chartContainer.value) return;
  
  // Dispose previous chart instance if it exists
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  
  // Create new chart instance
  chartInstance.value = echarts.init(chartContainer.value);
  
  // Prepare data based on selected date range
  const preparedData = prepareChartData(selectedBarberVisits.value, activeOption.value);
  
  // Set chart options
  const options = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        return `${params[0].name}<br>Revenue: ${formatCurrency(params[0].value)}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: preparedData.map(item => item.label),
      axisLabel: {
        interval: activeOption.value === 'Last 30 Days' ? 'auto' : 0,
        rotate: activeOption.value === 'Last 30 Days' ? 45 : 0
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return formatCurrency(value).replace('NGN', '₦');
        }
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: preparedData.map(item => item.revenue),
        itemStyle: {
          color: '#34495e'
        }
      }
    ]
  };
  
  // Set chart options and render
  chartInstance.value.setOption(options);
  
  // Handle window resize event
  window.addEventListener('resize', () => {
    chartInstance.value && chartInstance.value.resize();
  });
};

// Group visits by barber and compute totals
const processRawVisits = (visits) => {
  const barberMap = {};
  const visitsByBarber = {};
  
  // Group visits by barber
  visits.forEach(visit => {
    const barberId = visit.barber_id;
    
    // Initialize barber in maps if not exists
    if (!barberMap[barberId]) {
      barberMap[barberId] = {
        barber_id: barberId,
        barber_name: visit.barber_name,
        visit_count: 0,
        total_earnings: 0
      };
    }
    
    if (!visitsByBarber[barberId]) {
      visitsByBarber[barberId] = [];
    }
    
    // Check if this visit is already processed (to handle multiple services per visit)
    const existingVisitIndex = visitsByBarber[barberId].findIndex(v => v.visit_id === visit.visit_id);
    
    if (existingVisitIndex >= 0) {
      // Add service to existing visit
      visitsByBarber[barberId][existingVisitIndex].services.push({
        service_id: visit.service_id,
        service_name: visit.service_name,
        price: visit.price
      });
    } else {
      // Create new visit entry
      visitsByBarber[barberId].push({
        visit_id: visit.visit_id,
        timestamp: visit.timestamp,
        phone_number: visit.phone_number,
        services: [{
          service_id: visit.service_id,
          service_name: visit.service_name,
          price: visit.price
        }]
      });
      
      // Increment visit count for this barber
      barberMap[barberId].visit_count += 1;
    }
    
    // Add to barber's total earnings
    barberMap[barberId].total_earnings += visit.price;
  });
  
  // Convert barber map to array
  const barberArray = Object.values(barberMap);
  
  return { barbers: barberArray, visits: visitsByBarber };
};

// Fetch barber data from Supabase
const fetchBarberData = async () => {
  // Only proceed if we have a barber ID
  if (!individualBarberId.value) {
    isLoading.value = false;
    error.value = 'No barber ID provided. Please use your specific URL to access your records.';
    return;
  }
  
  isLoading.value = true;
  error.value = null;
  
  try {
    const start = formatDateForQuery(startDate.value);
    const end = formatDateForQuery(endDate.value);
    console.log(`Fetching data from ${start} to ${end} for barber ID: ${individualBarberId.value}`);
    
    // Query filtered by the barber ID from the route and date range
    let query = supabase
      .from('barbershop_barber_earnings')
      .select('*')
      .eq('barber_id', individualBarberId.value);
    
    // Apply date range filter
    if (activeOption.value === 'Today') {
      query = query.eq('visit_date', start);
    } else {
      query = query
        .gte('visit_date', start)
        .lte('visit_date', end);
    }
    
    const { data, error: supabaseError } = await query;
    
    if (supabaseError) throw supabaseError;
    
    console.log('Raw barber visit data:', data);
    
    if (!data || data.length === 0) {
      // Handle empty data
      barbers.value = [];
      barberVisits.value = {};
      
      // Get barber details even if no visits
      const { data: barberData, error: barberError } = await supabase
        .from('barbers')
        .select('id, name')
        .eq('id', individualBarberId.value)
        .single();
        
      if (barberError) {
        console.error('Error fetching barber data:', barberError);
        error.value = 'Could not find barber record. Please contact an administrator.';
        isLoading.value = false;
        return;
      }
        
      if (barberData) {
        barbers.value = [{
          barber_id: barberData.id,
          barber_name: barberData.name,
          visit_count: 0,
          total_earnings: 0
        }];
        
        selectedBarber.value = barbers.value[0];
        chartData.value = [];
        renderChart(); // Render empty chart
      } else {
        error.value = 'Barber not found. Please check the URL and try again.';
      }
      
      isLoading.value = false;
      return;
    }
    
    // Process raw visit data
    const processed = processRawVisits(data);
    barbers.value = processed.barbers;
    barberVisits.value = processed.visits;
    
    // Automatically select the barber
    const foundBarber = barbers.value.find(b => b.barber_id.toString() === individualBarberId.value.toString());
    if (foundBarber) {
      selectedBarber.value = foundBarber;
      chartData.value = data;
      nextTick(() => renderChart());
    } else if (barbers.value.length > 0) {
      // Fallback to first barber if specific one not found
      selectedBarber.value = barbers.value[0];
    }
    
  } catch (err) {
    console.error('Error fetching barber data:', err);
    error.value = 'Failed to load barber data. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// For navigation back to all barbers
const backToBarbersList = () => {
  navigateTo('/barbers');
};
</script>

<style lang="scss">
.barbers {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Poppins', sans-serif;
  
  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
}

.date-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  &__btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #e9e9e9;
    }
    
    &--active {
      background-color: #34495e;
      color: white;
      border-color: #34495e;
    }
  }
}

.error-state, .loading-state {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  text-align: center;
}

.error-state {
  background-color: #fff3f3;
  border: 1px solid #ffbdbd;
  color: #d32f2f;
  
  p {
    margin-bottom: 1rem;
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #34495e;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.barber-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  &__info {
    display: flex;
    align-items: center;
  }
  
  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #34495e;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  
  &__name {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #2c3e50;
  }
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  
  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #f0f3f8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    
    .material-symbols-outlined {
      font-size: 24px;
      color: #34495e;
    }
  }
  
  &__content {
    flex: 1;
  }
  
  &__title {
    font-size: 0.875rem;
    color: #7f8c8d;
    margin: 0 0 0.25rem;
  }
  
  &__value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
  }
}

// Add chart section styling
.chart-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;

  .chart-container {
    height: 300px;
    width: 100%;
  }
}

.visits-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.no-visits {
  text-align: center;
  padding: 2rem 0;
  color: #7f8c8d;
}

.visits-list {
  display: grid;
  gap: 1rem;
}

.visit-card {
  border-radius: 8px;
  border: 1px solid #eee;
  overflow: hidden;
  border: solid rgba(0, 0, 0, 0.185);
  
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
  }
  
  &__time {
    font-weight: 600;
    color: #2c3e50;
  }
  
  &__client {
    color: #7f8c8d;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    
    .material-symbols-outlined {
      font-size: 18px;
    }
  }
  
  &__services {
    padding: 0.75rem 1rem;
  }
  
  &__total {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-top: 1px solid #eee;
    font-weight: 600;
    color: #2c3e50;
  }
}

.service-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  &__name {
    color: #2c3e50;
  }
  
  &__price {
    color: #7f8c8d;
  }
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &--primary {
    background-color: #34495e;
    color: white;
    border: 1px solid #34495e;
    
    &:hover {
      background-color: #2c3e50;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>