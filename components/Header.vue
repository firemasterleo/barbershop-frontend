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
          <div class="hamburger" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <NuxtLink to="/" class="logo" @click="handleItemClick">
<img src="../assets/barber-logo.png" alt="">
</NuxtLink>
<div class="right">
  <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='16' height='16'><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm113.86-49.57A12,12,0,0,0,236,98.34L208.21,82.49l-.11-31.31a12,12,0,0,0-4.25-9.12,116,116,0,0,0-38-21.41,12,12,0,0,0-9.68.89L128,37.27,99.83,21.53a12,12,0,0,0-9.7-.9,116.06,116.06,0,0,0-38,21.47,12,12,0,0,0-4.24,9.1l-.14,31.34L20,98.35a12,12,0,0,0-5.85,8.11,110.7,110.7,0,0,0,0,43.11A12,12,0,0,0,20,157.66l27.82,15.85.11,31.31a12,12,0,0,0,4.25,9.12,116,116,0,0,0,38,21.41,12,12,0,0,0,9.68-.89L128,218.73l28.14,15.74a12,12,0,0,0,9.7.9,116.06,116.06,0,0,0,38-21.47,12,12,0,0,0,4.24-9.1l.14-31.34,27.81-15.81a12,12,0,0,0,5.85-8.11A110.7,110.7,0,0,0,241.86,106.43Zm-22.63,33.18-26.88,15.28a11.94,11.94,0,0,0-4.55,4.59c-.54,1-1.11,1.93-1.7,2.88a12,12,0,0,0-1.83,6.31L184.13,199a91.83,91.83,0,0,1-21.07,11.87l-27.15-15.19a12,12,0,0,0-5.86-1.53h-.29c-1.14,0-2.3,0-3.44,0a12.08,12.08,0,0,0-6.14,1.51L93,210.82A92.27,92.27,0,0,1,71.88,199l-.11-30.24a12,12,0,0,0-1.83-6.32c-.58-.94-1.16-1.91-1.7-2.88A11.92,11.92,0,0,0,63.7,155L36.8,139.63a86.53,86.53,0,0,1,0-23.24l26.88-15.28a12,12,0,0,0,4.55-4.58c.54-1,1.11-1.94,1.7-2.89a12,12,0,0,0,1.83-6.31L71.87,57A91.83,91.83,0,0,1,92.94,45.17l27.15,15.19a11.92,11.92,0,0,0,6.15,1.52c1.14,0,2.3,0,3.44,0a12.08,12.08,0,0,0,6.14-1.51L163,45.18A92.27,92.27,0,0,1,184.12,57l.11,30.24a12,12,0,0,0,1.83,6.32c.58.94,1.16,1.91,1.7,2.88A11.92,11.92,0,0,0,192.3,101l26.9,15.33A86.53,86.53,0,0,1,219.23,139.61Z"></path></svg>

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
              border: solid;
                width: 5rem;
                height: 2rem;

                img {
                  width: 100%;
                  height: 100%;
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
      position: fixed;
      top: 0;
      z-index: 1000;
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
                align-items: center;
                height: 3.2rem;
                padding-right: 1rem;
                // height: fit-content;
                background-color: $bg-white; /* Solid black background */
                // background-color: rgb(121, 140, 97); /* Solid black background */
                position: relative;
                .hamburger {
              -webkit-tap-highlight-color: transparent;
              
              // border: solid red;
              position: relative;
              left: 0;
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
                .logo {
                  // border: solid;
            width: 7rem;
            height: auto;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .right  {
            display: flex;
            gap: 1rem;
            fill: $text-dark;
            svg {
              width: 20px;
              height: 20px;
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

