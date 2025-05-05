<template>

  <div class="content">
      <div class="sidebarcontainer">
      <div class="sidebarsection">
          <div class="sidebar">
          <!-- Menu Section -->
          <div class="menu">
            <!-- <div class="searchbar" @click="">   
          <input type="text" v-model="query" placeholder="Search" @keyup.enter="searchMovies" spellcheck="false">
          <div @click="searchMovies" :disabled="loading" class="searchbutton">
            <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='16' height='16'><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
          </div>
        </div> -->
            <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path" active-class="active">
              <div class="home" @click="handleItemClick">
                <p :class="{ 'is-expanded': isMenuOpen }">{{ item.label }}</p>
              </div>
            </NuxtLink>
          </div>
                 
          </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { useToggle } from '~/composables/useToggle';

const { isMenuOpen, closeMenu } = useToggle();

const menuItems = [
  { label: 'Log Visits', path: '/' },
  { label: 'Barbers ', path: '/Barbers' },
  { label: 'Services', path: '/' },
  { label: 'Stats & Insights', path: '/' },


];

// Close sidebar when a menu item is clicked
const handleItemClick = () => {
  closeMenu();
};
</script>


<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables



.content {
  // border: solid green ;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  
  .sidebarcontainer {
    // overflow: scroll;
      // border: solid yellow;
      background-color: $bg-white; /* Solid black background */
      width: 21rem;
      height: 130vh;
      // padding-inline: 1rem;
      outline: none; /* Remove the default outline */
      box-shadow: 0 0 0 0.1px ;   //remove outline and use box shadow for thinnest line 
      


  .sidebarsection {
      // height: 50rem;
      width: 100%;
      // border: solid blue;
      
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
          // padding-top: 1.5rem;
          // border: solid blue;
          .logo {
            padding-left:1rem ;
            // letter-spacing: 6px;
                font-size: 12px;
                position: relative; /* Ensure proper layering */
                background: transparent;
                // border: solid;
                height: 3.2rem;
                display: flex;
                align-items: center;

                h1 {
                    color: $primarycolorblack;
                    position: relative; /* Ensure it stays in front */
          /* Make it behave like a button */
                }
          }
          .menu {
              // border: solid;
              display: flex;
              flex-direction: column;
              // border-bottom: solid 1px rgba(255, 255, 255, 0.162);
              padding-bottom: 0.5rem;
              padding-top: 2rem;
              // gap: 1rem;
              .searchbar {

                  // min-width: 22rem;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  position: relative;
                  border: none;
                  outline: none;
                  padding-inline: 1rem;
                  // border: solid black;


                  input {
                      padding-inline: 1rem;
                      width: 100%;
                      border-radius: 6px;
                      border: none ;
                      // outline: none;
                      height: 2.5rem;
                      background-color: $bg-offwhite;
                    color: rgb(225, 213, 213);
                    font-size: 16px;

                    &:focus {
                      outline: 1px solid $bg-secondary; /* Change to your desired color */
                      }


                    }
                    .searchbutton {
                      position: absolute;
                      right: 1.5rem;
                      // top: 0.5rem;
                      // padding-inline: 0.5rem;
                      cursor: pointer;
                      // border: solid;
                      height: fit-content;
                      border: none;
                      
                      svg {
                        
                        fill: $text-accent;

                        &:hover {
                        fill: rgb(225, 213, 213);


                        }
                      }

                      

                      
                    }

                  }
                                div {
                  // border: solid ;
                  padding-top: 0.5rem;
                  // border-radius: 0.5rem;
                  padding-bottom: 0.5rem;
                  display: flex;
                  gap: 0.5rem;
                  align-items: center;
                  cursor: pointer;
                  height: 3.5rem;
                  border-bottom: solid 1px $line-grey; ;
                  
                  
                  p {
                    -webkit-tap-highlight-color: transparent;
                    
                    padding-left: 1.5rem;
                      font-size: 16px;
                      font-weight: 500;
                      color: $text-dark;
                    }
                    p:active {
                      
                      color: $primarycolorblack;
                  }

              }

              // .active {
              //     border-radius: 0.5rem;
              //     background-color: $primarycolorblack;

              //     p {
              //         color: $bgcolordeepwhite;
              //     }

              // }
              
          }
          }
          }
          }

        


}


@media (max-width: 800px) {
  .content {

      .sidebarcontainer {
          // width: fit-content;
          // height: 100vh;
      }
  }

} 




</style>


