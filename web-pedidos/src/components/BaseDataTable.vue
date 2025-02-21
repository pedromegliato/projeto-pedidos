<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    class="elevation-1"
  >
    <!-- Formatação do preço -->
    <template v-slot:item.preco="slotProps">
      {{ formatCurrency(slotProps.value) }}
    </template>

    <!-- Formatação do total -->
    <template v-slot:item.total="slotProps">
      <slot name="item.total" v-bind="slotProps">
        {{ formatCurrency(slotProps.value) }}
      </slot>
    </template>

    <template v-slot:item.actions="{ item }">
      <slot name="actions" :item="item"></slot>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { currencyFormatter } from '@/utils/formatters';

export default defineComponent({
  name: 'BaseDataTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    search: {
      type: String,
      default: '',
    },
  },
  methods: {
    formatCurrency(value: number | null | undefined) {
      if (value == null) return 'R$ 0,00';
      return `R$ ${currencyFormatter.format(value)}`;
    },
  },
});
</script>
