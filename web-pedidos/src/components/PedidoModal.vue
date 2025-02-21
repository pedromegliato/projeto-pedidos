<template>
  <v-dialog v-model="localDialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        {{ isEdit ? 'Editar Pedido' : 'Novo Pedido' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Seleção do Cliente -->
          <v-select
            label="Cliente"
            v-model="formData.cliente.id_cliente"
            :items="clientes"
            item-text="nome"
            item-value="id_cliente"
            :rules="[v => !!v || 'Obrigatório']"
            required
          ></v-select>
          <!-- Exibe o nome do Cliente selecionado -->
          <v-text-field label="Nome do Cliente" v-model="nomeCliente" readonly></v-text-field>
          <!-- Campo para a Data do Pedido -->
          <v-text-field
            label="Data"
            v-model="dataPedido"
            type="date"
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
import type { Pedido } from '@/types/pedido';
import type { Cliente } from '@/types/cliente';
  
export default defineComponent({
  name: 'PedidoModal',
  props: {
    modelValue: { type: Boolean, required: true },
    pedido: { 
      type: Object as () => Pedido, 
      default: () => ({
        data: new Date(),
        cliente: { id_cliente: 0, nome: '', email: '', telefone: '' }
      })
    },
    // Lista de clientes para o dropdown
    clientes: { type: Array, required: true },
  },
  emits: ['update:modelValue', 'save'],
  setup(props, { emit }) {
    const localDialog = ref(props.modelValue);
    const valid = ref(false);
    const formData = ref<Pedido>({ ...props.pedido });
  
    watch(() => props.modelValue, (newVal) => {
      localDialog.value = newVal;
      if (newVal) {
        formData.value = { ...props.pedido };
      }
    });
  
    watch(() => props.pedido, (newPedido) => {
      formData.value = { ...newPedido };
    }, { immediate: true });
  
    watch(localDialog, (newVal) => {
      emit('update:modelValue', newVal);
    });
  
    const isEdit = computed(() => !!formData.value.id_pedido);
  
    // Exibe o nome do Cliente selecionado
    const nomeCliente = computed(() => {
      const cliente = props.clientes.find((c: Cliente) => c.id_cliente === formData.value.cliente.id_cliente);
      return cliente ? cliente.nome : '';
    });
  
    // Computed para converter a data para o formato YYYY-MM-DD
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
  
    const handleClose = () => emit('update:modelValue', false);
    const handleSave = () => emit('save', { ...formData.value });
  
    return { localDialog, valid, formData, isEdit, nomeCliente, dataPedido, handleClose, handleSave };
  },
});
</script>
