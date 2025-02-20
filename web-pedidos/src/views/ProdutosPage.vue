<template>
    <v-card>
      <v-card-title>
        Produtos
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openDialog">Novo Produto</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="produtos"
        :search="search"
        class="elevation-1"
      >
        <template #top>
          <v-text-field v-model="search" label="Buscar" class="mx-4"></v-text-field>
        </template>
        <template #item.actions="{ item }">
          <v-icon small @click="editProduto(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteProduto(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <CrudDialog
        v-if="dialog"
        :data="selectedProduto"
        @close="closeDialog"
        @save="saveProduto"
      />
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import CrudDialog from '@/components/CrudDialog.vue';
  import { getProdutos, createProduto, updateProduto, deleteProduto } from '@/services/produtoService';
  
  interface Produto {
    id?: number;
    nome: string;
    preco: number;
  }
  
  export default defineComponent({
    name: 'ProdutosPage',
    components: { CrudDialog },
    setup() {
      const produtos = ref<Produto[]>([]);
      const search = ref('');
      const dialog = ref(false);
      const selectedProduto = ref<Produto | null>(null);
  
      const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Preço', value: 'preco' },
        { text: 'Ações', value: 'actions', sortable: false },
      ];
  
      const fetchProdutos = async () => {
        try {
          const response = await getProdutos();
          produtos.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      const openDialog = () => {
        selectedProduto.value = null;
        dialog.value = true;
      };
  
      const editProduto = (produto: Produto) => {
        selectedProduto.value = { ...produto };
        dialog.value = true;
      };
  
      const deleteProdutoAction = async (produto: Produto) => {
        if (produto.id) {
          await deleteProduto(produto.id);
          fetchProdutos();
        }
      };
  
      const closeDialog = () => {
        dialog.value = false;
      };
  
      const saveProduto = async (produtoData: Produto) => {
        try {
          if (produtoData.id) {
            await updateProduto(produtoData.id, produtoData);
          } else {
            await createProduto(produtoData);
          }
          fetchProdutos();
          closeDialog();
        } catch (error) {
          console.error(error);
        }
      };
  
      onMounted(fetchProdutos);
  
      return { produtos, headers, search, dialog, selectedProduto, openDialog, editProduto, deleteProduto: deleteProdutoAction, closeDialog, saveProduto };
    },
  });
  </script>
  