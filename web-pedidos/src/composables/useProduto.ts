import { ref } from 'vue';
import type { Produto } from '@/types/produto';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '@/services/produtoService';
import { useToast } from '@/composables/useToast';

export const useProduto = () => {
  const { success, error } = useToast();
  const produtos = ref<Produto[]>([]);
  const loading = ref(false);
  const modalOpen = ref(false);
  const selectedProduto = ref<Produto>({ nome: '', preco: 0 });

  const fetchProdutos = async () => {
    try {
      loading.value = true;
      const { data } = await getProdutos();
      produtos.value = data;
    } catch (err) {
      error('Erro ao carregar produtos');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      loading.value = false;
    }
  };

  const saveProduto = async (produto: Produto) => {
    try {
      if (produto.id_produto) {
        await updateProduto(produto.id_produto, produto);
        success('Produto atualizado com sucesso');
      } else {
        await createProduto(produto);
        success('Produto criado com sucesso');
      }
      await fetchProdutos();
      modalOpen.value = false;
    } catch (err) {
      error('Erro ao salvar produto');
      console.error('Erro ao salvar produto:', err);
    }
  };

  const deleteProdutoHandler = async (id_produto: number) => {
    try {
      await deleteProduto(id_produto);
      await fetchProdutos();
      success('Produto excluído com sucesso');
    } catch (err) {
      error('Erro ao excluir produto');
      console.error('Erro ao excluir produto:', err);
    }
  };

  return {
    produtos,
    loading,
    modalOpen,
    selectedProduto,
    fetchProdutos,
    saveProduto,
    deleteProdutoHandler
  };
};