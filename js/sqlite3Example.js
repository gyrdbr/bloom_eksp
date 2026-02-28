// import *  as sqlite3  from 'sqlite3';
// import { printQueryResults } from './utils';


const { printQueryResults } = require('./utils');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

// Copy to Clipboard


// require the 'sqlite3' package here

// open up the SQLite database in './db.sqlite'

db.all('SELECT * FROM TemperatureData ORDER BY year', function (error, rows) {
    if (error) {
        throw error;
    }
    console.log("TemperatureData rows:", rows.length);
    printQueryResults(rows);
});
db.all("SELECT * FROM Dog WHERE breed='Corgi'", function (error, rows) {
    console.log("Corgi rows:", rows.length);
    printQueryResults(rows);
});

