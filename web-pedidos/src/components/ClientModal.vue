<template>
    <v-dialog v-model="localDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          {{ isEdit ? 'Editar Cliente' : 'Novo Cliente' }}
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
              label="Email"
              v-model="formData.email"
              :rules="[v => !!v || 'Obrigatório', v => /.+@.+\..+/.test(v) || 'Email inválido']"
              required
            ></v-text-field>
            <v-text-field
              label="Telefone"
              v-model="telefone"
              :rules="[v => !!v || 'Obrigatório']"
              required
              @keydown="handleTelefoneKeyDown"
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
  import type { Cliente } from '@/types/cliente';
  import { maskTelefone } from '@/utils/phoneMask';
  
  export default defineComponent({
    name: 'ClientModal',
    props: {
      modelValue: { type: Boolean, required: true },
      cliente: { 
        type: Object as () => Cliente, 
        default: () => ({ nome: '', email: '', telefone: '' }) 
      },
    },
    emits: ['update:modelValue', 'save'],
    setup(props, { emit }) {
      const localDialog = ref(props.modelValue);
      const valid = ref(false);
      const formData = ref<Cliente>({ ...props.cliente });
  
      watch(() => props.modelValue, (newVal) => {
        localDialog.value = newVal;
        if (newVal) {
          formData.value = { ...props.cliente };
        }
      });
  
      watch(() => props.cliente, (newCliente) => {
        formData.value = { ...newCliente };
      }, { immediate: true });
  
      watch(localDialog, (newVal) => {
        emit('update:modelValue', newVal);
      });
  
      const isEdit = computed(() => !!formData.value.id_cliente);
  
      const telefone = computed({
        get: () => formData.value.telefone,
        set: (newValue: string) => {
          formData.value.telefone = maskTelefone(newValue);
        },
      });
  
      const handleTelefoneKeyDown = (event: KeyboardEvent) => {
        const allowedKeys = [
          'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'
        ];
        if (allowedKeys.includes(event.key)) return;
  
        if (!/^\d$/.test(event.key)) {
          event.preventDefault();
          return;
        }
        
        const currentDigits = formData.value.telefone.replace(/\D/g, '');
        if (currentDigits.length >= 11) {
          event.preventDefault();
        }
      };
  
      const handleClose = () => emit('update:modelValue', false);
      const handleSave = () => emit('save', { ...formData.value });
  
      return { 
        localDialog, 
        valid, 
        formData, 
        isEdit, 
        handleClose, 
        handleSave, 
        telefone, 
        handleTelefoneKeyDown 
      };
    },
  });
  </script>
  