<template>
    <modal @modalSubmit="start($event)" :items="modalObjects" :id="'startSettings'"></modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
    data: function(){
        return {
            commaSeparatedPlayers: "",
            numberOfCards: 0,
            modalObjects: [{
                label: "Players",
                identifier: "players",
                type: "text"
            },
            {
                label: "Number of cards",
                identifier: "numberOfCards",
                type: "number"
            }]
        };
    },
    components: {
        'modal': Modal
    },
    computed: {
      players: function(){
          return this.commaSeparatedPlayers.split(",");
      }  
    },
    methods: {
        start: function(response){
            this.commaSeparatedPlayers = response.items.find(i => i.identifier === "players").value;
            this.numberOfCards = Number(response.items.find(i => i.identifier === "numberOfCards").value);
            this.$emit("start", {players: this.players, numberOfCards: this.numberOfCards});
        }
    }
};
</script>

<style lang="scss">
   
</style>
