<template>
  <v-dialog v-model="localDialog" max-width="800px">
    <v-card>
      <v-card-title>
        Itens do Pedido #{{ pedido.id_pedido }}
        <v-spacer></v-spacer>
        <CustomButton variant="secondary" @click="openItemModal">
          Novo Item
        </CustomButton>
      </v-card-title>
      <v-card-text>
        <!-- Dropdown para filtrar por Produto -->
        <v-select
          v-model="selectedProdutoFiltro"
          :items="produtos"
          item-text="nome"
          item-value="id_produto"
          label="Filtrar por Produto"
          dense
          clearable
        ></v-select>
        <base-data-table
          :headers="headers"
          :items="itensDisplay"
          :loading="loading"
        >
          <template #actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </base-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleClose">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  
    <!-- Modal para cadastro/edição de Item do Pedido -->
    <PedidoItemModal
      v-model="itemModalOpen"
      :item="selectedItem"
      :produtos="produtos"
      @save="saveItem"
    />
  </v-dialog>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import BaseDataTable from '@/components/BaseDataTable.vue';
import PedidoItemModal from '@/components/PedidoItemModal.vue';
import CustomButton from '@/components/CustomButton.vue';
import { usePedidoItem } from '@/composables/usePedidoItem';
import { getProdutos } from '@/services/produtoService';
import type { PedidoItem } from '@/types/pedidoItem';
  
export default defineComponent({
  name: 'PedidoItensModal',
  components: { BaseDataTable, PedidoItemModal, CustomButton },
  props: {
    pedido: { type: Object, required: true },
  },
  emits: ['close'],
  setup(props, { emit }) {
    // Dados raw dos itens (onde produto é objeto)
    const { pedidoItens, loading, fetchPedidoItens, savePedidoItem, deletePedidoItemHandler, selectedPedidoItem } = usePedidoItem(props.pedido.id_pedido);
    const localDialog = ref(true);
    const itemModalOpen = ref(false);
    const selectedProdutoFiltro = ref<number | null>(null);
    const produtos = ref([]);
  
    const headers = [
      { title: 'Produto', key: 'produto' },
      { title: 'Quantidade', key: 'quantidade' },
      { title: 'Preço', key: 'preco' },
      { title: 'Ações', key: 'actions', sortable: false },
    ];
  
    // Mapeia os itens raw para exibição, transformando o produto em seu nome
    const itensDisplay = computed(() => {
      const filtrados = !selectedProdutoFiltro.value
        ? pedidoItens.value
        : pedidoItens.value.filter(item => item.produto.id_produto === selectedProdutoFiltro.value);
      return filtrados.map(item => ({
        id_pedido_item: item.id_pedido_item,
        produto: item.produto.nome,
        quantidade: item.quantidade,
        preco: item.preco,
      }));
    });
  
    const openItemModal = () => {
      selectedPedidoItem.value = {
        pedido: props.pedido,
        produto: { id_produto: 0, nome: '', preco: 0 },
        quantidade: 1,
        preco: 0,
      };
      itemModalOpen.value = true;
    };
  
    const editItem = (item: any) => {
      const original = pedidoItens.value.find(i => i.id_pedido_item === item.id_pedido_item);
      if (original) {
        selectedPedidoItem.value = { ...original };
        itemModalOpen.value = true;
      }
    };
  
    const deleteItem = async (item: any) => {
      if (item.id_pedido_item) {
        await deletePedidoItemHandler(item.id_pedido_item);
      }
    };
  
    const saveItem = async (item: PedidoItem) => {
      await savePedidoItem(item);
      itemModalOpen.value = false;
    };
  
    const handleClose = () => {
      localDialog.value = false;
      emit('close');
    };
  
    const fetchProdutos = async () => {
      try {
        const { data } = await getProdutos();
        produtos.value = data;
      } catch (err) {
        console.error('Erro ao carregar produtos', err);
      }
    };
  
    onMounted(() => {
      fetchPedidoItens();
      fetchProdutos();
    });
  
    return {
      localDialog,
      loading,
      headers,
      itensDisplay,
      selectedProdutoFiltro,
      itemModalOpen,
      produtos,
      selectedItem: selectedPedidoItem,
      openItemModal,
      editItem,
      deleteItem,
      saveItem,
      handleClose,
    };
  },
});
</script>
