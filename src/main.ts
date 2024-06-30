import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/styles.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Change the default locale momentjs
import moment from 'moment'
import 'moment/dist/locale/es'
moment.locale('es')

// Global
declare global {
  interface Window { electron: any; }
}

// Toastify
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(Vue3Toastify)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
