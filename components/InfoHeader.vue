<template>
    <div class="presection">
      <div class="section1">
        <div class="info">
          <div class="text">
            <p>New: Featured Collection</p>
            <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
      
          </div>
      
        </div>
      </div>
    </div>

  </template>
  
  <script setup>

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
        background-color: $bg-secondary; /* Solid black background */





    }
}

@media (max-width: 800px) {
    .presection {
      position: sticky;
      top: 0;
      z-index: 200;
      padding-top: 1px;
      background-color: $bg-white;
    //   border-bottom: 1px solid $line-grey;
        .section1 {
            width: 100%;
            .info {
  height: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    
    p {
      color: $text-muted;
      font-size: 14px;
      font-weight: 300;

    }
    svg {
      fill: $text-muted;
      rotate: 180deg;
      width: 18px;
      height: 18px;

    }
  }

}

        }
    }
}

</style>

