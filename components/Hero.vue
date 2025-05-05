<template>
    <div class="sectioncontainer">
      <div class="section">
        <div class="image">
<img :src="imageStore.heroImage" loading="eager" decoding="async" />
<!-- <img src="../assets/tradartifacts.jpg" alt=""> -->


        </div>
  <div class="hero-text">

    <div>
      <h1>
        Authentic African Artistry

      </h1>
    </div>
    <p>Celebrating authentic, handcrafted African art—each piece rich with culture, heritage, and timeless craftsmanship.</p>
    <button>SHOP NEW ARRIVALS</button>

  </div>
      </div>
    </div>
  </template>
  

<script script setup>

import { useImageStore } from '../stores/imageStore';

const imageStore = useImageStore();

</script>

<style lang="scss" scoped>
    @use "@/assets/sass/variables" as *; // Import variables

.sectioncontainer {
  // background-color: rgb(70, 96, 181); /* Solid black background */
  width: 100%;
  // height: 100vh; /* Large enough to allow scrolling */
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
    .section {
      width: 100vw;
      height:80vh;
      // border: solid green;
      overflow: hidden;
      // display: block;

      .image {
    width: 90vw;
    height: 48vh;
    // border: solid red;
    overflow: hidden;
    margin-inline: auto;
    display: flex;
    justify-content: center;

            img {
                width: 100vw;
                // width: 100%;
                // margin-inline: auto;
                height: auto;
                object-fit: cover;
                // border: solid blue;
                // transform: translateX(-30px);
            }
        }
        .hero-text {
          margin: auto;
          padding-top: 1rem;
          display: flex;
          gap: 1.5rem;
          flex-direction: column;
          align-items: center;
          color: $text-dark;
          h1 {
            font-size: 24px;
                // border: solid blue;


          }

          p {
            width: 80%;
            font-size: 14px;
            text-align: center;
                // border: solid blue;

          }
          button {
            height: 3rem;
            font-size: 16px;
            font-weight: 600;
            word-spacing: 3px;
            letter-spacing: 1px;
            padding-inline: 1.5rem;
            background-color: $bg-secondary;
            color: $text-muted;
            border: none;
            border-radius: 0.5rem;
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