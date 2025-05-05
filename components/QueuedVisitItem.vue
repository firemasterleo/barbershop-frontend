<template>
    <div class="queued-visit">
      <div class="queued-info">
        <div class="info-item">
          <span class="info-label">Barber:</span>
          <span class="info-value">{{ barberName }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Services:</span>
          <span class="info-value">
            {{ serviceNames }}
            <button @click="addingService = true" class="edit-btn">Edit</button>
          </span>
        </div>
        <div v-if="addingService" class="service-edit">
          <div v-for="service in visitStore.services" :key="service.id" class="checkbox-item">
            <label>
              <input
                type="checkbox"
                :value="service.id"
                v-model="selectedServices"
              />
              {{ service.name }}
            </label>
          </div>
          <button @click="addSelectedServices">Add Selected Services</button>
          <button @click="addingService = false">Done</button>
        </div>
        <div class="info-item">
          <span class="info-label">Total:</span>
          <span class="info-value">₦{{ totalAmount.toFixed(2) }}</span>
        </div>
        <div class="info-item" v-if="visit.phone">
          <span class="info-label">Phone:</span>
          <span class="info-value">{{ visit.phone }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Queued:</span>
          <span class="info-value">{{ formattedTime }}</span>
        </div>
      </div>
      
      <div class="queue-actions">
        <button @click="confirmAction('confirm')" class="confirm-btn">
          Confirm (Paid)
        </button>
        <button @click="confirmAction('remove')" class="remove-btn">
          Remove
        </button>
      </div>
  
      <!-- Confirmation Popup -->
      <div v-if="showConfirmPopup" class="popup-overlay">
        <div class="popup">
          <p>Are you sure you want to {{ actionType === 'confirm' ? 'confirm' : 'remove' }} this visit?</p>
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
  import { useVisitStore } from '@/stores/useVisitStore';
  
  const props = defineProps({
    visit: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['confirm', 'remove']);
  const visitStore = useVisitStore();
  
  // Barber name
  const barberName = computed(() => {
    const barber = visitStore.barbers.find(b => b.id === props.visit.barber);
    return barber ? barber.name : 'Unknown';
  });
  
  // Service names
  const serviceNames = computed(() => {
    return props.visit.services.map(sId => {
      const service = visitStore.services.find(s => s.id === sId);
      return service ? service.name : 'Unknown Service';
    }).join(', ');
  });
  
  // Queue time formatting
  const formattedTime = computed(() => {
    if (!props.visit.queuedAt) return 'Unknown';
    
    const date = new Date(props.visit.queuedAt);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  });
  
  // Total price calculation (including added services)
  const totalAmount = computed(() => {
    const total = props.visit.services.reduce((acc, serviceId) => {
      const service = visitStore.services.find(s => s.id === serviceId);
      return service ? acc + service.default_price : acc;
    }, 0);
    return total;
  });
  
  // Service editing state
  const addingService = ref(false);
  const selectedServices = ref([]); // Selected services for adding
  
  // Handle adding selected services to the visit
  const addSelectedServices = () => {
    selectedServices.value.forEach(serviceId => {
      if (!props.visit.services.includes(serviceId)) {
        props.visit.services.push(serviceId);
      }
    });
    selectedServices.value = []; // Clear after adding
  };
  
  // Confirmation popup logic
  const showConfirmPopup = ref(false);
  const actionType = ref(''); // 'confirm' or 'remove'
  
  const confirmAction = (type) => {
    actionType.value = type;
    showConfirmPopup.value = true;
  };
  
  const handleConfirmAction = (confirm) => {
    if (confirm) {
      if (actionType.value === 'confirm') {
        emit('confirm', props.index);
      } else if (actionType.value === 'remove') {
        emit('remove', props.index);
      }
    }
    showConfirmPopup.value = false;
  };
  </script>
  
  <style lang="scss" scoped>
  .queued-visit {
    background-color: #f0f8ff;
    border: 1px solid #add8e6;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .queued-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .info-item {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  
  .info-label {
    font-weight: 600;
    font-size: 14px;
    color: #555;
    min-width: 70px;
  }
  
  .info-value {
    font-size: 14px;
  }
  
  .edit-btn {
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    font-size: 12px;
    padding: 2px 5px;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .service-edit {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin: 8px 0;
    background-color: #fff;
  }
  
  .checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
  }
  
  .queue-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
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
  }
  
  .remove-btn {
    background-color: #e74c3c;
    color: white;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    
    &:hover {
      background-color: #c0392b;
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