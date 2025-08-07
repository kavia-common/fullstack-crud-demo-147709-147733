<script setup lang="ts">
import { ref } from "vue";
import { RouterView, RouterLink } from "vue-router";

// Snackbar state
const snackbarVisible = ref(false);

// PUBLIC_INTERFACE
function showSnackbar() {
  snackbarVisible.value = false; // hide first if double clicked
  // Show snackbar for a short period
  setTimeout(() => {
    snackbarVisible.value = true;
    setTimeout(() => {
      snackbarVisible.value = false;
    }, 2200);
  }, 1);
}
</script>

<template>
  <div class="app-shell">
    <nav class="top-bar">
      <div class="logo-section">
        <span class="brand">Sample CRUD</span>
      </div>
      <div class="nav-links">
        <RouterLink to="/" active-class="active" class="nav-btn">Home</RouterLink>
        <RouterLink to="/about" class="nav-btn">About</RouterLink>
        <button class="contact-btn" @click="showSnackbar" aria-label="Contact me">
          Contact me
        </button>
      </div>
    </nav>
    <div class="container-main">
      <main class="main-area">
        <RouterView />
      </main>
    </div>
    <!-- Snackbar/Notification -->
    <transition name="snackbar">
      <div v-if="snackbarVisible" class="snackbar">
        thanks for contacting. Under development
      </div>
    </transition>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f6f9fb;
  display: flex;
  flex-direction: column;
}
.top-bar {
  display: flex;
  align-items: center;
  background: #1976d2;
  color: #fff;
  padding: 0.8em 1.7em;
  min-height: 57px;
  box-shadow: 0 2px 10px #2221;
  position: sticky;
  z-index: 9;
  top: 0;
}
.logo-section {
  font-size: 1.30em;
  font-weight: bold;
  letter-spacing: 0.1em;
  flex: 1;
}
.brand { color: #fff; }
.nav-links {
  display: flex;
  gap: 18px;
  align-items: center;
}
.nav-btn {
  color: #ffffffcc;
  text-decoration: none;
  font-weight: 500;
  font-size: 1em;
  padding: 6px 16px;
  border-radius: 4px;
  transition: background 0.16s, color 0.18s;
}
.nav-btn.active, .nav-btn:active, .nav-btn.router-link-exact-active {
  background: #fff;
  color: #1976d2;
}
.nav-btn:hover {
  background: #1567ba;
  color: #fff;
}

/* Contact button (top right) consistent with color scheme */
.contact-btn {
  color: #fff;
  background: #ff4081;
  border: none;
  font-weight: 600;
  font-size: 1em;
  padding: 6px 20px;
  border-radius: 4px;
  box-shadow: 0 1px 8px #ff40811d;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.18s, color 0.18s;
}
.contact-btn:hover, .contact-btn:focus {
  background: #d91b67;
  outline: none;
}

.container-main {
  flex: 1 1 auto;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
.main-area {
  min-height: 85vh;
  padding: 0px 13px;
}
@media (max-width: 650px) {
  .container-main {
    max-width: 100vw;
    width: 100vw;
    padding: 0;
  }
  .main-area {
    padding: 0 2px;
  }
  .top-bar { flex-direction: column; align-items: flex-start; padding: 0.65em 0.27em;}
  .logo-section { margin-bottom: 0.5em;}
}

/* Snackbar (notification toast) */
.snackbar {
  position: fixed;
  z-index: 1000;
  min-width: 260px;
  max-width: 88vw;
  right: 30px;
  top: 18px;
  background: #333e;
  color: #fff;
  box-shadow: 0 4px 24px #0001, 0 1.5px 6px #0002;
  padding: 15px 32px;
  border-radius: 22px;
  font-size: 1.07em;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-align: left;
  opacity: 0.98;
  pointer-events: none;
  transition: background 0.16s;
}
.snackbar {
  /* Animations via transition group */
}

.snackbar-enter-from, .snackbar-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.98);
}
.snackbar-enter-to, .snackbar-leave-from {
  opacity: 0.98;
  transform: translateY(0) scale(1);
}
.snackbar-enter-active, .snackbar-leave-active {
  transition: opacity 0.24s cubic-bezier(.4,0,.2,1), transform 0.24s cubic-bezier(.4,0,.2,1);
}

@media (max-width: 650px) {
  .snackbar {
    left: 50%;
    right: auto;
    top: unset;
    bottom: 27px;
    transform: translateX(-50%);
    padding: 13px 20px;
    font-size: 1em;
  }
}
</style>
