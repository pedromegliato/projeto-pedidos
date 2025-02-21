<template>
  <v-dialog v-model="localDialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        {{ isEdit ? 'Editar Item' : 'Novo Item' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Seleção do Produto -->
          <v-select
            label="Produto"
            v-model="formData.produto.id_produto"
            :items="produtos"
            item-text="nome"
            item-value="id_produto"
            :rules="[v => !!v || 'Obrigatório']"
            required
          ></v-select>
          <!-- Exibe o nome do Produto selecionado -->
          <v-text-field label="Nome do Produto" v-model="nomeProduto" readonly></v-text-field>
          <v-text-field
            label="Quantidade"
            v-model="formData.quantidade"
            type="number"
            :rules="[v => v > 0 || 'Mínimo 1']"
            required
          ></v-text-field>
          <v-text-field
            label="Preço"
            v-model="formData.preco"
            type="number"
            :rules="[v => v > 0 || 'Valor inválido']"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleClose">Cancelar</v-btn>
        <v-btn color="primary" @click="handleSave" :disabled="!valid">
          {{ isEdit ? 'Salvar' : 'Criar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import type { PedidoItem } from '@/types/pedidoItem';
  
export default defineComponent({
  name: 'PedidoItemModal',
  props: {
    modelValue: { type: Boolean, required: true },
    item: { 
      type: Object as () => PedidoItem, 
      default: () => ({
        pedido: { data: new Date(), cliente: { id_cliente: 0, nome: '', email: '', telefone: '' } },
        produto: { id_produto: 0, nome: '', preco: 0 },
        quantidade: 1,
        preco: 0,
      })
    },
    produtos: { type: Array, required: true },
  },
  emits: ['update:modelValue', 'save'],
  setup(props, { emit }) {
    const localDialog = ref(props.modelValue);
    const valid = ref(false);
    const formData = ref<PedidoItem>({ ...props.item });
  
    watch(() => props.modelValue, (newVal) => {
      localDialog.value = newVal;
      if(newVal) formData.value = { ...props.item };
    });
  
    watch(() => props.item, (newItem) => {
      formData.value = { ...newItem };
    }, { immediate: true });
  
    watch(localDialog, (newVal) => {
      emit('update:modelValue', newVal);
    });
  
    const isEdit = computed(() => !!formData.value.id_pedido_item);
  
    const nomeProduto = computed(() => {
      const prod = props.produtos.find((p: any) => p.id_produto === formData.value.produto.id_produto);
      return prod ? prod.nome : '';
    });
  
    const handleClose = () => emit('update:modelValue', false);
    const handleSave = () => emit('save', { ...formData.value });
  
    return { localDialog, valid, formData, isEdit, nomeProduto, handleClose, handleSave };
  },
});
</script>
