<template>
    <div id="player-container">
        <player v-for="p in playerNames" :key="p" :name="p" :isAtTurn="activePlayer && p === activePlayer.name || false"></player>
        <div id="after-game" v-if="isFinished">
            <p>{{winnersAsString}}</p>
            <button @click="signalRestart">Play again</button>
        </div>
    </div>
</template>

<script>
import Player from './Player.vue';
import _ from 'lodash';

export default {
props: {
    playerNames: Array,
    activePlayerIndex: Number,
    isFinished: Boolean
},
data: function(){
    return {
        players: []
    }
},
methods: {
    incrementScoreOfActivePlayer: function(){
        this.activePlayer.increaseScore();
    },
    signalRestart: function(){
        this.$emit("restart");
    }
},
computed: {
    activePlayer: function(){
      return this.players[this.activePlayerIndex % this.players.length];
    },
    winners: function(){
        if(this.isFinished){
            let players = this.players;
            return players.filter(p => p.score === _.max(players.map(pl => pl.score)));
        }
        return null;
    },
    winnersAsString: function(){
        if(this.winners){
            if(this.isTied){
                return "Tie game between " + this.winners.map(x => x.name).reduce((x,y) => x + ", " + y);
            }
            return "The winner is " + this.winners[0].name + "!";
        }
        return null;
    },
    isTied: function(){
        return this.winners.length > 1;
    }
},
components: {
    Player
},
mounted: function(){
    this.players = this.$children;
}
}
</script>

<style lang="scss" scoped>
    div#player-container{
        border: $border;
        box-shadow: $box-shadow;
        padding: 13px;
        margin: 13px;
    }
</style>
