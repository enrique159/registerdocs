<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

        <v-toolbar-title>Acerca de</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="w-100 h-100 d-flex flex-column justify-center align-center">
        <logo />
        <p class="mt-3 mb-4 ts-b4">
          <strong>Version:</strong> {{ version }}
        </p>

        <p class="mb-2">Desarrollado por: Enrique Marin Hirales</p>
        <p class="mb-2 tc-text-light">Este software está desarrollado bajo la <a class="tc-blue-0 tw-bold" href="https://github.com/enrique159/registerdocs/blob/main/LICENSE">Licencia MIT</a></p>
        <p class="mb-2">
          <strong>Contacto: </strong>
          <a class="tc-blue-0 tw-medium" href="mailto:hola@enriquemarin.xyz">hola@enriquemarin.xyz</a>
        </p>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import Logo from '../Logo/Logo.vue';
import { computed } from 'vue';
import { getVersion } from '@/api/electron/index';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';

const emits = defineEmits(['update:dialog']);

const props = defineProps<{
  showDialog: boolean;
}>();

const dialog = computed({
  get: () => props.showDialog,
  set: (value: boolean) => {
    emits('update:dialog', value);
  },
});

const version = ref<string>('')

onBeforeMount(() => {
  getVersion((response: string) => {
    version.value = response;
  });
});
</script>

<style lang="scss" scoped></style>
