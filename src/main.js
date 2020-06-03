/* eslint-disable import/order */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Validation from '@/plugins/validation';
import BloodUI from '@/plugins/bloodUI';

Vue.config.productionTip = false;

Vue.use(BloodUI);
Vue.use(Validation);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
