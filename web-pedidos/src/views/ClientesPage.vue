<template>
  <v-card>
    <v-card-title>
      <div class="d-flex flex-column w-100">
        <div class="d-flex align-center justify-space-between">
          <span class="text-h5">Clientes</span>
          <CustomButton variant="secondary" @click="openModal">Novo Cliente</CustomButton>
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
      :items="clientes" 
      :search="search"
      :loading="loading"
    >
      <template #actions="{ item }">
        <v-icon small class="mr-2" @click="editCliente(item)">mdi-pencil</v-icon>
        <v-icon small @click="openDeleteModal(item)">mdi-delete</v-icon>
      </template>
    </base-data-table>

    <ClientModal 
      v-model="modalOpen" 
      :cliente="selectedCliente" 
      @save="saveCliente" 
    />
    
    <ConfirmationModal
      v-model="deleteModalOpen"
      :title="`Excluir ${clienteToDelete.nome}`"
      :message="`Tem certeza que deseja excluir o cliente ${clienteToDelete.nome}?`"
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
import type { Cliente } from '@/types/cliente';
import BaseDataTable from '@/components/BaseDataTable.vue';
import ClientModal from '@/components/ClientModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import CustomButton from '@/components/CustomButton.vue';
import { useCliente } from '@/composables/useCliente';

export default defineComponent({
  name: 'ClientesPage',
  components: { 
    BaseDataTable, 
    ClientModal, 
    ConfirmationModal,
    CustomButton,
  },
  setup() {
    const {
      clientes,
      loading,
      modalOpen,
      selectedCliente,
      fetchClientes,
      saveCliente,
      deleteClienteHandler,
    } = useCliente();

    const search = ref('');
    const headers = [
      { title: 'ID', key: 'id_cliente' },
      { title: 'Nome', key: 'nome' },
      { title: 'Email', key: 'email' },
      { title: 'Telefone', key: 'telefone' },
      { title: 'Ações', key: 'actions', sortable: false },
    ];

    const deleteModalOpen = ref(false);
    const isDeleting = ref(false);
    const clienteToDelete = ref<Cliente>({ nome: '', email: '', telefone: '' });

    const openModal = () => {
      selectedCliente.value = { nome: '', email: '', telefone: '' };
      modalOpen.value = true;
    };

    const editCliente = (cliente: Cliente) => {
      selectedCliente.value = { ...cliente };
      modalOpen.value = true;
    };

    const openDeleteModal = (cliente: Cliente) => {
      clienteToDelete.value = cliente;
      deleteModalOpen.value = true;
    };

    const handleDeleteConfirm = async () => {
      try {
        isDeleting.value = true;
        if (clienteToDelete.value.id_cliente) {
          await deleteClienteHandler(clienteToDelete.value.id_cliente);
        }
      } finally {
        isDeleting.value = false;
        deleteModalOpen.value = false;
      }
    };

    const handleDeleteCancel = () => {
      clienteToDelete.value = { nome: '', email: '', telefone: '' };
    };

    return {
      clientes,
      search,
      headers,
      loading,
      modalOpen,
      selectedCliente,
      deleteModalOpen,
      isDeleting,
      clienteToDelete,
      openModal,
      editCliente,
      openDeleteModal,
      handleDeleteConfirm,
      handleDeleteCancel,
      saveCliente,
      fetchClientes,
    };
  },
  mounted() {
    this.fetchClientes();
  }
});
</script>
