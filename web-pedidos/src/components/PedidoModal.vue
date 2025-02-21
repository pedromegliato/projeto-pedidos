<template>
  <v-dialog v-model="localDialog" max-width="800px">
    <v-card>
      <v-card-title class="text-h5">
        {{ isEdit ? 'Editar Pedido' : 'Novo Pedido' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <div class="d-flex align-center mb-4">
            <v-select
              label="Cliente"
              v-model="selectedCliente"
              :items="localClientes"
              item-title="nome"
              item-value="id_cliente"
              placeholder="Selecione um cliente..."
              return-object
              clearable
              dense
              no-data-text="Nenhum cliente disponível"
              class="flex-grow-1"
            ></v-select>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn icon color="primary" v-bind="attrs" v-on="on || {}" @click="openClientModal">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Cadastrar novo cliente</span>
            </v-tooltip>
          </div>

          <v-text-field label="Data" v-model="dataPedido" type="date" required></v-text-field>

          <div class="mt-6">
            <h3 class="text-h6 mb-2">Itens do Pedido</h3>
            <div class="d-flex align-center mb-2">
              <v-select
                label="Produto"
                v-model="selectedProduct"
                :items="localProducts"
                item-title="nome"
                item-value="id_produto"
                placeholder="Selecione um produto..."
                return-object
                clearable
                dense
                no-data-text="Nenhum produto disponível"
                class="flex-grow-1"
              ></v-select>

              <v-text-field
                label="Quantidade"
                v-model.number="newItemQuantity"
                type="number"
                min="1"
                class="mx-2"
                dense
                style="max-width: 100px"
              ></v-text-field>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn icon color="primary" v-bind="attrs" v-on="on || {}" @click="openProductModal">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Cadastrar novo produto</span>
              </v-tooltip>
              <v-btn
                color="primary"
                class="ml-2"
                @click="addItem"
                :disabled="!selectedProduct || newItemQuantity < 1"
              >
                Adicionar Item
              </v-btn>
            </div>

            <v-data-table
              :headers="itemHeaders"
              :items="orderItems"
              class="elevation-1"
              disable-sort
              hide-default-footer
            >
              <template #item.produto="{ item }">
                {{ item.produto.nome }}
              </template>

              <template #item.qtde="{ item }">
                <v-text-field
                  v-model.number="item.qtde"
                  type="number"
                  :min="1"
                  dense
                  hide-details
                  style="max-width: 80px"
                />
              </template>

              <template #item.preco="{ item }">
                {{ formatCurrency(item.preco) }}
              </template>

              <template #item.actions="{ item, index }">
                <v-icon small class="mr-2" @click="openEditProductModal(index)">mdi-pencil</v-icon>
                <v-icon small @click="openRemoveItemModal(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>

            <div class="mt-4 text-right font-weight-bold">
              Total: {{ formatCurrency(orderTotal) }}
            </div>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn text @click="handleClose">Cancelar</v-btn>

        <v-btn color="primary" @click="handleSave" :disabled="!canSave">
          {{ isEdit ? 'Salvar' : 'Criar' }}
        </v-btn>

      </v-card-actions>
    </v-card>

    <ClientModal
      v-model="clientModalOpen"
      :cliente="newClient"
      @save="handleClientSave"
    />

    <ProductModal
      v-model="productModalOpen"
      :product="productModalProduct"
      @save="handleProductSave"
    />

    <ConfirmationModal
      v-model="removeItemModalOpen"
      title="Remover Item"
      message="Tem certeza que deseja remover este item do pedido?"
      confirm-text="Remover"
      confirm-color="error"
      @confirm="confirmRemoveItem"
      @cancel="cancelRemoveItem"
    />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, PropType } from 'vue';
import type { Pedido } from '@/types/pedido';
import type { Cliente } from '@/types/cliente';
import type { Produto } from '@/types/produto';
import type { PedidoItem } from '@/types/pedidoItem';
import ClientModal from '@/components/ClientModal.vue';
import ProductModal from '@/components/ProductModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { getClientes } from '@/services/clienteService';
import { getProdutos, createProduto } from '@/services/produtoService';
import { currencyFormatter } from '@/utils/formatters';
import { useToast } from '@/composables/useToast';

export default defineComponent({
  name: 'PedidoModal',
  components: { ClientModal, ProductModal, ConfirmationModal },
  props: {
    modelValue: { type: Boolean, required: true },
    pedido: {
      type: Object as PropType<Pedido>,
      default: () => ({
        data: new Date(),
        cliente: null,
        itens: []
      })
    },
    clientes: { type: Array as PropType<Cliente[]>, required: true }
  },
  emits: ['update:modelValue', 'save', 'refresh-clientes', 'refresh-produtos'],
  setup(props, { emit }) {
    const { error: toastError, success: toastSuccess } = useToast();
    const localDialog = ref(props.modelValue);
    const valid = ref(false);
    const formData = ref<Pedido>({ ...props.pedido });

    if (!formData.value.id_pedido) {
      formData.value.cliente = null;
    }

    const selectedCliente = ref<Cliente | null>(formData.value.cliente);

    const localClientes = ref<Cliente[]>([...props.clientes]);
    const localProducts = ref<Produto[]>([]);
    watch(() => props.clientes, (newClients) => {
      localClientes.value = [...newClients];
    }, { immediate: true });

    const clientModalOpen = ref(false);
    const newClient = ref<Cliente>({ nome: '', email: '', telefone: '' });
    const productModalOpen = ref(false);
    const newProduct = ref<Produto>({ nome: '', preco: 0 });

    const selectedProduct = ref<Produto | null>(null);
    const newItemQuantity = ref<number>(1);
    const orderItems = ref<PedidoItem[]>(formData.value.itens || []);

    const itemHeaders = [
      { title: 'Produto', key: 'produto' },
      { title: 'Quantidade', key: 'qtde' },
      { title: 'Preço', key: 'preco' },
      { title: 'Ações', key: 'actions', sortable: false }
    ];

    const dataPedido = computed({
      get: () => {
        if (formData.value.data instanceof Date) {
          const yyyy = formData.value.data.getFullYear();
          const mm = String(formData.value.data.getMonth() + 1).padStart(2, '0');
          const dd = String(formData.value.data.getDate()).padStart(2, '0');
          return `${yyyy}-${mm}-${dd}`;
        }
        return formData.value.data;
      },
      set: (value: string) => {
        formData.value.data = new Date(value);
      }
    });

    const nomeCliente = computed(() =>
      selectedCliente.value ? selectedCliente.value.nome : ''
    );

    function formatCurrency(value: number) {
      return `R$ ${currencyFormatter.format(value)}`;
    }

    const productModalProduct = computed(() => selectedProduct.value ?? newProduct.value);

    const orderTotal = computed(() =>
      orderItems.value.reduce((sum, item) => sum + (item.preco * item.qtde), 0)
    );

    const canSave = computed(() => {
      return selectedCliente.value !== null && orderItems.value.length > 0 && valid.value;
    });

    watch(() => props.modelValue, (newVal) => {
      localDialog.value = newVal;
      if (newVal) {
        formData.value = { ...props.pedido };
        if (!formData.value.id_pedido) {
          formData.value.cliente = null;
          selectedCliente.value = null;
        } else {
          selectedCliente.value = formData.value.cliente;
        }
        orderItems.value = formData.value.itens || [];
      }
    });

    watch(() => props.pedido, (newPedido) => {
      formData.value = { ...newPedido };
      orderItems.value = newPedido.itens || [];
    }, { immediate: true });

    watch(localDialog, (newVal) => {
      emit('update:modelValue', newVal);
    });

    const isEdit = computed(() => !!formData.value.id_pedido);

    const handleClose = () => emit('update:modelValue', false);

    const handleSave = () => {
      formData.value.itens = orderItems.value;
      formData.value.cliente = selectedCliente.value;

      emit('save', { ...formData.value });

    };

    const fetchProducts = async () => {
      try {
        const { data } = await getProdutos();
        localProducts.value = data;
      } catch (err) {
        console.error('Erro ao atualizar produtos:', err);
      }
    };

    const fetchClientes = async () => {
      try {
        const { data } = await getClientes();
        localClientes.value = data;
      } catch (err) {
        console.error('Erro ao atualizar clientes:', err);
      }
    };

    const openClientModal = () => {
      newClient.value = { nome: '', email: '', telefone: '' };
      clientModalOpen.value = true;
    };

    const handleClientSave = async (cliente: Cliente) => {
      try {
        clientModalOpen.value = false;
        await fetchClientes();
        selectedCliente.value = localClientes.value.find(
          (c) => c.id_cliente === cliente.id_cliente
        ) || cliente;
        toastSuccess('Cliente salvo com sucesso');
        emit('refresh-clientes');
      } catch (err) {
        console.error('Erro ao salvar novo cliente:', err);
      }
    };

    const openProductModal = () => {
      selectedProduct.value = null;
      productModalOpen.value = true;
    };

    const editingOrderIndex = ref<number | null>(null);
    const openEditProductModal = (index: number) => {
      editingOrderIndex.value = index;
      selectedProduct.value = { ...orderItems.value[index].produto };
      productModalOpen.value = true;
    };

    const handleProductSave = async (produto: Produto) => {
      try {
        const { data } = await createProduto(produto);
        productModalOpen.value = false;
        await fetchProducts();
        if (editingOrderIndex.value !== null) {
          const updatedProduct = localProducts.value.find((p) => p.id_produto === data.id_produto) || data;
          orderItems.value[editingOrderIndex.value].produto = updatedProduct;
          orderItems.value[editingOrderIndex.value].preco = updatedProduct.preco;
          editingOrderIndex.value = null;
          toastSuccess('Produto atualizado com sucesso');
        } else {
          selectedProduct.value =
            localProducts.value.find((p) => p.id_produto === data.id_produto) || data;
          toastSuccess('Produto criado com sucesso');
        }
        emit('refresh-produtos');
      } catch (err) {
        console.error('Erro ao salvar produto:', err);
      }
    };

    const addItem = () => {
      if (!selectedProduct.value || newItemQuantity.value < 1) return;
      const existe = orderItems.value.find(
        (item) => item.produto.id_produto === selectedProduct.value!.id_produto
      );
      if (existe) {
        toastError('Este produto já foi adicionado ao pedido. Você pode editar a quantidade na coluna.');
        return;
      }
      const newItem: PedidoItem = {
        pedido: formData.value,
        produto: selectedProduct.value,
        qtde: newItemQuantity.value,
        preco: selectedProduct.value.preco,
      };
      orderItems.value.push(newItem);
      console.log('Item adicionado:', newItem);
      selectedProduct.value = null;
      newItemQuantity.value = 1;
    };

    const removeItemModalOpen = ref(false);
    const itemToRemove = ref<PedidoItem | null>(null);
    const openRemoveItemModal = (item: PedidoItem) => {
      itemToRemove.value = item;
      removeItemModalOpen.value = true;
    };

    const confirmRemoveItem = () => {
      if (itemToRemove.value) {
        orderItems.value = orderItems.value.filter((i) => i !== itemToRemove.value);
        toastSuccess('Item removido com sucesso');
      }
      removeItemModalOpen.value = false;
      itemToRemove.value = null;
    };

    const cancelRemoveItem = () => {
      removeItemModalOpen.value = false;
      itemToRemove.value = null;
    };

    fetchProducts();

    return {
      localDialog,
      valid,
      formData,
      isEdit,
      dataPedido,
      handleClose,
      handleSave,
      clientModalOpen,
      openClientModal,
      newClient,
      handleClientSave,
      fetchClientes,
      localClientes,
      localProducts,
      productModalOpen,
      openProductModal,
      newProduct,
      handleProductSave,
      selectedProduct,
      newItemQuantity,
      orderItems,
      addItem,
      nomeCliente,
      itemHeaders,
      formatCurrency,
      productModalProduct,
      openEditProductModal,
      openRemoveItemModal,
      removeItemModalOpen,
      confirmRemoveItem,
      cancelRemoveItem,
      orderTotal,
      canSave,
      selectedCliente
    };
  }
});
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}
</style>
