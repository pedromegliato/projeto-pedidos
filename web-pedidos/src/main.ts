import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Toast, { type PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

const toastOptions: PluginOptions = {
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true
};

app.use(router)
   .use(store)
   .use(vuetify)
   .use(Toast, toastOptions)
   .mount('#app');