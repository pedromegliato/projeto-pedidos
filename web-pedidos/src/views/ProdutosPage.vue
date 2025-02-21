<template>
  <v-card>
    <v-card-title>
      <div class="d-flex flex-column w-100">
        <div class="d-flex align-center justify-space-between">
          <span class="text-h5">Produtos</span>
          <CustomButton variant="secondary" @click="openModal">Novo Produto</CustomButton>
        </div>
        <v-text-field
          v-model="search"
          label="Filtrar"
          class="mt-2"
          hide-details
          dense
        ></v-text-field>
      </div>
    </v-card-title>

    <base-data-table 
      :headers="headers" 
      :items="produtos" 
      :search="search"
      :loading="loading"
    >
      <template #actions="{ item }">
        <v-icon small class="mr-2" @click="editProduto(item)">mdi-pencil</v-icon>
        <v-icon small @click="openDeleteModal(item)">mdi-delete</v-icon>
      </template>
    </base-data-table>

    <ProductModal 
      v-model="modalOpen" 
      :product="selectedProduto" 
      @save="saveProduto" 
    />
    
    <ConfirmationModal
      v-model="deleteModalOpen"
      :title="`Excluir ${produtoToDelete.nome}`"
      :message="`Tem certeza que deseja excluir permanentemente o produto ${produtoToDelete.nome}?`"
      confirm-text="Excluir"
      confirm-color="error"
      :is-loading="isDeleting"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Produto } from '@/types/produto';
import BaseDataTable from '@/components/BaseDataTable.vue';
import ProductModal from '@/components/ProductModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import CustomButton from '@/components/CustomButton.vue';
import { useProduto } from '@/composables/useProduto';

export default defineComponent({
  name: 'ProdutosPage',
  components: { 
    BaseDataTable, 
    ProductModal, 
    ConfirmationModal,
    CustomButton
  },
  setup() {
    const {
      produtos,
      loading,
      modalOpen,
      selectedProduto,
      fetchProdutos,
      saveProduto,
      deleteProdutoHandler
    } = useProduto();

    const search = ref('');
    const headers = [
      { title: 'ID', key: 'id_produto' },
      { title: 'Nome', key: 'nome' },
      { title: 'Preço', key: 'preco' },
      { title: 'Ações', key: 'actions', sortable: false },
    ];

    const deleteModalOpen = ref(false);
    const isDeleting = ref(false);
    const produtoToDelete = ref<Produto>({ nome: '', preco: 0 });

    const openModal = () => {
      selectedProduto.value = { nome: '', preco: 0 };
      modalOpen.value = true;
    };

    const editProduto = (produto: Produto) => {
      selectedProduto.value = { ...produto };
      modalOpen.value = true;
    };

    const openDeleteModal = (produto: Produto) => {
      produtoToDelete.value = produto;
      deleteModalOpen.value = true;
    };

    const handleDeleteConfirm = async () => {
      try {
        isDeleting.value = true;
        if (produtoToDelete.value.id_produto) {
          await deleteProdutoHandler(produtoToDelete.value.id_produto);
        }
      } finally {
        isDeleting.value = false;
        deleteModalOpen.value = false;
      }
    };

    const handleDeleteCancel = () => {
      produtoToDelete.value = { nome: '', preco: 0 };
    };

    return {
      produtos,
      search,
      headers,
      loading,
      modalOpen,
      selectedProduto,
      deleteModalOpen,
      isDeleting,
      produtoToDelete,
      openModal,
      editProduto,
      openDeleteModal,
      handleDeleteConfirm,
      handleDeleteCancel,
      saveProduto,
      fetchProdutos
    };
  },
  mounted() {
    this.fetchProdutos();
  }
});
</script>