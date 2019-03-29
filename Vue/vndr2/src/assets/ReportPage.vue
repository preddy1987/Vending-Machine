<template>
    <div id="report-box">
        <h4 id="report-title">Report</h4>
        <query-selection :queryInputs="queryInputs" />
        <data-table />
    </div>
</template>

<script>
import QuerySelection from "@/QuerySelection";
import DataTable from "@/DataTable";

export default {
    name: "report-box",
    components: {
        QuerySelection,
        DataTable
    },
    data() {
        return {
            queryInputs: [
                {
                    type: "select",
                    name: "years",
                    options: getYears()
                },
                {
                    type: "select",
                    name: "users",
                    options: getUsers()
                }
            ]
        }
    },
    methods: {
        getYears() {
            const years = [];
            const currentYear = (new Date()).getFullYear();
            for(let i = currentYear; i >= 2015; i--){
                let year = {};
                year.value = i;
                year.display = i;
                years.push(year);
            }
            return years;
        },
        getUsers() {
            const users = [];

            fetch(`http://localhost:57005/api/user`)
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                items.forEach((item) => {
                    let user = {};
                    user.value = item.id;
                    user.display = (item.firstName + " " + item.lastName);
                    users.push(user);
                });
                return users;
            })
            .catch((err) => {console.error(err)});
        }
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
