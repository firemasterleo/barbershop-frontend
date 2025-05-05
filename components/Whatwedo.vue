<template>
  <div class="sectioncontainer">
    <div class="section">
      <div class="tagline-mobile">
        <div class="line line1">
          <div class="overlay overlay1" ref="overlay1"></div>
          <p>Where African Heritage </p>
        </div>

        <div class="line line2">
          <div class="overlay overlay2" ref="overlay2"></div>
          <p> Inspires Timeless Art </p>
        </div>
        <div class="line line3">
          <div class="overlay overlay3" ref="overlay3"></div>
          <p> From Across The World. </p>
          </div>

      </div>
      <div class="tagline-desktop">
        <div class="line line1">
          <div class="overlay overlay6" ref="overlay6"></div>
          <p>We blend the power of design, performance</p>
        </div>
        <div class="line line2">
          <div class="overlay overlay7" ref="overlay7"></div>
          <p> and Strategy, into creating immersive experiences </p>
        </div>
        <div class="line line3">
          <div class="overlay overlay8" ref="overlay8"></div>
          <p> that captivate and convert. See  <span > our services 
          </span>
            <span>
<svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>

          </span></p>
        </div>

      </div>
      <hr>



    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useNuxtApp } from "#app";

const { $gsap, $ScrollTrigger } = useNuxtApp(); // Access GSAP & ScrollTrigger

const overlay1 = ref(null);
const overlay2 = ref(null);
const overlay3 = ref(null);
const overlay4 = ref(null);
const overlay5 = ref(null);
const overlay6 = ref(null);
const overlay7 = ref(null);
const overlay8 = ref(null);

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return;

  $gsap.registerPlugin($ScrollTrigger); // Register ScrollTrigger

  // Overlay 1
  $gsap.fromTo(
    overlay1.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay1',
        start: 'top 95%',
        end: 'bottom 70%',
        scrub: 1.7,
      }
    }
  );

  // Overlay 2
  $gsap.fromTo(
    overlay2.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay2',
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 1.7,
      }
    }
  );

  // Overlay 3
  $gsap.fromTo(
    overlay3.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay3',
        start: 'top 75%',
        end: 'bottom 50%',
        scrub: 1.7,
      }
    }
  );

  // Overlay 4
  $gsap.fromTo(
    overlay4.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay4',
        start: 'top 65%',
        end: 'bottom 40%',
        scrub: 1,
      }
    }
  );

  // Overlay 5
  $gsap.fromTo(
    overlay5.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay5',
        start: 'top 55%',
        end: 'bottom 30%',
        scrub: 1.7,
      }
    }
  );

  // Overlay 6
  $gsap.fromTo(
    overlay6.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay6',
        start: 'top 95%',
        end: 'bottom 70%',
        scrub: 1.7,
      }
    }
  );

  // Overlay 7
  $gsap.fromTo(
    overlay7.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay7',
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 1.7,
      }
    }
  );

  // Overlay 8
  $gsap.fromTo(
    overlay8.value,
    { x: '0%' },
    {
      x: '100%',
      ease: "cubic-bezier(0.25, 1, 0.5, 1)",
      scrollTrigger: {
        trigger: '.overlay8',
        start: 'top 75%',
        end: 'bottom 50%',
        scrub: 1.7,
      }
    }
  );
});

// Cleanup GSAP on unmount
onBeforeUnmount(() => {
  $ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>


<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables
    .sectioncontainer {
// background-color: rgb(70, 96, 181); /* Solid black background */
width: 100%;
height: fit-content; /* Large enough to allow scrolling */
display: flex;
// border: solid green;
overflow: hidden;
position: relative;
z-index: 1;


.section {
background-color: $primarycolorblack; /* Solid black background */
background-color: rgb(0, 0, 0); /* Solid black background */
  width: 80rem;
  height: 100%; /* Full viewport height */
  margin-inline: auto;
  // border: solid green;
  padding-inline: 2rem;

.tagline-mobile {
display: none;
}
  .tagline-desktop{
      padding-top: 2.5rem;
      padding-bottom: 4rem;
      .line1 {
        .overlay {
         
        }
        p {
      
          text-align: right;
          margin-right: 4rem;
         }
      }
      .line {
        // border: solid red;
        position: relative;
        .overlay {
          position: absolute;
          right: 0;
          z-index: 2;
          width: 120%;
          height: 100%;
          // border: solid green;
          // transform: translateX(100%);
          // transition: all 6s;
          background: linear-gradient(
               280deg,
              rgba(0, 0, 0, 0.769) 85%, /* Least transparent at the top */
              rgba(255, 255, 255, 0)   /* 0.854 Darker and less transparent at the bottom */
          );          
        }
        p {
          color: $textcolorwhite; 
          font-size: 3.6vw;      
        font-size: clamp(1rem, 3.6vw, 2.8rem); /* Min 5rem, scales with viewport width, max 10em */

          // text-align: right;  
          font-weight: 500;
          // line-height: 2.5rem;
          margin-top: -0.4rem;

         }
      }
      .line3 {
        position: relative;
        z-index: 0;
        span {
              border-bottom:  solid 1px;
            }
            span {

              svg {
                fill: $textcolorwhite;
                rotate:135deg;
                // border: solid red;
                position: relative;
                top: 3px;
                height: 32px;
                width: 32px;
              }
            }
      }
    }


}
}



@media (max-width: 800px) {
.sectioncontainer {
  .section {
    width: 100vw;
    height: fit-content;
    // background-color: white;
    padding-inline: 0.5rem;
.tagline-desktop {
display: none;
}
    .tagline-mobile {
      display: block;
      padding-top: 2.5rem;
    padding-bottom: 2rem;


      .line1 {
        // border: solid red;
        position: relative;
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          // border: solid green;
          // transform: translateX(0%);
          // transition: all 6s;
          background: linear-gradient(
               280deg,
              rgba(0, 0, 0, 0.826) 85%, /* Least transparent at the top */
              rgba(255, 255, 255, 0)   /* 0.854 Darker and less transparent at the bottom */
          );          
        }
        p {
          color: $textcolorwhite; 
          font-size: 5.8vw;      
          font-weight: 500;
          // line-height: 1.7rem;
         }
      }
      .line {
        // border: solid red;
        position: relative;
        .overlay {
          position: absolute;
          right: 0;
          z-index: 2;
          width: 120%;
          height: 100%;
          // border: solid green;
          // transform: translateX(100%);
          // transition: all 6s;
          background: linear-gradient(
               280deg,
              rgba(0, 0, 0, 0.769) 85%, /* Least transparent at the top */
              rgba(255, 255, 255, 0)   /* 0.854 Darker and less transparent at the bottom */
          );          
        }
        p {
          color: $textcolorwhite; 
          font-size: 5.7vw;      
          font-weight: 500;
          // line-height: 1.7rem;
          margin-top: -0.4rem;

         }
      }
      .line5 {
        position: relative;
        z-index: 0;
        // border: solid red;
        span {
          // border-bottom: solid 1.5px $textcolorwhite;            
          text-decoration: underline;
            span {
              border: none;
              svg {
                fill: $textcolorwhite;
                rotate:135deg;
                // border: solid red;
                position: relative;
                top: 3px;
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