<!-- components/RevenueChart.vue -->
<template>
  <div class="revenue-chart">
    <div v-if="chartData.length === 0" class="revenue-chart__empty">
      <p>No data available for the selected date range</p>
    </div>
    <div v-else class="revenue-chart__container">
      <Bar 
        :data="chartDataConfig"
        :options="chartOptions"
        height="300"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
});

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Prepare chart data
const chartDataConfig = computed(() => {
  return {
    labels: props.chartData.map(item => formatDate(item.day)),
    datasets: [
      {
        label: 'Revenue',
        data: props.chartData.map(item => item.total_revenue),
        backgroundColor: 'rgba(52, 73, 94, 0.7)',
        borderColor: '#34495e',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(52, 73, 94, 0.9)'
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
            const value = context.raw;
            return `Revenue: ₦${value.toLocaleString('en-NG')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#7f8c8d'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return '₦' + value.toLocaleString('en-NG');
          },
          color: '#7f8c8d'
        }
      }
    }
  };
});
</script>

<style lang="scss">
.revenue-chart {
  &__container {
    height: 350px;
    position: relative;
  }
  
  &__empty {
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
}
</style>