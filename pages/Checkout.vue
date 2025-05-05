<template>
  <main>
    <div>
        <h1>this is checkout </h1>

    </div>

    <Footer/>


  </main>

</template>

<style lang="scss" scoped>
div {
  color: white;
}
button {
  margin: 5px;
}
</style>

<script setup>

definePageMeta({
  middleware: 'auth',
});
</script>