<template>
  <div id="wrapper">
    <div id="after-game">
      <p>{{winners}}</p>
      <button @click="signalRestart">Play again</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    winners: String
  },
  methods: {
    signalRestart: function() {
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss" scoped>
div#wrapper{
    flex: 1;
    display: flex;
    align-items: center;
}
div#after-game {
  margin: 15px auto;
  padding: 24px;
  width: max-content;
  text-align: center;
  border: $border;
  box-shadow: $box-shadow;
}
</style>
