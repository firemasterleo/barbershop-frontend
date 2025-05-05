<template>
    <div class="sectioncontainer">
      <div class="section">
        <div class="Featured Collection">
          <div ref="sliderContainer" class="slide">
            <div class="highlight" @mousemove="updateMousePosition" @mouseenter="showVideo" @mouseleave="hideVideo">
              <div class="image">
                <img src="../assets/textile.jpg" alt="">
              </div>
              <div class="text">
                <p>TEXTILE & FABRICS</p>
              </div>
              <!-- <div v-if="isVideoVisible" ref="videoPopup" class="video-popup">
        <video ref="videoElement" src="../assets/shapestationstudio2.mp4" autoplay loop muted></video>
      </div> -->
  
            </div>

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

              <div class="highlight" @mousemove="updateMousePosition" @mouseenter="showVideo" @mouseleave="hideVideo">
              <div class="image">
                <img src="../assets/ori-olokun.jpg" alt="">
              </div >
              <div class="text">
                <p>SCULPTURES & CARVINGS</p>
                
              </div>
              <!-- <div v-if="isVideoVisible" ref="videoPopup" class="video-popup">
                <video ref="videoElement" src="../assets/shapestationstudio2.mp4" autoplay loop muted></video>
              </div> -->
              
            </div>
          </div>
        </div>


  
      </div>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const isVideoVisible = ref(false);
  const videoPopup = ref(null);
  const videoElement = ref(null);
  
  // Current position for smooth movement
  const currentX = ref(0);
  const currentY = ref(0);
  // Target position (where the mouse is)
  const targetX = ref(0);
  const targetY = ref(0);
  
  // Animation frame ID for cleanup
  let animFrameId = null;
  
  // Adjust this value to control lag amount (lower = more lag)
  const lagFactor = 0.05;
  
  const showVideo = (event) => {
  // Set target position first
  targetX.value = event.clientX + 10;
  targetY.value = event.clientY + 10;

  // If first appearance, softly place it near the target instead of snapping
  if (currentX.value === 0 && currentY.value === 0) {
    currentX.value = targetX.value - 40; // Start slightly off
    currentY.value = targetY.value - 40;
  }

  // Prevent the video from appearing instantly by adding a short delay
  setTimeout(() => {
    isVideoVisible.value = true; // Now, show video smoothly

    if (videoPopup.value) {
      videoPopup.value.style.opacity = "0"; // Start invisible
      setTimeout(() => {
        videoPopup.value.style.opacity = "1"; // Fade in smoothly
      }, 50);
    }

    startAnimation();
    setTimeout(() => {
      videoElement.value?.play();
    }, 100);
  }, 10); // Small delay prevents harsh appearance
};

  
  const updateMousePosition = (event) => {
    // Update the target position
    targetX.value = event.clientX + 10;
    targetY.value = event.clientY + 10;
    
    // If this is the first mouse movement, initialize current position
    if (currentX.value === 0 && currentY.value === 0) {
      currentX.value = targetX.value;
      currentY.value = targetY.value;
    }
  };
  
  const animatePosition = () => {
    // Calculate the distance between current and target
    const dx = targetX.value - currentX.value;
    const dy = targetY.value - currentY.value;
    
    // Move current position a percentage of the way to the target
    currentX.value += dx * lagFactor;
    currentY.value += dy * lagFactor;
    
    // Apply the position
    if (videoPopup.value) {
      videoPopup.value.style.left = `${currentX.value}px`;
      videoPopup.value.style.top = `${currentY.value}px`;
    }
    
    // Continue animation
    animFrameId = requestAnimationFrame(animatePosition);
  };
  
  const startAnimation = () => {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(animatePosition);
    }
  };
  
  const stopAnimation = () => {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  };
  
  const hideVideo = () => {
    if (videoElement.value) {
      videoElement.value.pause();
      videoElement.value.currentTime = 0;
    }
    isVideoVisible.value = false;
    stopAnimation();
    
    // Reset positions for next time
    currentX.value = 0;
    currentY.value = 0;
    targetX.value = 0;
    targetY.value = 0;
  };

  const sliderContainer = ref(null);
  
  // Clean up on component unmount
  onUnmounted(() => {
    stopAnimation();
  });



  </script>
  

