<template>
  <div>
    <v-app-bar app color="primary" dark>
      <!-- telas pequenas -->
      <v-app-bar-nav-icon class="d-sm-none icon-mobile" @click="drawer = !drawer" />

      <v-toolbar-title>Web Pedidos</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- telas médias e maiores -->
      <div class="d-none d-sm-flex">
        <CustomButton variant="primary" to="/">Produtos</CustomButton>
        <CustomButton variant="primary" to="/clientes">Clientes</CustomButton>
        <CustomButton variant="primary" to="/pedidos">Pedidos</CustomButton>
      </div>
    </v-app-bar>

    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="d-sm-none"
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/clientes">
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/pedidos">
          <v-list-item-title>Pedidos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CustomButton from '@/components/CustomButton.vue';

export default defineComponent({
  name: 'AppHeader',
  components: { CustomButton },
  setup() {
    const drawer = ref(false);
    return { drawer };
  },
});
</script>


<style scoped>
  .d-sm-flex{
    gap: 16px;
    padding: 16px;
  }

  .icon-mobile {
    color: #ffffff;
  }
</style>
