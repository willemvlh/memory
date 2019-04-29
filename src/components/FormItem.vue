<template>
  <div class="form-item">
    <label>Player {{this.index}}</label>
    <input type="text" v-model="name">
  </div>
</template>

<script>
export default {
  props: {
    index: Number
  },
  data: function() {
    return {
      name: ""
    };
  },
  created: function() {
    this.$emit("created", this);
  },
  destroyed: function() {
    this.$emit("destroyed");
  }
};
</script>

<style lang="scss">
$size-small: "screen and (max-width: 450px)";

.form-item {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  column-gap: 8px;
  align-items: center;
   @media #{$size-small} {
       max-width: 300px;
   }
}

input[type="text"], input[type="number"] {
  $shadow: 0px 0px 3px #aaa;
  border: $border;
  padding: 6px;
  &:hover{
      box-shadow: $shadow;
  }

  &:focus{
      box-shadow: $shadow;
  }
}
</style>
