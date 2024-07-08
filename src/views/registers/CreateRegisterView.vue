<template>
  <div class="create-register-view">
    <v-form ref="createDocumentFormRef" @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="d-flex justify-space-between align-center">
              <p class="ts-b3 tc-textdark tw-bold">
                Datos del registro
              </p>
              <v-tooltip text="Reiniciar formulario" location="left">
                <template #activator="{ props }">
                  <v-btn v-bind="props" color="dark" icon variant="flat" @click="clearForm">
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
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
              :format="formatDate"
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
          <v-col cols="11" class="py-0">
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
          <v-col cols="1" class="py-0">
            <div class="h-100 d-flex flex-column justify-center">
              <v-tooltip text="Agregar área" location="bottom">
                <template #activator="{ props }">
                  <v-btn v-bind="props" color="dark" icon variant="tonal" @click="createAreaDialog = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
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

          <div class="w-100 d-flex justify-end" @click="onSubmit">
            <v-btn class="ml-auto" color="#1c67d7" variant="flat" type="submit">
              Guardar
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog
        v-model="createAreaDialog"
        max-width="600"
      >
        <v-card
          prepend-icon="mdi-select-place"
          title="Agregar nueva área"
        >
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
              text="Cerrar"
              variant="plain"
              @click="createAreaDialog = false"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Agegar"
              variant="tonal"
              @click="createNewArea"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getAreas, getActors, createArea, createDocument } from '@/api/electron'
import { useToasts } from '@/composables/useToasts';
import { useAppStore } from '@/stores/appStore';
import type { Area, Documento } from '@/api/interfaces'

const { warning, success, error } = useToasts()
const { getUser } = useAppStore()

const createDocumentFormRef = ref<null | HTMLFormElement>(null)
const createAreaDialog = ref(false)

const fecha = ref(new Date())
const numero_oficio = ref('')
const enviado_por = ref(null)
const cargo = ref('')
const asunto = ref('')
const dirigido_a = ref(null)
const documento = ref<null | File>(null)
const area = ref(null)

const areas = ref<Area[]>([
  { id: 0, nombre: 'Cargando áreas...' },
])
const actors = ref<string[]>([])

// Rules
const required = (v: string) => !!v || 'Este campo es requerido'
const areaRequired = (v: Object) => v !== null || 'Selecciona un área'

const clearForm = () => {
  fecha.value = new Date()
  numero_oficio.value = ''
  enviado_por.value = null
  cargo.value = ''
  asunto.value = ''
  dirigido_a.value = null
  documento.value = null
  area.value = null

  createDocumentFormRef.value?.reset()
}

// Form Actions
const onSubmit = async () => {
  await createDocumentFormRef.value?.validate()
  if (createDocumentFormRef.value?.isValid) {
    if (!documento.value) {
      console.log(documento.value)
      return warning('Selecciona un documento')
    }

    const file = documento.value
    const reader = new FileReader()

    reader.onload = async (e) => {
      const document: Partial<Documento> = {
        fecha: fecha.value,
        numero_oficio: numero_oficio.value,
        enviado_por: enviado_por.value ?? '',
        cargo: cargo.value,
        asunto: asunto.value,
        dirigido_a: dirigido_a.value ?? '',
        documento: { content: e.target?.result, name: file.name },
        area_id: area.value ?? 0,
        user_id: getUser.id,
      }
      await createDocument(document, (response: any) => {
        if (response.success) {
          success('Documento creado correctamente')
          clearForm()
        } else {
          error('Ocurrió un error al crear el documento')
        }
      })
    }

    reader.readAsArrayBuffer(file)
  }
}

// Área Dialog
const newArea = ref('')

const createNewArea = async () => {
  if (newArea.value === '' || newArea.value === null) {
    return warning('Ingresa un nombre para el área')
  }

  await createArea({ nombre: newArea.value}, async (response: any) => {
    if (response.success) {
      success('Área creada correctamente')
      await getAreas((allAreas: any) => {
        areas.value = allAreas.response
      })
      area.value = response.response.id
      newArea.value = ''
      createAreaDialog.value = false

    } else {
      error('Ocurrió un error al crear el área')
    }
  })
}

// Hook Cycles
onBeforeMount(async () => {
  await getAreas((allAreas: any) => {
    areas.value = allAreas.response
  })
  await getActors((allActors: any) => {
    actors.value = allActors.response.map((actor: any) => actor.nombre)
  })
})

// Formating
const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
}
</script>

<style lang="scss" scoped>
label {
  color: $color-text-light;
  font-size: $b4-size;
  font-weight: $font-medium;
}

#fecha-input :deep(input) {
  padding-top: 7px;
  padding-bottom: 7px;
  border: 1px solid #a1a1a1;
}
</style>