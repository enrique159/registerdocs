<template>
  <div class="signin-view">
    <div class="logo"><p>_registerdocs</p></div>
    <v-card class="signin-card px-6 py-8" min-width="368">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <h5 class="mb-8">Iniciar sesión</h5>
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
          :rules="[required]"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToasts } from "@/composables/useToasts";
import { useAppStore } from "@/stores/appStore";
import { signIn, getConfiguration } from "@/api/electron";
import { Configuration, Response } from "@/api/interfaces";

const router = useRouter();
const { error } = useToasts();
const { setUser, setConfig } = useAppStore();

const form = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

const required = (v: string) => !!v || "Este campo es requerido";

const onSubmit = async () => {
  if (!form.value) return;
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 300));
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
onBeforeMount(async () => {
  await getConfiguration((response: Response<Configuration>) => {
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
</style>
