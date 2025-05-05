import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  if (process.server) return; // Prevents running on the server

  gsap.registerPlugin(ScrollTrigger);

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  };
});