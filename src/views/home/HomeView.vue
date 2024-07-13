<template>
  <div class="home-view">
    <documents-table @open-document-dialog="openDocumentDialog" />
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
    >
      <document-info :document="selectedDocument" @close-document-dialog="closeDocumentDialog" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import DocumentsTable from './components/DocumentsTable.vue'
import DocumentInfo from './components/DocumentInfo.vue'
import { ref } from 'vue'
import { Documento } from '@/api/interfaces';

const dialog = ref(false)
const selectedDocument = ref<Documento | null>(null)

const openDocumentDialog = (document: Documento) => {
  console.log(document)
  selectedDocument.value = document
  dialog.value = true
}

const closeDocumentDialog = () => {
  dialog.value = false
}
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 0;
  overflow-y: auto;
}
</style>