<template>
  <v-card>
    <v-card-title>
      Clientes
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="novoCliente">Novo Cliente</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="clientes"
      :search="search"
      class="elevation-1"
    >
      <template #top>
        <v-text-field v-model="search" label="Buscar" class="mx-4"></v-text-field>
      </template>
      <template #item.actions="{ item }">
        <v-icon small @click="editCliente(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteCliente(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getClientes, deleteCliente } from '@/services/clienteService';

interface Cliente {
  id?: number;
  nome: string;
  email: string;
}

export default defineComponent({
  name: 'ClientesPage',
  setup() {
    const clientes = ref<Cliente[]>([]);
    const search = ref('');
    const headers = [
      { text: 'ID', value: 'id' },
      { text: 'Nome', value: 'nome' },
      { text: 'Email', value: 'email' },
      { text: 'Ações', value: 'actions', sortable: false },
    ];

    const fetchClientes = async () => {
      try {
        const response = await getClientes();
        clientes.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const editCliente = (cliente: Cliente) => {
      console.log('Editar cliente:', cliente);
    };

    const deleteClienteAction = async (cliente: Cliente) => {
      if (cliente.id) {
        await deleteCliente(cliente.id);
        fetchClientes();
      }
    };

    const novoCliente = () => {
      console.log('Novo cliente acionado');
    };

    onMounted(fetchClientes);

    return {
      clientes,
      headers,
      search,
      editCliente,
      deleteCliente: deleteClienteAction,
      novoCliente,
    };
  },
});
</script>

<style scoped>
</style>
