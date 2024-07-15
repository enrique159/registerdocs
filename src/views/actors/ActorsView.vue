<template>
  <div class="contacts-view">
    <v-container>
      <v-row>
        <!-- SEARCH BAR -->
        <v-col cols="5" md="4">
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

        <v-col cols="2" md="4"></v-col>

        <!-- ADD NEW CONTACT -->
        <v-col cols="5" md="4">
          <p class="ts-b5 tc-text-light text-end mb-1">Agregar nuevo</p>
          <v-text-field
            v-model="newContact"
            placeholder="Nombre"
            variant="solo"
            hide-details
            density="compact"
            class="custom-input"
            @keyup.enter="createNewActor"
          >
            <template #append-inner>
              <v-btn variant="text" color="primary" icon density="compact">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <!-- ACTORS LIST -->
      <div class="actors-card-list mt-8">
        <v-card
          v-for="actor in actors"
          :key="actor.nombre"
          class="bg-white-0 br-3 bs-2"
          elevation="0"
        >
          <v-card-title>
            <v-row>
              <v-col cols="10" class="pt-5">
                <p class="ts-b3 tw-semi-bold">
                  <v-icon color="#737373" size="small">mdi-account</v-icon>
                  {{ actor.nombre }}
                </p>
              </v-col>
              <v-col cols="2" class="text-end">
                <v-btn
                  icon
                  variant="text"
                  density="compact"
                  color="error"
                  @click="deleteSelectedActor({ ...actor })"
                >
                  <v-icon size="small">mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { getActors, createActor, deleteActor } from '@/api/electron';
import { Actor, Response } from '@/api/interfaces';
import { onBeforeMount, ref } from 'vue';
import { useToasts } from '@/composables/useToasts';

const { error, success, warning } = useToasts();

const actors = ref<Actor[]>([]);
const search = ref<string>('');
const newContact = ref<string>('');

const createNewActor = () => {
  if (!newContact.value) {
    warning('El campo no puede estar vacío');
    return;
  }

  createActor({ nombre: newContact.value }, (response: Response<Actor>) => {
    if (!response.success) {
      error(response.message);
      return;
    }
    actors.value.push(response.response);
    newContact.value = '';
    success('Actor creado correctamente');
  });
};

const deleteSelectedActor = (actor: Actor) => {
  deleteActor(actor, (response: Response<Actor>) => {
    if (!response.success) {
      error(response.message);
      return;
    }
    actors.value = actors.value.filter((a) => a.nombre !== actor.nombre);
    success('Actor eliminado correctamente');
  });
};

const getAllActors = () => {
  getActors((response: Response<Actor[]>) => {
    if (!response.success) {
      error(response.message)
      return
    }
    actors.value = response.response
  });
};

onBeforeMount(() => {
  getAllActors();
});
</script>

<style lang="scss" scoped>
.contacts-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 0 1.8rem;
  overflow-y: auto;
}

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

.actors-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>