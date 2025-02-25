import { ref } from 'vue';
import type { Cliente } from '@/types/cliente';
import { getClientes, createCliente, updateCliente, deleteCliente } from '@/services/clienteService';
import { useToast } from '@/composables/useToast';

export const useCliente = () => {
  const { success, error } = useToast();
  const clientes = ref<Cliente[]>([]);
  const loading = ref(false);
  const modalOpen = ref(false);
  const selectedCliente = ref<Cliente>({ nome: '', email: '', telefone: '' });

  const fetchClientes = async () => {
    try {
      loading.value = true;
      const { data } = await getClientes();
      clientes.value = data;
    } catch (err) {
      error('Erro ao carregar clientes');
      console.error('Erro ao buscar clientes:', err);
    } finally {
      loading.value = false;
    }
  };

  const saveCliente = async (cliente: Cliente) => {
    try {
      if (cliente.id_cliente) {
        await updateCliente(cliente.id_cliente, cliente);
        success('Cliente atualizado com sucesso');
      } else {
        const response = await createCliente(cliente);
        success('Cliente criado com sucesso');
        clientes.value.push(response.data);
      }
      modalOpen.value = false;
    } catch (err) {
      error('Erro ao salvar cliente');
      console.error('Erro ao salvar cliente:', err);
    }
  };

  const deleteClienteHandler = async (id_cliente: number) => {
    try {
      await deleteCliente(id_cliente);
      await fetchClientes();
      success('Cliente excluído com sucesso');
    } catch (err) {
      error('Erro ao excluir cliente');
      console.error('Erro ao excluir cliente:', err);
    }
  };

  return {
    clientes,
    loading,
    modalOpen,
    selectedCliente,
    fetchClientes,
    saveCliente,
    deleteClienteHandler
  };
};
