<template>
  <div class="calendar-view">
    <v-calendar
      class="bg-white-0 br-3 bs-1 px-4 pt-0 pb-4"
      view-mode="month"
      hide-week-number
      :events="documentEvents"
    >
      <template #event="{ event }">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              text
              color="primary"
              variant="tonal"
              density="compact"
              class="btn-base ml-2 br-3"
            >
              {{ event.title }}
            </v-btn>
          </template>

          <v-card min-width="300" class="br-3 bg-white-0 bs-2">
            <v-list>
              <v-list-item
                :subtitle="'No. Oficio: ' + (event.rawEvent as Documento).numero_oficio"
                :title="formatDatefull((event.rawEvent as Documento).fecha)"
              >
                <template v-slot:append>
                  <v-tooltip text="Abrir documento" location="top">
                    <template #activator="{ props }">
                      <v-btn
                        v-bind="props"
                        class="tc-blue-0"
                        icon="mdi-file-document"
                        variant="tonal"
                        @click="openDocument({ documentRoute: (event.rawEvent as Documento).documento }, () => {})"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <label class="ts-b5 tc-text-light">
                  <v-icon size="small">mdi-account</v-icon>
                  Enviado por
                </label>
                <v-list-item-title>
                  {{ (event.rawEvent as Documento).enviado_por }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <label class="ts-b5 tc-text-light">
                  <v-icon size="small">mdi-card-account-details</v-icon>
                  Cargo
                </label>
                <v-list-item-title>
                  {{ (event.rawEvent as Documento).cargo }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <label class="ts-b5 tc-text-light">
                  <v-icon size="small">mdi-account</v-icon>
                  Dirigido a
                </label>
                <v-list-item-title>
                  {{ (event.rawEvent as Documento).dirigido_a }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <label class="ts-b5 tc-text-light">
                  <v-icon size="small">mdi-domain</v-icon>
                  Área
                </label>
                <v-list-item-title>
                  {{ (event.rawEvent as Documento).area }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-calendar>
  </div>
</template>

<script setup lang="ts">
import { VCalendar } from 'vuetify/labs/VCalendar'
import { getDocuments, openDocument } from '@/api/electron'
import { computed, onBeforeMount, ref } from 'vue';
import { Documento, Response } from '@/api/interfaces';
import { useToasts } from '@/composables/useToasts';
import { useFormat } from '@/composables/useFormat';

const { formatDatefull } = useFormat()

const documents = ref<Documento[]>([])
const { error } = useToasts()
const menu = ref(false)

const documentEvents = computed(() => {
  return documents.value.map((document) => {
    return {
      title: document.asunto,
      start: new Date(document.fecha),
      end: new Date(document.fecha),
      color: 'primary',
      rawEvent: document as Documento
    }
  })
})

onBeforeMount(() => {
  getDocuments((response: Response<Documento[]>) => {
    if (!response.success) {
      error(response.message)
      return
    }
    documents.value = response.response
  })
})
</script>

<style scoped>
.calendar-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 1.8rem;
  overflow-y: auto;
}
</style>