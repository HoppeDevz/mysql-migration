const mysql = require("mysql");

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Linux64amd"
});

// IF NOT EXIST DATABASE CREATE GLOBAL CONNECTION;
(() => {
    db.query("SELECT 1 + 1 = 2", (err, res) => {
        if (!res) {
            db = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: ""
            });
            console.log("CHANGED SQL CONNECTION!");
        };
    });
})();

function RefreshSQLConnection() {
    db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "Linux64amd"
    });
}

module.exports = {

    CreateDatabase: () => {
        return new Promise((resolve, reject) => {
            db.query("CREATE DATABASE Linux64amd", (err, res) => {
                if (err) return reject({ created_database: false, reason: err.code });
                RefreshSQLConnection();
                return resolve({ created_database: true });
            })
        });
    },

    CreateAdminUsersTable: () => {
        return new Promise((resolve, reject) => {
            db.query(/*sql*/`
                CREATE TABLE IF NOT EXISTS admin_accounts (
                id int(11) NOT NULL AUTO_INCREMENT,
                username varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                PRIMARY KEY (id)
            )
            `, (err, res) => {
                console.log(res);
                if (err) return reject({ created_table: false, reason: err.code });
                return resolve({ created_table: true });
            });
        });
    },

    CreateUsersTable: () => {
        return new Promise((resolve, reject) => {
            db.query(/*sql*/`
                CREATE TABLE IF NOT EXISTS users_accounts (
                    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    first_name varchar(255) NOT NULL,
                    last_name varchar(255) NOT NULL,
                    username varchar(255) NOT NULL,
                    email varchar(255) NOT NULL,
                    password varchar(2056) NOT NULL
                )
            `, (err, res) => {
                console.log(res);
                if (err) return reject({ created_table: false, reason: err.code });
                return resolve({ created_table: true });
            })
        });
    }

}
