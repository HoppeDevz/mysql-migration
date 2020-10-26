## 🔄 mySQL migrations
<p style="text-align: center"><img src="https://miro.medium.com/max/2800/1*GbCLGfNCoX2xtmXH_Pt0yA.png" /></p>

##### All functions 👉
Create Database <br>
```js
    CreateDatabase: () => {
        return new Promise((resolve, reject) => {
            db.query("CREATE DATABASE Linux64amd", (err, res) => {
                if (err) return reject({ created_database: false, reason: err.code });
                RefreshSQLConnection();
                return resolve({ created_database: true });
            })
        });
    },
```
Create Tables 👉
```js
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
```