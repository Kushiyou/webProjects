import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import API from './api'

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.prototype.$API = API;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
