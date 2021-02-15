import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-Router";
import { routes } from "./routes";
// import './directives/Transform';
import transform from './directives/Transform';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(transform);

const router = new VueRouter({
  routes,
  mode: 'history'
});
/*'routes: routes' Em JS6, quando a propriedade e o valor tem o mesmo nome, não precisa repetir */

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
