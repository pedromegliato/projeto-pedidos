<template>
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="!isLoading" :disabled="isLoading" @click="cancel">
            {{ cancelText }}
          </v-btn>
          <v-btn 
            :color="confirmColor" 
            :loading="isLoading"
            @click="confirm"
          >
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    name: 'ConfirmationModal',
    props: {
      modelValue: Boolean,
      title: {
        type: String,
        default: 'Confirmar ação'
      },
      message: {
        type: String,
        required: true
      },
      confirmText: {
        type: String,
        default: 'Confirmar'
      },
      cancelText: {
        type: String,
        default: 'Cancelar'
      },
      confirmColor: {
        type: String,
        default: 'error'
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue', 'confirm', 'cancel'],
    setup(props, { emit }) {
      const dialog = ref(props.modelValue);
  
      watch(() => props.modelValue, (newVal) => {
        dialog.value = newVal;
      });
  
      watch(dialog, (newVal) => {
        emit('update:modelValue', newVal);
      });
  
      const confirm = () => {
        emit('confirm');
      };
  
      const cancel = () => {
        emit('cancel');
        dialog.value = false;
      };
  
      return { dialog, confirm, cancel };
    }
  });
  </script>