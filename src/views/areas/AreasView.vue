<template>
  <div class="areas-view">
    <areas-table />
  </div>
</template>

<script setup lang="ts">
import AreasTable from './components/AreasTable.vue'
</script>

<style lang="scss"scoped>
.areas-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 0;
  overflow-y: auto;
}
</style>