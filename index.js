const express = require("express");
const app = express();
const migration = require("./src/migrations");

app.listen(3333, () => {
    console.log(`Server is running in port ${3333}`);
});

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello World",
        status: 200,
        node_version: process.version
    });
});

app.get("/create_database", (req, res) => {
    migration.CreateDatabase().then(json => {
        console.log(json);
        res.status(200).send(json);
    }).catch(err => {
        console.log(err);
        res.status(200).send(err);
    })
});

app.get("/create_admin_accounts_table", (req, res) => {
    migration.CreateAdminUsersTable().then(json => {
        console.log(json);
        res.status(200).send(json);
    }).catch(err => {
        console.log(err);
        res.status(200).send(err);
    })
});

app.get("/create_users_table", (req, res) => {
    migration.CreateUsersTable().then(json => {
        console.log(json);
        res.status(200).send(json);
    }).catch(err => {
        console.log(err);
        res.status(200).send(err);
    })
});