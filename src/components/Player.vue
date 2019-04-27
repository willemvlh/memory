<template>
    <div class="player">
        <div class="name" :class="{atTurn: isAtTurn}">{{name}}</div>
        <div class="score">{{score}} point{{score != 1 ? "s" : ""}}</div>
        <div class="success">{{successRate}}% hit rate</div>
    </div>
</template>

<script>
export default {
    name: "player",
    props: {
        name: String,
        isAtTurn: Boolean
    },
    data: function(){
        return {
            score: 0,
            attempts: 0
        };
    },
    computed: {
        successRate: function(){
            return Math.round(this.score / this.attempts * 100) || 0;
        }
    },
    methods: {
        increaseScore: function(){
            this.score = this.score + 1;
        },
        increaseAttempts: function(){
            this.attempts = this.attempts + 1;
        },
        reset: function(){
            this.score = this.attempts = 0;
        }
    },
    created: function(){
        this.$emit("playerCreated", this);
    }
};
</script>

<style lang="scss">
    div.player{
        display: flex;
        flex-direction: column;
        flex: 2;
        margin-right: 25px;
    }
    div.name{
        flex: 2;
        font-size: 1.2em;
    }
    div.atTurn{
        font-weight: bold;
    }
    .score, .success{
        line-height: 1.6em;
    }
</style>
