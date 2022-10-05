const db = require('./db.service');

const tableName = 'auth';

async function insertImage(userInfo) {
  const sqlQuery = `INSERT INTO ${tableName} (username, email, password) VALUES (?, ?, ?)`;
  let message;
  try {
    const result = await db.query(sqlQuery, [
      userInfo?.username,
      userInfo?.email,
      userInfo?.password,
    ]);
  } catch (error) {
    //
    message =
      error?.code === 'ER_DUP_ENTRY'
        ? `User Exists For mail ${userInfo?.email}`
        : 'Something Went happened !!!';
  }

  if (result.affectedRows) {
    console.log(
      '🚀 ~ file: users.service.js ~ line 32 ~ insertUser ~ result.affectedRows',
      result
    );
    message = `User Inserted successfully with id = ${result?.insertId}`;
  }

  return { message };
}

module.exports = {
  insertImage,
};
