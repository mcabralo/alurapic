<template>
  <button
    @click="disparaAcao()"
    class="botao"
    :class="estiloDoBotao"
    :type="tipo"
  >
    <!-- O Vue aceita receber class e o :class ao mesmo tempo e permite que no estiloDoBotao() não precisemos
    colocar o botao antes do botao-(padrao ou perigo) -->
    {{ rotulo }}
  </button>
</template>
<script>
export default {
  props: {

    tipo: {
      required: true,
      type: String
    },
    rotulo: {
      required: true,
      type: String
    },
    confirmacao: Boolean,
    estilo: String
  },

  methods: {
    disparaAcao() {
      if (this.confirmacao) {
        if (confirm("Confirma a Ação?")) {
          this.$emit("botaoAtivado");
          // this.$emit("botaoAtivado", new Date()); o método new Date pode enviar o horário que essa
          // ação foi disparada
        }
        return;
      }
      this.$emit("botaoAtivado");
    }
  },

  computed: {
    estiloDoBotao() {
      if (this.estilo == 'padrao' || !this.estilo ) return "botao-padrao";
      if (this.estilo == 'perigo') return "botao-perigo";
    }
  }
};
</script>

<style lang="sass">

  @import './Botao.scss';
  
</style>
