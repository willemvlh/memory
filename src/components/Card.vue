<template>
    <div class="card" :class="{isTurned: isTurned, removed: isRemovedFromPlay}" :style="{width: widthPx, height: heightPx}" @click="flip()">
        <div class="card-inner">
            <div class="card-front">
                <img class="card-image" src='../assets/card.jpg' :style="{width: widthPx, height: heightPx}"/>
            </div>
            <div class="card-back">
                <img class="card-image" :src="'./football/' + value" :style="{width: widthPx, height: heightPx}"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        color: String,
        value: String,
        totalCards: Number
    },
    data: function(){
        return {
            isTurned: false,
            isRemovedFromPlay: false
        }
    },
    computed: {
        height: function(){
            if(!this.totalCards){
                return 140;
            }
            let calculated = 160 - (this.totalCards * 1.3);
            return Math.max(calculated, 100);
        },
        width: function(){
            return this.height / 1.4;
        },
        widthPx: function(){
            return this.width + "px";
        },
        heightPx: function(){
            return this.height + "px";
        }

    },
    methods: {
        flip: function(){
            if(this.isRemovedFromPlay){
                return;
            }
            this.isTurned = !this.isTurned;
            if(this.isTurned){
                this.$emit("cardFlip");
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
        this.$emit("cardCreated", this);
    }
}
</script>

<style lang="scss" scoped>

div.card{
    margin: 10px;
    transition: opacity 0.5s;
    &:hover{
        cursor: pointer;
    }
}

.card-inner{
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.3s ease-in-out;
}

.isTurned .card-back .card-image, .card-front .card-image{
    box-shadow: $box-shadow;
    border: solid 1px #aaa;
}

.isTurned .card-front .card-image{
    box-shadow: none;
    border: none;
}

.isTurned .card-inner{
    transform: rotateY(180deg);
}

.card-front, .card-back{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-back{
    transform: rotateY(180deg);     
}

img{
    object-fit: cover;
}

div.removed{
    opacity: 0;
}
</style>
