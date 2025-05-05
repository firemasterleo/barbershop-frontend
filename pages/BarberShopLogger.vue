<!-- pages/index.vue -->
<template>
    <div class="container">
      <h1 class="page-title">Barbershop Management</h1>
      
      <!-- Status Message -->
      <div v-if="loading" class="status-message loading">
        Loading data...
      </div>
      <div v-if="error" class="status-message error">
        {{ error }}
      </div>
      
      <!-- New Visit Button -->
      <button 
        @click="addPendingVisit" 
        class="new-visit-btn"
      >
        + New Visit
      </button>
      
      <!-- Pending Visit Blocks Container -->
      <div class="pending-visits-container">
        <PendingVisitBlock 
          v-for="(pendingVisit, index) in pendingVisits" 
          :key="index"
          @confirm="confirmVisit"
          @cancel="cancelPendingVisit(index)"
          @queue="queueVisit"
          :barbers="barbers"
          :services="services"
        />
      </div>
      
      <!-- Queued Visits Section -->
      <QueuedVisitsSection
        :visits="queuedVisits"
        @confirm="confirmQueuedVisit"
        @remove="removeFromQueue"
      />
      
      <!-- Today's Visits Table -->
      <h2 class="section-title">Today's Visits</h2>
      <TodaysVisitsList 
        :visits="todaysVisits" 
        @print-receipt="printReceipt"
      />
      
      <!-- Receipt Modal -->
      <div v-if="showReceiptModal" class="receipt-modal">
        <div class="receipt-modal-content">
          <div class="receipt-header">
            <h3>Receipt</h3>
            <button @click="showReceiptModal = false" class="close-btn">&times;</button>
          </div>
          
          <div class="receipt-body">
            <div class="receipt-shop-info">
              <h4>Your Barbershop</h4>
              <p>123 Main Street, City</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-details">
              <div class="receipt-row">
                <span>Date:</span>
                <span>{{ formatDate(new Date()) }}</span>
              </div>
              <div class="receipt-row">
                <span>Time:</span>
                <span>{{ formatTime(new Date()) }}</span>
              </div>
              <div class="receipt-row">
                <span>Barber:</span>
                <span>{{ currentReceipt.barber?.name || 'N/A' }}</span>
              </div>
              <div class="receipt-row" v-if="currentReceipt.phone">
                <span>Customer:</span>
                <span>{{ currentReceipt.phone }}</span>
              </div>
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-services">
              <div class="receipt-services-header">
                <span>Service</span>
                <span>Price</span>
              </div>
              <div 
                v-for="service in currentReceipt.services" 
                :key="service.id" 
                class="receipt-service-item"
              >
                <span>{{ service.name }}</span>
                <span>₦{{ service.default_price.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-total">
              <span>Total:</span>
              <span>₦{{ currentReceipt.total?.toFixed(2) || '0.00' }}</span>
            </div>
            
            <div class="receipt-footer">
              <p>Thank you for your business!</p>
            </div>
          </div>
          
          <div class="receipt-actions">
            <button @click="printReceiptPDF" class="print-btn">Print</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useVisitStore } from '@/stores/useVisitStore'; // Import your store
  import TodaysVisitsList from '@/components/TodaysVisitsList.vue';
  import PendingVisitBlock from '@/components/PendingVisitBlock.vue';
  import QueuedVisitsSection from '@/components/QueuedVisitsSection.vue';
  
  // Access your Pinia store
  const visitStore = useVisitStore();
  
  // State with reactive connections to store
  const barbers = computed(() => visitStore.barbers);
  const services = computed(() => visitStore.services);
  const pendingVisits = computed(() => visitStore.pendingVisits);
  const todaysVisits = computed(() => visitStore.todaysVisits);
  const queuedVisits = computed(() => visitStore.queuedVisits);
  const loading = computed(() => visitStore.loading);
  const error = computed(() => visitStore.error);
  
  // Receipt modal state
  const showReceiptModal = ref(false);
  const currentReceipt = ref({});
  
  // Fetch the necessary data on mount
  onMounted(async () => {
    try {
      // Load barbers and services first
      await Promise.all([
        visitStore.loadBarbers(),
        visitStore.loadServices()
      ]);
      
      // Then load today's visits (which depends on barbers and services)
      await visitStore.loadTodaysVisits();
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  });
  
  // Function to add a new pending visit block
  const addPendingVisit = () => {
    visitStore.addPendingVisit();
  };
  
  // Function to confirm a completed visit
  const confirmVisit = (visitData) => {
    visitStore.confirmVisit(visitData);
  };
  
  // Function to queue a visit
  const queueVisit = (visitData) => {
    visitStore.queueVisit(visitData);
  };
  
  // Function to confirm a queued visit
  const confirmQueuedVisit = (index) => {
    visitStore.confirmQueuedVisit(index);
  };
  
  // Function to remove a visit from the queue
  const removeFromQueue = (index) => {
    visitStore.removeFromQueue(index);
  };
  
  // Function to cancel a pending visit
  const cancelPendingVisit = (index) => {
    visitStore.cancelPendingVisit(index);
  };
  
  // Function to show receipt modal
  const printReceipt = (visit) => {
    currentReceipt.value = visit;
    showReceiptModal.value = true;
  };
  
  // Function to format date for receipt
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Function to format time for receipt
  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString(undefined, options);
  };
  
  // Function to print receipt
  const printReceiptPDF = () => {
    // In a real application, this would generate a PDF or use the browser's print functionality
    window.print();
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .status-message {
    padding: 10px;
    margin-bottom: 16px;
    border-radius: 4px;
    font-size: 14px;
    
    &.loading {
      background-color: #eef7fd;
      color: #3498db;
      border: 1px solid #bde2fb;
    }
    
    &.error {
      background-color: #fde8e8;
      color: #e74c3c;
      border: 1px solid #f7bebe;
    }
  }
  
  .new-visit-btn {
    background-color: #3498db;
    color: white;
    font-weight: bold;
    padding: 10px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    margin-bottom: 24px;
    
    &:hover {
      background-color: #2980b9;
    }
  }
  
  .pending-visits-container {
    margin-bottom: 32px;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  /* Receipt Modal Styles */
  .receipt-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .receipt-modal-content {
    background-color: white;
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  
  .receipt-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    
    h3 {
      margin: 0;
      font-size: 18px;
    }
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #777;
    
    &:hover {
      color: #333;
    }
  }
  
  .receipt-body {
    padding: 16px;
  }
  
  .receipt-shop-info {
    text-align: center;
    margin-bottom: 16px;
    
    h4 {
      font-size: 16px;
      margin: 0 0 4px;
    }
    
    p {
      margin: 4px 0;
      font-size: 14px;
      color: #555;
    }
  }
  
  .receipt-divider {
    height: 1px;
    background-color: #eee;
    margin: 16px 0;
  }
  
  .receipt-details {
    margin-bottom: 16px;
  }
  
  .receipt-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  .receipt-services-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  .receipt-service-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 14px;
  }
  
  .receipt-total {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    margin-top: 8px;
  }
  
  .receipt-footer {
    text-align: center;
    margin-top: 16px;
    font-size: 14px;
    color: #555;
  }
  
  .receipt-actions {
    padding: 16px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
  }
  
  .print-btn {
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
  }
  
  /* Print Styles */
  @media print {
    .container {
      padding: 0;
    }
    
    .receipt-modal {
      position: absolute;
      background-color: white;
    }
    
    .receipt-modal-content {
      box-shadow: none;
    }
    
    .receipt-header .close-btn,
    .receipt-actions {
      display: none;
    }
  }
  </style>