// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["@/assets/sass/main.scss"],
  build: {
    transpile: ["gsap"], // Ensure GSAP is transpiled correctly

  },
  vite: {
    define: {
      "window.global": {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
  ],
  imports: {
    autoImport: true,
  },
  image: {
    domains: [
      "wmhpulllzyarvfatyfuw.supabase.co", // Supabase storage
      "naijahaven-strapi.onrender.com"    // Your Strapi backend
    ],
    provider: "ipx", // Ensures Nuxt optimizes images
  },
  // app: {
  //   head: {
  //     link: [
  //       { rel: "preload", href: "/ori-olokun.png", as: "image", type: "image/png" },
  //       { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap", as: "style" },
  //     ],
  //   },
  // },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in', },
    head: {
      link: [
        { rel: "preload", href: "@/assets/sass/main.css", as: "style" }
      ]
    }
  },
  
})





