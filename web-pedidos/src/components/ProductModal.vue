<template>
    <v-dialog v-model="localDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          {{ isEdit ? 'Editar Produto' : 'Novo Produto' }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              label="Nome"
              v-model="formData.nome"
              :rules="[v => !!v || 'Obrigatório']"
              required
            ></v-text-field>
            <v-text-field
              label="Preço"
              v-model="precoFormatado"
              prefix="R$"
              :rules="[v => !!v || 'Obrigatório', v => /^[0-9]+([,][0-9]{1,2})?$/.test(v.replace('R$ ', '')) || 'Formato inválido']"
              required
              @blur="formatarPreco"
              @focus="limparFormatacao"
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
  import type { Produto } from '@/types/produto';
  import { currencyFormatter } from '@/utils/formatters';
  
  export default defineComponent({
    name: 'ProductModal',
    props: {
      modelValue: { type: Boolean, required: true },
      product: { type: Object as () => Produto, default: () => ({ nome: '', preco: 0 }) },
    },
    emits: ['update:modelValue', 'save'],
    setup(props, { emit }) {
      const localDialog = ref(props.modelValue);
      const valid = ref(false);
      const formData = ref<Produto>({ ...props.product });
      const precoFormatado = ref('');
  
      watch(() => props.modelValue, (newVal) => {
        localDialog.value = newVal;
        newVal && (formData.value = { ...props.product });
      });
  
      watch(() => props.product, (newProduct) => {
        formData.value = { ...newProduct };
        precoFormatado.value = currencyFormatter.format(newProduct.preco || 0);
      }, { immediate: true });
  
      watch(localDialog, (newVal) => emit('update:modelValue', newVal));
  
      const isEdit = computed(() => !!formData.value.id_produto);
  
      const formatarPreco = () => {
        formData.value.preco = currencyFormatter.parse(precoFormatado.value);
        precoFormatado.value = currencyFormatter.format(formData.value.preco);
      };
  
      const limparFormatacao = () => {
        precoFormatado.value = formData.value.preco.toFixed(2).replace('.', ',');
      };
  
      const handleClose = () => emit('update:modelValue', false);
      const handleSave = () => emit('save', { ...formData.value });
  
      return { localDialog, valid, formData, precoFormatado, isEdit, formatarPreco, limparFormatacao, handleClose, handleSave };
    },
  });
  </script>