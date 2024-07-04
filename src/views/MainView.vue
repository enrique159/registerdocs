<template>
  <div class="main-view">
    <v-app-bar color="light" density="comfortable" elevation="0">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ currentRoute }}</v-toolbar-title>
      <v-spacer />
      <v-tooltip text="Agregar registro" location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-plus" variant="text" />
        </template>
      </v-tooltip>
      <v-btn icon="mdi-dots-vertical" variant="text" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in itemsMenu"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.link"
          link
        />
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-view__content">
      <router-view />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const itemsMenu = ref([
  {
    icon: 'mdi-file-document-multiple-outline',
    title: 'Documentos',
    value: 'documentos',
    link: '/main/home',
  },
  {
    icon: 'mdi-invoice-text-plus-outline',
    title: 'Crear registro de documento',
    value: 'crear-registro',
    link: '/main/create-register',
  },
  {
    icon: 'mdi-select-place',
    title: 'Áreas y departamentos',
    value: 'areas',
    link: '/main/areas',
  },
])

const drawer = ref(false)
const route = useRoute()

const currentRoute = computed(() => {
  return itemsMenu.value.find((item) => item.link === route.path)?.title
})
</script>

<style lang="scss" scoped>
.main-view {
  width: 100%;
  height: 100vh;
  &__content {
    overflow: hidden;
  }
}
</style>