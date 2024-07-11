import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const config = ref({
    id: 1,
    inicializado: false,
    ruta_recursos: '',
  })
  const getConfig = computed(() => config.value)
  const setConfig = (newConfig: any) => config.value = newConfig

  // User
  const user = ref({ id: '', username: '' })
  const getUser = computed(() => user.value)
  const setUser = (newUser: any) => user.value = newUser
  const clearUser = () => user.value = { id: '', username: '' }

  return {
    // User
    user,
    getUser,
    setUser,
    clearUser,
    // Configuration
    config,
    getConfig,
    setConfig
  }
})