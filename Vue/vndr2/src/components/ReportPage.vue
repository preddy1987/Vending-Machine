<template>
    <div id="report-page">
        <h4 id="report-title">Report</h4>
        <query-section :queryInputs="queryInputs" @report-query-values="applyQuery" :queryAppend="queryAppend"></query-section>
        <data-table :totalSales="totalSales" :dataList="dataList" />
    </div>
</template>

<script>
import QuerySection from "@/components/QuerySection";
import DataTable from "@/components/DataTable";

export default {
    name: "report-page",
    components: {
        QuerySection,
        DataTable
    },
    data() {
        return {
            totalSales: undefined,
            dataList: undefined,
            queryAppend: "report",
            queryInputs: [
                {
                    type: "select",
                    name: "years",
                    options: [
                        {
                            value: "all",
                            display: "All"
                        }
                    ]
                },
                {
                    type: "select",
                    name: "users",
                    options: [
                        {
                            value: "all",
                            display: "All"
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        getYears() {
            const currentYear = (new Date()).getFullYear();
            for(let i = currentYear; i >= 2015; i--){
                let year = {};
                year.value = i;
                year.display = i;
                this.queryInputs[0].options.push(year);
            }
        },
        getUsers() {
            fetch(`http://localhost:57005/api/user`)
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                items.forEach((item) => {
                    let user = {};
                    user.value = item.id;
                    user.display = (item.firstName + " " + item.lastName);
                    this.queryInputs[1].options.push(user);
                });
            })
            .catch((err) => {console.error(err)});
        },
        generateReportList(apiurl){
            this.totalSales = 0;
            const reportProductList = [];
            this.dataList = [];

            fetch(`http://localhost:57005/api/product`)
                .then((response) => {
                    return response.json();
                })
                .then((items) => {
                    items.forEach((item) => {
                        let product = {};
                        product.id = item.id;
                        product.name = item.name;
                        product.count = 0;
                        reportProductList.push(product);
                    });

                    fetch(apiurl)
                        .then((response) => {
                            return response.json();
                        })
                        .then((items) => {
                            items.forEach((item) => {
                                reportProductList.forEach((product) => {
                                    if(item.productId == product.id){
                                        product.count += 1;
                                        this.totalSales += item.salePrice;                    
                                    }
                                });
                            });

                            reportProductList.forEach((product) => {
                                if(product.count != 0){
                                    this.dataList.push({name: product.name, count: product.count});
                                }
                            });
                        })
                        .catch((err) => {console.error(err)});
                })
                .catch((err) => {console.error(err)});
        },
        applyQuery(queryValues) {
            if(queryValues[0] == 'all'){
                this.generateReportList(`http://localhost:57005/api/transactionitem/all`)
            }
            else if(queryValues[1] == 'all') {
                this.generateReportList(`http://localhost:57005/api/transactionitem/foryear/${queryValues[0]}`);
            }
            else {
                this.generateReportList(`http://localhost:57005/api/transactionitem/foryearanduser/${queryValues[0]}/${queryValues[1]}`);
            }
        }
    },
    created: function () {
        this.getYears();
        this.getUsers();
    }
}
</script>

<style scoped>
#report-page {
    padding: 15px;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 15px;
    margin-bottom: 50px;
    border: solid black;
    background: white;
    width: auto;
}

#report-title {
    text-align: center;
    margin: 5%;
}
</style>
