<!-- components/DataTable.vue -->
<template>
    <div class="data-table">
      <div v-if="data.length === 0" class="data-table__empty">
        <p>No data available for the selected date range</p>
      </div>
      <table v-else class="data-table__table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Visits</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.day">
            <td>{{ formatDate(item.day) }}</td>
            <td>{{ item.total_visits }}</td>
            <td>{{ formatCurrency(item.total_revenue) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NG', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };
  
  // Format currency for Naira
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(value);
  };
  </script>
  
  <style lang="scss">
  .data-table {
    width: 100%;
    overflow-x: auto;
    
    &__table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      
      th {
        font-weight: 600;
        color: #34495e;
        background-color: rgba(0, 0, 0, 0.02);
      }
      
      tr:hover td {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }
    
    &__empty {
      padding: 2rem;
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
    }
  }
  </style>