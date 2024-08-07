<template>
  <div class="signin-view">
    <logo />
    <v-card class="signin-card px-6 py-8" min-width="368">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <h6 class="mb-3">Iniciar sesión</h6>
        <p class="mb-8 tc-text-light ts-b4">
          Bienvenido, por favor ingresa tus credenciales para
          continuar.
        </p>
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Nombre de usuario"
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required, minLength(6)]"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          @click:append-inner="showPassword = !showPassword"
        />

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="primary"
          size="large"
          type="submit"
          variant="tonal"
          block
        >
          <v-icon class="mr-3"> mdi-login </v-icon>
          Ingresar
        </v-btn>
      </v-form>
    </v-card>

    <p class="version-text">
      {{ version }}
    </p>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo/Logo.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToasts } from "@/composables/useToasts";
import { useAppStore } from "@/stores/appStore";
import { signIn, getConfiguration, getVersion } from "@/api/electron";
import { Configuration, Response } from "@/api/interfaces";

const router = useRouter();
const { error } = useToasts();
const { setUser, setConfig } = useAppStore();

const version = ref("");
const form = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

const required = (v: string) => !!v || "Este campo es requerido";
const minLength = (length: number) => (v: string) =>
  (v && v.length >= length) || `Debe tener al menos ${length} caracteres`;

const onSubmit = async () => {
  if (!form.value) return;
  loading.value = true;
  signIn(
    { username: username.value, password: password.value },
    (response: any) => {
      if (response.success) {
        setUser(response.response);
        router.push({ name: "Home" });
      } else {
        error(response.message);
      }
      loading.value = false;
    }
  );
};

/*
  Configuration
*/
onBeforeMount(() => {
  getVersion((response: string) => {
    version.value = response;
  });
  getConfiguration((response: Response<Configuration>) => {
    if (!response.success) return error(response.message);
    setConfig(response.response);
    if (!response.response.inicializado) {
      router.push({ name: "Setup" });
    }
  });
});
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

  .logo {
    position: absolute;
    top: 2rem;
  }
}

.version-text {
  position: absolute;
  bottom: 1rem;
  text-align: center;
  color: $color-white-3;
  font-weight: $font-medium;
}
</style>
