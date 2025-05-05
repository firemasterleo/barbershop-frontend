<template>
  <div> <!-- Main Layout Wrapper -->
    <Header />

    <!-- Side Panel -->
    <div class="sidepanel" :class="{ 'is-expanded': isMenuOpen }">
      <SidePanel2 />
    </div>
    
    <!-- Overlay to close menu -->
    <div class="sidepanel-overlay" :class="{ 'is-expanded': isMenuOpen }" @click="closeMenu"></div>

    <!-- Main Content Area -->
     <main class="main">

       <slot />
     </main>


    <!-- <Footer /> -->
  </div>
</template>
  
  <script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from "vue";
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';


  import { useToggle } from "~/composables/useToggle";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Use global toggle composable
  const { isMenuOpen, toggleMenu, closeMenu } = useToggle();
  
  // GSAP Cleanup to prevent memory leaks
  const cleanupAnimations = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf("*");
    gsap.globalTimeline.clear();
  };
  
  onMounted(() => {
  console.log("Default layout mounted");
  // Disable body scroll when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  }
});
  
onBeforeUnmount(() => {
  cleanupAnimations();
  // Ensure body scroll is restored when component is destroyed
  document.body.style.overflow = 'auto';
});

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'; // Disable scrolling
  } else {
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

  </script>
  <style lang="scss">
    @use "@/assets/sass/main" as *; // Import variables
    // @use "@/assets/sass/variables" as *; // Import variables
.main {
  margin-top: 3.2rem;
  // border: solid;
}


  .sidepanel {
    display: none;
  }
  
  @media (max-width: 800px) {

    .sidepanel {

// opacity: 0;
// visibility: hidden;
// border: solid red;
width: 21rem;
height: 100vh;
transform: translatex(-100%);
// padding-top: 6rem;
// padding-left: 1.5rem;
// border-radius: 0.6rem;
display: flex;
flex-direction: column;
gap: 1.2rem;
overflow-y: hidden;
// z-index: 0;
position: fixed;
// top: 3rem;
z-index: 24;
opacity: 0;

// visibility: hidden;
// border: solid red;


&.is-expanded {
  // transition: all 0.35s; 
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1) ; 
  opacity: 1;
transform: translatex(0%);
}

    }
    .sidepanel-overlay {
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.658);
      position: fixed;
      bottom: 0;
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-out, visibility 0s linear 0.5s;
  
      &.is-expanded {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease-in;
      }
    }
  }

  </style>
  