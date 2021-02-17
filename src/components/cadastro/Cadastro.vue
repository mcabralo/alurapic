<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo" />
        <!-- @input="foto.titulo = $event.target.value" :value="foto.titulo" O Vue tem uma
        diretiva que existe por baixo dos planos para fazer o two-way binding da mesma forma
        que o discritivo acima-->
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url" />
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
        />
        <!-- O modificador '.lazy' e a diretiva 'v-show' são úteis para melhorar o formulário
        tanto atrasando a atualização do binding quanto permitindo o aparecimento de um 
        componente apenas se um objeto for preenchido (nesse caso o componente <imagem-responsiva/> 
        apenas será atualizado quando o objeto fotos for preenchido) -->
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link :to="{ name: 'home'}"
          ><meu-botao rotulo="VOLTAR" tipo="button"
        /></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id //assim que o componente for criado esse será o id da url
      //caso nenhum id for enviado, 'id' será nullified
    };
  },

  methods: {
    grava() {
      this.service
        .cadastra(this.foto)
        .then(() => { 
          if(this.id) this.$router.push({ name: 'home' });
          this.foto = new Foto()
          }, err => console.log(err)
      );
      // this.$http
      //   .post('v1/fotos', this.foto)
      //   .then(() => this.foto = new Foto(), err => console.log(err));
    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    if(this.id){

      this.service
        .busca(this.id) // inicia a requisição | Pedido
        .then(foto => this.foto = foto); // retorna a requisição | Resposta
    }
  }
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>
