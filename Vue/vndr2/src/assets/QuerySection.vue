<template>
    <form id="query-form">
        <div class="">
            <label for="Year">Year</label>
            <select id="Year" class="form-control" name="Year">
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
            </select>
        </div>
    </form>
</template>

<script>
export default {

}
</script>

<style>
.query-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 25px;
    margin-top: 15px;
}

.query-form label {
    font-weight: bold;
    margin: 5px;
}

.query-form select,
.query-form input {
    margin: 5px;
    min-width: 150px;
    display: inline-block;
}
</style>
