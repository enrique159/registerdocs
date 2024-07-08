<template>
  <div class="main-view">
    <v-app-bar color="light" density="comfortable" elevation="0">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" :icon="drawer ? '$close' : '$menu'" />
      <v-toolbar-title>{{ currentRoute }}</v-toolbar-title>
      <v-spacer />
      <v-tooltip text="Agregar registro" location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-plus" variant="text" @click="goToCreateRegister" />
        </template>
      </v-tooltip>
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" />
        </template>

        <v-list style="background: white !important;" density="compact" nav>
          <v-list-item link to="/">
            <div class="d-flex align-center">
              <v-icon class="tc-text-light ts-b3 mr-2">
                mdi-logout
              </v-icon>
              <span>Cerrar sesión</span>
            </div>
          </v-list-item>
          <v-list-item link @click="closeApp">
            <div class="d-flex align-center">
              <v-icon class="tc-peach-0 ts-b3 mr-2">
                mdi-close
              </v-icon>
              <span>Salir del programa</span>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
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
import { useRouter } from 'vue-router'

const itemsMenu = ref([
  {
    icon: 'mdi-file-document-multiple-outline',
    title: 'Documentos',
    value: 'documentos',
    link: '/main/home',
  },
  {
    icon: 'mdi-invoice-text-plus-outline',
    title: 'Agregar registro',
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
const router = useRouter()

const currentRoute = computed(() => {
  return itemsMenu.value.find((item) => item.link === route.path)?.title
})

const goToCreateRegister = () => {
  router.push('/main/create-register')
}

const closeApp = () => {
  window.electron.closeApp()
}
</script>

<style lang="scss" scoped>
.main-view {
  width: 100%;
  height: 100vh;
  &__app-bar {
    border-bottom: 1px solid $color-white-3;
  }
  &__content {
    overflow: hidden;
  }
}
</style>