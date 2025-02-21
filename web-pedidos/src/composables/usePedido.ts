import { ref } from 'vue';
import type { Pedido } from '@/types/pedido';
import { getPedidos, createPedido, updatePedido, deletePedido } from '@/services/pedidoService';
import { useToast } from '@/composables/useToast';

export const usePedido = () => {
  const { success, error } = useToast();
  const pedidos = ref<Pedido[]>([]);
  const loading = ref(false);
  const pedidoModalOpen = ref(false);
  const selectedPedido = ref<Pedido>({
    data: new Date(),
    cliente: { id_cliente: 0, nome: '', email: '', telefone: '' }
  });

  const fetchPedidos = async () => {
    try {
      loading.value = true;
      const { data } = await getPedidos();
      pedidos.value = data;
    } catch (err) {
      error('Erro ao carregar pedidos');
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const savePedido = async (pedido: Pedido) => {
    try {
      const cleanPedido = {
        ...pedido,
        itens: pedido.itens?.map(item => {
          const { pedido, ...rest } = item;
          return rest;
        })
      };

      if (pedido.id_pedido) {
        await updatePedido(pedido.id_pedido, cleanPedido as any);
        success('Pedido atualizado com sucesso');
      } else {
        await createPedido(cleanPedido as any);
        success('Pedido criado com sucesso');
      }
      await fetchPedidos();
      pedidoModalOpen.value = false;
    } catch (err) {
      error('Erro ao salvar pedido');
      console.error(err);
    }
  };

  const deletePedidoHandler = async (id_pedido: number) => {
    try {
      await deletePedido(id_pedido);
      await fetchPedidos();
      success('Pedido excluído com sucesso');
    } catch (err) {
      error('Erro ao excluir pedido');
      console.error(err);
    }
  };

  return {
    pedidos,
    loading,
    pedidoModalOpen,
    selectedPedido,
    fetchPedidos,
    savePedido,
    deletePedidoHandler,
  };
};
