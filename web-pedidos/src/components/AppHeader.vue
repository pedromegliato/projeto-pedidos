<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Web Pedidos</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Produtos</v-btn>
    <v-btn text to="/clientes">Clientes</v-btn>
    <v-btn text to="/pedidos">Pedidos</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
});
</script>
