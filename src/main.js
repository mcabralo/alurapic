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
import './assets/js/teste.js';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';


Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

//! Interceptador
// Vue.http.interceptors.push((req, next) => {

//   é possível colocar informações no header antes do envio da requisição
//   req.headers.set('Authorization', 'informação de segurança aqui');
//   console.log('Lidando com o request');

//   next(res => {
//     console.log('Lidando com a resposta')
//   é possível acessar os dados da reposta e realizar transformações antes
//     console.log(res.body);
//   });

// });

/* Vue.http.options.root =
 'http://localhost:3000'; Requisição para o Global View Option alterar
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
