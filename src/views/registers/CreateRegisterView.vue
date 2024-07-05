<template>
  <div class="create-register-view">
    <v-form v-model="createRegisterForm" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" class="pb-0">
            <p class="ts-b3 tc-textdark tw-bold">
              Datos del registro
            </p>
          </v-col>
          <v-col cols="4" md="3" class="pb-0">
            <label for="fecha-input">
              Fecha
            </label>
            <date-picker
              v-model="fecha"
              locale="es"
              id="fecha-input"
              cancel-text="cancelar"
              select-text="seleccionar"
              :format="format"
              :enable-time-picker="false"
              :month-change-on-arrows="true"
              :rules="[required]"
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
          <v-col cols="8" md="6" class="pb-0">
            <label for="numero-oficio-input">No. Oficio</label>
            <v-text-field
              id="numero-oficio-input"
              v-model="numero_oficio"
              variant="outlined"
              density="compact"
              placeholder="Ej. 12342021"
              :rules="[required]"
              required
            />
          </v-col>

          <v-col cols="12" class="pb-0">
            <p class="ts-b3 tc-textdark tw-bold">
              Información de contacto
            </p>
          </v-col>
          <v-col cols="6" class="pb-0">
            <label for="enviado-por-input">Enviado por</label>
            <v-combobox
              id="enviado-por-input"
              v-model="enviado_por"
              variant="outlined"
              density="compact"
              placeholder="Ej. Lic. Juan Pérez"
              :items="actors"
              :rules="[required]"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <label for="cargo-input">Cargo</label>
            <v-text-field
              id="cargo-input"
              v-model="cargo"
              variant="outlined"
              density="compact"
              placeholder="Ej. Director de área"
              :rules="[required]"
              required
            />
          </v-col>
          <v-col cols="6" class="py-0">
            <label for="asunto-input">Asunto</label>
            <v-text-field
              id="asunto-input"
              v-model="asunto"
              variant="outlined"
              density="compact"
              placeholder="Ej. Solicitud de información"
              :rules="[required]"
              required
            />
          </v-col>
          <v-col cols="6" class="py-0">
            <label for="dirigido-a-input">Dirigido a</label>
            <v-combobox
              id="dirigido-a-input"
              v-model="dirigido_a"
              variant="outlined"
              density="compact"
              placeholder="Ej. Lic. María López"
              :items="actors"
              :rules="[required]"
              required
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <label for="area-input">Área</label>
            <v-autocomplete
              id="area-input"
              v-model="area"
              :items="areas"
              item-title="nombre"
              item-value="id"
              variant="outlined"
              density="compact"
              placeholder="Seleccionar área"
              :rules="[areaRequired]"
              required
            />
          </v-col>

          <v-col cols="12" class="pb-0">
            <p class="ts-b3 tc-textdark tw-bold">
              Documento escaneado
            </p>
          </v-col>
          <v-col cols="12" class="pb-0">
            <label for="documento-input">Selecciona el documento</label>
            <v-file-input
              id="documento-input"
              v-model="documento"
              variant="outlined"
              density="compact"
              placeholder="Seleccionar archivo"
              accept="image/*, application/pdf"
              :rules="[required]"
              required
            />
          </v-col>

          <div class="w-100 d-flex justify-end">
            <v-btn class="ml-auto" color="primary" variant="tonal" @click="onSubmit">
              Guardar
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getAreas, getActors } from '@/api/electron'
import type { Area } from '@/api/interfaces'

const fecha = ref(new Date())
const numero_oficio = ref('')
const enviado_por = ref(null)
const cargo = ref('')
const asunto = ref('')
const dirigido_a = ref(null)
const documento = ref(null)
const area = ref(null)

const areas = ref<Area[]>([
  { id: 0, nombre: 'Cargando áreas...' },
])
const actors = ref<string[]>([])

const createRegisterForm = ref(false)

// Rules
const required = (v: string) => !!v || 'Este campo es requerido'
const areaRequired = (v: Object) => v !== null || 'Selecciona un área'

const onSubmit = () => {
  console.log('submit')
}

const format = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
}

onBeforeMount(async () => {
  await getAreas((allAreas: any) => {
    areas.value = allAreas.response
  })
  await getActors((allActors: any) => {
    actors.value = allActors.response.map((actor: any) => actor.nombre)
  })
})
</script>

<style lang="scss" scoped>
.create-register-view {
  label {
    color: $color-text-light;
    font-size: $b4-size;
    font-weight: $font-medium;
  }
}

#fecha-input :deep(input) {
  padding-top: 7px;
  padding-bottom: 7px;
  border: 1px solid #a1a1a1;
}
</style>