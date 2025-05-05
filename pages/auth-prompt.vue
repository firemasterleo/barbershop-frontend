<template> 
  <div class="prompt">
    <h2>Login or Register to Continue</h2>
    <p>You need an account to proceed with your purchase.</p>
    <NuxtLink :to="`/login?redirect=${redirectPath}`">
      <button>Login</button>
    </NuxtLink>
    <NuxtLink :to="`/register?redirect=${redirectPath}`">
      <button>Register</button>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useRoute } from '#app';

const route = useRoute();
const redirectPath = encodeURIComponent(route.query.redirect || '/profile');

console.log('Redirect Query:', route.query.redirect); // ✅ Debugging
</script>

<style scoped>
.prompt {
  color: white;
}
button {
  margin: 5px;
}
</style>