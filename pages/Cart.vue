
<template>
  <main>
    <div class="sectioncontainer">
      <div class="section">
        <div class="back">
          <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
          
          <p>Continue shopping</p>
        </div>
        <client-only>
  
          <div class="cart">
    
            <div class="checkout">
              <p ><span class="sub">Subtotal</span><span class="dollar"><sup>$</sup></span> <span class="total">{{ cartStore.cartTotal }}</span> </p>
              
              <button @click="handleCheckout">Proceed to Checkout ({{ cartStore.totalItems }} items)</button>
        
            </div>
            <div class="item" v-if="cartStore.cart.length">
              <ul >
                <li v-for="item in cartStore.cart" :key="item.id">
                  <div class="top">
                    <div class="image">
                      <img 
                      v-if="item.image?.url"
                      :src="`${item.image.url}?width=500`"
                      alt="Product Image"
                      >
                      
                    </div>
                    <div class="details">
                      <!-- <h2>{{ item.name }}</h2> -->
                      <p class="descrp">  {{ item.description[0]?.children[0]?.text.split(" ").length > 16 
          ? item.description[0]?.children[0]?.text.split(" ").slice(0, 17).join(" ") + "..." 
          : item.description[0]?.children[0]?.text 
      }}.
                      </p>
                      <p class="price">$<span>{{ item.price }}</span></p>
          
                    </div>
                    
                  </div>
                  <div class="bottom">
                    <div class="quantitycontrols">
                      <button class="decrease" @click="cartStore.decreaseQuantity(item.id)">-</button>
                      <span>{{ item.quantity }}</span>
                      <button class="increase" @click="cartStore.increaseQuantity(item.id)">+</button>
       
                    </div>
                    <button class="delete" @click="cartStore.removeFromCart(item.id)">Delete</button>
                    <button class="saveforlater">Save for later</button>
    
                  </div>
                  
                <!-- Quantity Controls -->
              </li>
              </ul>
    
            </div>
            <p v-else>Your cart is empty</p>
        
          </div>
        </client-only>
  
      </div>
    </div>
    
    <Footer/>
  </main>
</template>
  
  <script setup>
import { useUserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore';
import { useRoute, navigateTo } from '#app';

const userStore = useUserStore();
const cartStore = useCartStore();
const route = useRoute();


const handleCheckout = () => {
  if (!userStore.isAuthenticated) {
    console.log("Redirecting to auth-prompt with Checkout as redirect..."); // Debugging
    navigateTo(`/auth-prompt?redirect=${encodeURIComponent('/Checkout')}`);
  } else {
    navigateTo('/Checkout');
  }
};
  </script>


<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables

.sectioncontainer {
  background-color: rgb(70, 96, 181); /* Solid black background */
  width: 100%;
  height: fit-content; /* Large enough to allow scrolling */
  min-height: 100vh;
display: flex;



  .section {
    background-color: $bg-white; /* Solid black background */
    width: 80rem;
    height: 100vh; /* Full viewport height */
    margin-inline: auto;
    

  }
}



@media (max-width: 800px) {
  .sectioncontainer {
    // border: solid red;

    .section {
      width: 100vw;
      height: 100vh;
      // padding-inline: 0.5rem;
      .back {
        background-color: rgb(216, 216, 216); /* Solid black background */
        height: 2.5rem;
        padding-inline: 1rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        svg {
          fill: $text-dark;
        }
        p {
          color: $text-dark;
        }
      }
      .cart {
        padding-inline: 1rem;
        .checkout {
          // padding-inline: 1rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          // border-bottom: solid 1px ;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: sticky;
          top: 2.5rem;
          background-color: $bg-white;
          p {
            display: flex;
            font-size: 24px;
            color: $text-dark;
            
            .sub {
              padding-right: 0.5rem;
              font-weight: 500;
            }
            .dollar {
              font-size: 19px;
              position: relative;
              top: 4px;

            }
            .total {
              font-weight: 600;
              font-size: 24px;

            }
            
            
            
          }
          button {
            width: 100%;
            height: 3rem;
            border-radius: 2rem;
            background-color: $bg-primary;
            border: none;
            font-size: 17px;
            color: $text-highlight;


          }


        }
        .item {
          width: 100%;
          // padding-inline: 0.5rem;
          padding-top: 1rem;
          // border: solid red;
          border-top: solid 1px ;

          ul {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            // border: solid red;
            
            li {
              display: flex;
              flex-direction: column;
              padding-inline: 0.5rem;
              padding-block: 0.5rem;
              gap: 1.5rem;
              border-radius: 0.5rem;
    background-color: $bg-offwhite; /* Solid black background */

              border-bottom: 1px solid silver;

              .top {
                display: flex;
                // justify-content: space-between;
                gap: 1.5rem;

                .image {
                  width: 7rem;
                  height: 7rem;
                  flex-shrink: 0; /* Prevents it from shrinking */
                  // border: solid red;
  
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: scale-down;
                  }
                }
                .details {
                  display: flex;
                  flex-direction: column;
                  // width: 16rem;
                  // border: solid;
                  .descrp {
                    font-size: 14px;
                    color: $text-dark;
                    line-height: 1.3rem;
                    padding-bottom: 0.5rem;
                  }
                  h2 {
                    font-size: 24px;
                    font-weight: 500;
                    color: $text-dark;

                  }
                  .price{
                    display: flex;
                    color: $text-black;

                    span {
                      font-size: 20px;
                      font-weight: 600;
                    }


                  }
                }

              }
              .bottom {
                display: flex;
                justify-content: space-between;
                // gap: 1.5rem;
                
                .quantitycontrols {
                  width: 7rem;
                  display: flex;
                  justify-content: space-between;
                  border: solid 3px $line-grey;
                  height: 2.2rem;
                  // padding-inline: 0.5rem;
                  border-radius: 1rem;
                  align-items: center;
                  // background-color: white;
                  color: $text-black;


                  .increase, .decrease {
                    outline: none;
                    background: none;
                    border: none ;
                    padding-inline: 5px;
                    font-size: 28px;
                    color: $text-black;
                  -webkit-tap-highlight-color: transparent;



                    
                  }
                .decrease:active {
                    transform: scale(1.1);

                  }
                .increase:active {
                    transform: scale(1.1);

                  }
                }
                .delete {
                  padding-inline: 1rem;
                  border-radius: 1rem;
                  font-size: 14px;
                  border: solid 2px grey;
                  color: $textcolorblack;
                  background: none;
                  -webkit-tap-highlight-color: transparent;





                  
                }
                .delete:active {
                  transform: scale(1.1);
                }
                .saveforlater {
                  padding-inline: 1rem;
                  border-radius: 1rem;
                  font-size: 14px;
                  border: solid 2px grey;
                  color: $textcolorblack;
                  background: none;
                  -webkit-tap-highlight-color: transparent;


              }
              .saveforlater:active {
                transform: scale(1.05);
              }
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) and (min-width: 800px) {
  .sectioncontainer {
    .section {

    }
  }
}
</style>