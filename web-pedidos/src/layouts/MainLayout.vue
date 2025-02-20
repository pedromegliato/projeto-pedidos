<template>
    <v-app>
      <AppHeader />
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import AppHeader from '@/components/AppHeader.vue';
  
  export default defineComponent({
    name: 'MainLayout',
    components: { AppHeader },
  });
  </script>
  