<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Barbershop Admin Dashboard</h1>
    
    <!-- Date Range Selector -->
    <div class="date-selector">
      <button 
        v-for="option in dateOptions" 
        :key="option.label"
        :class="['date-selector__btn', { 'date-selector__btn--active': activeOption === option.label }]"
        @click="selectDateRange(option)"
      >
        {{ option.label }}
      </button>
      
      <!-- Custom Date Range Modal -->
      <div v-if="showCustomDatePicker" class="custom-date-modal">
        <div class="custom-date-modal__content">
          <h3>Select Custom Date Range</h3>
          <Datepicker
            v-model="dateRange"
            range
            :enableTimePicker="false"
            autoApply
          />
          <div class="custom-date-modal__actions">
            <button class="btn btn--secondary" @click="showCustomDatePicker = false">Cancel</button>
            <button class="btn btn--primary" @click="applyCustomDateRange">Apply</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-if="error" class="error-state">
      <p>{{ error }}</p>
      <button class="btn btn--primary" @click="retryFetch">Retry</button>
    </div>
    
    <!-- Loading State -->
    <div v-else-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading data...</p>
    </div>
    
    <div v-else>
      <!-- Summary Cards -->
      <div class="summary-cards">
        <SummaryCard title="Total Visits" :value="totalVisits.toString()" icon="users" />
        <SummaryCard title="Total Revenue" :value="formattedRevenue" icon="currency-naira" />
      </div>
      
      <!-- Charts Row -->
      <div class="charts-row">
        <!-- Revenue Chart -->
        <div class="chart-wrapper revenue-chart-wrapper">
          <h2 class="chart-wrapper__title">Revenue Chart (₦)</h2>
          <RevenueChart :chartData="chartData" />
        </div>
        
        <!-- Barber Performance Chart -->
        <div class="chart-wrapper barber-chart-wrapper">
          <h2 class="chart-wrapper__title">Barber Performance</h2>
          <BarberPerformanceChart :chartData="barberPerformanceData" />
        </div>
      </div>
      
      <!-- Data Table -->
      <div class="data-table-wrapper">
        <h2 class="data-table-wrapper__title">
  Summary Log ({{ formatDisplayDate(dateRange[0]) }} - {{ formatDisplayDate(dateRange[1]) }})
</h2>        <DataTable :data="chartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { supabase } from '../utils/supabaseClient';
import RevenueChart from '../components/RevenueChart.vue';
import SummaryCard from '../components/SummaryCard.vue';
import DataTable from '../components/DataTable.vue';
import BarberPerformanceChart from '../components/BarberPerformanceChart.vue';

// Date range options
const dateOptions = [
  { label: 'Today', value: 0 },
  { label: 'Yesterday', value: 1 },
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'This Month', value: 'month' },
  { label: 'Custom Range', value: 'custom' }
];

const activeOption = ref('Last 7 Days');
const showCustomDatePicker = ref(false);
const dateRange = ref([]);
const chartData = ref([]);
const barberPerformanceData = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Helper function to get date from days ago
const getDateFromDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0); // Normalize to start of day
  return date;
};

// Get first and last day of current month
const getMonthDateRange = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return [firstDay, lastDay];
};

// Format date to YYYY-MM-DD for Supabase queries (UTC)
const formatDateForQuery = (date) => {
  // Ensure we have a Date object
  const d = new Date(date);
  // Format as YYYY-MM-DD without timezone conversion
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Select date range based on option
const selectDateRange = (option) => {
  if (option.value === 'custom') {
    showCustomDatePicker.value = true;
    return;
  }
  
  activeOption.value = option.label;
  
  // Get current date at midnight to avoid timezone issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (option.value === 0) {
    // Today
    dateRange.value = [today, today];
  } else if (option.value === 1) {
    // Yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    dateRange.value = [yesterday, yesterday];
  } else if (option.value === 'month') {
    // This month
    dateRange.value = getMonthDateRange();
  } else {
    // Last X days (including today)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (option.value - 1));
    dateRange.value = [startDate, today];
  }
};

// Apply custom date range
const applyCustomDateRange = () => {
  if (dateRange.value && dateRange.value.length === 2) {
    activeOption.value = 'Custom Range';
    showCustomDatePicker.value = false;
  } else {
    error.value = 'Please select a valid date range';
  }
};

// Format currency helper for Naira
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(value);
};

// Fetch revenue data from Supabase
const fetchDataFromSupabase = async (startDate, endDate) => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startStr = formatDateForQuery(start);
    const endStr = formatDateForQuery(end);
    
    console.log('Fetching data for dates between:', startStr, 'and', endStr);
    
    const { data, error: supabaseError } = await supabase
      .from('barbershop_daily_earnings')
      .select('day, total_visits, total_revenue')
      .gte('day', startStr)
      .lte('day', endStr)
      .order('day', { ascending: true });
    
    if (supabaseError) throw supabaseError;
    
    console.log('Raw data from Supabase:', data);
    
    if (!data || data.length === 0) {
      const emptyData = createEmptyDateRange(start, end);
      console.log('Created empty data:', emptyData);
      return emptyData;
    }
    
    const filledData = fillDateGaps(data, start, end);
    console.log('Final chart data:', filledData);
    return filledData;
    
  } catch (err) {
    console.error('Error:', err);
    error.value = 'Failed to load data. Please try again.';
    return [];
  } finally {
    isLoading.value = false;
  }
};

