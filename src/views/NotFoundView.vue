<template>
  <div class="not-found-view">
    <p class="ts-b1 tw-bold mb-2">
      Hubo un error, regresa a la página principal
    </p>
    <p class="tc-text-light mb-5">
      Parece que se ha intentado abrir una sección que no está definida.
    </p>
    <router-link to="/main">
      <v-btn color="warning" variant="tonal">
        <v-icon class="mr-4">
          mdi-arrow-left
        </v-icon>
        Regresar a inicio
      </v-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.not-found-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}
</style>