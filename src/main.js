import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-Router";
import { routes } from "./routes";

Vue.use(VueResource);
Vue.use(VueRouter);

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
