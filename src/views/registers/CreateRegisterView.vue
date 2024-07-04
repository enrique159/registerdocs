<template>
  <div class="create-register-view">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              label="Nombre"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              label="Correo"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phone"
              label="Teléfono"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="address"
              label="Dirección"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="city"
              label="Ciudad"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="state"
              label="Estado"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="zip"
              label="Código postal"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="country"
              label="País"
              outlined
              required
            />
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="submit">
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const city = ref('')
const state = ref('')
const zip = ref('')
const country = ref('')

const submit = () => {
  console.log('submit')
}
</script>

<style lang="scss" scoped>

</style>