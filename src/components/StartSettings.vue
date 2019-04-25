<template>
   <div class="modal-mask">
        <div class="modal">
            <div class="form">
                <div class="form-entry">
                    <label for="players">Players:</label> 
                    <input type="text" id="players" v-model="commaSeparatedPlayers">
                </div>
                <div class="form-entry">
                    <label for="numberOfCards">Number of cards:</label>
                    <input type="radio" name="numberOfCards" v-model="numberOfCards" value="8" >8
                    <input type="radio" name="numberOfCards" v-model="numberOfCards" value="16">16
                    <input type="radio" name="numberOfCards" v-model="numberOfCards" value="32">32
                </div>
                <button v-on:click="start">Start</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: function(){
        return {
            commaSeparatedPlayers: "",
            numberOfCards: 0
        }
    },
    computed: {
      players: function(){
          return this.commaSeparatedPlayers.split(",");
      }  
    },
    methods: {
        start: function(){
            this.$emit("start", {players: this.players, numberOfCards: this.numberOfCards})
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
