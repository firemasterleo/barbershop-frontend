<template>

    <div v-if="userStore.user">
      <h2>Welcome, {{ userStore.user.username }}</h2>
      <p>Email: {{ userStore.user.email }}</p>
    </div>
    <button @click="userStore.logout">Logout</button>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore';

  
  const userStore = useUserStore();
  console.log("User data:", userStore.user); // Debug log
  </script>

<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables

div {
  
  h2 {
    color: $text-dark;
    // border: solid red;

  }
  p {
    color: $text-dark;
  }
}
button {
  margin: 5px;
}
</style>