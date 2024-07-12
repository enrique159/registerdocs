<template>
  <v-card class="bg-white-1" flat style="overflow-y: auto">
    <template #text>
      <div class="d-flex justify-space-between align-center ga-4">
        <v-text-field
          v-model="search"
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          density="compact"
          class="custom-input max-w-256-px"
        />
      </div>
    </template>
    <v-data-table
      :headers="headers"
      :items="registers"
      :search="search"
      :items-per-page="5"
      :items-per-page-text="'Cantidad de registros por página'"
      :items-per-page-options="itemsPerPageOptions"
    >
      <template #item.fecha="{ item }">
        <span>{{ moment(item.fecha).tz('America/Mazatlan').format('DD/MM/YYYY') }}</span>
      </template>
      <template #item.documento="{ item }">
        <v-tooltip text="Abrir documento" location="left">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon variant="plain" color="primary" @click="openDocumentSelected({ documentRoute: item.documento })">
              <v-icon>mdi-file-document</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Abrir carpeta" location="left">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon variant="plain" color="warning" @click="openDocumentSelected({ documentRoute: item.documento, openFolder: true })">
              <v-icon>mdi-folder</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { getDocuments, openDocument } from '@/api/electron';
import { Documento, Response } from '@/api/interfaces';
import moment from 'moment-timezone';
import {
  DOCUMENT_TABLE_HEADERS as headers,
  DOCUMENT_TABLE_ITEMS_PER_PAGE_OPTIONS as itemsPerPageOptions
} from '@/constants/documentTable.constants';

const search = ref('')
const documentRegisters = ref<Documento[]>([])
const registers = computed(() => {
  return documentRegisters.value.map((register: Documento) => {
    return {
      ...register,
    }
  }).sort((a, b) => {
    return moment(a.fecha).isBefore(b.fecha) ? 1 : -1
  })
})


onBeforeMount(() => {
  getDocuments((response: Response<Documento[]>) => {
    if (response.success) {
      documentRegisters.value = response.response
    }
  });
})

const openDocumentSelected = (params: { documentRoute: string, openFolder?: boolean}) => {
  openDocument(params, (response: Response<boolean>) => {
    if (response.success) {
      console.log('Documento abierto')
    }
  });
}
</script>

<style lang="scss" scoped>
.custom-input :deep(.v-field) {
  border-radius: 12px;
}
</style>