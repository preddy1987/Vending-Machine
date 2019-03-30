<template>
    <div id="report-box">
        <h4 id="report-title">Report</h4>
        <query-section :queryInputs="queryInputs" @query-values="applyQuery"></query-section>
        <data-table :totalSales="totalSales" :dataList="dataList" />
    </div>
</template>

<script>
import QuerySection from "@/components/QuerySection";
import DataTable from "@/components/DataTable";

export default {
    name: "report-box",
    components: {
        QuerySection,
        DataTable
    },
    data() {
        return {
            totalSales: NaN,
            dataList: undefined,
            queryInputs: [
                {
                    type: "select",
                    name: "years",
                    options: []
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
            let reportRunningTotal = 0;
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
                                        reportRunningTotal += item.salePrice;                    
                                    }
                                });
                            });

                            this.totalSales = reportRunningTotal;

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
            if(queryValues[1] == 'all') {
                generateReportList(`http://localhost:57005/api/transactionitem/foryear/${queryValues[0]}`);
            }
            else {
                generateReportList(`http://localhost:57005/api/transactionitem/foryearanduser/${queryValues[0]}/${queryValues[1]}`);
            }
        }
    },
    created: function () {
        this.getYears();
        this.getUsers();
    }
}
</script>

<style>
#report-box {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 15px;
    margin-bottom: 50px;
    border: solid black;
    background: white;
    width: 100%;
}

#report-title {
    text-align: center;
    margin: 10px;
}
</style>
