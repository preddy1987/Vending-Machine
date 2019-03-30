<template>
    <div id="data-list-container">
        <ul id="data-list">
            <li></li>
            <li v-for="dataItem in dataList" :key="dataList.indexOf(dataItem)"></li>
        </ul>
        <div id="total-sales"><span>Total Sales:</span> {{ totalSales }}</div>
    </div>
</template>

<script>
export default {
    props: {
        totalSales: Number,
        dataList: Array
    },
    computed: {
        gridTemplateColumns() {
            let string = "5%";
            
        }
    }
}
</script>

<style>
#report-list-container {
    border: solid black;
    padding: 5%;
}

#report-list > :first-child {
    border-bottom: solid black;
}

#report-list li {
    display: grid;
    grid-template-columns: 20% 1fr 10% 1fr 20%;
    grid-template-areas: ". name . amount .";
    padding: 5px 0;
    align-items: center;
}

#report-list li :last-child {
    text-align: right;
}

#report-list :nth-child(even) {
    background: lightsteelblue;
}

#total-sales {
    padding: 0 100px 25px 40px;
    text-align: right;
}

#total-sales span {
    font-weight: bold;
}
</style>
