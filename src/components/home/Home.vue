<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <!-- outra forma de fazer isto é por usar um v-text (<h1 v-text="titulo></h1>) -->
    <!-- 'v-on:' pode ser substituido por @ -->
    <input
      type="search"
      @input="filtro = $event.target.value"
      class="filtro"
      placeholder="Filtre usando parte do título"
    />
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" :key="foto" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            :url="foto.url"
            :titulo="foto.titulo"
          ></imagem-responsiva>
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

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: ""
    };
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
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then(res => res.json())
      .then(
        fotos => (this.fotos = fotos),
        err => console.log(err)
      );
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
