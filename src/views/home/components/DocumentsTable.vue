<template>
  <v-card class="bg-white-1" flat style="overflow-y: auto">
    <template #text>
      <div class="d-flex justify-space-between align-center ga-4">
        <v-text-field
          v-model="search"
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          density="compact"
          class="custom-input max-w-256-px"
        />
      </div>
    </template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    />
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getDocuments } from '@/api/electron';

const search = ref('')

const headers = [
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Dessert (100g serving)',
  },
  { key: 'calories', title: 'Calories' },
  { key: 'fat', title: 'Fat (g)' },
  { key: 'carbs', title: 'Carbs (g)' },
  { key: 'protein', title: 'Protein (g)' },
  { key: 'iron', title: 'Iron (%)' },
]

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  },
]

onBeforeMount(() => {
  getDocuments((response: any) => {
    console.log(response);
  });
})
</script>

<style lang="scss" scoped>
.custom-input :deep(.v-field) {
  border-radius: 12px;
}
</style>