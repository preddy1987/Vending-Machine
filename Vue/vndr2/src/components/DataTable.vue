<template>
    <div class="data-list-container">
        <ul v-if="(dataList != undefined)">
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
        <div class="total-sales" v-if="(totalSales != undefined)"><span>Total Sales:</span> ${{ totalSales.toFixed(2) }}</div>
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
            let columnString = '2fr';
            if((this.dataList != undefined) && (this.dataList.length > 0)){
                let keyArray = Object.keys(this.dataList[0]);

                for(let i = 0; i < keyArray.length; i++){
                    if(i != (keyArray.length - 1)){
                        columnString += ' 2fr 1fr';
                    }
                    else {
                        columnString += ' 2fr 2fr';
                    }
                }
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

<style scoped>
.data-list-container {
    border: solid black;
    margin: 5%;
    padding: 5%;
}

ul {
    padding: 0;
}

ul > :first-child {
    border-bottom: solid black;
    text-transform: capitalize;
    font-weight: bold;
}

ul li {
    display: grid;
    padding: 5px 0;
    align-items: center;
}

ul li :last-child {
    text-align: right;
}

ul > :nth-child(even) {
    background: lightsteelblue;
}

.total-sales {
    padding: 0 15% 0 0;
    text-align: right;
}

.total-sales span {
    font-weight: bold;
}
</style>
