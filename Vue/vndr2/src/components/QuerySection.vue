<template>
    <form :id="queryAppend" @submit.prevent="sendQueryParameters">
        <div class="form-group" v-for="input in queryInputs" :key="input.name">
            <label :for="input.name">{{ input.name }}</label>
            <select v-if="input.type === 'select'" :id="input.name"
                    class="form-control" :name="input.name">
                <option v-for="option in input.options" :key="option.value"
                        :value="option.value">{{ option.display }}</option>
            </select>
            <input v-if="((input.type === 'text') || (input.type === 'date'))" :id="input.name"
                    class="form-control" :name="input.name" :type="input.type" />
        </div>
        <button class="btn btn-info form-group">Refresh</button>
    </form>
</template>

<script>
export default {
    name: "query-form",
    props: {
        queryInputs: Array,
        queryAppend: String,
    },
    methods: {
        sendQueryParameters () {
            const formTag = document.getElementById(this.queryAppend);
            const selectTags = formTag.querySelectorAll("select");
            const inputTags = formTag.querySelectorAll("input");

            const queryValues = [];

            if(selectTags.length > 0){
                selectTags.forEach( (selectTag) => {
                    queryValues.push(selectTag.options[selectTag.selectedIndex].value);
                });
            }
            
            if(inputTags.length > 0){
                inputTags.forEach( (inputTag) => {
                    queryValues.push(inputTag.value);
                });
            }

            this.$emit(this.eventName, queryValues)
        }
    },
    computed: {
        eventName: function(){
            let eventName = this.queryAppend + "-query-values";
            
            return eventName;
        }
    },
    mounted: function () {
        this.sendQueryParameters();
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 25px;
    margin-top: 15px;
}

label, select, input, button {
    text-transform: capitalize;
    min-width: 150px;
}

button {
    background-color: #4682b4b0;
}
</style>
