<template>
    <div id="report-box">
        <h4 id="report-title">Report</h4>
        <query-section :queryInputs="queryInputs"></query-section>
        <!-- <data-table /> -->
    </div>
</template>

<script>
import QuerySection from "@/components/QuerySection";
//import DataTable from "@/DataTable";

export default {
    name: "report-box",
    components: {
        QuerySection
        //DataTable
    },
    data() {
        return {
            queryInputs: [
                {
                    type: "select",
                    name: "years",
                    options: []
                },
                {
                    type: "select",
                    name: "users",
                    options: []
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
