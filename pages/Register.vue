<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>

  </template>


<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRoute, navigateTo } from '#app';

const userStore = useUserStore();
const username = ref('');
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const route = useRoute(); // ✅ Capture current route

const handleRegister = async () => {
  const response = await userStore.register(username.value, email.value, password.value);

  if (response && !response.error) {
    navigateTo('/Checkout'); // ✅ Redirect after successful registration
  } else {
    errorMsg.value = response.error || 'Registration failed'; // ✅ Show specific error if available
  }
};
</script>


<style scoped>
div {
  color: white;
}
button {
  margin: 5px;
}
</style>