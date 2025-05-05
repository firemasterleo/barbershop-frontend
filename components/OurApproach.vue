<template>
    <div class="sectioncontainer">
      <div class="section">
        <h1>Our approach.</h1>
        <hr class="divider">
        <div class="top">
            <div class="section-left">
              <p> Tailored Solutions: <br>Designed for Your Needs </p>
             
            </div>
            <div class="right-section">
              <p>Every brand is unique, and we approach each project with a fresh perspective, ensuring your website stands out in a way that’s authentic to you.</p>
       
    
            </div>
            
        </div>
        <hr class="divider">
        <div class="bottom">
            <div class="section-left">
              <p>Modern & Lightweight
                </p>
             
            </div>
            <div class="right-section">
              <p>We embrace cutting-edge web technologies to create websites that are fast, responsive, and optimized for efficiency. Your website won’t just look great; it will perform flawlessly.</p>
       
    
            </div>
            
        </div>
        <hr class="divider">
        <div class="bottom">
            <div class="section-left">
              <p>A Relationship Beyond Launch
                </p>
             
            </div>
            <div class="right-section">
              <p>Our collaboration doesn’t end when the website goes live. We offer continued support, updates, and optimizations to help your business thrive online.</p>
       
    
            </div>
            
        </div>

  
      </div>
    </div>
  </template>
  

<script script setup>

</script>

<style lang="scss" scoped>
@use "@/assets/sass/variables" as *; // Import variables
.sectioncontainer {
  background-color: rgb(70, 96, 181); /* Solid black background */
  width: 100%;
  height: 50rem; /* Large enough to allow scrolling */
  // height: 46rem; /* Large enough to allow scrolling */

display: flex;
// border: solid red;
.divider {
    background-color: $textcolorblack;
}


  .section {
  background-color: $primarycolorwhite; /* Solid black background */
    width: 80rem;
    height: 100%; /* Full viewport height */
    margin-inline: auto;
    // border: solid green;
    display: flex;
    gap: 1rem;

    flex-direction: column;
    padding-inline: 2.5rem;
    // border-top: 1px solid white ;
    padding-top: 6.5rem;
    position: relative;

    h1 {
      font-size: 56px;
      font-weight: 400;
      margin-bottom: 5.5rem;
    }


    .top {
        display: flex;

        .section-left {
          width: 50%;
          // border: solid red;
          display: flex;
    
          
          p {
            color: $textcolorblack;
            font-size: 18px;
    
          }
          }
          .right-section {
          width: 50%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          // border: solid red;
          // padding-right: 0.5rem;
    
    
            p {
              color: $textcolorblack;
            font-size: 18px;
            width: 60%;
            line-height: 22px;
    
              
            }
          }
    }
    .bottom {
        display: flex;

        .section-left {
          width: 50%;
          // border: solid red;
          display: flex;
    
          
          p {
            color: $textcolorblack;
            font-size: 18px;
    
          }
          }
          .right-section {
          width: 50%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          // border: solid red;
          // padding-right: 0.5rem;
    
    
            p {
              color: $textcolorblack;
            font-size: 18px;
            width: 60%;
            line-height: 22px;
    
              
            }
          }
    }



  }
}



@media (max-width: 800px) {
  .sectioncontainer {
  // height: 46rem; /* Large enough to allow scrolling */
  height: 75vh; /* Large enough to allow scrolling */
  
  


    .section {
      width: 100vw;
      height: 100%;
      padding-bottom: 2.5rem;
      padding-inline: 0.5rem;
    padding-top: 2rem;


      h1 {
        font-size: 32px;
        // border: solid red;
        margin-bottom: 2rem;
        font-weight: 500;
      }

      .top {

        // border: solid red;
          .section-left {
            display: block;
    
            p {
            font-size: 14px;
    
            }
          }
          .right-section {
    
            p {
            font-size: 15px;
            font-weight: 300;
            width: 100%;
            line-height: 20px;
        word-spacing: -1px;



    
    
    
            }
          }
      }

      .bottom {

          .section-left {
            display: block;
    
            p {
            font-size: 14px;
    
            }
          }
          .right-section {
    
            p {
            font-size: 15px;
            font-weight: 300;

            width: 100%;
            line-height: 20px;
    
    
    
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
@media (max-height: 500px) {
 .sectioncontainer {
  height: 46rem;
 }
 }
</style>