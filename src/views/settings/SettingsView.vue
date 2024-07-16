<template>
  <div class="settings-view">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="tc-text-dark tw-bold ts-b3 mb-2">
            Información de mi usuario
          </p>
          <v-row class="mb-4">
            <v-col cols="3">
              <label class="tc-text-light tw-medium ts-b5">
                <v-icon size="small">mdi-account</v-icon>
                Nombre de usuario
              </label>
              <p class="tc-text-dark tw-medium">{{ getUser.username }}</p>
            </v-col>

            <v-col cols="4">
             <v-btn class="btn-base mt-1" variant="tonal" color="warning" @click="changePasswordModal = true">
              <v-icon size="small">mdi-lock</v-icon>
              Cambiar contraseña
             </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <p class="tc-text-dark tw-bold ts-b3 mb-2">
            Configurar datos
          </p>
          <p class="ts-b4 tc-text-light mb-4">
            Puedes importar y exportar la información de documentos, áreas y contactos.
          </p>
          <v-row class="mb-4">
            <v-col cols="12" class="d-flex gap-2 justify-start align-center">
              <v-btn
                class="btn-base mt-1"
                variant="tonal"
                color="purple"
                @click="openFile"
              >
                <v-icon size="small">mdi-file-import</v-icon>
                Importar desde archivo
              </v-btn>

              <v-btn
                class="btn-base mt-1"
                variant="tonal"
                color="gray"
                @click="exportInfoModal = true"
              >
                <v-icon size="small">mdi-file-export</v-icon>
                Exportar a archivo JSON
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="changePasswordModal">
      <v-card class="w-480-px mx-auto" prepend-icon="mdi-lock" title="Cambiar contraseña">
        <v-card-text>
          <v-form>
            <label for="password-input" class="tc-text-light tw-medium ts-b4">
              Contraseña actual
            </label>
            <v-text-field
              id="password-input"
              v-model="password"
              variant="outlined"
              density="compact"
              placeholder="Escribe primero tu contraseña actual"
              class="mb-8"
              :type="showPassword ? 'text' : 'password'"
              :rules="[required, minLength(6)]"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              @keypress="validatePassword"
            />

            <label for="password-input" class="tc-text-light tw-medium ts-b4">
              Nueva contraseña
            </label>
            <v-text-field
              v-model="newPassword"
              variant="outlined"
              density="compact"
              placeholder="Escribe tu nueva contraseña"
              :type="showNewPassword ? 'text' : 'password'"
              :rules="[required, minLength(6)]"
              :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              hint="Puede contener letras, numeros o simbolos"
              @click:append-inner="showNewPassword = !showNewPassword"
              @keypress="validatePassword"
            />

            <label for="password-input" class="tc-text-light tw-medium ts-b4">
              Confirmar nueva contraseña
            </label>
            <v-text-field
              v-model="confirmPassword"
              variant="outlined"
              density="compact"
              placeholder="Confirma tu nueva contraseña"
              :rules="[required, minLength(6)]"
              :type="showNewPassword ? 'text' : 'password'"
              :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showNewPassword = !showNewPassword"
              @keypress="validatePassword"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-base" variant="tonal" @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn class="btn-base" variant="tonal" color="warning" @click="changeCurrentPassword">
            Confirmar cambio
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="exportInfoModal">
      <v-card class="w-480-px mx-auto" prepend-icon="mdi-file-export" title="Exportar información">
        <v-card-text>
          <p class="tc-text-dark tw-medium ts-b3 mb-4">
            ¿Estás seguro de exportar la información de documentos, áreas y contactos?
          </p>
          <p class="tc-text-light tw-medium ts-b4">
            Esto generará un archivo JSON con toda la información guardada en la base de datos. Esto es ideal para hacer respaldos o actualización del programa.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-base" variant="tonal" @click="exportInfoModal = false">
            Cancelar
          </v-btn>
          <v-btn class="btn-base" variant="tonal" color="primary" @click="exportInfo">
            Exportar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { changePassword, exportDatabase, importDatabase } from '@/api/electron'
import { useAppStore } from '@/stores/appStore'
import { useValidateInputs } from '@/composables/useValidateInputs'
import { ref } from 'vue'
import { AuthParams, Response } from '@/api/interfaces'
import { LoadingState, LoadingStates } from '@/types'
import { useToasts } from '@/composables/useToasts'

const { getUser } = useAppStore()
const { validatePassword } = useValidateInputs()
const { error, success } = useToasts()


// Pasword change
const loadingChangePassword = ref<LoadingState>(LoadingStates.IDLE)
const changePasswordModal = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const showNewPassword = ref<boolean>(false)
const required = (v: string) => !!v || 'Campo requerido'
const minLength = (length: number) => (v: string) => (v && v.length >= length) || `Minimo ${length} caracteres`

const password = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')

const changeCurrentPassword = () => {
  loadingChangePassword.value = LoadingStates.LOADING

  if (newPassword.value !== confirmPassword.value) {
    loadingChangePassword.value = LoadingStates.ERROR
    error('Las contraseñas no coinciden')
    return
  }
  changePassword({ id: getUser.id, oldPassword: password.value, newPassword: newPassword.value }, (response: Response<AuthParams>) => {
    if (!response.success) {
      loadingChangePassword.value = LoadingStates.ERROR
      error(response.message)
      return
    }
    loadingChangePassword.value = LoadingStates.SUCCESS
    success(response.message)
    closeDialog()
  })
};

const closeDialog = () => {
  password.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showPassword.value = false;
  showNewPassword.value = false;
  changePasswordModal.value = false;
};


// Export info
const exportInfoModal = ref<boolean>(false)

const exportInfo = () => {
  exportDatabase((response: Response<any>) => {
    if (!response.success) {
      error(response.message)
      return
    }
    generateJSONLocalFile(response.response, 'database.json')
    exportInfoModal.value = false
  })
}

const generateJSONLocalFile = (data: any, filename: string) => {
  const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()
  a.remove()
}

// Import info
const openFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      const data = JSON.parse(e.target.result)
      importDatabase(data, (response: Response<any>) => {
        if (!response.success) {
          error(response.message)
          return
        }
        success(response.message)
      })
    }
    reader.readAsText(file)
  }
  input.click()
  input.remove()
}
</script>

<style lang="scss" scoped>
.settings-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 1.8rem;
  overflow-y: auto;
}
</style>