<template>
    <div class="footer-container">
      <ul class="contact">
        <li class="getintouch">GET IN TOUCH</li>
        <li class="contact-days">Mon - Fri: 8 am - 8 pm GMT</li>
        <li class="contact-days">Saturdays: 11 am - 4 pm GMT</li>
        <li class="contact-add"><a href="tel:+2347060599246">Call Us: <span> +234 70 659 9246</span> </a></li>
        <li class="contact-add"><a href="mailto:assistant@ojuafrica.com">Email Us:<span> assistant@ojuafrica.com</span></a></li>

      </ul>
      <div class="newsletter">
        <div>
          <h2>Become an Insider</h2>
          <p>Stay inspired with exclusive collections and more</p>

        </div>
        <form name="newsletter" method="POST" data-netlify="true" @submit.prevent="handleSubmit">
              <input type="hidden" name="form-name" value="newsletter" />
              <input type="hidden" name="bot-field" />
              <div class="input-container">
                <input type="email" id="email" name="email" placeholder="Enter email address" required />
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" width="24" height="24">
                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                  </svg>
                </button>
              </div>
            </form>
      </div>
      <div class="footer">
        <div class="top-container">
          <div class="help">
            <h2>HELP</h2>
            <ul>
              <li>FAQS</li>
              <li>Shipping & Returns</li>
              <li>Gift Cards</li>
              <li>Care & Assembly</li>
              <li>Catalog</li>
            </ul>

          </div>
          <div class="ojuafrica">
            <h2>OjuAfrica</h2>
            <ul>
              <li>Our Story</li>
              <li>Aritisans Partners</li>
              <li>Press</li>
              <li>Careers</li>
              <li>Corporate Sales & Gifting</li>
              <li>Trade Program</li>
            </ul>
          </div>
          <div class="ourbrands">
            <h2>Our Brands</h2>
            <ul>
              <li>BestAfrica</li>
              <li>LumenInteriors</li>
              <li>Decora</li>
              <li>Jules</li>
            </ul>
          </div>
          <div class="locations">
            <h2>LOCATIONS</h2>
            <ul>
              <li>Lagos, NG</li>
              <li>Abuja, NG</li>
              <li>Mbeya, TZ</li>
            </ul>
          </div>


        </div>
        <div class="socials">
          <div class="instagram">
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path></svg>

          </div>
          <div class="whatsapp">
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path fill-rule="evenodd" clip-rule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path></svg>

          </div>
          <div class="youtube">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path></svg>

          </div>
          <p class="tiktok">TikTok</p>
          <div class="linkedin">
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path></svg>

          </div>
          <p class="journal">Journal</p>

        </div>
        <div class="bottom-container">
          <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Accessibility</li>
            <li>Do Not Sell My Info</li>
            <li>©</li>
          </ul>

        </div>
      </div>
    </div>
  </template>
  
  
<script setup>
import { ref, onMounted} from 'vue';
import { useNuxtApp } from "#app";



const { $gsap, $ScrollTrigger } = useNuxtApp(); // Access GSAP & ScrollTrigger


const isSubmitted = ref(false); // Track if the form has been submitted


