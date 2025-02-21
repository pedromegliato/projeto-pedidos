<template>
    <v-card>
      <v-card-title>
        Itens do Pedido
        <v-spacer></v-spacer>
        <v-btn color="primary">Novo Item</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="itens"
        :search="search"
        class="elevation-1"
      >
        <template #top>
          <v-text-field v-model="search" label="Buscar" class="mx-4"></v-text-field>
        </template>
        <template #item.actions="{ item }">
          <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getPedidoItens, deletePedidoItem } from '@/services/pedidoItemService';
  
  interface PedidoItem {
    id?: number;
    produto: string;
    quantidade: number;
  }
  
  export default defineComponent({
    name: 'PedidoItensPage',
    props: {
      pedidoId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const itens = ref<PedidoItem[]>([]);
      const search = ref('');
      const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Produto', value: 'produto' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Ações', value: 'actions', sortable: false },
      ];
  
      const fetchItens = async () => {
        try {
          const response = await getPedidoItens(props.pedidoId);
          itens.value = response.data.map(item => ({
            id_pedido_item: item.id_pedido_item,
            produto: item.produto.nome, // transforma o objeto em string
            quantidade: item.quantidade,
            preco: item.preco,
          }));

        } catch (error) {
          console.error(error);
        }
      };
  
      const editItem = (item: PedidoItem) => {
        // Implementar edição
      };
  
      const deleteItemAction = async (item: PedidoItem) => {
        if (item.id) {
          await deletePedidoItem(props.pedidoId, item.id);
          fetchItens();
        }
      };
  
      onMounted(fetchItens);
  
      return { itens, headers, search, editItem, deleteItem: deleteItemAction };
    },
  });
  </script>
  