<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables
    .sectioncontainer {
  background-color: rgb(70, 96, 181); /* Solid black background */
  width: 100%;
  height: fit-content; /* Large enough to allow scrolling */
  display: flex;


  .section {
    background-color: $primarycolorblack; /* Solid black background */
    width: 80rem;
    height: fit-content; /* Full viewport height */
    margin-inline: auto;
    overflow-x: hidden;
    padding-inline: 2.5rem;

    // border: solid red;
    padding-block: 1rem;
    background-color: $bg-white;
          .slide {
        //   height: 30rem;
            // border: solid red;
            width: 100%;
            display: flex;
            flex-wrap: wrap; 
            gap: 1rem;/* Ensures items wrap naturally */
            // grid-auto-flow: row; /* Forces new items onto the next row */
            overflow-x: auto;
            scroll-snap-type: x mandatory; /* Enables smooth snap scrolling */


            
            .highlight {
    
                border-radius: 0.5rem;
                overflow: hidden;
                scroll-snap-align: center; /* Ensures items snap into place */
                // position: relative;
                cursor: pointer;


                
                
                

                .image {
                  // position: absolute;
                    width: 100%;
                    height: 40rem;
                    // background: black;
                    // border: solid red;
                    
                    img {
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      // opacity: 0.8;
                      transition: all 0.5s;


                    }
                    img:hover {
                      // opacity: 0.4;
                      transition: all 0.3s;
                    }
                  }
                  .text {
                    // border: solid red;
                    position: relative;
                    bottom: 4rem;
                    margin-inline: auto;
                    width: fit-content;
                    // border: sol;
                    background-color: $bg-offwhite;
                    p{
                      color: $text-dark;
                      font-weight: 700;
                      letter-spacing: 2px;

                      
                      
                    }
                  }
            }

            
          }
          .slide > :nth-child(1) {
               width: 100%;
           }
           .slide > :nth-child(2) {
               width: calc(50% - 0.5rem);
              //  border: solid red;

                .image {
                  img {
                  //  opacity: 0.5;
                  }
                  

                }

               
           }
           .slide > :nth-child(3) {
               width: calc(50% - 0.5rem);
           }



  }
}
.parent {
  width: 300px;
  text-align: center;
  line-height: 150px;
  font-size: 20px;
  position: relative;
  cursor: pointer;
  
}

.video-popup {
  background: rgb(167, 165, 154);
height: 20rem;
  // border: solid red;
  position: fixed;
  width: 15rem;
  // height: auto;
  pointer-events: none; /* Prevents interaction blocking */
  transform: translate(-50%, -50%);
  z-index: 999;
  transition: opacity 0.15s ease-in-out;
  // position: absolute;
  will-change: transform;

}

.video-popup video {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}


@media (max-width: 800px) {
  .sectioncontainer {
    border-bottom: solid 1px $line-grey;

    .section {
      width: 100vw;
      height: fit-content;
      background-color: $bg-white; /* Solid black background */
      padding-inline: 0.5rem;
  padding-bottom: 4rem;

      // border: solid red;
    //   overflow: auto;
    //   overflow-x: scroll;
    overflow-x: hidden;


      .text {
              display: flex;
              justify-content: space-between;
              padding-block: 0.5rem;

              p {
                color: $textcolorblack;
                font-size: 18px;
                span {
                  
                  svg {
                    fill: $textcolorblack;
                    rotate:130deg;
                // border: solid red;
                position: relative;
                top: 3px;
                height: 18px;
                width: 18px;

                  }
                }
                
              }
          }

          .slide {
          height: 20rem;
            // border: solid red;
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            gap: 2rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory; /* Enables smooth snap scrolling */
            // scroll-padding:80%; /* Ensures snapping centers the second item */
            // justify-content: center; /* Centers the whole flex container */



            
            .highlight {
                flex-shrink: 0;
                // border: solid blue;
                width: 19rem;
                height:19rem;
                // border: solid;
                border-radius: 0.5rem;
                overflow: hidden;
                scroll-snap-align: center; /* Ensures items snap into place */
                // transform: translateX(-92%);



                .image {
                    width: 100%;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: scale-down;
                    }
                }
                .text {
                    // border: solid red;
                    position: relative;
                    bottom: 4rem;
                    height: 3rem;
                    display: flex;
                    align-items: center;
                    border-radius: 0.5rem;
                    margin-inline: auto;
                    width: fit-content;
                    // border: sol;
                    background-color: $bg-offwhite;
                    padding-inline: 1rem;
                    p{
                      color: $text-dark;
                      font-weight: 700;
                      letter-spacing: 2px;
                      font-size: 16px;

                      
                      
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