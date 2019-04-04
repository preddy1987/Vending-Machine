<template>
    <div id="log-page">
        <h4 id="log-title">Log</h4>
        <query-section :queryInputs="queryInputs" @log-query-values="applyQuery" :queryAppend="queryAppend"></query-section>
        <data-table :dataList="dataList" />
    </div>
</template>

<script>
import QuerySection from "@/components/QuerySection";
import DataTable from "@/components/DataTable";

export default {
    name: "log-page",
    components: {
        QuerySection,
        DataTable
    },
    data() {
        return {
            dataList: undefined,
            queryAppend: "log",
            queryInputs: [
                {
                    type: "date",
                    name: "from date"
                },
                {
                    type: "date",
                    name: "to date"
                },
                {
                    type: "select",
                    name: "operation types",
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
                },
                {
                    type: "select",
                    name: "products",
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
        getUsers() {
            fetch(`http://localhost:57005/api/user`)
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                items.forEach((item) => {
                    let user = {};
                    user.value = item.id;
                    user.display = item.username;
                    this.queryInputs[3].options.push(user);
                });
            })
            .catch((err) => {console.error(err)});
        },
        getProducts() {
            fetch(`http://localhost:57005/api/product`)
                .then((response) => {
                    return response.json();
                })
                .then((items) => {
                    items.forEach((item) => {
                        let product = {};
                        product.value = item.id;
                        product.display = item.name;
                        this.queryInputs[4].options.push(product);
                    });
                })
                .catch((err) => {console.error(err)});
        },
        getOperations() {
            fetch(`http://localhost:57005/api/operationtype`)
                .then((response) => {
                    return response.json();
                })
                .then((items) => {
                    items.forEach((item) => {
                        let operation = {};
                        operation.value = item.id;
                        operation.display = item.name;
                        this.queryInputs[2].options.push(operation);
                    });
                })
                .catch((err) => {console.error(err)});
        },
        generateLogList(apiurl, queryValues){
            const operationQuery = queryValues[0];
            const userQuery = queryValues[1];
            const productQuery = queryValues[2];
            const userList = {};
            const operationList = {};
            this.dataList = [];

            fetch(`http://localhost:57005/api/user`)
                .then((response) => {
                    return response.json();
                })
                .then((items) => {
                    items.forEach((item) => {
                        userList[item.id] = item.username;
                    });

                    fetch(`http://localhost:57005/api/operationtype`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((items) => {
                            items.forEach((item) => {
                                operationList[item.id] = item.name
                            });

                            fetch(apiurl)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((items) => {
                                    let tempLogList = [];

                                    items.forEach((item) => {
                                        let logItem = {};
                                        logItem.date = item.timeStampStr;
                                        logItem.userId = item.userId;
                                        logItem.operationId = item.operationType;
                                        logItem.productId = item.productId;
                                        logItem.product = item.productName;
                                        logItem.amount = `$${item.price.toFixed(2)}`;
                                        tempLogList.push(logItem);
                                    });

                                    if(userQuery != "all"){
                                        tempLogList = tempLogList.filter( (logItem) => {
                                            return logItem.userId == userQuery;
                                        });
                                    }

                                    if(productQuery != "all"){
                                        tempLogList = tempLogList.filter( (logItem) => {
                                            return logItem.productId == productQuery;
                                        });
                                    }

                                    if(operationQuery != "all"){
                                        tempLogList = tempLogList.filter( (logItem) => {
                                            return logItem.operationId == operationQuery;
                                        });
                                    }

                                    tempLogList.forEach((tempItem) => {
                                        let logItem = {};
                                        logItem.date = tempItem.date;
                                        logItem.username = userList[tempItem.userId];
                                        logItem.operation = operationList[tempItem.operationId];
                                        if(tempItem.product != ""){
                                            logItem.operation += `: ${tempItem.product}`;
                                        }
                                        logItem.amount = tempItem.amount;
                                        this.dataList.push(logItem);
                                    });
                                })
                                .catch((err) => {console.error(err)});
                        })
                        .catch((err) => {console.error(err)});
                })
                .catch((err) => {console.error(err)});
        },
        applyQuery(queryValues) {
            if((queryValues[3] == "") && (queryValues[4] == "")) {
                this.generateLogList("http://localhost:57005/api/log/getall", queryValues);
            }
            else {
                this.generateLogList(`http://localhost:57005/api/log/getrange?fromlogdatetime=${queryValues[3]}&tologdatetime=${queryValues[4]}`, queryValues);
            }
        }
    },
    created: function () {
        this.getUsers();
        this.getProducts();
        this.getOperations();
    }
}
</script>

<style scoped>
#log-page {
    padding: 15px;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 15px;
    margin-bottom: 50px;
    border: solid black;
    background: white;
    width: auto;
}

#log-title {
    text-align: center;
    margin: 5%;
}
</style>
