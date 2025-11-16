const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // tu contraseña de MySQL
  database: "ong_donaciones",
});

module.exports = pool;
