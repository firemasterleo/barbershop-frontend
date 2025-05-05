<template>
    <div class="sectioncontainer">
      <div class="section">
        <div class="body">
    <h1>Our Products</h1>

        <div v-if="status === 'pending'" class="loader loader--style2" title="1">
  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
    </path>
  </svg>
</div>

    <div v-if="error">Error loading products: {{ error }}</div>
    
    <ul class="products" v-if="products?.data?.length" >
      <li class="product" v-for="product in products.data" :key="product.id">
          <NuxtLink class="image" :to="`/product/${product.id}`">
            <img 
            v-if="product.image?.formats?.small?.url"
            :src="product.image.formats.small.url"
            alt="Product Image"
            />
          </NuxtLink>
            <h2>{{ product.name }}</h2>
            <p>{{ product.description[0]?.children[0]?.text || "No Description" }}</p>
            <p>Price: ${{ product.price }}</p>
                
      <!-- Add to Cart Button -->
        <button @click="cartStore.addToCart(product)">
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
  
      </div>
    </div>
  </template>
  

  <script setup>
  import { useCartStore } from '@/stores/cartStore';
  const cartStore = useCartStore();

  const { data: products, status, error } = useFetch("https://naijahaven-strapi.onrender.com/api/products?populate=*");
  
  // Debugging to see actual API response
  watchEffect(() => {
    console.log("Fetched Products:", products.value);
  });
  </script>

<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables

.sectioncontainer {
  background-color: rgb(231, 229, 227); /* Solid black background */
  width: 100%;
  height: 100vh; /* Large enough to allow scrolling */
display: flex;


  .section {
  background-color: rgb(231, 229, 227); /* Solid black background */
    width: 80rem;
    height: 100vh; /* Full viewport height */
    margin-inline: auto;

    .body {
        padding-inline: 1rem;
        .products {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .product {
                // border: solid red;
                display: flex;
                // gap: 1rem;
                flex-direction: column;
                background-color: rgb(219, 213, 213);
                // border: solid red;


                .image {
                    width: 15rem;
                    height: 15rem;
                    // border: solid red;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

            }
        }
    }

  }
}



@media (max-width: 800px) {
  .sectioncontainer {
    height: fit-content;
    padding-bottom: 1rem;
    .section {
      width: 100vw;
      height: fit-content;
    }
  }


}
@media (max-width: 1200px) and (min-width: 800px) {
  .sectioncontainer {
    .section {

    }
  }
}

.loader{
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}

/*
  Set the color of the icon
*/
svg path,
svg rect{
  fill: #FF6700;
}
</style>