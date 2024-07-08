import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const user = ref({ id: 0,username: '' })

  const getUser = computed(() => user.value)

  const setUser = (newUser: any) => {
    user.value = newUser
  }

  return {
    user,
    getUser,
    setUser
  }
})