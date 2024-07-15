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
            placeholder="Nombre"
            variant="solo"
            hide-details
            density="compact"
            class="custom-input"
          />
        </v-col>
        <!-- REFRESH TABLE -->
        <v-col cols="9" md="8" class="d-flex justify-end">
          <v-tooltip text="Recargar áreas" location="left">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="dark"
                icon
                variant="flat"
                @click="refreshAreas"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </template>
    <v-data-table
      :headers="headers"
      :items="areas"
      :search="search"
      :items-per-page="10"
      :items-per-page-text="'Cantidad de filas por página'"
      :items-per-page-options="itemsPerPageOptions"
      :loading="loadingState === LoadingStates.LOADING"
      density="comfortable"
      hover
    >
      <template #no-data>
        <v-alert :value="true" color="error" icon="mdi-alert">
          No se encontraron áreas
        </v-alert>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex justify-end">
          <v-tooltip text="Editar" location="left">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon variant="plain" color="primary" size="small" @click.stop="openCreateAreaDialog(item)">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Eliminar" location="left">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon variant="plain" color="red" size="small" @click.stop="showDeleteModal(item)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="createAreaDialog" max-width="500">
      <UpdateArea :area="selectedArea" @update-area="updatedArea" @cancel="createAreaDialog = false" />
    </v-dialog>

    <v-dialog v-model="deleteAreaModal" max-width="400">
      <v-card>
        <v-card-title class="tc-text-dark tw-bold">Eliminar área</v-card-title>
        <v-card-text class="tc-text-dark">
          ¿Estás seguro de que deseas eliminar el área?
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-base" color="primary" text @click="deleteAreaModal = false">Cancelar</v-btn>
          <v-btn class="btn-base" color="red" text @click="confirmDeleteArea">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import UpdateArea from './UpdateArea.vue';
import { 
  AREAS_TABLE_HEADERS as headers,
  AREAS_TABLE_ITEMS_PER_PAGE_OPTIONS as itemsPerPageOptions
} from '@/constants/areasTable.constants';
import { onBeforeMount, ref } from 'vue'
import { getAreas, deleteArea } from '@/api/electron';
import { LoadingState, LoadingStates } from '@/types';
import { Area, Response } from '@/api/interfaces';

const search = ref('')
const loadingState = ref<LoadingState>(LoadingStates.IDLE)

const areas = ref<Area[]>([])

onBeforeMount(async () => {
  loadingState.value = LoadingStates.LOADING
  await getAreas((response: Response<Area[]>) => {
    if (response.success) {
      areas.value = response.response
      loadingState.value = LoadingStates.SUCCESS
    } else {
      loadingState.value = LoadingStates.ERROR
    }
  })
})


// Create Area
const createAreaDialog = ref(false)
const selectedArea = ref<Area | null>(null)

const openCreateAreaDialog = (area: Area) => {
  selectedArea.value = area
  createAreaDialog.value = true
}

const updatedArea = (area: Area) => {
  console.log("que llega",area)
  const index = areas.value.findIndex((a) => a.id === area.id)
  areas.value[index] = area
  createAreaDialog.value = false
}

const refreshAreas = async () => {
  loadingState.value = LoadingStates.LOADING
  await getAreas((response: Response<Area[]>) => {
    if (response.success) {
      areas.value = response.response
      loadingState.value = LoadingStates.SUCCESS
    } else {
      loadingState.value = LoadingStates.ERROR
    }
  })
}


// Delete Area
const deleteAreaModal = ref(false)
const selectedAreaToDelete = ref<Area | null>(null)

const showDeleteModal = (area: Area) => {
  selectedAreaToDelete.value = area
  deleteAreaModal.value = true
}

const confirmDeleteArea = () => {
  if (!selectedAreaToDelete.value) return;

  deleteArea(selectedAreaToDelete.value.id || '', (response: Response<null>) => {
    if (!response.success) {
      console.log("error",response.message)
      return
    }
    areas.value = areas.value.filter((register: Area) => register.id !== selectedAreaToDelete.value?.id)
    deleteAreaModal.value = false
  });
}
</script>

<style lang="scss"scoped>
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

.v-table {
  background: none;
}
</style>