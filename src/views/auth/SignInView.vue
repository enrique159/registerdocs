<template>
  <div class="signin-view">
    <div class="signin-view__logo">
      <p class="signin-view__logo__text">
        _registerdocs
      </p>
    </div>
    <v-card class="signin-card px-6 py-8" min-width="368">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <h5 class="mb-8">
          Iniciar sesión
        </h5>
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Nombre de usuario"
          variant="outlined"
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
        />

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="primary"
          size="large"
          type="submit"
          block
        >
          <v-icon class="mr-3">
            mdi-login
          </v-icon>
          Ingresar
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToasts } from '@/composables/useToasts'
import { useAppStore } from '@/stores/appStore'
import { signIn } from '@/api/electron'

const router = useRouter()
const { error } = useToasts()
const { setUser } = useAppStore()

const form = ref(false)
const username = ref("")
const password = ref("")
const loading = ref(false)
const showPassword = ref(false)

const required = (v: string) => !!v || 'Este campo es requerido'

const onSubmit = async() => {
  if (!form.value) return
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  signIn({ username: username.value, password: password.value }, (response: any) => {
    if (response.success) {
      setUser(response.response)
      router.push({ name: 'Home' })
    } else {
      error(response.message)
    }
  })
  loading.value = false
}
</script>

<style lang="scss" scoped>
.signin-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $color-background;

  .signin-card {
    border-radius: 1rem;
    box-shadow: 0 4px 12px 2px rgba(0, 0, 0, 0.05);
  }

  .signin-view__logo {
    position: absolute;
    top: 2rem;
    &__text {
      font-size: 1.4rem;
      font-weight: 800;
      color: $color-blue-0;
      text-align: center;
    }
  }
}
</style>