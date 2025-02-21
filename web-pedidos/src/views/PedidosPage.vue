<template>
  <v-card>
    <v-card-title>
      <div class="d-flex flex-column w-100">
        <!-- Cabeçalho com título e botão para novo Pedido -->
        <div class="d-flex align-center justify-space-between">
          <span class="text-h5">Pedidos</span>
          <CustomButton variant="secondary" @click="openPedidoModal">
            Novo Pedido
          </CustomButton>
        </div>
        <!-- Dropdown para filtrar pedidos por Cliente -->
        <v-select
          v-model="selectedClienteFiltro"
          :items="clientes"
          item-text="nome"
          item-value="id_cliente"
          label="Filtrar por Cliente"
          dense
          clearable
        ></v-select>
      </div>
    </v-card-title>

    <!-- Data-table dos Pedidos -->
    <base-data-table
      :headers="headers"
      :items="pedidosFiltrados"
      :search="search"
      :loading="loading"
    >
      <template #actions="{ item }">
        <v-icon small class="mr-2" @click="editPedido(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="openDeleteModal(item)">
          mdi-delete
        </v-icon>
        <v-icon small @click="openItensModal(item)">
          mdi-format-list-bulleted
        </v-icon>
      </template>
    </base-data-table>

    <!-- Modal de Pedido -->
    <PedidoModal
      v-model="pedidoModalOpen"
      :pedido="selectedPedido"
      :clientes="clientes"
      @save="savePedido"
    />

    <!-- Modal de Confirmação para Exclusão de Pedido -->
    <ConfirmationModal
      v-model="deleteModalOpen"
      :title="`Excluir Pedido #${pedidoToDelete.id_pedido}`"
      :message="`Tem certeza que deseja excluir este pedido?`"
      confirm-text="Excluir"
      confirm-color="error"
      :is-loading="isDeleting"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />

    <!-- Modal para Gerenciar Itens do Pedido -->
    <PedidoItensModal
      v-if="itensModalOpen"
      :pedido="selectedPedido"
      @close="itensModalOpen = false"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import type { Pedido } from '@/types/pedido';
import type { Cliente } from '@/types/cliente';
import BaseDataTable from '@/components/BaseDataTable.vue';
import PedidoModal from '@/components/PedidoModal.vue';
import PedidoItensModal from '@/components/PedidoItensModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import CustomButton from '@/components/CustomButton.vue';
import { usePedido } from '@/composables/usePedido';
import { getClientes } from '@/services/clienteService';

export default defineComponent({
  name: 'PedidosPage',
  components: {
    BaseDataTable,
    PedidoModal,
    PedidoItensModal,
    ConfirmationModal,
    CustomButton,
  },
  setup() {
    // Composable para pedidos
    const { pedidos, loading, pedidoModalOpen, selectedPedido, fetchPedidos, savePedido, deletePedidoHandler } = usePedido();
    const search = ref('');
    const clientes = ref<Cliente[]>([]);
    const selectedClienteFiltro = ref<number | null>(null);

    // Busca clientes
    const fetchClientes = async () => {
      try {
        const { data } = await getClientes();
        clientes.value = data;
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    // Filtra os pedidos conforme o cliente selecionado
    const pedidosFiltrados = computed(() => {
      if (!selectedClienteFiltro.value) return pedidos.value;
      return pedidos.value.filter(
        pedido => pedido.cliente.id_cliente === selectedClienteFiltro.value
      );
    });

    // Para exclusão de pedido
    const deleteModalOpen = ref(false);
    const isDeleting = ref(false);
    const pedidoToDelete = ref<Pedido>({
      data: new Date(),
      cliente: { id_cliente: 0, nome: '', email: '', telefone: '' },
    });

    const openPedidoModal = () => {
      selectedPedido.value = {
        data: new Date(),
        cliente: { id_cliente: 0, nome: '', email: '', telefone: '' },
      };
      pedidoModalOpen.value = true;
    };

    const editPedido = (pedido: Pedido) => {
      selectedPedido.value = { ...pedido };
      pedidoModalOpen.value = true;
    };

    const openDeleteModal = (pedido: Pedido) => {
      pedidoToDelete.value = pedido;
      deleteModalOpen.value = true;
    };

    const handleDeleteConfirm = async () => {
      try {
        isDeleting.value = true;
        if (pedidoToDelete.value.id_pedido) {
          await deletePedidoHandler(pedidoToDelete.value.id_pedido);
        }
      } finally {
        isDeleting.value = false;
        deleteModalOpen.value = false;
      }
    };

    const handleDeleteCancel = () => {
      pedidoToDelete.value = {
        data: new Date(),
        cliente: { id_cliente: 0, nome: '', email: '', telefone: '' },
      };
    };

    // Abre o modal para gerenciar os itens do pedido
    const itensModalOpen = ref(false);
    const openItensModal = (pedido: Pedido) => {
      selectedPedido.value = { ...pedido };
      itensModalOpen.value = true;
    };

    onMounted(() => {
      fetchPedidos();
      fetchClientes();
    });

    const headers = [
      { title: 'ID', key: 'id_pedido' },
      { title: 'Cliente', key: 'cliente.nome' },
      { title: 'Data', key: 'data' },
      { title: 'Ações', key: 'actions', sortable: false },
    ];

    return {
      pedidos,
      loading,
      pedidoModalOpen,
      selectedPedido,
      savePedido,
      deletePedidoHandler,
      clientes,
      selectedClienteFiltro,
      pedidosFiltrados,
      search,
      openPedidoModal,
      editPedido,
      openDeleteModal,
      deleteModalOpen,
      isDeleting,
      pedidoToDelete,
      handleDeleteConfirm,
      handleDeleteCancel,
      itensModalOpen,
      openItensModal,
      headers,
    };
  },
});
</script>
