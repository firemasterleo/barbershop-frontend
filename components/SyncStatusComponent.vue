<!-- components/SyncStatusComponent.vue -->
<template>
    <div class="sync-status-container" :class="{ 'is-offline': !isOnline }">
      <div class="sync-status-content">
        <div class="status-icon" :class="{ 'offline': !isOnline, 'syncing': isSyncing }">
          <span v-if="isSyncing" class="loading-spinner"></span>
          <span v-else-if="isOnline" class="online-icon">✓</span>
          <span v-else class="offline-icon">!</span>
        </div>
        
        <div class="status-text">
          <span v-if="isOnline && !pendingCount">Online: All data synced</span>
          <span v-else-if="isOnline && pendingCount">
            Online: Syncing {{ pendingCount }} pending item{{ pendingCount !== 1 ? 's' : '' }}...
          </span>
          <span v-else-if="!isOnline && pendingCount">
            Offline: {{ pendingCount }} item{{ pendingCount !== 1 ? 's' : '' }} waiting to sync
          </span>
          <span v-else>Offline mode</span>
        </div>
        
        <button 
          v-if="!isOnline" 
          @click="attemptReconnect" 
          class="reconnect-btn"
          :disabled="reconnecting"
        >
          {{ reconnecting ? 'Connecting...' : 'Reconnect' }}
        </button>
      </div>
      
      <div v-if="showDetails" class="sync-details">
        <div class="sync-details-header" @click="toggleDetails">
          <span>Sync Details</span>
          <span class="details-toggle">{{ showDetails ? '▲' : '▼' }}</span>
        </div>
        <div v-if="showDetails" class="sync-details-content">
          <div class="details-item">
            <span>Connection Status:</span>
            <span :class="{ 'text-success': isOnline, 'text-danger': !isOnline }">
              {{ isOnline ? 'Connected' : 'Disconnected' }}
            </span>
          </div>
          <div class="details-item">
            <span>Pending Transactions:</span>
            <span>{{ pendingCount }}</span>
          </div>
          <div class="details-item">
            <span>Last Sync Attempt:</span>
            <span>{{ lastSyncTime ? formatTime(lastSyncTime) : 'Never' }}</span>
          </div>
          <div class="details-item">
            <span>Sync Status:</span>
            <span>{{ isSyncing ? 'In Progress' : 'Idle' }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, onUnmounted } from 'vue';
  import { useOfflineSyncStore } from '~/stores/offlineVisitSync';
  import { useVisitStore } from '@/stores/useVisitStore';
  
  const offlineSyncStore = useOfflineSyncStore();
  const visitStore = useVisitStore();
  
  // Component state
  const showDetails = ref(false);
  const reconnecting = ref(false);
  const checkInterval = ref(null);
  
  // Computed properties based on store state
  const isOnline = computed(() => offlineSyncStore.isOnline && !visitStore.offlineMode);
  const isSyncing = computed(() => offlineSyncStore.syncInProgress);
  const pendingCount = computed(() => offlineSyncStore.pendingTransactions.filter(t => t.status === 'pending').length);
  const lastSyncTime = computed(() => offlineSyncStore.lastSyncAttempt);
  
  // Toggle the details section
  const toggleDetails = () => {
    showDetails.value = !showDetails.value;
  };
  
  // Format timestamp for display
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Attempt to reconnect to the server
  const attemptReconnect = async () => {
    if (reconnecting.value) return;
    
    reconnecting.value = true;
    try {
      const success = await visitStore.attemptReconnect();
      if (success) {
        // If reconnection is successful, attempt to sync pending transactions
        offlineSyncStore.attemptSync();
      }
    } catch (error) {
      console.error('Reconnection failed:', error);
    } finally {
      reconnecting.value = false;
    }
  };
  
  // Setup periodic checks for sync status
  onMounted(() => {
    // Initialize the offline sync store if not already done
    if (!offlineSyncStore.dbInitialized) {
      offlineSyncStore.init();
    }
    
    // Check sync status every 30 seconds
    checkInterval.value = setInterval(() => {
      visitStore.checkConnectionAndSync();
      
      // If we're online and have pending transactions, attempt sync
      if (isOnline.value && pendingCount.value > 0 && !isSyncing.value) {
        offlineSyncStore.attemptSync();
      }
    }, 30000);
  });
  
  // Clean up interval on unmount
  onUnmounted(() => {
    if (checkInterval.value) {
      clearInterval(checkInterval.value);
    }
  });
  </script>
  
  <style scoped>
  .sync-status-container {
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
    overflow: hidden;
  }
  
  .sync-status-container.is-offline {
    background-color: #fff4e5;
  }
  
  .sync-status-content {
    display: flex;
    align-items: center;
    padding: 12px 16px;
  }
  
  .status-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #4caf50;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .status-icon.offline {
    background-color: #ff9800;
  }
  
  .status-icon.syncing {
    background-color: #2196f3;
  }
  
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s infinite linear;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .status-text {
    flex-grow: 1;
    font-size: 14px;
  }
  
  .reconnect-btn {
    background-color: #ff9800;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .reconnect-btn:hover:not(:disabled) {
    background-color: #f57c00;
  }
  
  .reconnect-btn:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
  
  .sync-details {
    border-top: 1px solid #eee;
  }
  
  .sync-details-header {
    padding: 8px 16px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background-color: #f1f1f1;
    color: #666;
  }
  
  .details-toggle {
    font-size: 10px;
  }
  
  .sync-details-content {
    padding: 12px 16px;
    font-size: 12px;
  }
  
  .details-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  
  .details-item:last-child {
    margin-bottom: 0;
  }
  
  .text-success {
    color: #4caf50;
  }
  
  .text-danger {
    color: #f44336;
  }
  </style>