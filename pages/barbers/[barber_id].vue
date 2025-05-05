<template>
  <div>
    <BarberDailySummary
      :barber-id="$route.params.id" 
      :barber-name="barberName"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { supabase } from '../utils/supabaseClient'
import { ref, onMounted } from 'vue'

const route = useRoute()
const barberName = ref('Barber')

onMounted(async () => {
  const { data: barber } = await supabase
    .from('barbers')
    .select('name')
    .eq('id', route.params.id)
    .single()

  if (barber) {
    barberName.value = barber.name
  }
})
</script>