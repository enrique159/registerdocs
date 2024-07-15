<template>
  <div class="main-view">
    <v-app-bar color="light" density="comfortable" elevation="0" class="bs-1">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" :icon="drawer ? '$close' : '$menu'" />
      <v-toolbar-title>{{ currentRoute }}</v-toolbar-title>
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon="mdi-plus" v-bind="props" />
        </template>

        <v-list style="background: white !important;" density="compact" nav>
          <v-list-item link @click="goToCreateDocument">
            <div class="d-flex align-center">
              <v-icon class="tc-blue-0 ts-b3 mr-2">
                mdi-file-document-plus
              </v-icon>
              <span>Agregar documento</span>
            </div>
          </v-list-item>
          <v-list-item link @click="createAreaDialog = true">
            <div class="d-flex align-center">
              <v-icon class="tc-yellow-0 ts-b3 mr-2">
                mdi-domain-plus
              </v-icon>
              <span>Agregar área</span>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" />
        </template>

        <v-list style="background: white !important;" density="compact" nav>
          <v-list-item link @click="goToSignIn">
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
      <div class="d-flex flex-column h-100">

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
  
        <v-spacer></v-spacer>
  
        <v-list dense nav>
          <v-list-item link prepend-icon="mdi-cog" title="Configuracion" to="/main/settings" />
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main class="main-view__content">
      <router-view />
    </v-main>

    <create-area :create-area-dialog="createAreaDialog" @update:createAreaDialog="createAreaDialog = $event" />
  </div>
</template>

<script setup lang="ts">
import CreateArea from '@/components/CreateArea/CreateArea.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const itemsMenu = ref([
  {
    icon: 'mdi-file-document-multiple-outline',
    title: 'Documentos',
    value: 'documentos',
    link: '/main/home',
  },
  {
    icon: 'mdi-domain',
    title: 'Áreas y departamentos',
    value: 'areas',
    link: '/main/areas',
  },
  {
    icon: 'mdi-account-multiple',
    title: 'Contactos',
    value: 'contacts',
    link: '/main/contacts',
  },
  {
    icon: 'mdi-calendar',
    title: 'Calendario',
    value: 'calendar',
    link: '/main/calendar',
  }
])

const createAreaDialog = ref(false)
const drawer = ref(false)
const route = useRoute()
const router = useRouter()
const { clearUser } = useAppStore()

const currentRoute = computed(() => {
  return itemsMenu.value.find((item) => item.link === route.path)?.title || 'Configuración'
})

const goToCreateDocument = () => {
  router.push('/main/create-document')
}

const goToSignIn = () => {
  clearUser()
  router.push('/')
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