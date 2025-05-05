// composables/useToggle.js
export const useToggle = () => {
    const isMenuOpen = useState('isMenuOpen', () => false);
  
    // Toggle function
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
  
    // Function to close the menu
    const closeMenu = () => {
      isMenuOpen.value = false;
    };
  
    return { isMenuOpen, toggleMenu, closeMenu };
  };