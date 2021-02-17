<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <!-- outra forma de fazer isto é por usar um v-text (<h1 v-text="titulo></h1>) -->
    <!-- 'v-on:' pode ser substituido por @ -->
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      @input="filtro = $event.target.value"
      class="filtro"
      placeholder="Filtre usando parte do título"
    />
    {{ filtro }}
    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        :key="foto.id"
        v-for="foto of fotosComFiltro"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            v-meu-transform:rotate.animate="15"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <!-- v-meu-transform.animate.reverse="15" adicionando o modificador 'reverse' a diretiva é alterada /> -->
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
          <!-- confirmacao="false" passa um valor em string, o que não permite fazer o teste de confirmação
          para isso é necessário usar um data binding mesmo sem uma propriedade, porque ele faz o teste do que
          está escrito, e não apenas da string, no caso com o DB seria enviado o valor false e não a string false -->
          <!-- No @click é adicionado o '.native', isso acontece porque o 'meu-botao' apenas pode fazer o que ele 
          foi programado, e se não tem um método específico nela, o @click não funciona. Para resolver isso o 
          '.native' vai acessar o elemento nativo, nesse caso o button que está dentro do 'meu-botao'-->
        </meu-painel>
      </li>
    </ul>
    <!-- 
    <img :src="foto1.url" :alt="foto1.titulo" />
    ao invés de usar uma verborragia prlo v-bind, é possível usar apenas os ':' que atinge o mesmo resultado 
    <img :src="foto2.url" :alt="foto2.titulo" />
     ao invés de usar uma verborragia prlo v-bind, é possível usar apenas os ':' que atinge o mesmo resultado  -->
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva";
import Botao from "../shared/botao/Botao";
import transform from "../../directives/Transform";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  directives: {
    "meu-transform": transform
  },

  methods: {
    remove(foto) {
      this.service.apaga(foto._id).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso";
        },
        err => {
          console.log(err);
          this.mensagem = "Não foi possível remover a foto";
        }
      );
      // this.resource.delete({ id: foto._id }).then(
      //   () => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso";
      //   },
      //   err => {
      //     console.log(err);
      //     this.mensagem = "Não foi possível remover a foto";
      //   }
      // );

      // foto._id [e uma forma do Javascript buscar a foto, é padrão da linguagem]
      // this.$http
      // .delete(`v1/fotos/${foto._id}`)
      // .then(() => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso";
      //   }, err => {
      //     console.log(err);
      //     this.mensagem = "Não foi possível remover a foto";
      //   }
      // );
    }
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");

        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => (this.fotos = fotos), err => console.log(err)
    );

    // Médoto diferente do http que funciona com api rest
    // this.resource = this.$resource("v1/fotos{/id}");
    // this.resource
    //   .query()
    //   .then(res => res.json())
    //   .then(
    //     fotos => (this.fotos = fotos),
    //     err => console.log(err)
    //   );

    // this.$http
    //   .get("v1/fotos")
    //   .then(res => res.json())
    //   .then(
    //     fotos => (this.fotos = fotos),
    //     err => console.log(err)
    //   );
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
