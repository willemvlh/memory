<template>
    <div class="card" :class="{isTurned: isTurned, removed: isRemovedFromPlay}" :style="{backgroundImage: isTurned ? 'url(./football/' + value + ')' : ''}" @click="flip()">
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
        },
        reset(){
            this.isRemovedFromPlay = false;
            this.isTurned = false;
        }
    },
    mounted: function(){
        this.isTurned = false;
        this.isRemovedFromPlay = false;
    }
}
</script>

<style lang="scss" scoped>
div.card{
    flex: 0 0 120px;
    height: 160px;
    border: $border;
    margin: 10px;
    background-size: cover;
    background-position: center;
    background-image: url("../assets/card.jpg");
    box-shadow: $box-shadow;
    &:hover{
        cursor: pointer;
    }
}

div.removed{
    visibility: hidden!important;
}
</style>
