<template>
    <div>
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
            <settings></settings>
        </div>
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
        addPlayer: function(player){
            this.players.push(player);
        },
        reset: function(){
            this.players.forEach(p => p.reset());
            this.timeElapsed = 0;
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
    watch: {
        isFinished: function(val){
            if(val)
                this.$emit("winner", this.winnersAsString);
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
        width: max-content;
        max-width: 98%;
        display: flex;
        justify-content: space-between;

        > div{
            padding: 0 14px;
            @media #{$size-small} {
                margin: 0 auto;
                box-shadow: 0;
            }
        }

        @media #{$size-small} {
            margin: 0 auto;
            box-shadow: 0;
            max-width: 100%;
            font-size: 0.7em;
        }

    }

    div#players{
        display: flex;
    }

    div#stats{
        margin-left: 6px;
        min-width: 150px;
        display: flex;
        flex-direction: column;

        #cardsLeft{
            margin-bottom: 6px;
        }

        @media #{$size-small} {
            display: none;
        }
    }

</style>
