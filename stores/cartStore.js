import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  getters: {
    totalItems: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    uniqueItemsCount: (state) => state.cart.length,

  },
  actions: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.cart = [];
    },
        // ✅ Increase quantity of an item
        increaseQuantity(productId) {
            const item = this.cart.find((item) => item.id === productId);
            if (item) {
              item.quantity += 1;
            }
          },
      
          // ✅ Decrease quantity of an item, remove if quantity reaches 0
          decreaseQuantity(productId) {
            const item = this.cart.find((item) => item.id === productId);
            if (item) {
              if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                this.removeFromCart(productId);
              }
            }
          },
  },
  persist: true,
});
