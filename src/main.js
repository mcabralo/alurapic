import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-Router";
import { routes } from "./routes";
// import './directives/Transform';
import transform from "./directives/Transform";
import VeeValidate from 'vee-validate';
import msg from './pt_BR';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/teste.css';


Vue.use(VueResource);
Vue.http.options.root =
  'http://localhost:3000'; /* Requisição para o Global View Option alterar
uma opção do http setando o site padrão da api */

Vue.use(VueRouter);
Vue.use(transform);

const router = new VueRouter({
  routes,
  mode: "history"
});
/*'routes: routes' Em JS6, quando a propriedade e o valor tem o mesmo nome, não precisa repetir */

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }

});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
