<template>
  <div>
    <h1>{{ titulo }}</h1>
    <!-- outra forma de fazer isto é por usar um v-text (<h1 v-text="titulo></h1>) -->

    <ul>
      <li v-for="foto of fotos">
        <img :src="foto.url" :alt="foto.titulo" />
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
export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: []
    };
  },

  created() {

    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
  }
};
</script>

<style></style>
