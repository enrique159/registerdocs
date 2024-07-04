<template>
  <div class="home-view">
    <documents-table />
  </div>
</template>

<script setup lang="ts">
import DocumentsTable from './components/DocumentsTable.vue'
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 0 1.8rem 1.8rem;
  overflow-y: auto;
}
</style>