<template>
  <v-dialog v-model="showDialog" max-width="600">
    <v-card prepend-icon="mdi-domain-plus" title="Agregar nueva área">
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <label for="new-area-input">Nombre del área</label>
            <v-text-field
              id="new-area-input"
              v-model="newArea"
              placeholder="Ej. Dirección de sistemas"
              :rules="[required]"
              outlined
              dense
              @keydown.enter="createNewArea"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          class="btn-base"
          text="Cerrar"
          variant="plain"
          @click="showDialog = false"
        ></v-btn>

        <v-btn
          class="btn-base"
          color="primary"
          text="Agegar"
          variant="tonal"
          :disabled="loadingCreateArea === LoadingStates.LOADING"
          :loading="loadingCreateArea === LoadingStates.LOADING"
          @click="createNewArea"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { LoadingState, LoadingStates } from '@/types';
import { createArea } from '@/api/electron';
import { computed, ref } from 'vue';
import { useToasts } from '@/composables/useToasts';
import { Area, Response } from '@/api/interfaces';

const { error, success } = useToasts();
const emits = defineEmits(['update:createAreaDialog']);

const props = defineProps<{
  createAreaDialog: boolean;
}>();

const showDialog = computed({
  get: () => props.createAreaDialog,
  set: (value: boolean) => emits('update:createAreaDialog', value),
});

const loadingCreateArea = ref<LoadingState>(LoadingStates.IDLE);
const newArea = ref<string | null>(null);

const required = (value: string) => !!value || 'Este campo es requerido';

const createNewArea = () => {
  loadingCreateArea.value = LoadingStates.LOADING;
  createArea({ nombre: newArea.value ?? '' }, (response: Response<Area>) => {
    if (!response.success) error(response.message);
    success(response.message);
    loadingCreateArea.value = LoadingStates.IDLE;
    showDialog.value = false;
    newArea.value = null;
  })
};
</script>

<style scoped>

</style>