// Fetch barber performance data from Supabase

// Fetch barber performance data from Supabase
const fetchBarberPerformance = async (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startStr = formatDateForQuery(start);
    const endStr = formatDateForQuery(end);
    
    console.group('Barber Performance Data Fetch');
    console.log('Fetching data for dates between:', startStr, 'and', endStr);
    
    // Query the view created for barber revenue summary
    const { data, error: supabaseError } = await supabase
  .from('barbershop_barber_revenue_summary')
  .select('barber_name, total_revenue, visit_date')
  .gte('visit_date', startStr)
  .lte('visit_date', endStr);
    
    console.log('Raw Supabase Query Result:', {
      startStr,
      endStr,
      supabaseError,
      dataLength: data ? data.length : 'No data',
      dataFirstRow: data ? data[0] : 'No data'
    });

    if (supabaseError) {
      console.error('Supabase Error:', supabaseError);
      throw supabaseError;
    }
    
    if (!data || data.length === 0) {
      console.warn('No data found in the selected date range');
      console.groupEnd();
      return [];
    }

    // Aggregate data by barber
    const barberMap = data.reduce((acc, item) => {
      const { barber_name, total_revenue } = item;
      if (!acc[barber_name]) acc[barber_name] = 0;
      acc[barber_name] += total_revenue;
      return acc;
    }, {});

    // Convert to chart-ready format
    const formattedData = Object.entries(barberMap)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value
      }))
      .sort((a, b) => b.value - a.value);
    
    console.log('Processed Barber Performance Data:', formattedData);
    console.groupEnd();
    
    return formattedData;
    
  } catch (err) {
    console.error('Comprehensive Error in Barber Performance Fetch:', err);
    console.groupEnd();
    return [];
  }
};

// Create empty entries for each day in the date range
const createEmptyDateRange = (startDate, endDate) => {
  const data = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  // Normalize times to midnight to avoid timezone issues
  currentDate.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  while (currentDate <= end) {
    data.push({
      day: formatDateForQuery(currentDate),
      total_visits: 0,
      total_revenue: 0,
      formatted_date: formatDisplayDate(currentDate)
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

// Format date for display (e.g., "Mon 15 Jan")
const formatDisplayDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

// Fill gaps in data for missing days
const fillDateGaps = (data, startDate, endDate) => {
  const result = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  // Normalize times to midnight
  currentDate.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  // Create a map of existing data by day
  const dataMap = data.reduce((acc, item) => {
    acc[item.day] = {
      ...item,
      formatted_date: formatDisplayDate(new Date(item.day + 'T00:00:00'))
    };
    return acc;
  }, {});
  
  // Fill in each day
  while (currentDate <= end) {
    const dateStr = formatDateForQuery(currentDate);
    
    if (dataMap[dateStr]) {
      // Use existing data if available
      result.push(dataMap[dateStr]);
    } else {
      // Create empty entry if no data for this day
      result.push({
        day: dateStr,
        total_visits: 0,
        total_revenue: 0,
        formatted_date: formatDisplayDate(currentDate)
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
};

// Retry fetching data
const retryFetch = async () => {
  if (dateRange.value && dateRange.value.length === 2) {
    const [start, end] = dateRange.value;
    chartData.value = await fetchDataFromSupabase(start, end);
    barberPerformanceData.value = await fetchBarberPerformance(start, end);
  }
};

// Summary data calculations
const totalRevenue = computed(() => 
  chartData.value.reduce((acc, cur) => acc + cur.total_revenue, 0)
);

const totalVisits = computed(() => 
  chartData.value.reduce((acc, cur) => acc + cur.total_visits, 0)
);

const averagePerVisit = computed(() => 
  totalVisits.value > 0 ? Math.round(totalRevenue.value / totalVisits.value) : 0
);

const formattedRevenue = computed(() => formatCurrency(totalRevenue.value));
const formattedAverage = computed(() => formatCurrency(averagePerVisit.value));

// Watch for changes in the date range and fetch data
watch(dateRange, async ([start, end]) => {
  if (!start || !end) return;
  
  isLoading.value = true;
  
  // Fetch both datasets
  chartData.value = await fetchDataFromSupabase(start, end);
  barberPerformanceData.value = await fetchBarberPerformance(start, end);
  
  isLoading.value = false;
}, { immediate: true });

// Fetch initial data on component mount
onMounted(() => {
  // Set default range to include the last 7 days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  
  dateRange.value = [sevenDaysAgo, today];
  activeOption.value = "Last 7 Days";
});
</script>

<style lang="scss">
.dashboard {
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
  position: relative;
  
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

.custom-date-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &__content {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.25rem;
      color: #2c3e50;
    }
  }
  
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.5rem;
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
  
  &--secondary {
    background-color: white;
    color: #333;
    border: 1px solid #ddd;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
}

.error-state {
  background-color: #fff3f3;
  border: 1px solid #ffbdbd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
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
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  
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

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.chart-wrapper {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  // border: solid red;
  height: fit-content;
  // overflow: hidden;

  
  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
}
.barber-chart-wrapper {
  height: 40rem;
}

.data-table-wrapper {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
}
</style>