<template>
    <div id="player-container">
        <player v-for="p in playerNames" :key="p" :name="p" :isAtTurn="activePlayer && p === activePlayer.name || false"></player>
    </div>
</template>

<script>
import Player from './Player.vue';

export default {
props: {
    playerNames: Array,
    activePlayerIndex: Number
},
data: function(){
    return {
        players: []
    }
},
methods: {
    incrementScoreOfActivePlayer: function(){
        this.activePlayer.increaseScore();
    }
},
computed: {
    activePlayer: function(){
      return this.players[this.activePlayerIndex % this.players.length];
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

<style>

</style>
