const Pool = require('pg').Pool;

const password = process.env.PASSWORD_PG || 'root';
const port = process.env.PORT_PG || '5432';

const pool = new Pool({
  user: 'postgres',
  password: password,
  host: 'localhost',
  port: port,
});

module.exports = pool;
