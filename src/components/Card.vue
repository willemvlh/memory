<template>
    <div class="card" :class="{isTurned: isTurned, removed: isRemovedFromPlay}" @click="flip()">
        <span class="value" :style="{display: display }">{{value}}</span>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        color: String,
        value: String
    },
    data: function(){
        return {
            isTurned: false,
            isRemovedFromPlay: false
        }
    },
    computed: {
        display: function(){
            return this.isTurned ? "block" : "none"
        }
    },
    methods: {
        flip: function(){
            if(this.isRemovedFromPlay){
                return;
            }
            this.isTurned = !this.isTurned;
            if(this.isTurned){
                this.$parent.addCard(this);
            }
            else{
                this.$parent.removeCard(this);
            }
        },
        removeFromPlay: function(){
            this.isRemovedFromPlay = true;
        }
    }
}
</script>

<style lang="scss">
div.card{
    width: 150px;
    height: 200px;
    border: solid 1px grey;
    margin: 10px;
    &:hover{
        cursor: pointer;
    }
}

div.removed{
    visibility: hidden!important;
}

div.isTurned{
    background-color: rgba(255,0,0,0.6);
}
</style>
