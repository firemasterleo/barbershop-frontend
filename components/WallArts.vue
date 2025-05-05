<template>
  <div class="sectioncontainer">
    <div class="section">
      <div class="body">
        <div class="featured-collection">
          <div class="slide">
            <div class="highlight" @mousemove="updateMousePosition" @mouseenter="showVideo" @mouseleave="hideVideo">
              
              <div class="image">
                  <img src="../assets/tradartifacts.jpg" alt="">
                </div>
                <div class="text">
                  <p>ARTIFACTS</p>
  
                </div>
                <!-- <div v-if="isVideoVisible" ref="videoPopup" class="video-popup">
        <video ref="videoElement" src="../assets/shapestationstudio2.mp4" autoplay loop muted></video>
      </div> -->
                
              </div>
            <div class="highlight">
              <div class="image">
                <img src="../assets/textile.jpg" alt="">
              </div>
              <div class="text">
                <p>item 2</p>
              </div>
              <!-- <div v-if="isVideoVisible" ref="videoPopup" class="video-popup">
        <video ref="videoElement" src="../assets/shapestationstudio2.mp4" autoplay loop muted></video>
      </div> -->
  
            </div>

              <div class="highlight">
              <div class="image">
                <img src="../assets/ori-olokun.jpg" alt="">
              </div >
              <div class="text">
                <p>item3</p>
                
              </div>
              <!-- <div v-if="isVideoVisible" ref="videoPopup" class="video-popup">
                <video ref="videoElement" src="../assets/shapestationstudio2.mp4" autoplay loop muted></video>
              </div> -->
              
            </div>
              <div class="highlight">
              <div class="image">
                <img src="../assets/ori-olokun.jpg" alt="">
              </div >
              <div class="text">
                <p>item4</p>
                
              </div>
              <!-- <div v-if="isVideoVisible" ref="videoPopup" class="video-popup">
                <video ref="videoElement" src="../assets/shapestationstudio2.mp4" autoplay loop muted></video>
              </div> -->
              
            </div>
          </div>
        </div>
        <div class="filter-sort">
          <div class="filter">
            <p>Filter</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#4b4b4b" viewBox="0 0 256 256"><path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"></path></svg>
          </div>
          <div class="sort">
            <p>Sort By</p>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>

          </div>
        </div>
        <div class="category-descr">
          <h1>Artifacts</h1>
          <p>Handcrafted by skilled artisans, each piece carries deep cultural significance. Elevate your space with history and tradition!</p>

        </div>

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
          <!-- <p>{{ product.description[0]?.children[0]?.text || "No Description" }}</p> -->
          <p>${{ product.price }}</p>
              
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

// Fetch products where the related category's name is "Wall Art"
const { data: products, status, error } = useFetch(
  "https://naijahaven-strapi.onrender.com/api/products?populate=*&filters[category][$eq]=wallart"
);
// Debugging to check API response
watchEffect(() => {
  console.log("Fetched Wall Art Products:", products.value);
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
background-color: $bg-white; /* Solid black background */
  width: 80rem;
  height: 100vh; /* Full viewport height */
  margin-inline: auto;

  .body {
      .featured-collection {
      padding-left: 1rem;
      padding-bottom: 2rem;
      padding-top: 1rem;

        .slide {

            // border: solid red;
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            gap: 1rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory; /* Enables smooth snap scrolling */
            .highlight {
                flex-shrink: 0;
                // border: solid blue;
                width: 12rem;
                // border-radius: 0.5rem;
                overflow: hidden;
                scroll-snap-align: center; /* Ensures items snap into place */


                .image {
                    width: 100%;
                    height: 16rem;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .text {
                    // border: solid red;
                    display: flex;
                    align-items: center;
                    border-radius: 0.5rem;
                    width: 100%;
                    padding-block: 5px;
                    background-color: $bg-white;
                    // padding-inline: 1rem;
                    p{
                      color: $text-dark;
                      font-weight: 600;
                      letter-spacing: 2px;
                      font-size: 13px;

                      
                      
                    }
                  }
            }
          }
      }
      .filter-sort {
        position: sticky;
        top: 5.7rem;
        display: flex;
        justify-content: space-between;
        padding-inline: 1rem;
        align-items: center;
        height: 3rem;
        background-color: $bg-offwhite;
        margin-bottom: 2rem;
        .filter {
          display: flex;
          gap: 4px;
          justify-content: center;
          align-items: center;
          // border: solid red;

          p {
            color: $text-dark;
          }
          svg {
            height: 24px;
            width: 24px;
            fill: $text-dark;

          }
        }
        .sort {
          display: flex;
          gap: 4px;
          justify-content: center;
          align-items: center;
          // border: solid red;

          p {
            color: $text-dark;
          }
          svg {
            height: 24px;
            width: 24px;
            fill: $text-dark;

          }
        }

      }
      .category-descr {
        background-color: $bg-white;
        padding-inline: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-bottom: 1rem;
        h1 {
          font-size: 16px;
          color: $text-dark;
        }
        p {
          font-size: 14px;
          color: $text-dark;
        }
      }
      .products {
          display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding-inline: 1rem;

          
          .product {
              display: flex;
              flex-direction: column;
              background-color: $bg-white;
              // border: solid red;


              .image {
                  width: 100%;
                  height: 12rem;
                  // border: solid red;
                  img {
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                  }
              }
              h2 {
                font-size: 12px;
                font-weight: 500;
              }
              button {
                width: 6rem;
                background-color: $bg-primary;
                color: $text-highlight;
                border: none;
                padding-block: 6px;
                border-radius: 10px;
              }
              button:active {
                transform: scale(1.05);
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
// fill: #FF6700;
}
</style>