<template>
  <div id="card-container">
    <card
      @cardFlip="checkForMatch"
      @cardCreated="storeCard($event)"
      v-for="(item, i) in this.cardsForPlay"
      v-bind:key="'card-' + i"
      :value="item"
      :totalCards="cardsForPlay.length"
      :settings="settings"
    ></card>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  props: {
    cardsForPlay: Array,
    settings: Object
  },
  methods: {
    checkForMatch: function() {
      this.$emit("checkForMatch");
    },
    storeCard: function(card) {
      this.$emit("storeCard", card);
    }
  },
  components: {
    card: Card
  }
};
</script>

<style lang="scss" scoped>
div#card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 95%;
  margin: auto;
  @media #{$size-medium} {
    width: 100%;
  }
}
</style>
