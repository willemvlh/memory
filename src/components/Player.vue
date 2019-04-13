<template>
    <div class="player">
        <div class="name" :class="{atTurn: isAtTurn}">{{name}}</div>
        <div class="score">{{score}} {{successRate}}%</div>
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
        }
    },
    computed: {
        successRate: function(){
            return Math.round(this.score / this.attempts * 100) || 0
        }
    },
    methods: {
        increaseScore: function(){
            this.score = this.score + 1;
        },
        increaseAttempts: function(){
            this.attempts = this.attempts + 1;
        }
    }
}
</script>

<style lang="scss">
    div.atTurn{
        font-weight: bold;
    }
</style>
