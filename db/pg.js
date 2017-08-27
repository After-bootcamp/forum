const env = require('../env.js');
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: env.PGDB_USER,
  host: env.PGDB_HOST,
  database: env.PGDB_NAME,
  password: env.PGDB_PASS,
  port: env.PGDB_PORT
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: env.PGDB_USER,
  host: env.PGDB_HOST,
  database: env.PGDB_NAME,
  password: env.PGDB_PASS,
  port: env.PGDB_PORT
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})
