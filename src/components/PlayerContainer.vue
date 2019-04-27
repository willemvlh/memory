<template>
    <div id="player-container">
        <div id="players">
        <player @playerCreated="addPlayer"
         v-for="p in playerNames" 
         :key="p" :name="p" 
         :isAtTurn="activePlayer && p === activePlayer.name || false"></player>
         </div>
        <div id="stats">
            <div id="cardsLeft">{{cardsLeft}} cards left.</div>
            <div id="totalTime">Time elapsed: {{timeElapsedString}}</div>
        </div>
        <div id="after-game" v-if="isFinished">
            <p>{{winnersAsString}}</p>
            <button @click="signalRestart">Play again</button>
        </div>
        <settings></settings>
    </div>
</template>

<script>
import Player from './Player.vue';
import Settings from './Settings.vue';
import _ from 'lodash';
import duration from '../duration.js';

export default {
    props: {
        playerNames: Array,
        activePlayerIndex: Number,
        isFinished: Boolean,
        cardsLeft: Number
    },
    data: function(){
        return {
            players: [],
            timeElapsed: 0
        };
    },
    methods: {
        incrementAttemptsOfActivePlayer: function(){
            this.activePlayer.increaseAttempts();
        },
        incrementScoreOfActivePlayer: function(){
            this.activePlayer.increaseScore();
        },
        signalRestart: function(){
            this.timeElapsed = 0;
            this.players.forEach(p => {
                p.reset();
            });
            this.$emit("restart");
        },
        addPlayer: function(player){
            this.players.push(player);
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
            return this.winners && this.winners.length > 1;
        },
        timeElapsedString: function(){
            return duration(this.timeElapsed);
        }
    },
    components: {
        'player': Player,
        'settings': Settings
    },
    mounted: function(){
        let vm = this;
        setInterval(() => {
            if(!vm.isFinished){
                vm.timeElapsed++;
            }
        }, 1000);
    }
};
</script>

<style lang="scss" scoped>
    div#player-container{
        font-size: 0.8em;
        border: $border;
        box-shadow: $box-shadow;
        padding: 13px;
        margin: 13px auto;
        width: 80%;
        display: flex;
        justify-content: space-between;

        > div{
            padding: 0 14px;
        }

        @media #{$size-small} {
            margin: 0;
            box-shadow: 0;
            font-size: 0.6em;
        }

    }

    div#players{
        display: flex;
    }

    div#stats{
        margin-left: 6px;
        display: flex;
        flex-direction: column;
        flex: 3;

        #cardsLeft{
            margin-bottom: 6px;
        }
    }

</style>
