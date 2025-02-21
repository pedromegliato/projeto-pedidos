import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProdutosPage from '@/views/ProdutosPage.vue';
import ClientesPage from '@/views/ClientesPage.vue';
import PedidosPage from '@/views/PedidosPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Produtos', component: ProdutosPage },
  { path: '/clientes', name: 'Clientes', component: ClientesPage },
  { path: '/pedidos', name: 'Pedidos', component: PedidosPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
