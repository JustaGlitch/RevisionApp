const fs = require('fs');
require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync('./database/db.sql').toString();

db.query(sql)
    .then(data => {
        db.end();
        console.log("setup complete")
    })
    .catch(error => { console.log(error)})