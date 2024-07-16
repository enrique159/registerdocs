<template>
  <v-card class="bs-2 br-4 w-100 max-w-1220-px max-h-600-px mx-auto" style="overflow-y: hidden;" elevation="0">
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
                <v-btn class="btn-base" color="primary" variant="tonal" @click="openDocument({ documentRoute: props.document?.documento }, () => {})">
                  <v-icon>mdi-open-in-new</v-icon>
                  Abrir documento
                </v-btn>
                <v-btn class="btn-base" color="warning" variant="tonal" @click="openDocument({ documentRoute: props.document?.documento, openFolder: true }, () => {})">
                  <v-icon>mdi-folder</v-icon>
                  Abrir ubicación
                </v-btn>
              </div>
            </v-col>
          </v-row>


        </v-col>

        <v-col cols="5" md="4">
          <p class="ts-b3 tw-bold mb-2">Actividad</p>
          <v-divider class="mb-3"></v-divider>
          <v-btn class="btn-base w-100" color="blue-gray" variant="tonal" @click="createActivityModal = true">
            <v-icon>mdi-plus</v-icon>
            Agregar actividad
          </v-btn>

          <div class="h-400-px w-100 d-flex flex-column" style="overflow-y: auto;">
            <v-list dense>
              <v-list-item v-for="activity in activities" :key="activity.id" >
                <v-divider class="mb-3"></v-divider>
                <div class="d-flex flex-column gap-1">
                  <div class="d-flex justify-space-between align-center">
                    <v-chip :color="getActivityType(activity.accion).color" density="compact">
                      <span class="ts-b5">{{ getActivityType(activity.accion).label.toLowerCase() }}</span>
                    </v-chip>
                    <span class="ts-b5 tc-white-3">
                      {{ formatDatetime(activity.created_at) }}
                    </span>
                  </div>
                  <p class="ts-b4 tc-text-dark">
                    {{ activity.descripcion }}
                  </p>
                </div>
              </v-list-item>
            </v-list>
          </div>
          
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="createActivityModal">
      <v-card class="w-368-px mx-auto bg-white-0 bs-2 br-3" elevation="0">
        <v-card-title>
          <span class="ts-b3 tw-bold">Agregar actividad</span>
        </v-card-title>

        <v-card-text>
          <v-select
            v-model="newActivity.accion"
            :items="activityTypes"
            label="Tipo de actividad"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="compact"
            outlined
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <template #prepend>
                  <v-icon :color="item.raw.color">
                    mdi-circle
                  </v-icon>
                </template>
              </v-list-item>
            </template>
          </v-select>
          <v-textarea
            v-model="newActivity.descripcion"
            label="Descripción"
            variant="outlined"
            rows="4"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-base" variant="tonal" @click="createActivityModal = false">Cancelar</v-btn>
          <v-btn class="btn-base" variant="tonal" color="primary" @click="createNewActivity">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { Activity, Documento, Response } from '@/api/interfaces';
import { useFormat } from '@/composables/useFormat';
import { openDocument, getActivities, createActivity } from '@/api/electron';
import { onBeforeMount, ref } from 'vue';
import { useToasts } from '@/composables/useToasts';
import { useAppStore } from '@/stores/appStore';
import { type ActivityType, ActivityTypes } from '@/types';
import moment from 'moment-timezone';

const { formatDatefull } = useFormat()
const { error } = useToasts()
const { getUser } = useAppStore()

const emits = defineEmits(['close-document-dialog'])
const props = defineProps<{
  document: Documento | null
}>()

const activities = ref<Activity[]>([])

onBeforeMount(() => {
  getActivities(props.document?.id || '', (response: Response<Activity[]>) => {
    if (!response.success) {
      error(response.message)
      return
    }
    activities.value = response.response
  })
})

// Add activity
const createActivityModal = ref(false)
const activityTypes = ref<ActivityType[]>(Object.values(ActivityTypes))
const newActivity = ref<Activity>({
  accion: 'NOTE',
  descripcion: '',
  user_id: getUser.id,
  document_id: props.document?.id || '',
})

const createNewActivity = () => {
  if (!newActivity.value.descripcion) {
    error('La descripción es requerida')
    return
  }
  createActivity({ ...newActivity.value }, (response: Response<Activity>) => {
    if (!response.success) {
      error(response.message)
      return
    }
    newActivity.value.descripcion = ''
    createActivityModal.value = false

    getActivities(props.document?.id || '', (response: Response<Activity[]>) => {
      if (!response.success) {
        error(response.message)
        return
      }
      activities.value = response.response
    })
  })
}

const getActivityType = (type: string) => {
  return activityTypes.value.find((activity) => activity.value === type) || activityTypes.value[0]
}

const formatDatetime = (date: Date | undefined) => {
  return moment(date ?? new Date()).tz('America/Mazatlan').format('DD MMMM YYYY hh:mm A')
}
</script>

<style scoped>

</style>