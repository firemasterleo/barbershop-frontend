<template>
    <div class="sectioncontainer">
      <div class="section">

        <div class="video-container" ref="vid">
        <video autoplay muted loop playsinline>
          <source src="../assets/shapestation studio (1).mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      </div>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted} from 'vue';
  
  
  
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);
  
  const vid = ref(null);
  
  onMounted(() => {
  
      gsap.fromTo(
    vid.value,
    { y: '-25%' }, // Starting value
    {
      y: '30%', // Ending value
      ease: 'none',
      scrollTrigger: {
        trigger: vid.value,
        start: '50 90%',
        end: 'bottom 100',
        scrub: 0.3,
        // markers: true,
        invalidateOnRefresh: true, // Recalculate start/end on resize or refresh
  
      },
    }
  );
  });
</script>

<style lang="scss" scoped>
@use "@/assets/sass/variables" as *; // Import variables
.sectioncontainer {
  background-color: $primarycolorblack; /* Solid black background */
  width: 100%;
  height: 100vh; /* Large enough to allow scrolling */
display: flex;

  .section {
    width: 80rem;
    height: 100vh; /* Full viewport height */
    margin-inline: auto;
    overflow: hidden;

    .video-container {
      width: 100%; /* Full width of the container */
      height: 100%; /* Full height of the container */

      video {
        object-fit: cover; /* Ensures video fills the container */
        width: 100%; /* Match container width */
        height: 100%; /* Match container height */
      }
    }

  }
}



@media (max-width: 800px) {
  .sectioncontainer {
    .section {
      width: 100vw;
      height: 100vh;
      
      .video-container {
        width: 100%;
        height: 100%;

        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
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