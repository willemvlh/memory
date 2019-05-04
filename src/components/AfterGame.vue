<template>
    <div id="after-game">
                <p>{{winners}}</p>
                <button @click="signalRestart">Play again</button>
        </div>
</template>

<script>
export default {
    props: {
        winners: String
    },
    methods: {
        signalRestart: function(){
            this.$emit("reset");
        }
    }
};
</script>

<style lang="scss">
 div#after-game{
        margin: 150px auto;
        padding: 24px;
        width: max-content;
        text-align: center;
        border: $border;
        box-shadow: $box-shadow;
    }
</style>
