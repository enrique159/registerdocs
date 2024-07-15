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
  </div>
</template>

<script setup lang="ts">
import { changePassword } from '@/api/electron'
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
</script>

<style lang="scss" scoped>
.settings-view {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 1.8rem;
  overflow-y: auto;
}
</style>