import { defineStore } from 'pinia';

export const useImageStore = defineStore('image', {
  state: () => ({
    heroImage: '/tradartifacts.jpg',//IMPORTANT  // Path relative to the public directory for images you want to access directly via URL (for persistence, storage, etc.), 
  }),
  actions: {
    setHeroImage(imageUrl) {
      this.heroImage = imageUrl;
    },
  },
  persist: true,  // Pinia will automatically persist the state to localStorage

});


