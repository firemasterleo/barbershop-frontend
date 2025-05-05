<script setup>
import { useHead } from '#imports'

useHead({
  link: [
    {
      rel: 'preload',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      as: 'style'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
    },
    {
      rel: 'preload',
      href: '/tradartifacts.jpg', // Path relative to public folder
      as: 'image',
      type: 'image/jpg',
      fetchpriority: 'high' // Ensures it loads early
    }
  ]
});
</script>

<template>
  <main>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

