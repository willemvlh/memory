<template>
  <div id="app">
    <startSettings v-on:start="start($event)" v-if="!started"></startSettings>
    <div id="game" v-if="started">
      <div id="card-container">
        <card v-for="n in this.numberOfCards" v-bind:key="'card-' + n" :value="cardsForPlay[n-1]"></card>
      </div>
      <players ref="playerContainer" :playerNames="['Player1', 'Player2']" :activePlayerIndex="activePlayerIndex"></players>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Card from './components/Card.vue';
import Player from './components/Player.vue';
import PlayerContainer from './components/PlayerContainer.vue';
import StartSettings from './components/StartSettings.vue';
import _ from "lodash";
import { setTimeout } from 'timers';

export default {
  name: 'app',
  data: function(){
    return {
      commaSeparatedCards: "",
      waitingForSecondCard: false,
      flippedCards: [],
      singleCards: [],
      cardsForPlay: [],
      playerNames: ["Player1", "Player2"],
      activePlayerIndex: 0,
      started: false
    }
  },
  props: {
    someProp: String
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
      return false;
    }
  },
  components: {
    "card": Card,
    "players": PlayerContainer,
    "startSettings": StartSettings
  },
  methods: {
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
    nextPlayer: function(){
      this.activePlayerIndex++;
    },
    checkForMatch: function(){
      let that = this;
      setTimeout(function() {
        if(that.isMatch) {
          console.log("Match!");
          that.firstCard.removeFromPlay();
          that.secondCard.removeFromPlay();
          that.flippedCards = [];
          that.$refs.playerContainer.incrementScoreOfActivePlayer();
        }
        else{
          console.log("No match...");
            that.firstCard.flip();
            that.secondCard.flip();
            that.nextPlayer();
        }
      }, 1000);
        
    },
    start: function(cards){
      this.singleCards = cards;
      this.cardsForPlay = this.prepareCards();
      this.started = true;
    }
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
