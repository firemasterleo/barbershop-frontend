<!-- Updated BarberPerformanceChart.vue -->
<template>
  <div class="barber-performance-chart">
    <div v-if="chartData.length === 0" class="barber-performance-chart__empty">
      <p>No barber performance data available for the selected period</p>
    </div>
    <div v-else class="barber-performance-chart__container">
      <!-- Add debug information -->
      <div v-if="debugMode" class="debug-info">
        <h4>Debug Information:</h4>
        <pre>{{ JSON.stringify(chartData, null, 2) }}</pre>
      </div>
      
      <Pie 
        :data="chartDataConfig"
        :options="chartOptions"
        height="300"
      />
      
      <!-- Add a legend section for better readability -->
      <div class="chart-legend">
        <div 
          v-for="(barber, index) in chartData" 
          :key="barber.name" 
          class="legend-item"
        >
          <span 
            class="legend-color" 
            :style="{ backgroundColor: colorPalette[index] }"
          ></span>
          <span class="legend-name">{{ barber.name }}</span>
          <span class="legend-value">₦{{ barber.value.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
);

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Debug mode toggle
const debugMode = ref(false);

// Define a color palette for the pie chart
const colorPalette = [
  '#2c3e50', // Dark blue
  '#3498db', // Blue
  '#9b59b6', // Purple
  '#2ecc71', // Green
  '#f1c40f', // Yellow
  '#e67e22', // Orange
  '#e74c3c', // Red
  '#1abc9c', // Teal
  '#34495e', // Midnight blue
  '#16a085'  // Dark teal
];

// Calculate total performance
const totalPerformance = computed(() => {
  return props.chartData.reduce((total, barber) => total + barber.value, 0);
});

// Prepare chart data
const chartDataConfig = computed(() => {
  return {
    labels: props.chartData.map(barber => barber.name),
    datasets: [
      {
        data: props.chartData.map(barber => barber.value),
        backgroundColor: colorPalette.slice(0, props.chartData.length),
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  };
});

// Chart configuration options
const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            const percentage = ((value / totalPerformance.value) * 100).toFixed(1);
            return `${label}: ₦${value.toLocaleString('en-NG')} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '50%'
  };
});
</script>

<style lang="scss">
.barber-performance-chart {
  &__container {
    height: 400px;
    position: relative;
  // border: solid red;

  }
  
  &__empty {
    // border: solid red;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 6px;
    p {
      color: #7f8c8d;
      font-style: italic;
    }
  }
  
  .chart-legend {
  // border: solid red;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      
      .legend-color {
        width: 15px;
        height: 15px;
        border-radius: 50%;
      }
      
      .legend-name {
        font-weight: 500;
      }
      
      .legend-value {
        color: #7f8c8d;
      }
    }
  }
  
  .debug-info {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    max-height: 200px;
    overflow-y: auto;
    font-size: 0.75rem;
  }
}
</style>