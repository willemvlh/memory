<template>
  <div id="app">
    <startSettings v-on:start="start($event)" v-if="!started"></startSettings>
    <div id="game" v-if="started">
      <div id="card-container">
        <card v-for="(item, i) in this.cardsForPlay" v-bind:key="'card-' + i" :value="item" ref="cards"></card>
      </div>
      <players ref="playerContainer" :playerNames="playerNames" :activePlayerIndex="activePlayerIndex" :isFinished="isFinished" @restart="reset"></players>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Card from './components/Card.vue';
import Player from './components/Player.vue';
import Pictures from './players.json';
import PlayerContainer from './components/PlayerContainer.vue';
import StartSettings from './components/StartSettings.vue';
import _ from "lodash";
import { setTimeout } from 'timers';

export default {
  name: 'app',
  data: function(){
    return {
      flippedCards: [],
      cardsForPlay: [],
      playerNames: ["Player1", "Player2"],
      activePlayerIndex: 0,
      started: false,
      startSettings: null,
      isFinished: false
    }
  },
  props: {
    someProp: String
  },
  computed: {
    cards: function(){
      return this.$refs.cards
    },
    removedCards: function(){
      return this.cards.filter(c => c.isRemovedFromPlay);
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
      let singleCards = _.take(_.shuffle(Pictures), Math.min(this.startSettings.numberOfCards / 2, Pictures.length));
      let cards = singleCards.concat(singleCards);
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
          that.checkForFinish();
        }
        else{
          console.log("No match...");
            that.firstCard.flip();
            that.secondCard.flip();
            that.nextPlayer();
        }
      }, 1000);
        
    },
    start: function(startSettings){
      if(this.startSettings === null && startSettings != undefined) {
        this.startSettings = startSettings;
      }
      this.playerNames = this.startSettings.players;
      this.cardsForPlay = this.prepareCards();
      this.started = true;
    },
    checkForFinish: function(){
      if(this.removedCards.length === this.cardsForPlay.length){
        this.isFinished = true;
      }
    },
    reset(){
      this.isFinished = false;
      this.cards.forEach(c => {
        c.reset();
      });
      this.start();
      }
  }
}
</script>

<style lang="scss" scoped>
  div#card-container {
    display: flex;
    flex: 7;
    flex-wrap: wrap;
    height: 100%;
  }

  div#player-container{
    flex: 1;
  }

  div#game{
    display: flex;
  }
</style>
