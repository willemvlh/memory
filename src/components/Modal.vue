<template>
    <div class="modal-mask">
        <div class="modal">
            <div class="form">
                <div class="form-entry" v-for="(item, n) in items" :key="item.identifier">
                    <label :for="item.identifier">{{item.label}}</label> 
                    <input :type="item.type" :id="item.identifier" v-model="myItems[n].value">
                </div>
                <button v-on:click="submit">Start</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
        id: String
    },
    data: function(){
        return {
            myItems: this.items.map(i => {
                return {
                    value: "",
                    identifier: i.identifier
                }
            })
        }
    },
    methods: {
        submit: function(){
            this.$emit("modalSubmit", {items: this.myItems, id: this.id});
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

        .form{
            display: grid;
            grid-template-rows: 20px 20px;
            grid-gap: 15px;
        }

        .form-entry{
            display: grid;
            width: 80%;
            grid-template-columns: 200px 200px;
            grid-gap: 15px;
        }

        button{
            width: max-content
        }
    }
</style>
