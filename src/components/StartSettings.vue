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
        }
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
}
</script>

<style lang="scss">
    .modal-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.6);
        z-index: 999
    }
    .modal{
        margin-left: auto;
        margin-right: auto;
        width: 40%;
        background-color: #efefef;
        box-shadow: 3px 3px 3px #333;
        display: flex;
        margin-top: 80px;
        flex-direction: column;
        padding: 24px;
        border-radius: 14px;
    }
</style>
