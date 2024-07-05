import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import '@/styles/styles.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Change the default locale momentjs
import moment from 'moment'
import 'moment/dist/locale/es'
moment.locale('es')

// Global
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window { electron: any; }
}

// Toastify
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Datepicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi' },
})

app.component('DatePicker', VueDatePicker)

app.use(Vue3Toastify)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
