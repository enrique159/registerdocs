<template>
  <v-card prepend-icon="mdi-domain" title="Editar área">
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <label for="update-area-input">Nombre del área</label>
          <v-text-field
            id="update-area-input"
            v-model="editArea.nombre"
            placeholder="Ej. Dirección de sistemas"
            :rules="[required]"
            outlined
            dense
            @keydown.enter="updateSelectedArea"
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
        @click="cancel"
      ></v-btn>

      <v-btn
        class="btn-base"
        color="purple"
        text="Editar"
        variant="tonal"
        :disabled="loadingUpdateArea === LoadingStates.LOADING"
        :loading="loadingUpdateArea === LoadingStates.LOADING"
        @click="updateSelectedArea"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { LoadingState, LoadingStates } from '@/types';
import { updateArea } from '@/api/electron';
import { onBeforeMount, ref } from 'vue';
import { useToasts } from '@/composables/useToasts';
import { Area, Response } from '@/api/interfaces';

const { error, success } = useToasts();
const loadingUpdateArea = ref<LoadingState>(LoadingStates.IDLE);
const editArea = ref<Area>({
  id: '',
  nombre: ''
});

const props = defineProps<{ area: Area | null }>();
const emits = defineEmits(['cancel','update-area']);

onBeforeMount(() => {
  editArea.value = Object.assign({}, props?.area) ?? null;
});

const required = (value: string) => !!value || 'Este campo es requerido';

const updateSelectedArea = () => {
  loadingUpdateArea.value = LoadingStates.LOADING;
  updateArea({ id: props?.area?.id || '', nombre: editArea.value.nombre.trim() }, (response: Response<Area>) => {
    if (!response.success) {
      error(response.message);
      loadingUpdateArea.value = LoadingStates.ERROR;
      return;
    }
    success(response.message);
    loadingUpdateArea.value = LoadingStates.IDLE;
    emits('update-area', response.response);
    clearEditArea();
  })
};

const cancel = () => {
  clearEditArea();
  emits('cancel');
};

function clearEditArea() {
  editArea.value = {
    id: '',
    nombre: ''
  };
}
</script>

<style scoped>

</style>