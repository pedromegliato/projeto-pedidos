<template>
  <v-card>
    <v-card-title>
      Pedidos
      <v-spacer></v-spacer>
      <v-btn color="primary">Novo Pedido</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pedidos"
      :search="search"
      class="elevation-1"
    >
      <template #top>
        <v-text-field v-model="search" label="Buscar" class="mx-4"></v-text-field>
      </template>
      <template #item.actions="{ item }">
        <v-icon small @click="editPedido(item)">mdi-pencil</v-icon>
        <v-icon small @click="deletePedido(item)">mdi-delete</v-icon>
        <v-icon small @click="viewItens(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getPedidos, deletePedido } from '@/services/pedidoService';

interface Pedido {
  id?: number;
  cliente: string;
  data: string;
}

export default defineComponent({
  name: 'PedidosPage',
  setup() {
    const pedidos = ref<Pedido[]>([]);
    const search = ref('');
    const headers = [
      { text: 'ID', value: 'id' },
      { text: 'Cliente', value: 'cliente' },
      { text: 'Data', value: 'data' },
      { text: 'Ações', value: 'actions', sortable: false },
    ];

    const fetchPedidos = async () => {
      try {
        const response = await getPedidos();
        pedidos.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const editPedido = (pedido: Pedido) => {
      console.log('Editar pedido:', pedido);
    };

    const deletePedidoAction = async (pedido: Pedido) => {
      if (pedido.id) {
        await deletePedido(pedido.id);
        fetchPedidos();
      }
    };

    const viewItens = (pedido: Pedido) => {
      console.log('Visualizar itens do pedido:', pedido);
    };

    onMounted(fetchPedidos);

    return {
      pedidos,
      headers,
      search,
      editPedido,
      deletePedido: deletePedidoAction,
      viewItens,
    };
  },
});
</script>

<style scoped>
</style>
