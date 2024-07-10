import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const user = ref({ id: '', username: '' })

  const getUser = computed(() => user.value)

  const setUser = (newUser: any) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = { id: '', username: '' }
  }

  return {
    user,
    getUser,
    setUser,
    clearUser
  }
})