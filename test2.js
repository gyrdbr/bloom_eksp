// var sqlite3 = require("sqlite3");

import sqlite3 from './sqlite3';
var db = new sqlite3.Database('./db.sqlite');
// Copy to Clipboard
// open up the SQLite database in './db.sqlite'
db.all('SELECT * FROM TemperatureData ORDER BY year', function (error, rows) {
    if (error) {
        throw error;
    }
    console.log("TemperatureData rows:", rows.length);
});
db.all("SELECT * FROM Dog WHERE breed='Corgi'", function (error, rows) {
    console.log("Corgi rows:", rows.length);
});
// import *  as betterSqlite3  from 'better-sqlite3';
