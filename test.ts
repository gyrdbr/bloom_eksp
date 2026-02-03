import { printQueryResults } from './utils';
import { sqlite3 } from 'sqlite3';

// const { printQueryResults } = require('./utils');
// const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

// Copy to Clipboard


// require the 'sqlite3' package here

// open up the SQLite database in './db.sqlite'


db.all('SELECT * FROM TemperatureData ORDER BY year', (error: string | null, rows: Array<any>) => {
  if (error) {
    throw error;
  }
  printQueryResults(rows);
});

db.all("SELECT * FROM Dog WHERE breed='Corgi'", (error: string | null, rows: Array<any>) => {
  printQueryResults(rows);
});
