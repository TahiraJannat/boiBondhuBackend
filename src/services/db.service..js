const mysql = require("mysql2/promise");
const config = require("../configs/db.config");

// async function query(sql, params) {
const query = async (sql, params) => {
  const connectionPool = await mysql.createPool(config.db);

  const [rows, fields] = await connectionPool.execute(sql, params);

  return rows;
};

module.exports = {
  query,
};
