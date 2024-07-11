<template>
  <div class="setup-view">
    <div class="logo">
      <p>_registerdocs</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.setup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $color-background;

  .setup-card {
    border-radius: 1rem;
    box-shadow: 0 4px 12px 2px rgba(0, 0, 0, 0.05);
  }

  .logo {
    position: absolute;
    top: 2rem;
  }
}
</style>
