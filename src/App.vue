<template>
  <div id="app">
    <startSettings v-on:start="start($event)" v-if="!started"></startSettings>
    <div id="game" v-if="started">
      <div id="card-container">
        <card @cardFlip="checkForMatch" @cardCreated="storeCard($event)" v-for="(item, i) in this.cardsForPlay" v-bind:key="'card-' + i" :value="item" ref="cards" :totalCards="cardsForPlay.length"></card>
      </div>
      <players ref="playerContainer" 
      :playerNames="playerNames" 
      :activePlayerIndex="activePlayerIndex" 
      :isFinished="isFinished"
      :cardsLeft="cardsLeft"
      @restart="reset"
     ></players>
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
      cardsForPlay: [],
      playerNames: ["Player1", "Player2"],
      activePlayerIndex: 0,
      started: false,
      startSettings: null,
      isFinished: false,
      cards: [],
      settings: {}
    }
  },
  computed: {
    flippedCards: function(){
      return this.cards.filter(c => c.isTurned && !c.isRemovedFromPlay);
    },
    cardsLeft: function(){
      return this.cardsForPlay.length - this.removedCards.length;
    },
    removedCards: function(){
      return this.cards.filter(c => c.isRemovedFromPlay);
    },
    isMatch: function(){
      return this.flippedCards.length == 2 && _.uniq(this.flippedCards.map(c => c.value)).length == 1;
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
    storeCard: function(card){
      this.cards.push(card);
    },
    nextPlayer: function(){
      this.activePlayerIndex++;
    },
    checkForMatch: function(){
      if(this.flippedCards.length < 2){
        return;
      }

      let that = this;
      setTimeout(function() {
        if(that.isMatch) {
          console.log("Match!");
          that.flippedCards.forEach(c => c.removeFromPlay());
          that.$refs.playerContainer.incrementScoreOfActivePlayer();
          that.checkForFinish();
        }
        else{
          console.log("No match...");
            while(that.flippedCards.length > 0){
              that.flippedCards[0].flip();
            };
            that.nextPlayer();
        }
        that.$refs.playerContainer.incrementAttemptsOfActivePlayer();
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
    justify-content: center;
  }

  div#player-container{
    flex: 1;
  }

  div#game{
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  div#app{
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
