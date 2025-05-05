<template>
  <div class="queued-visits-section">
    <h2 class="section-title">
      Queue ({{ visits.length }})
      <span v-if="visits.length === 0" class="empty-queue">Empty</span>
    </h2>
    
    <div v-if="visits.length > 0" class="queued-list">
      <QueuedVisitItem
        v-for="(visit, index) in visits"
        :key="index"
        :visit="visit"
        :index="index"
        @confirm="$emit('confirm', index)"
        @remove="$emit('remove', index)"
      />
    </div>
  </div>
</template>

<script setup>
import QueuedVisitItem from '@/components/QueuedVisitItem.vue';

const props = defineProps({
  visits: {
    type: Array,
    required: true,
    default: () => []
  }
});

defineEmits(['confirm', 'remove']);
</script>

<style lang="scss" scoped>
.queued-visits-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.empty-queue {
  font-size: 14px;
  font-weight: normal;
  color: #777;
  font-style: italic;
}

.queued-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>