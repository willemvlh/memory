<template>
  <div class="card" :class="classArray" @click="flip()">
    <div class="card-inner" :style="{transition: settings.showFlipAnimation ? 'all 0.5s' : 'none'}">
      <div class="card-front">
        <img class="card-image" src="../assets/card.jpg">
      </div>
      <div class="card-back">
        <img class="card-image" :src="'./football/' + value">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    value: String,
    totalCards: Number,
    settings: Object
  },
  data: function() {
    return {
      isTurned: false,
      isRemovedFromPlay: false
    };
  },
  computed: {
    classArray: function() {
      return [
        this.isTurned ? "isTurned" : "",
        this.isRemovedFromPlay ? "removed" : "",
        this.settings.showSmallCards ? "small" : "medium"
      ];
    }
  },
  methods: {
    flip: function() {
      if (this.isRemovedFromPlay) {
        return;
      }
      this.isTurned = !this.isTurned;
      if (this.isTurned) {
        this.$emit("cardFlip");
      }
    },
    removeFromPlay: function() {
      this.isRemovedFromPlay = true;
    },
    reset() {
      this.isRemovedFromPlay = false;
      this.isTurned = false;
    }
  },
  mounted: function() {
    this.isTurned = false;
    this.isRemovedFromPlay = false;
    this.$emit("cardCreated", this);
  }
};
</script>

<style lang="scss" scoped>
$size: 106px;

$card-size-medium: 100px;
$card-size-small: 75px;
$card-size-smaller: 65px;

$margin-medium: 2px;
$margin-small: 2px;
$margin-smaller: 2px;

$size-small: "screen and (max-width: 800px)";
$size-medium: "screen and (max-width: 1000px)";

@mixin small-size {
  width: $card-size-small;
  height: $card-size-small;
  margin: $margin-small;
}

div.small {
  @include small-size();
}

div.smaller {
  width: $card-size-smaller !important;
  height: $card-size-smaller !important;
  margin: $margin-smaller !important;
}

div.medium {
  width: $size;
  height: $size;
  margin: 10px;

  @media #{$size-medium} {
    width: $card-size-medium;
    height: $card-size-medium;
    margin: $margin-medium;
  }
  @media #{$size-small} {
    @include small-size();
  }
}

div.card {
  transition: opacity 0.5s;
  &:hover {
    cursor: pointer;
  }
}

.card-inner {
  position: relative;
  transform-style: preserve-3d;
}

.isTurned .card-back .card-image,
.card-front .card-image {
  box-shadow: $box-shadow;
  border: $border;
}

.isTurned .card-front .card-image {
  box-shadow: none;
  border: none;
}

.isTurned .card-inner {
  transform: rotateY(180deg);
}

.card-image {
  background: white;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

img {
  object-fit: cover;
  width: 100%;
}

div.removed {
  opacity: 0;
}
</style>
