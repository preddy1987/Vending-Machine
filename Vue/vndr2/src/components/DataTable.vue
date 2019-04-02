<template>
    <div id="data-list-container">
        <ul id="data-list" v-if="(dataList != undefined)">
            <li :style="gridAreas" v-if="(dataList[0] != undefined)" >
                <div v-for="key in Object.keys(dataList[0])"
                    :key="'header' + key"
                    :style="{gridArea: key}">{{ key }}</div>
            </li>
            <li :style="gridAreas" v-for="dataItem in dataList"
                :key="dataList.indexOf(dataItem)">
                <div v-for="(value, key) in dataItem" :key="key + dataList.indexOf(dataItem)"
                    :style="{gridArea: key}">{{ value }}</div>
            </li>
        </ul>
        <div id="total-sales" v-if="(totalSales != undefined)"><span>Total Sales:</span> ${{ totalSales.toFixed(2) }}</div>
    </div>
</template>

<script>
export default {
    name: "data-list-container",
    props: {
        totalSales: Number,
        dataList: Array
    },
    computed: {
        gridAreas: function(){
            let columnString = '1fr';
            if((this.dataList != undefined) && (this.dataList.length > 0)){
                Object.keys(this.dataList[0]).forEach( () => {
                    columnString += ' 2fr 1fr';
                });
            }

            let areaString = '".';
            if((this.dataList != undefined) && (this.dataList.length > 0)){
                Object.keys(this.dataList[0]).forEach( (key) => {
                    areaString += ` ${key} .`;
                });
            }
            
            areaString += '"';
            
            return {
                'grid-template-columns': columnString,
                'grid-template-areas': areaString
            };
        }
    }
}
</script>

<style>
#data-list-container {
    border: solid black;
    padding: 5%;
}

#data-list > :first-child {
    border-bottom: solid black;
    text-transform: capitalize;
    font-weight: bold;
}

#data-list li {
    display: grid;
    padding: 5px 0;
    align-items: center;
}

#data-list li :last-child {
    text-align: right;
}

#data-list > :nth-child(even) {
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
