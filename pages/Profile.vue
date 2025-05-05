<template>
    <client-only>
      <UserProfile />
    </client-only>
    
  </template>
  
  <script setup>
  import UserProfile from '@/components/UserProfile.vue';
  
  definePageMeta({
    middleware: 'auth',
  });
  </script>

  <style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables

    

</style>