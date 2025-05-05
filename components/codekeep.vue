<template>
    <div class="presection">
      <div class="section1">
        <div class="desktop-header">
          <!-- Logo -->
          <NuxtLink to="/" class="logo" @click="handleItemClick">
            <h1>NaijaHaven</h1>
          </NuxtLink>
  
          <!-- Navigation Bar -->
          <nav class="nav-bar">
            <ul class="nav-links">
              <div class="nav-item">
                <NuxtLink to="/"><p>Work</p></NuxtLink>
              </div>
              <div class="nav-item">
                <NuxtLink to="/"><p>About</p></NuxtLink>
              </div>
              <div class="nav-item">
                <NuxtLink to="/"><p>Services</p></NuxtLink>
              </div>
              <div class="nav-item">
                <NuxtLink to="/"><p>Contact</p></NuxtLink>
              </div>
              <div class="nav-item">
                <NuxtLink to="/"><p>Blog</p></NuxtLink>
              </div>
            </ul>
          </nav>

        </div>
        <div class="mobile-header">
          <!-- Logo -->
           

          <div class="left">

  
          <!-- Hamburger Menu -->
          <div class="hamburger" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <NuxtLink to="/" class="logo" @click="handleItemClick">
      <h1>OjúAfrica</h1>
    </NuxtLink>
          </div>

          <div class="right" >
            <div class="user" @click="handleUserClick">
              <div class="signin" >
                <p v-if="userStore.isAuthenticated">{{ userStore.user?.username }}</p>
                <p v-else>Sign in</p>
                <svg class="arrow-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>

              </div>
                  <svg class="user-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
            </div>
            <NuxtLink to="/cart" class="cart" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path></svg>
                  <client-only>
                    <h1>{{ cartStore.totalItems }}</h1>

                  </client-only>
                      
    
              </NuxtLink>
          </div>
  
      
        </div>
      </div>
    </div>
                      <!-- User Dashboard Menu -->
      <div v-if="showMenu" class="dropdown-menu">
        <NuxtLink to="/profile">Profile</NuxtLink>
        <NuxtLink to="/orders">My Orders</NuxtLink>
        <button @click="userStore.logout()">Logout</button>
      </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToggle } from '@/composables/useToggle'
  import { useUserStore } from '@/stores/userStore';

  import { useCartStore } from '@/stores/cartStore';
  import { navigateTo } from '#app';
  
  // Use the composable for managing toggle state
  const { isMenuOpen, toggleMenu, closeMenu } = useToggle();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const isHydrated = ref(false);


  const showMenu = ref(false);
  // Function to close the menu when clicking a menu item
  const handleItemClick = () => {
    closeMenu(); // Ensures the menu closes on click
  };

  const handleUserClick = () => {
  if (!userStore.isAuthenticated) {
    navigateTo('/login');
  } else {
    showMenu.value = !showMenu.value; // Toggle user menu
  }
};

onMounted(() => {
  isHydrated.value = true; // ✅ Only update once we’re in the client
});
  </script>
  




<style lang="scss" scoped>
  @use "@/assets/sass/variables" as *; // Import variables

.presection {
    // background-color: rgb(45, 45, 49);
    // border: yellow solid;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;


    .section1 {
        // margin-inline: auto;
        // border: solid green;
        width: 80rem;
        height: 100%;
        // padding-inline: 1rem;
        overflow: hidden;
        display: flex;
        position: relative;
        background-color: rgb(121, 140, 97); /* Solid black background */




        .desktop-header {
            

            // border: solid red;
            // width: 62rem;
            width: 100%;
            background-color: $primarycolorblack; /* Solid black background */

            // backdrop-filter: blur(20px);
            height: 3.2rem;
            // border-radius: 2rem;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            
            .logo {
                // borderight: solid 2px #7cae65;
                // border: solid red;
                padding-right: 1rem;
                // letter-spacing: 6px;
                // font-size: 10px;
                // position: relative; /* Ensure proper layering */
                // background: transparent;
                top: 1.2rem;
                position: fixed;
                z-index: 25;
                mix-blend-mode: difference;
                color: $textcolorwhite;
                
                
                
                h1 {
                    // z-index: 200;
                    // position: relative; /* Ensure it stays in front */
                    // z-index: 2; /* Ensures it stays in front */
                    cursor: pointer; /* Make it behave like a button */
                    font-size: 18px;
                    // font-variant-caps: all-small-caps; /* To make uppercase match lowercase in height */
                    line-height: 1.2; /* Adjust as needed */
                    font-weight: 400;
                    
                    
                }
                h1:active {
                    transform: scale(1.1);
                }
            }

            .nav-bar {
                // border: solid red;
                // width: 100%;
                display: flex;
                justify-content: right;

                .nav-links {
                    display: flex;
                    gap: 3rem;
                    // width: 30rem;
                    min-width: fit-content;
                    overflow: hidden;
                    position: fixed;
                    z-index: 25;
                    mix-blend-mode: difference;
                    color: $textcolorwhite;
            top: 1.2rem;

                    .nav-item {
                        flex-shrink: 0;
                        position: relative;
                        // border : solid black;
                        // padding-inline: 0.2rem;
                        
                        
                        
                        
                        p {
                            -webkit-tap-highlight-color: transparent;
                            font-size: 14px;
                            font-weight: 600;
                            letter-spacing: 1px;
                            font-family: "Poppins", serif;
                            cursor: pointer;
                            color: $textcolorwhite;
                            // border-bottom: solid 1.5px;
                        }
                        p:active {
                            transform: scale(1.1);
                        }
                    }
                }
            }          
        }
        .mobile-header {
          display: none;
        }
    }
}

