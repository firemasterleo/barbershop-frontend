<!-- components/SummaryCard.vue -->
<template>
    <div class="summary-card">
      <div class="summary-card__icon">
        <span v-if="icon === 'currency-naira'">₦</span>
        <span v-else-if="icon === 'users'">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </span>
      </div>
      <div class="summary-card__content">
        <h3 class="summary-card__title">{{ title }}</h3>
        <p class="summary-card__value">{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'currency-naira'
    }
  });
  </script>
  
  <style lang="scss">
  .summary-card {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 10px;
      margin-right: 1rem;
      background-color: rgba(52, 73, 94, 0.1);
      color: #34495e;
      font-size: 1.5rem;
      font-weight: bold;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
    
    &__content {
      flex: 1;
    }
    
    &__title {
      font-size: 0.875rem;
      color: #7f8c8d;
      margin: 0 0 0.25rem 0;
      font-weight: normal;
    }
    
    &__value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0;
    }
  }
  </style>
  
 
  