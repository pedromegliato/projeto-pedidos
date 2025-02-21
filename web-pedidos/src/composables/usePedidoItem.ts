import { ref } from 'vue';
import type { PedidoItem } from '@/types/pedidoItem';
import { getPedidoItens, createPedidoItem, updatePedidoItem, deletePedidoItem } from '@/services/pedidoItemService';
import { useToast } from '@/composables/useToast';

export const usePedidoItem = (pedidoId: number) => {
  const { success, error } = useToast();
  const pedidoItens = ref<PedidoItem[]>([]);
  const loading = ref(false);
  const modalOpen = ref(false);
  const selectedPedidoItem = ref<PedidoItem>({
    pedido: { data: new Date(), cliente: { id_cliente: 0, nome: '', email: '', telefone: '' } },
    produto: { id_produto: 0, nome: '', preco: 0 },
    quantidade: 1,
    preco: 0
  });

  const fetchPedidoItens = async () => {
    try {
      loading.value = true;
      const { data } = await getPedidoItens(pedidoId);
      pedidoItens.value = data;
    } catch (err) {
      error('Erro ao carregar itens do pedido');
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const savePedidoItem = async (pedidoItem: PedidoItem) => {
    try {
      if (pedidoItem.id_pedido_item) {
        await updatePedidoItem(pedidoId, pedidoItem.id_pedido_item, pedidoItem);
        success('Item do pedido atualizado com sucesso');
      } else {
        await createPedidoItem(pedidoId, pedidoItem);
        success('Item do pedido criado com sucesso');
      }
      await fetchPedidoItens();
      modalOpen.value = false;
    } catch (err) {
      error('Erro ao salvar item do pedido');
      console.error(err);
    }
  };

  const deletePedidoItemHandler = async (id: number) => {
    try {
      await deletePedidoItem(pedidoId, id);
      await fetchPedidoItens();
      success('Item do pedido excluído com sucesso');
    } catch (err) {
      error('Erro ao excluir item do pedido');
      console.error(err);
    }
  };

  return {
    pedidoItens,
    loading,
    modalOpen,
    selectedPedidoItem,
    fetchPedidoItens,
    savePedidoItem,
    deletePedidoItemHandler,
  };
};
