<template>
     <div id="before-start">
            <label for="cards">Input for cards:</label> 
            <input type="text" id="cards" v-model="commaSeparatedCards">
            <button v-on:click="start">Start</button>
        </div>
</template>

<script>
export default {
    data: function(){
        return {
            commaSeparatedCards: ""
        }
    },
    computed: {
      cards: function(){
          return this.commaSeparatedCards.split(",");
      }  
    },
    methods: {
        start: function(){
            this.$emit("start", this.cards);
        }
    }
}
</script>

<style>

</style>
