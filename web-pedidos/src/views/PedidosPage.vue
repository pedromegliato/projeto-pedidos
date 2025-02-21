<template>
  <v-card>
    <v-card-title>
      <div class="d-flex flex-column w-100">
        <div class="d-flex align-center justify-space-between">
          <span class="text-h5">Pedidos</span>
          <CustomButton variant="secondary" @click="openPedidoModal">
            Novo Pedido
          </CustomButton>
        </div>
        <v-select
          v-model="selectedClienteFiltro"
          :items="clientes"
          item-title="nome"
          item-value="id_cliente"
          label="Filtrar por Cliente"
          dense
          clearable
        ></v-select>
      </div>
    </v-card-title>

    <base-data-table
      :headers="headers"
      :items="pedidosFiltrados"
      :search="search"
      :loading="loading"
      item-key="id_pedido"
    >
      <template #actions="{ item }">
        <v-icon small class="mr-2" @click="editPedido(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="openDeleteModal(item)">
          mdi-delete
        </v-icon>
      </template>

      <template #item.total="{ item }">
        {{ formatCurrency(item.total) }}
      </template>
    </base-data-table>

    <PedidoModal
      v-model="pedidoModalOpen"
      :pedido="selectedPedido"
      :clientes="clientes"
      @save="savePedido"
    />

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
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import type { Pedido } from '@/types/pedido';
import type { Cliente } from '@/types/cliente';
import BaseDataTable from '@/components/BaseDataTable.vue';
import PedidoModal from '@/components/PedidoModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import CustomButton from '@/components/CustomButton.vue';
import { usePedido } from '@/composables/usePedido';
import { getClientes } from '@/services/clienteService';

export default defineComponent({
  name: 'PedidosPage',
  components: {
    BaseDataTable,
    PedidoModal,
    ConfirmationModal,
    CustomButton,
  },
  setup() {
    const { pedidos, loading, pedidoModalOpen, selectedPedido, fetchPedidos, savePedido, deletePedidoHandler } = usePedido();
    const search = ref('');
    const clientes = ref<Cliente[]>([]);
    const selectedClienteFiltro = ref<number | null>(null);

    const fetchClientes = async () => {
      try {
        const { data } = await getClientes();
        clientes.value = data;
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    const computeOrderTotal = (pedido: Pedido): number => {
      if (!pedido.itens || !Array.isArray(pedido.itens)) return 0;
      return pedido.itens.reduce((acc, item) => {
        return acc + ((item.qtde || 0) * (item.preco || 0));
      }, 0);
    };

    const pedidosFiltrados = computed(() => {
      let filtrados = !selectedClienteFiltro.value
        ? pedidos.value
        : pedidos.value.filter(
            (pedido) => pedido.cliente?.id_cliente === selectedClienteFiltro.value
          );
      return filtrados.map((pedido) => ({
        ...pedido,
        total: computeOrderTotal(pedido)
      }));
    });

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

    onMounted(() => {
      fetchPedidos();
      fetchClientes();
    });

    const headers = [
      { title: 'ID', key: 'id_pedido' },
      { title: 'Cliente', key: 'cliente.nome' },
      { title: 'Data', key: 'data' },
      { title: 'Total', key: 'total' },
      { title: 'Ações', key: 'actions', sortable: false },
    ];

    const formatCurrency = (value: number | null | undefined): string => {
      if (value == null) return 'R$ 0,00';
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

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
      headers,
      computeOrderTotal,
      formatCurrency,
    };
  },
});
</script>
