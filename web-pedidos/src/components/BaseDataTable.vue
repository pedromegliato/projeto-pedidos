<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    class="elevation-1"
  >
    <template #[`item.preco`]="{ value }">
      {{ formatCurrency(value) }}
    </template>

    <template #[`item.actions`]="{ item }">
      <slot name="actions" :item="item" />
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
    }
  },
  methods: {
    formatCurrency(value: number) {
      return `R$ ${currencyFormatter.format(value)}`;
    }
  }
});
</script>