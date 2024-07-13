<template>
  <v-card class="bg-white-1 h-100 px-7 pb-7" flat style="overflow-y: auto">
    <template #text>
      <v-row>
        <!-- SEARCH BAR -->
        <v-col cols="3" md="4">
          <label class="ml-2 ts-b5 tc-text-light">Buscar</label>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            placeholder="No. Oficio, enviado por, cargo, etc."
            variant="solo"
            hide-details
            density="compact"
            class="custom-input"
          />
        </v-col>

        <!-- AREA FILTER -->
        <v-col cols="3" md="4">
          <label class="ml-2 ts-b5 tc-text-light">Áreas</label>
          <v-select
            v-model="filteredAreas"
            :items="areas"
            class="custom-select"
            item-title="nombre"
            item-value="id"
            variant="solo"
            density="compact"
            multiple
            hide-details
          ></v-select>
        </v-col>

        <!-- DATE RANGE PICKER -->
        <v-col cols="3" md="2">
          <label class="ml-2 ts-b5 tc-text-light">Fecha desde</label>
          <date-picker
            v-model="dateRangeStart"
            locale="es"
            id="date-input-start"
            class="custom-date-picker"
            cancel-text="cancelar"
            select-text="seleccionar"
            :format="formatDate"
            :enable-time-picker="false"
            :month-change-on-arrows="true"
            time-picker-inline
            text-input
          >
            <template #am-pm-button="{ toggle, value }">
              <button @click="toggle">
                {{ value }}
              </button>
            </template>
          </date-picker>
        </v-col>

        <v-col cols="3" md="2">
          <label class="ml-2 ts-b5 tc-text-light">Fecha hasta</label>
          <date-picker
            v-model="dateRangeEnd"
            locale="es"
            id="date-input-end"
            class="custom-date-picker"
            cancel-text="cancelar"
            select-text="seleccionar"
            :format="formatDate"
            :enable-time-picker="false"
            :month-change-on-arrows="true"
            time-picker-inline
            text-input
          >
            <template #am-pm-button="{ toggle, value }">
              <button @click="toggle">
                {{ value }}
              </button>
            </template>
          </date-picker>
        </v-col>
      </v-row>
    </template>
    <v-data-table
      :headers="headers"
      :items="registers"
      :search="search"
      :items-per-page="10"
      :items-per-page-text="'Cantidad de registros por página'"
      :items-per-page-options="itemsPerPageOptions"
      :loading="loadingState === LoadingStates.LOADING"
      density="comfortable"
      hover
    >
      <template #item.fecha="{ item }">
        <span>{{ moment(item.fecha).tz('America/Mazatlan').format('DD/MM/YYYY') }}</span>
      </template>
      <template #item.documento="{ item }">
        <div class="d-flex flex-nowrap align-center">
          <v-tooltip text="Abrir documento" location="left">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon variant="plain" color="primary" size="small" @click="openDocumentSelected({ documentRoute: item.documento })">
                <v-icon>mdi-file-document</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Abrir carpeta" location="left">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon variant="plain" color="warning" size="small" @click="openDocumentSelected({ documentRoute: item.documento, openFolder: true })">
                <v-icon>mdi-folder</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </template>

      <template #item.actions="{ item }">
        <v-tooltip text="ver más" location="left">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon variant="plain" color="purple" size="small" @click="emits('open-document-dialog', item)">
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>

      <template #loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import {
  DOCUMENT_TABLE_HEADERS as headers,
  DOCUMENT_TABLE_ITEMS_PER_PAGE_OPTIONS as itemsPerPageOptions
} from '@/constants/documentTable.constants';
import { onBeforeMount, ref, computed } from 'vue'
import { getDocuments, openDocument, getAreas } from '@/api/electron';
import { Area, Documento, Response } from '@/api/interfaces';
import { LoadingState, LoadingStates } from '@/types';
import { useToasts } from '@/composables/useToasts';
import { useFormat } from '@/composables/useFormat';
import moment from 'moment-timezone';

const emits = defineEmits(['open-document-dialog'])

const loadingState = ref<LoadingState>(LoadingStates.IDLE)
const { error } = useToasts()
const { formatDate } = useFormat()

// Data
const documentRegisters = ref<Documento[]>([])
const areas = ref<Area[]>([])

// Filtering
const search = ref<string>('')
const dateRangeStart = ref<Date | null>(null)
const dateRangeEnd = ref<Date | null>(null)
const filteredAreas = ref<string[]>([])


// Document Registers filtered
const registers = computed(() => {
  if (!documentRegisters.value.length) return [];;

  // Preparar fechas de inicio y fin fuera del bucle para optimizar
  const start = dateRangeStart.value ? moment(dateRangeStart.value) : moment('01/01/1900', 'DD/MM/YYYY');
  const end = dateRangeEnd.value ? moment(dateRangeEnd.value) : moment('01/01/2100', 'DD/MM/YYYY');

  let filteredRegisters = documentRegisters.value.filter((register: Documento) => {
    // Filtrar por rango de fechas si se especifican
    const date = moment(register.fecha);
    const isInDateRange = !dateRangeStart.value && !dateRangeEnd.value || date.isBetween(start, end, 'day', '[]');

    // Filtrar por áreas si se especifican
    const isInFilteredAreas = !filteredAreas.value.length || filteredAreas.value.some((area_id: string) => area_id === register.area_id);

    return isInDateRange && isInFilteredAreas;
  });

  // Ordenar una vez después de todos los filtrados
  filteredRegisters.sort((a, b) => moment(a.fecha).isBefore(b.fecha) ? 1 : -1);

  return filteredRegisters;
})


onBeforeMount(() => {
  loadingState.value = LoadingStates.LOADING
  getDocuments((response: Response<Documento[]>) => {
    if (!response.success) error(response.message)

    documentRegisters.value = response.response
    loadingState.value = LoadingStates.IDLE
  });
  getAreas((response: Response<Area[]>) => {
    if (!response.success) error(response.message)

    areas.value = response.response.sort((a, b) => a.nombre.localeCompare(b.nombre))
  });
})

const openDocumentSelected = (params: { documentRoute: string, openFolder?: boolean}) => {
  openDocument(params, (response: Response<boolean>) => {
    if (!response.success) error(response.message)
  });
}
</script>

<style lang="scss" scoped>
.custom-input :deep(.v-field) {
  border-radius: 12px;
  background: $color-white-0;
  border: none;
  box-shadow: $box-shadow-1;
  transition: $transition-fast;
  input {
    font-size: $b4-size;
  }
}

.custom-input :deep(.v-field:focus-within) {
  box-shadow: $box-shadow-2;
}

.custom-select :deep(.v-field) {
  border-radius: 12px;
  background: $color-white-0;
  border: none;
  box-shadow: $box-shadow-1;
  transition: $transition-fast;
  input {
    font-size: $b4-size;
  }
}



.v-table {
  background: none;
}

.custom-date-picker :deep(.dp__input) {
  border-radius: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: $color-white-0;
  font-size: $b4-size;
  box-shadow: $box-shadow-1;
  transition: $transition-fast;
  &:focus {
    box-shadow: $box-shadow-2;
  }
}
</style>