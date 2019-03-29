<template>
    <form id="query-form">
        <div class="form-group" v-for="input in queryInputs" :key="input.name">
            <label :for="input.name">{{ input.name }}</label>
            <select v-if="input.type === 'select'" :id="input.name" class="form-control" :name="input.name">
                <option v-for="option in input.options" :key="option.value" :value="option.value">{{ option.display }}</option>
            </select>
            <input v-if="input.type === 'input'" :id="input.name" class="form-control" :name="input.name" />
        </div>
        <button class="btn btn-info form-group">Submit</button>
    </form>
</template>

<script>
export default {
    props: {
        queryInputs: Array
    }
}
</script>

<style>
#query-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 25px;
    margin-top: 15px;
}
</style>
