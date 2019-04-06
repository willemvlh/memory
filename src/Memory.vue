<template>
    <div id="container" ref="container">
        <div id="before-start">
            <label for="cards">Input for cards:</label> 
            <input type="text" id="cards">
            <button v-on:click="start">Start</button>
        </div>
        <app></app>
    </div>
</template>

<script>
import App from './App.vue';
import Vue from 'vue'
export default {
    methods: {
        start: function(){
            
        }
    }
}
</script>

<style>

</style>
