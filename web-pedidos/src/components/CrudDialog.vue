<template>
    <v-dialog v-model="internalDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ data ? 'Editar Produto' : 'Novo Produto' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="formData.nome" label="Nome" required></v-text-field>
            <v-text-field v-model="formData.preco" label="Preço" type="number" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onClose">Cancelar</v-btn>
          <v-btn color="primary" text @click="onSave">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  
  interface Produto {
    id?: number;
    nome: string;
    preco: number;
  }
  
  export default defineComponent({
    name: 'CrudDialog',
    props: {
      data: {
        type: Object as () => Produto | null,
        default: null,
      },
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
      const internalDialog = ref(true);
      const formData = ref<Produto>({ nome: '', preco: 0 });
  
      watch(() => props.data, (newVal) => {
        if (newVal) {
          formData.value = { ...newVal };
        } else {
          formData.value = { nome: '', preco: 0 };
        }
      }, { immediate: true });
  
      const onClose = () => {
        internalDialog.value = false;
        emit('close');
      };
  
      const onSave = () => {
        emit('save', formData.value);
      };
  
      return { internalDialog, formData, onClose, onSave };
    },
  });
  </script>
  