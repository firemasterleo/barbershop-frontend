<template>
  <div v-if="product">
    <img :src="product.image?.url" :alt="product.name" />
    <h2>{{ product.name }}</h2>
    <p>{{ product.description[0]?.children[0]?.text }}</p>
    <p>Price: ${{ product.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const cartStore = useCartStore();

const { data: product } = await useFetch(
  `http://localhost:1337/api/products/${route.params.id}?populate=image`
);

const addToCart = () => {
  cartStore.addToCart(product.value);
};
</script>