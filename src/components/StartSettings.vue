<template>
   <div class="modal-mask">
        <div class="modal">
            <div class="form">
                <div class="form-item">
                    <label for="players">Number of  players:</label> 
                    <input type="number" id="players" v-model.number="numberOfPlayers">
                </div>
                <form-item v-for="n in numberOfPlayers" :key="'player' + n" :index="n"
                    @created="created($event)" @destroyed="destroyed()"></form-item>
                <div class="form-item">
                    <label for="numberOfCards">Number of cards:</label>
                    <div class="inputs">
                        <input type="radio" name="numberOfCards" v-model="numberOfCards" value="8" >8
                        <input type="radio" name="numberOfCards" v-model="numberOfCards" value="16">16
                        <input type="radio" name="numberOfCards" v-model="numberOfCards" value="32">32
                    </div>
                </div>
                <button v-on:click="start">Start</button>
            </div>
        </div>
    </div>
</template>

<script>
import FormItem from './FormItem.vue';

export default {
    data: function(){
        return {
            commaSeparatedPlayers: "",
            numberOfCards: 0,
            numberOfPlayers: 0,
            pl: []
        }
    },
    computed: {
      players: function(){
          return this.pl.map(p => p.name);
      }  
    },
    methods: {
        start: function(){
            this.$emit("start", {players: this.players, numberOfCards: this.numberOfCards});
        },
        created: function(e){
            this.pl.push(e);
        },
        destroyed: function(){
           this.pl.length--;
        }
    },
    components: {
        'form-item': FormItem
    }
};
</script>

<style lang="scss">

    div.form{
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 8px;
        column-gap: 8px;
        font-size: 0.8em;
        margin-bottom: 16px;

    }

    input{
        font-family: "Inter";
    }

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
        width: max-content;
        background-color: #efefef;
        box-shadow: 3px 3px 3px #333;
        display: flex;
        margin-top: 80px;
        flex-direction: column;
        padding: 24px;
        border-radius: 14px;
    }

    input[type=checkbox]{
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 16px;
        height: 16px;
        border: solid 1px #aaa;

        &:checked:after{
            content: 'X'    
        }

    }

    
</style>