const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission
  
  const formData = new FormData(event.target);

  try {
    const response = await fetch("/", {
      method: "POST",
      body: formData,
    });

    // Handle the response (if success, show the thank you message)
    if (response.ok) {
      isSubmitted.value = true; // Show the Thank You message
    } else {
      alert("Sorry, there was an error with your submission. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error);
  }
};
onMounted(() => {
  // Ensure elements exist before running animation
  const shapeFooter = document.querySelector(".shape-footer");
  if (!shapeFooter) return;

  // Register ScrollTrigger
  $gsap.registerPlugin($ScrollTrigger);

  let shapeAnimation = $gsap.timeline({
    scrollTrigger: {
      trigger: shapeFooter, // Use the element reference
      start: "top bottom",
      end: "bottom bottom",
      scrub: false, // Set to true if you want scroll-based animation
      // markers: true, // Enable for debugging
    },
    defaults: { duration: 0.9, ease: "power2.out" }
  });

  // Apply animations to individual letters
  shapeAnimation
    .fromTo(".shape-footer .s", { y: -170 }, { y: 0 })
    .fromTo(".shape-footer .h", { y: -170 }, { y: 0 }, 0.1)
    .fromTo(".shape-footer .a", { y: -170 }, { y: 0 }, 0.14)
    .fromTo(".shape-footer .p", { y: -170 }, { y: 0 }, 0.18)
    .fromTo(".shape-footer .e", { y: -170 }, { y: 0 }, 0.2)
    .fromTo(".shape-footer .s2", { y: -170 }, { y: 0 }, 0.22)
    .fromTo(".shape-footer .t", { y: -170 }, { y: 0 }, 0.24)
    .fromTo(".shape-footer .a2", { y: -170 }, { y: 0 }, 0.26)
    .fromTo(".shape-footer .t2", { y: -170 }, { y: 0 }, 0.28)
    // .fromTo(".shape-footer .i", { y: -170 }, { y: 0 }, 0.3)
    // .fromTo(".shape-footer .o", { y: -170 }, { y: 0 }, 0.32)
    // .fromTo(".shape-footer .n", { y: -170 }, { y: 0 }, 0.38);
});
</script>
<style lang="scss" scoped>
@use "@/assets/sass/variables" as *; // Import variables


.footer-container {

   
   
   .footer {
 

   }
   


   .top-container {

   }

   .socials {

   }

   
   
   .bottom-container {


   }

}
@media (max-width: 800px) {
   
   .footer-container {
      background-color: $bg-white;
      width: 100%;
      height: fit-content;
  
      margin-inline: auto;
      // padding-top: 4rem;
      // border: solid yellow;
      overflow: hidden;
      
      
      .contact {
        height: 16rem;
        // border: solid;
        background-color: $bg-offwhite;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        align-items: center;
        justify-content: center;
        color: $text-dark;
        .getintouch {
          font-size: 16px;
        color: $text-dark;
        font-weight: 700;

        }
        .contact-days {
          font-size: 14px;
          color: $text-dark;
        }
        .contact-add {
          display: flex;
          gap: 5px;
          font-size: 14px;
          color: $text-dark;
          a {
            color: $text-dark;
            text-decoration: none;
          }
          span {
            color: $text-accent;
            // text-decoration: none !important;
            // -webkit-text-fill-color: $text-accent; // Ensures override in Safari


          }

        }
        :nth-child(4) {
          margin-top:1.5rem;
        }

      }
      .newsletter {
        height: 13rem;
        background-color: $bg-cream;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        // align-items: center;
        justify-content: center;
        color: $text-dark;
        padding-inline: 1rem;

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            font-size: 14px;
          }

        }

        form {
                  display: flex;
                  flex-direction: column;
                  h2 {
                  font-size: 20px;


                  }
                  p {
                    color: $text-dark;
                    font-size: 14px;
  
                      
                      
                  }
                  label {
                    color: $text-dark;
                    font-size: 16px;
  
                  }
                  .input-container {
                      // border: solid blue;
                      position: relative;
                      width: 100%;
                      display: flex;
                      align-items: center;
                      height: fit-content;
  
                      input {
                          // font-size: 20px;
                          background-color: $bg-white;
                          width: 100%;
                          border: none;
                          padding: 10px 45px 10px 15px; /* Left padding normal, Right padding for button */
  
                          font-size: 16px;
                          outline: none;
                          height: 45px;
                          color: $text-dark;
                          // border: solid green;
                          // position: relative;
  
                      }
                      button {
                          background-color: $bg-white;
                          border: none;
                          // border: solid red;
                          position: absolute;
                          right: 0;
                          top: 0;
                          height: fit-content;
                          height: 100%;
  
  
                          svg {
                              fill: $text-dark;
                              // border: solid red;
                          background-color: $bg-white;
                          rotate: 180deg;
                          height: 18px;
                          width: 18px;
                          // border: solid blue;
                          // position: absolute;
                          // right: 0;
  
  
                          }
  
                      }
                  }
              }

      }
      .footer {
          // border: solid red;
          padding-top: 2.5rem;
          height: fit-content;
   padding-inline: 0rem;
          width: 100%;
          background-color: $bg-white;
          color: $text-dark;
          display: flex;
          flex-direction: column;

  
          
  
  
      }
      
   
  
      .top-container {
        padding-inline: 1rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 3rem;
        // column-gap: 3rem;
        // border: solid;
        padding-bottom: 3rem;


        div {
          // border: solid;
          // width: 50%;
          font-size: 15px;

          h2 {
            font-size: 18px;
            margin-bottom: 10px;
          }

          ul {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }
        }

  

      }
      .socials {
        display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding-inline: 1rem;
    border-bottom: 1px solid $line-grey;
    // padding-bottom: 1rem;
    // border: solid red;
    padding-bottom: 1rem;

    svg {
      fill: $text-dark;
    }

      }
  
      
      
      .bottom-container {
        // border: solid blue;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;

        ul {
          display: flex;
          gap: 1rem;
          justify-content: center;

          li {
            font-size: 14px;
          }
        }

      }
  
  }
}
@media screen and (max-height: 500px) {
   .footer-container {
       .footer {
       height: 46rem;
   }

}
}
</style>



