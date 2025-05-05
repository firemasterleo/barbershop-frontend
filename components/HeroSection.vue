<template>
  <div class="sectioncontainer">
    <div class="section">
<div class="shape">
        <h1 class="s">S</h1>
          <h1 class="h">h</h1>
          <h1 class="a">a</h1>
          <h1 class="p">p</h1>
          <h1 class="e">e</h1>
          <h1  class="s2">s</h1>
          <h1 class="t">t</h1>
          <h1  class="a2">a</h1>
          <h1  class="t2">t</h1>
          <h1 class="i">i</h1>
          <h1 class="o">o</h1>
          <h1 class="n">n</h1>
      </div>
      <div class="hero-text">
        <div>
          <p>Crafting Tommorrow's Experiences Today.</p>
        </div>
        <div>
          <p>Elevating Brands, One Script at a Time</p>
        </div>
        <div>
<svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>

        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use "@/assets/sass/variables" as *; // Import variables


.sectioncontainer {
// background-color: rgb(70, 96, 181); /* Solid black background */
width: 100%;
height: 82vh;
display: flex;
// border: solid red;
overflow: hidden;


.section {
background-color: $primarycolorblack; /* Solid black background */
// background-color: white;
  width: 80rem;
  height: 100%; /* Full viewport height */
  margin-inline: auto;
  // border: solid blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  padding-inline: 2rem;


  .shape {
      // border: solid blue;
      display: flex;
      align-items: center;
      margin-inline: auto;
      overflow: hidden;
      // border: solid red;
      

      
      h1 {
        font-size: clamp(5rem, 13vw, 10rem); /* Min 5rem, scales with viewport width, max 10em */

        // font-size: 180px;
        line-height: 1;
        padding-bottom: 1.5rem;

        color: $textcolorwhite;
        text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.1);
        // border: solid red;
  transform: translateY(-30vh); /* Start off-screen */


      }
      .s  { animation: slideInLargeScreen 0.9s ease-out forwards; animation-delay: 0s; }
      .h  { animation: slideInLargeScreen 0.95s ease-out forwards; animation-delay: 0.1s; }
      .a  { animation: slideInLargeScreen 0.98s ease-out forwards; animation-delay: 0.14s; }
      .p  { animation: slideInLargeScreen 0.98s ease-out forwards; animation-delay: 0.14s; }
      .e  { animation: slideInLargeScreen 0.98s ease-out forwards; animation-delay: 0.18s; }
      .s2 { animation: slideInLargeScreen 1s ease-out forwards; animation-delay: 0.18s; }
      .t  { animation: slideInLargeScreen 1.2s ease-out forwards; animation-delay: 0.22s; }
      .a2 { animation: slideInLargeScreen 1.4s ease-out forwards; animation-delay: 0.24s; }
      .t2 { animation: slideInLargeScreen 1.6s ease-out forwards; animation-delay: 0.26s; }
      .i  { animation: slideInLargeScreen 1.8s ease-out forwards; animation-delay: 0.3s; }
      .o  { animation: slideInLargeScreen 2s ease-out forwards; animation-delay: 0.32s; }
      .n  { animation: slideInLargeScreen 2.2s ease-out forwards; animation-delay: 0.38s; }

    }
    .hero-text {
      display: flex;
      gap: 5rem;
      // padding-inline: 2rem;
      // margin-inline: 2rem;
      position: relative;
      // border: solid green;
      
      div {
        // flex:1;
        // border: solid red;
        // width: fit-content;
        
        p {
          color: $textcolorwhite;
          font-size: 14px;
          max-width: 10rem;
          min-width: 10rem;
          // border: solid blue;

        }
        
      }
      
      div:nth-child(3) {
        // border: solid red;
        width: 7rem;
        display: flex;
        justify-content: right;
        align-items: flex-end;
        position: absolute;
        right: 0;
        svg {
          rotate: 270deg;
          fill: $textcolorwhite;
          // border: solid blue;
          height: 1.4rem;
          width: 1.4rem;

        }
      }
    }
}
}
@keyframes slideInLargeScreen {

to {
  transform: translateY(0);
  // opacity: 1;
}
}


@media (max-width: 800px) {
.sectioncontainer {
  .section {
    width: 100vw;
    height: 100%;
    // border: solid red;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-inline: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;

    .shape {
      // border: solid blue;
      display: flex;
      align-items: center;
      width: fit-content;
      margin-inline: auto;
      // height: 4.2rem;
      overflow: hidden;
      
      
      h1 {
        // line-height: 5rem;
        font-size: 13vw;
        // border: solid;
        height: fit-content;
        color: $textcolorwhite;
        text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.1);
  transform: translateY(-90px); /* Start off-screen */


      }

      .s  { animation: slideIn 0.9s ease-out forwards; animation-delay: 0s; }
      .h  { animation: slideIn 0.95s ease-out forwards; animation-delay: 0.1s; }
      .a  { animation: slideIn 0.98s ease-out forwards; animation-delay: 0.14s; }
      .p  { animation: slideIn 0.98s ease-out forwards; animation-delay: 0.14s; }
      .e  { animation: slideIn 0.98s ease-out forwards; animation-delay: 0.18s; }
      .s2 { animation: slideIn 1s ease-out forwards; animation-delay: 0.18s; }
      .t  { animation: slideIn 1.2s ease-out forwards; animation-delay: 0.22s; }
      .a2 { animation: slideIn 1.4s ease-out forwards; animation-delay: 0.24s; }
      .t2 { animation: slideIn 1.6s ease-out forwards; animation-delay: 0.26s; }
      .i  { animation: slideIn 1.8s ease-out forwards; animation-delay: 0.3s; }
      .o  { animation: slideIn 2s ease-out forwards; animation-delay: 0.32s; }
      .n  { animation: slideIn 2.2s ease-out forwards; animation-delay: 0.38s; }

    }
    .hero-text {
      display: flex;
      padding-left: 0rem;
      gap: 1rem;
      margin-inline: 0;
      // border: solid blue;

      
      div {
        // flex:1;
        // border: solid red;
        width: fit-content;
        
        p {
          color: $textcolorwhite;
          font-size: 14px;
          width: fit-content;
          // border: solid blue;

        }
        
      }
      
      div:nth-child(3) {
        // border: solid red;
        width: 7rem;
        display: flex;
        justify-content: right;
        align-items: flex-end;
        svg {
          rotate: 270deg;
          fill: $textcolorwhite;
          // border: solid blue;
          height: 1.4rem;
          width: 1.4rem;

        }
      }
    }
  }
}
@keyframes slideIn {

to {
  transform: translateY(0);
  // opacity: 1;
}
}
}
@media (max-width: 1200px) and (min-width: 800px) {
.sectioncontainer {
  width: 100vw;
  .section {
  width: 100vw;



  }
}
}
</style>