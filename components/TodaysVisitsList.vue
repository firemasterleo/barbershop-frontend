
<!-- components/TodaysVisitsList.vue -->
<template>
    <div class="visits-table-container">
      <table class="visits-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Barber</th>
            <th>Services</th>
            <th class="amount-column">Total</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="visits.length === 0" class="empty-state">
            <td colspan="6">
              No visits recorded today
            </td>
          </tr>
          <tr v-for="visit in visits" :key="visit.id" class="visit-row">
            <td>
              {{ formatTime(visit.time) }}
            </td>
            <td>
              {{ visit.barber?.name || 'N/A' }}
            </td>
            <td>
              <span v-for="(service, index) in visit.services" :key="service.id">
                {{ service.name }}{{ index < visit.services.length - 1 ? ', ' : '' }}
              </span>
            </td>
            <td class="amount-column">
              ₦{{ (visit.total ?? 0).toFixed(2) }}
            </td>
            <td>
              {{ visit.phone || 'N/A' }}
            </td>
            <td class="actions-column">
              <button class="receipt-btn" @click="$emit('print-receipt', visit)">
                Receipt
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    visits: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['print-receipt']);
  
  // Format time to display in a readable format
  const formatTime = (date) => {
    if (!date) return 'N/A';
    
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    
    return new Date(date).toLocaleTimeString(undefined, timeOptions);
  };
  </script>
  
  <style lang="scss" scoped>
  .visits-table-container {
    overflow-x: auto;
    margin-bottom: 32px;
  }
  
  .visits-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border: 1px solid #e0e0e0;
    
    th, td {
      padding: 10px 16px;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
      font-size: 14px;
    }
    
    th {
      font-weight: 600;
      background-color: #f8f9fa;
    }
    
    .amount-column {
      text-align: right;
      font-weight: 500;
    }
    
    .actions-column {
      text-align: center;
      white-space: nowrap;
    }
    
    .empty-state {
      td {
        text-align: center;
        padding: 20px;
        color: #7f8c8d;
      }
    }
    
    .visit-row {
      &:hover {
        background-color: #f8f9fa;
      }
    }
  }
  
  .receipt-btn {
    background-color: #9b59b6;
    color: white;
    font-weight: 500;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    
    &:hover {
      background-color: #8e44ad;
    }
  }
  </style>