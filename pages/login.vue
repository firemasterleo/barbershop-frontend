<template>
  <main>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="identifier" placeholder="Email or Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>
    <Footer/>

  </main>

  </template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRoute, navigateTo } from '#app';

const userStore = useUserStore();
const identifier = ref('');
const password = ref('');
const errorMsg = ref('');

const route = useRoute(); // ✅ Read query parameter

// If the user is already logged in, redirect them
if (userStore.isAuthenticated) {
  const redirectPath = route.query.redirect || '/profile'; // Go to intended page or profile
  navigateTo(redirectPath);
}

const handleLogin = async () => {
  console.log("Incoming Route Query:", route.query); // Debugging step

  // Extract the redirect path from the query, default to '/profile' if missing
  const redirectPath = route.query.redirect ? decodeURIComponent(route.query.redirect) : '/profile';

  console.log("Redirecting to:", redirectPath); // Debugging

  const { error } = await userStore.login(identifier.value, password.value);
  
  if (!error.value) {
    navigateTo(redirectPath, { replace: true });
  } else {
    errorMsg.value = "Invalid credentials";
  }
};

</script>

<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables

div {
  color: $text-dark;
}
button {
  margin: 5px;
}
</style>