<template>
  <div id="app">
    <div id="card-container">
    <card v-for="n in this.numberOfCards" v-bind:key="'card-' + n" :value="cardsForPlay[n-1]"></card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Card from './components/Card.vue';
import Colors from './colors';
import _ from "lodash";
import { setTimeout } from 'timers';

export default {
  name: 'app',
  data: function(){
    return {
      waitingForSecondCard: false,
      flippedCards: [],
      singleCards: ["Messi", "Ronaldo", "Hazard", "Neymar", "De Bruyne", "Mbappe", "Griezmann"],
      cardsForPlay: []
    }
  },
  computed: {
    numberOfCards: function(){
      return this.cardsForPlay.length;
    },
    firstCard: function(){
      return this.flippedCards[0] || null;
    },
    secondCard: function(){
      return this.flippedCards[1] || null;
    },
    isMatch: function(){
      if(this.firstCard && this.secondCard){
        return this.firstCard.value === this.secondCard.value;
      }
      else{
        return false;
      }
    }
  },
  components: {
    Card
  },
  methods: {
    randomColor: function(){
      return Colors.randomColor()
    },
    prepareCards: function(){
      let cards = this.singleCards.concat(this.singleCards);
      return _.shuffle(cards);
    },
    addCard: function(card){
      this.flippedCards.push(card);
      if(this.firstCard && this.secondCard) this.checkForMatch();
    },
    removeCard: function(card){
      _.pull(this.flippedCards, card);
    },
    checkForMatch: function(){
      let that = this;
      setTimeout(function() {
        if(that.isMatch) {
          console.log("Match!");
          that.firstCard.removeFromPlay();
          that.secondCard.removeFromPlay();
          that.flippedCards = [];
        }
        else{
          console.log("No match...");
            that.firstCard.flip();
            that.secondCard.flip();
        }
      }, 1000);
        
    }
  },
  created: function(){
    this.cardsForPlay = this.prepareCards();
  }
}
</script>

<style lang="scss">
  div#card-container {
    display: flex;
    flex-wrap: wrap;
    border: solid 2px purple;
  }
</style>
