const env = require('../env.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: env.PGDB_USER,
  host: env.PGDB_HOST,
  database: env.PGDB_NAME,
  password: env.PGDB_PASS,
  port: env.PGDB_PORT
});

if (!env.APP_ENV || env.APP_ENV === 'development') {
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

module.exports = pool;
