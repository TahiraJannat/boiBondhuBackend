const db = require('./db.service');

const tableName = 'booksOptions';

async function getOptions() {
  let response = '';
  const sqlQuery = `SELECT * FROM ${tableName}`;
  const data = await db.query(sqlQuery);
  return {
    response: {
      status: 200,
      data: data,
    },
  };
}

module.exports = {
  getOptions,
};
