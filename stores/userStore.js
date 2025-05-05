import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

export const useUserStore = defineStore("user", () => {
  const tokenCookie = useCookie("token");
  const userCookie = useCookie("user");

  const token = ref(tokenCookie.value || "");
  const user = ref(null);

  // ✅ Restore user safely from cookie
  watchEffect(() => {
    if (!process.client) return; // ✅ Ensure runs only on client
    try {
      if (userCookie.value && typeof userCookie.value === "string") {
        user.value = JSON.parse(userCookie.value); // ✅ Parse only if valid JSON
      }
    } catch (err) {
      console.error("❌ Invalid user data in cookie:", err);
      userCookie.value = null; // Reset broken cookie
    }
  });

  // 🔄 Fetch user when token is set
  watchEffect(() => {
    if (token.value) {
      fetchUser();
    }
  });

  async function fetchUser() {
    if (!token.value) return;

    try {
      const { data, error } = await useFetch("https://naijahaven-strapi.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      if (error.value) {
        console.error("❌ Fetch user error:", error.value);
        return;
      }

      if (data.value) {
        console.log("✅ User fetched:", data.value);
        user.value = data.value; // ✅ Store in state
        userCookie.value = JSON.stringify(user.value); // ✅ Save to cookie
      }
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  }
  async function register(username, email, password) {
    try {
      const { data, error } = await useFetch("https://naijahaven-strapi.onrender.com/api/auth/local/register", {
        method: "POST",
        body: { username, email, password },
      });
  
      if (error.value) {
        console.error("❌ Full Strapi Error Response:", error.value);
  
        return { error: error.value?.data?.error?.message || "Registration failed" };
      }
  
      if (data.value) {
        console.log("✅ Registration successful:", data.value);
  
        token.value = data.value.jwt;
        user.value = data.value.user;
  
        tokenCookie.value = token.value;
        userCookie.value = JSON.stringify(user.value);
        
        return { error: null };
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      return { error: "An unexpected error occurred" };
    }
  }

  async function login(identifier, password) {
    try {
      const { data, error } = await useFetch("https://naijahaven-strapi.onrender.com/api/auth/local", {
        method: "POST",
        body: { identifier, password },
      });

      if (error.value) {
        console.error("❌ Login error:", error.value);
        return { error };
      }

      if (data.value) {
        console.log("✅ Login successful:", data.value);

        token.value = data.value.jwt;
        user.value = data.value.user;

        tokenCookie.value = token.value;
        userCookie.value = JSON.stringify(user.value);
      }
      return { error };
    } catch (err) {
      console.error("❌ Login error:", err);
    }
  }

  function logout() {
    user.value = null;
    token.value = "";

    tokenCookie.value = null;
    userCookie.value = null;

    if (typeof navigateTo === "function") {
      navigateTo("/login");
    }
  }

  const isAuthenticated = computed(() => !!token.value);

  return { user, token, fetchUser, register, login, logout, isAuthenticated };
});
