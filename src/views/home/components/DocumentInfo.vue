<template>
  <v-card>
    <v-toolbar density="compact">
      <v-btn
        size="small"
        icon="mdi-close"
        @click="emits('close-document-dialog')"
      ></v-btn>

      <v-toolbar-title>No. Oficio: <span class="tw-bold">{{ props.document?.numero_oficio }}</span></v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container>
      <v-row>
        <v-col cols="7" md="8">
          <p class="ts-b3 tw-bold mb-2">Información del registro</p>
          <v-divider></v-divider>
          <v-row class="pt-3">
            <v-col cols="6">
              <span class="ts-b5 tc-text-light tw-medium">
                <v-icon size="small" class="tc-white-4">mdi-calendar</v-icon>
                Fecha
              </span>
              <p class="tc-text-dark tw-medium">{{ formatDatefull(props.document?.fecha ?? new Date()) }}</p> 
            </v-col>

            <v-col cols="6">
              <span class="ts-b5 tc-text-light tw-medium">
                <v-icon size="small" class="tc-white-4">mdi-counter</v-icon>
                No. Oficio
              </span>
              <p class="tc-text-dark tw-medium">{{ props.document?.numero_oficio }}</p> 
            </v-col>

            <v-col cols="6">
              <span class="ts-b5 tc-text-light tw-medium">
                <v-icon size="small" class="tc-white-4">mdi-account</v-icon>
                Enviado por
              </span>
              <p class="tc-text-dark tw-medium">{{ props.document?.enviado_por }}</p>
            </v-col>

            <v-col cols="6">
              <span class="ts-b5 tc-text-light tw-medium">
                <v-icon size="small" class="tc-white-4">mdi-account-tie</v-icon>
                Cargo
              </span>
              <p class="tc-text-dark tw-medium">{{ props.document?.cargo }}</p>
            </v-col>

            <v-col cols="6">
              <span class="ts-b5 tc-text-light tw-medium">
                <v-icon size="small" class="tc-white-4">mdi-domain</v-icon>
                Área
              </span>
              <p class="tc-text-dark tw-medium">{{ props.document?.area }}</p> 
            </v-col>

            <v-col cols="6">
              <span class="ts-b5 tc-text-light tw-medium">
                <v-icon size="small" class="tc-white-4">mdi-account-multiple</v-icon>
                Dirigido a
              </span>
              <p class="tc-text-dark tw-medium">{{ props.document?.dirigido_a }}</p>
            </v-col>
          </v-row>

          <p class="ts-b3 tw-bold mt-12 mb-2">Documento</p>
          <v-divider></v-divider>
          <v-row class="py-6">
            <v-col cols="2">
              <v-img src="/document.svg" />
            </v-col>

            <v-col cols="10">
              <div class="d-flex flex-wrap gap-2">
                <v-btn class="btn-base" color="primary" variant="tonal">
                  <v-icon>mdi-open-in-new</v-icon>
                  Abrir documento
                </v-btn>
                <v-btn class="btn-base" color="warning" variant="tonal">
                  <v-icon>mdi-folder</v-icon>
                  Abrir ubicación
                </v-btn>
              </div>
            </v-col>
          </v-row>


        </v-col>

        <v-col cols="5" md="4">
          <p class="ts-b3 tw-bold mb-2">Actividad</p>
          <v-divider></v-divider>
          
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { Documento } from '@/api/interfaces';
import { useFormat } from '@/composables/useFormat';

const { formatDatefull } = useFormat()

const props = defineProps<{
  document: Documento | null
}>()

const emits = defineEmits(['close-document-dialog'])
</script>

<style scoped>

</style>