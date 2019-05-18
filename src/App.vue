<template>
  <div id="app">
    <startSettings v-on:start="start($event)" v-if="!started"></startSettings>
    <div id="game" v-if="started">
      <after-game :winners="winners" @reset="reset" v-if="isFinished"/>
      <card-container
        :settings="settings"
        :cardsForPlay="this.cardsForPlay"
        @storeCard="storeCard($event)"
        @checkForMatch="checkForMatch"
        v-if="!isFinished"
      />
      <players
        ref="playerContainer"
        :playerNames="playerNames"
        :activePlayerIndex="activePlayerIndex"
        :isFinished="isFinished"
        :cardsLeft="cardsLeft"
        @winner="winners=$event"
      />
      <a href="https://www.github.com/wasmachien75/memory" id="github">
        <img src="./assets/github.png">
      </a>
    </div>
  </div>
</template>

<script>
import CardContainer from "./components/CardContainer.vue";
import Pictures from "./players.json";
import PlayerContainer from "./components/PlayerContainer.vue";
import StartSettings from "./components/StartSettings.vue";
import AfterGame from "./components/AfterGame.vue";
import _ from "lodash";
import { setTimeout } from "timers";
import { EventBus } from "./components/EventBus.js";

const flipDelay = 1000;

export default {
  name: "app",
  data: function() {
    return {
      cardsForPlay: [],
      playerNames: [],
      activePlayerIndex: 0,
      started: false,
      startSettings: null,
      isFinished: false,
      cards: [],
      settings: {},
      winners: ""
    };
  },
  mounted: function() {
    let vm = this;
    EventBus.$on("settingsUpdate", function(settings) {
      vm.updateSettings(settings);
    });
  },
  computed: {
    flippedCards: function() {
      return this.cards.filter(c => c.isTurned && !c.isRemovedFromPlay);
    },
    cardsLeft: function() {
      return this.cardsForPlay.length - this.removedCards.length;
    },
    removedCards: function() {
      return this.cards.filter(c => c.isRemovedFromPlay);
    },
    isMatch: function() {
      return (
        this.flippedCards.length == 2 &&
        _.uniq(this.flippedCards.map(c => c.value)).length == 1
      );
    }
  },
  components: {
    players: PlayerContainer,
    startSettings: StartSettings,
    "after-game": AfterGame,
    "card-container": CardContainer
  },
  methods: {
    prepareCards: function() {
      let singleCards = _.take(
        _.shuffle(Pictures),
        Math.min(this.startSettings.numberOfCards / 2, Pictures.length)
      );
      let cards = singleCards.concat(singleCards);
      return _.shuffle(cards);
    },
    updateSettings: function(settings) {
      this.settings = settings;
    },
    storeCard: function(card) {
      this.cards.push(card);
    },
    nextPlayer: function() {
      this.activePlayerIndex++;
    },
    checkForMatch: function() {
      if (this.flippedCards.length === 2) {
          setTimeout(this.performCheckForMatch, flipDelay);
      }
    },
    performCheckForMatch: function() {
      this.isMatch ? this.onMatch() : this.onNoMatch();
      this.$refs.playerContainer.incrementAttemptsOfActivePlayer();
    },
    onMatch: function() {
      this.flippedCards.forEach(c => c.removeFromPlay());
      this.$refs.playerContainer.incrementScoreOfActivePlayer();
      this.checkForFinish();
    },
    onNoMatch: function() {
      while (this.flippedCards.length > 0) {
        this.flippedCards[0].flip();
      }
      this.nextPlayer();
    },
    start: function(startSettings) {
      if (this.startSettings === null && startSettings != undefined) {
        this.startSettings = startSettings;
      }
      this.playerNames = this.startSettings.players;
      this.cardsForPlay = this.prepareCards();
      this.started = true;
    },
    checkForFinish: function() {
      if (this.removedCards.length === this.cardsForPlay.length) {
        this.isFinished = true;
      }
    },
    reset() {
      this.isFinished = false;
      this.$refs.playerContainer.reset();
      this.cards.forEach(c => {
        c.reset();
      });
      this.start();
    }
  }
};
</script>

<style lang="scss" scoped>
div#player-container {
  flex: 1;
}

a#github {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: max-content;
  opacity: 0.2;
  transition: opacity 1s;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
}

div#game {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

div#app {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
