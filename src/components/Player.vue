<template>
    <div class="player">
        <div class="name" :class="{atTurn: isAtTurn}">{{name}}</div>
        <div class="score">{{score}}</div>
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
            score: 0
        }
    },
    methods: {
        increaseScore: function(){
            this.score = this.score + 1;
        }
    }
}
</script>

<style lang="scss">
    div.atTurn{
        font-weight: bold;
    }
</style>
