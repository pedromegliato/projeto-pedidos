<template>
    <v-btn :class="btnClass" v-bind="$attrs">
      <slot />
    </v-btn>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'CustomButton',
    props: {
      variant: {
        type: String,
        default: 'primary', // 'primary', 'secondary' ou 'tertiary'
        validator: (value: string) => ['primary', 'secondary', 'tertiary'].includes(value),
      },
    },
    setup(props) {
      const btnClass = computed(() => {
        switch (props.variant) {
          case 'primary':
            return 'custom-button-primary';
          case 'secondary':
            return 'custom-button-secondary';
          case 'tertiary':
            return 'custom-button-tertiary';
          default:
            return '';
        }
      });
      return { btnClass };
    },
  });
  </script>
  
  <style scoped>
  .custom-button-primary {
    background-color: #ffffff ;
    color: #424242 ;
    transition: background-color 0.3s, color 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .custom-button-primary:hover,
  .custom-button-primary:focus,
  .custom-button-primary:active {
    background-color: #E65100 ; 
    color: #ffffff ;
  }
  
  .custom-button-secondary {
    background-color: #f79605 ;
    color: #ffffff ;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .custom-button-secondary:hover,
  .custom-button-secondary:focus,
  .custom-button-secondary:active {
    background-color: #ff9800 ;
    color: #ffffff ;
  }
  
  .custom-button-tertiary {
    background-color: #eeeeee ;
    color: #212121 ;
    border: 1px solid #212121 ;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .custom-button-tertiary:hover,
  .custom-button-tertiary:focus,
  .custom-button-tertiary:active {
    background-color: #fb8c00 ;
    color: #ffffff ;
  }
  </style>
  