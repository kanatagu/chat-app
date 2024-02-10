const fs = require('fs');
const path = require('path');
const pool = require('./pool');

// read schema.sql
const schema = fs.readFileSync(path.resolve(__dirname, './schema.sql'), {
  encoding: 'utf8',
});

pool.query(schema, (err, res) => {
  if (err) {
    console.error(err, res);
  } else {
    console.log('Reset Database!');
  }
  pool.end();
});

module.exports;
