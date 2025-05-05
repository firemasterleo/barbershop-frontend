<template>
    <div class="pending-visit-block">
      <h3 class="block-title">New Visit</h3>
      
      <div class="form-grid">
        <!-- Barber Selection -->
        <div class="form-group">
          <label class="form-label">Select Barber*</label>
          <select 
            v-model="selectedBarber"
            class="form-select" 
            required
          >
            <option value="" disabled>Choose a barber</option>
            <option 
              v-for="barber in barbers" 
              :key="barber.id" 
              :value="barber.id"
            >
              {{ barber.name }}
            </option>
          </select>
        </div>
        
        <!-- Services Selection -->
        <div class="form-group">
          <label class="form-label">Select Services*</label>
          <div class="service-selection">
            <div 
              v-for="service in services" 
              :key="service.id" 
              class="service-item"
            >
              <input 
                type="checkbox" 
                :id="`service-${service.id}`" 
                :value="service.id" 
                v-model="selectedServices"
                class="service-checkbox"
              >
              <label :for="`service-${service.id}`" class="service-label">
                {{ service.name }} - ₦{{ service.default_price.toFixed(2) }}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-grid">
        <!-- Total Amount (Auto calculated) -->
        <div class="form-group">
          <label class="form-label">Total Amount</label>
          <div class="total-display">
            ₦{{ calculatedTotal.toFixed(2) }}
          </div>
        </div>
        
        <!-- Phone Number (Optional) -->
        <div class="form-group">
          <label class="form-label">Phone Number (Optional)</label>
          <input 
            type="tel"
            v-model="phoneNumber"
            placeholder="(555) 555-5555"
            class="form-input"
          >
        </div>
      </div>
      
      <div class="action-buttons">
        <!-- Confirm Button -->
        <button 
          @click="confirmVisit"
          class="confirm-btn"
          :disabled="!isFormValid"
          :class="{ 'disabled': !isFormValid }"
        >
          Confirm (Paid)
        </button>
        
        <!-- New Queue Button -->
        <button 
          @click="queueVisit"
          class="queue-btn"
          :disabled="!isFormValid"
          :class="{ 'disabled': !isFormValid }"
        >
          Queue
        </button>
        
        <!-- Cancel Button -->
        <button 
          @click="$emit('cancel')"
          class="cancel-btn"
        >
          Cancel
        </button>
      </div>
  
      <!-- Confirmation Popup -->
      <div v-if="showConfirmPopup" class="popup-overlay">
        <div class="popup">
          <p>Are you sure you want to {{ actionType === 'confirm' ? 'confirm payment for' : 'queue' }} this visit?</p>
          <div class="popup-buttons">
            <button @click="handleConfirmAction(true)" class="popup-btn confirm">Yes</button>
            <button @click="handleConfirmAction(false)" class="popup-btn cancel">No</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    barbers: {
      type: Array,
      required: true
    },
    services: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['confirm', 'cancel', 'queue']);
  
  const selectedBarber = ref('');
  const selectedServices = ref([]);
  const phoneNumber = ref('');
  
  // Calculate total based on selected services
  const calculatedTotal = computed(() => {
    return selectedServices.value.reduce((sum, serviceId) => {
      const service = props.services.find(s => s.id === serviceId);
      return sum + (service ? service.default_price : 0);
    }, 0);
  });
  
  // Form validation
  const isFormValid = computed(() => {
    return selectedBarber.value && selectedServices.value.length > 0;
  });
  
  // Confirmation popup state
  const showConfirmPopup = ref(false);
  const actionType = ref(''); // 'confirm' or 'queue'
  const pendingAction = ref(null);
  
  // Confirm visit
  const confirmVisit = () => {
    if (!isFormValid.value) return;
    
    actionType.value = 'confirm';
    showConfirmPopup.value = true;
    pendingAction.value = {
      barber: selectedBarber.value,
      services: selectedServices.value,
      phone: phoneNumber.value,
      total: calculatedTotal.value
    };
  };
  
  // Queue visit
  const queueVisit = () => {
    if (!isFormValid.value) return;
    
    actionType.value = 'queue';
    showConfirmPopup.value = true;
    pendingAction.value = {
      barber: selectedBarber.value,
      services: selectedServices.value,
      phone: phoneNumber.value,
      total: calculatedTotal.value
    };
  };
  
  // Handle confirmation action
  const handleConfirmAction = (confirmed) => {
    if (confirmed) {
      if (actionType.value === 'confirm') {
        emit('confirm', pendingAction.value);
      } else if (actionType.value === 'queue') {
        emit('queue', pendingAction.value);
      }
      
      // Reset form
      selectedBarber.value = '';
      selectedServices.value = [];
      phoneNumber.value = '';
    }
    showConfirmPopup.value = false;
  };
  </script>
  
  <style lang="scss" scoped>
  .pending-visit-block {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid #dde0e5;
  }
  
  .block-title {
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 16px;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #333;
  }
  
  .form-select, .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
  
  .service-selection {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 8px;
    max-height: 120px;
    overflow-y: auto;
  }
  
  .service-item {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .service-checkbox {
    margin-right: 8px;
  }
  
  .service-label {
    font-size: 14px;
  }
  
  .total-display {
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #f1f3f5;
    font-weight: 500;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  
  .confirm-btn {
    background-color: #2ecc71;
    color: white;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    
    &:hover {
      background-color: #27ae60;
    }
    
    &.disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }
  }
  
  .queue-btn {
    background-color: #3498db;
    color: white;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    
    &:hover {
      background-color: #2980b9;
    }
    
    &.disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }
  }
  
  .cancel-btn {
    color: #e74c3c;
    background: none;
    border: none;
    cursor: pointer;
    
    &:hover {
      color: #c0392b;
      text-decoration: underline;
    }
  }
  
  /* Popup Styles */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    min-width: 300px;
    text-align: center;
  }
  
  .popup-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
  }
  
  .popup-btn {
    padding: 8px 20px;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    
    &.confirm {
      background-color: #2ecc71;
      color: white;
      
      &:hover {
        background-color: #27ae60;
      }
    }
    
    &.cancel {
      background-color: #e74c3c;
      color: white;
      
      &:hover {
        background-color: #c0392b;
      }
    }
  }
  </style>