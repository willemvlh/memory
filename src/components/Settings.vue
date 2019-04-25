<template>
    <div id="settings">
        
        <div class="form-entry">
            <label for="showFlipAnimation">Show flip animation</label>
            <input id="showFlipAnimation" type="checkbox" v-model="settings.showFlipAnimation" @change="updateSettings">
        </div>
        <div class="form-entry">
            <label for="showSmallCards">Smaller cards</label>
            <input id="showSmallCards" type="checkbox" v-model="settings.showSmallCards" @change="updateSettings">
        </div>
    </div>
</template>

<script>
import {EventBus} from './EventBus.js';

export default {
    data: function(){
        return {
            settings: {
                showFlipAnimation: false,
                showSmallCards: false
            }
        };
    },
    methods: {
        updateSettings: function(){
            EventBus.$emit("settingsUpdate", this.settings);
        }
    },
    mounted: function(){
        this.updateSettings();
    }
};
</script>

<style lang="scss">
div#settings{
    text-align: right;
    flex: 1;
}
</style>