@media (max-width: 800px) {
    .presection {
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid $line-grey;
        .section1 {
            width: 100%;
            .desktop-header {
              display: none;
            }
            .mobile-header {
                width: 100%;
                // border: solid red;

                display: flex;
                justify-content: space-between;
                height: 3.2rem;
                // height: fit-content;
                background-color: $bg-white; /* Solid black background */
                // background-color: rgb(121, 140, 97); /* Solid black background */
                position: relative;



                .left {
                  // border: solid blue;
                  width: fit-content;
                  display: flex;
                  gap: 0.5rem;
                  align-items: center;
                  .logo {
                  -webkit-tap-highlight-color: transparent;


                padding-right: 1rem;

                position: relative;
                // z-index: 25;
                // mix-blend-mode: difference;
                color: $text-dark;
                // color: rgb(121, 140, 97);
                display: flex;

                h1 {

                    // z-index: 200;
                    // position: relative; /* Ensure it stays in front */
                    // z-index: 2; /* Ensures it stays in front */
                    cursor: pointer; /* Make it behave like a button */
                    font-size: 18px;
                    // font-variant-caps: all-small-caps; /* To make uppercase match lowercase in height */
                    line-height: 1.2; /* Adjust as needed */
                    font-weight: 400;
                    
                    
                }
                h1:active {
                    transform: scale(1.1);
                }
            }

                  .hamburger {
                -webkit-tap-highlight-color: transparent;
                
                // border: solid red;
                position: relative;
                z-index: 25;
      
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                justify-content: center;
                background-color: none;
                align-items: flex-end;
                cursor: pointer;
      
                // width: 2.5rem;
                padding-left:1rem ;
                padding-right: 1.5rem;
      
                height: 3rem;
                position: relative;
                // top: 0.3rem;
             
                // mix-blend-mode: difference;
                // color: $textcolorwhite;
      
      
        
                .bar {
                    width: 19px;
                    height: 2px;
                    // background-color: rgba(255, 255, 255, 0.413);
                    background-color: $text-dark;
                    // background-color: $textcolorblack;
      
      
                    transition: transform 0.3s, opacity 0.3s;
                    
                  }
                &.is-active {
                    
                    
                    .bar:nth-child(1) {
                        // background-color: rgba(255, 255, 255, 0.413);
      
                        transform: translateY(6px) rotate(45deg);
                      }
                    .bar:nth-child(2) {
                        // background-color: rgba(255, 255, 255, 0.413);
      
                        opacity: 0; }
                    .bar:nth-child(3) {
                        // background-color: rgba(255, 255, 255, 0.413);
      
                        transform: translateY(-6px) rotate(-45deg);
                    }
      
                }
        }
                }

                .right {
                  display: flex;
                  gap: 1rem;

                  .user {
                    display: flex;
                    align-items: center;

                  // border: solid red;

                    .signin {
                    display: flex;
                    align-items: center;
                    // border: solid red;

                      p {
                        color: $text-dark;
                        font-size: 14px;
                      }
                      .arrow-svg {
                        fill: $text-dark;
                        width: 15px;
                        height: 15px;
                      }

                    }
                    .user-svg {
                      fill: $text-dark;
                      width: 30px;
                      height: 30px;
                    }
                  }

                  .cart {
                  -webkit-tap-highlight-color: transparent;
                  // border: solid;


                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    padding-right: 1rem;
                    width: 2.6rem;


                
                // border: solid green;

                      svg {

                        fill: $text-dark;
                        width: 35px;
                        height: 35px;
                        position: absolute;
                        // border: solid red;
                        
                      }
                      h1 {
                        
                        
                        color: $text-dark;
                        font-size: 12px;
                        position: relative;
                        left: 2px;
                        bottom: 0.5px;
                      //   position: absolute;
                      // top: 50%;
                      // left: 50%;
                      // transform: translate(-120%, -50%);
  
                      }
  

                  
                }
                }


            }
        }
    }
}

.dropdown-menu {
  position: fixed;
  top: 50px;
  z-index: 100;
  border: solid red;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.dropdown-menu a,
.dropdown-menu button {
  padding: 8px 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
}

.dropdown-menu button:hover,
.dropdown-menu a:hover {
  background: #f4f4f4;
}
</style>

