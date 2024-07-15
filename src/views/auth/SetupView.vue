<template>
  <div class="setup-view">
    <div class="logo">
      <p>_registerdocs</p>
    </div>

    <v-card v-if="!startConfiguring" class="bg-white-1 w-100 max-w-720-px" elevation="0">
      <h5 class="mb-2 text-center">Hola! Vamos a comenzar</h5>
      <v-stepper :model-value="currentStep" class="bg-white-1 mb-4" elevation="0">
        <v-stepper-header>
          <v-stepper-item
            title="Crear mi usuario"
            color="#1C67D7"
            value="1"
            :complete="steps[0].completed"
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            title="Agrega una contraseña"
            color="#1C67D7"
            value="2"
            :complete="steps[1].completed"
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            title="Ruta de archivos"
            color="#1C67D7"
            value="3"
            :complete="steps[2].completed"
          ></v-stepper-item>
        </v-stepper-header>
      </v-stepper>

      <!-- USERNAME -->
      <v-card v-if="currentStep === 0" class="w-60 mx-auto br-3 bs-1" elevation="0">
        <v-card-text>
          <p class="tw-bold mb-2">Crea tu nombre de usuario</p>
          <p class="ts-b4 tc-text-light mb-4">
            Este nombre de usuario será único y no podrá ser cambiado
          </p>
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            variant="outlined"
            density="compact"
            type="text"
            placeholder="Ej. juanperez"
            hint="Solo debe contener letras"
            persistent-hint
            :rules="[required, minLength(4)]"
            @keypress="validateLetters"
            @keydown.enter="continueStep"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-base" color="primary" text @click="continueStep">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>

      <!-- PASSWORD -->
      <v-card v-if="currentStep === 1" class="w-60 mx-auto br-3 bs-1" elevation="0">
        <v-card-text>
          <p class="tw-bold mb-2">Crea tu contraseña</p>
          <p class="ts-b4 tc-text-light mb-4">
            Esta contraseña será la que uses para ingresar a tu cuenta
          </p>
          <v-text-field
            v-model="password"
            label="Contraseña"
            variant="outlined"
            density="compact"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Escribe tu contraseña"
            hint="Puede contener letras, numeros o simbolos"
            :rules="[required, minLength(6)]"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            @keypress="validatePassword"
            @keydown.enter="continueStep"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-base" color="blue-gray" text @click="backStep()">
            Regresar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="btn-base" color="primary" text @click="continueStep">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>

      <!-- RUTA DE RECURSOS -->
      <v-card v-if="currentStep === 2" class="w-60 mx-auto br-3 bs-1" elevation="0">
        <v-card-text>
          <p class="tw-bold mb-2">Carpeta de recursos</p>
          <p class="ts-b4 tc-text-light mb-4">
            Esta carpeta será donde se guarden tus documentos
          </p>
          <v-text-field
            class="mb-4"
            v-model="ruta_recursos"
            label="Nombre de la carpeta"
            variant="outlined"
            density="compact"
            placeholder="Ej. Documentos"
            hint="*Puedes dejar en blanco el nombre para usar la carpeta por defecto"
            prepend-inner-icon="mdi-folder"
            persistent-hint
            @keydown.enter="continueStep"
            @keypress="validateLetters"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-base" color="blue-gray" text @click="backStep()">
            Regresar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="btn-base" color="primary" text @click="continueStep">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>

    <v-card v-else class="bg-white-1 w-100 max-w-720-px" elevation="0">
      <v-card-text>
        <p class="ts-b2 tw-bold mb-2 text-center">Configurando cuenta</p>
        <p class="ts-b4 tc-text-light mb-4 text-center">
          Estamos configurando tu cuenta, por favor espera un momento
        </p>

        <v-progress-linear indeterminate color="primary"></v-progress-linear>
        <p class="text-center ts-b5 tc-text-light py-4">
           {{ loadingConfig === "loading" ? "Creando usuario" : loadingConfig === "configuring" ? "Configurando" : restartText }}
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { useValidateInputs } from "@/composables/useValidateInputs"
import { useToasts } from "@/composables/useToasts";
import { createConfiguration, signUp } from "@/api/electron";
import { Configuration, Response, User } from "@/api/interfaces";

const { validateLetters, validatePassword } = useValidateInputs()
const { error } = useToasts()

const username = ref<string>("")
const password = ref<string>("")
const ruta_recursos = ref<string>("")

const startConfiguring = ref<boolean>(false)
const steps = reactive([
  { id: 1, completed: false },
  { id: 2, completed: false },
  { id: 3, completed: false }
])
const currentStep = ref<number>(0)
const showPassword = ref<boolean>(false)
const required = (value: string) => !!value || "Campo requerido"
const minLength = (length: number) => (value: string) => value.length >= length || `Debe tener al menos ${length} caracteres`

const continueStep = () => {
  const stepValidations = [
    { validate: () => username.value !== "" && username.value.length >= 4, nextStep: 1 },
    { validate: () => password.value !== "" && password.value.length >= 6, nextStep: 2 },
    { validate: () => true, nextStep: 3 },
  ];

  const currentValidation = stepValidations[currentStep.value];
  if (currentValidation && currentValidation.validate()) {
    steps[currentStep.value].completed = true;
    currentStep.value = currentValidation.nextStep;
    if (currentStep.value === 3) {
      startConfiguring.value = true;
      startConfigurationProcess();
    }
  }
}

const backStep = () => {
  currentStep.value === 1 ? (currentStep.value = 0) : (currentStep.value = 1)
}

const restartText = ref<string>("Listo!")
const restartingCounting = () => {
  let count = 6
  const interval = setInterval(() => {
    count--
    if (count === 0) {
      clearInterval(interval)
      restartText.value = "Reiniciando..."
      window.electron.restartApp()
    } else {
      restartText.value = `Reiniciando en ${count}...`
    }
  }, 1000)
}

const loadingConfig = ref<string>("start")

const startConfigurationProcess = async () => {
  loadingConfig.value = "loading"
  const user = {
    username: username.value.trim(),
    password: password.value.trim(),
  }
  const configuration: Configuration = {
    inicializado: true,
    ruta_recursos: ruta_recursos.value.trim() || "registerdocs",
  }
  await new Promise((resolve) => setTimeout(resolve, 2000))
  signUp(user, (response: Response<User>) => {
    if (!response.success) {
      error(response.message)
    }
    loadingConfig.value = "configuring"
  })
  await new Promise((resolve) => setTimeout(resolve, 2000))
  createConfiguration(configuration, (response: Response<Configuration>) => {
    if (!response.success) {
      error(response.message)
    }
    loadingConfig.value = "finishing"
  })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  loadingConfig.value = "done"
  restartingCounting()
}
</script>

<style lang="scss" scoped>
.setup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $color-background;

  .setup-card {
    border-radius: 1rem;
    box-shadow: 0 4px 12px 2px rgba(0, 0, 0, 0.05);
  }

  .logo {
    position: absolute;
    top: 2rem;
  }
}
</style>
