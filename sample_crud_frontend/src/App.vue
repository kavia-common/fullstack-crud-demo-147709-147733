<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
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
      </div>
    </nav>
    <div class="container-main">
      <main class="main-area">
        <RouterView />
      </main>
    </div>
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
</style>
