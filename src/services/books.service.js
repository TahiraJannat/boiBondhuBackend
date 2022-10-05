const db = require('./db.service');

const tableName = 'booksInfo';

async function getUsers() {
  const sqlQuery = `SELECT * FROM ${tableName}`;
  const data = await db.query(sqlQuery);
  return {
    data,
  };
}

async function getUser(id) {
  const sqlQuery = `SELECT * FROM ${tableName} WHERE id=?`;
  const data = await db.query(sqlQuery, [id]);
  return {
    data,
  };
}

async function checkLogin(email, pass) {
  const sqlQuery = `SELECT id, username, email  FROM ${tableName} WHERE email=? && password=?`;
  const data = await db.query(sqlQuery, [email, pass]);
  // return {
  //   data
  // };
  if (data.length > 0) {
    return { data };
  } else {
    let noUser = {
      data: 'No User !! OR  Credential Mismatch !! :( ',
    };

    return noUser;
  }
}

async function getuserPass(id) {
  const sqlQuery = `SELECT password FROM ${tableName} WHERE username=?`;
  const data = await db.query(sqlQuery, [id]);
  return {
    data,
  };
}
async function insertInfo(booksInfo) {

  let message = 'Error';
  const sqlQuery = `INSERT INTO ${tableName} (userID, usersBookInfo) VALUES (?, ?)`;

  try {
    result = await db.query(sqlQuery, [
      booksInfo?.userID,
      booksInfo?.bodyData,
      // booksInfo?.username,
      // booksInfo?.email,
      // booksInfo?.password,
    ]);
    if (await result.affectedRows) {
      message = 'successfully added';
    }
  } catch (error) {
    console.log(`🔥 ~ file: books.service.js ~ line 67 ~ insertInfo ~ error`, error)
    //
    // message =
    //   error?.code === 'ER_DUP_ENTRY'
    //     ? `User Exists For mail ${booksInfo?.email}`
    //     : 'Something Went happened !!!';
  }

  return { message };
}
// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;

async function updateUser(id, data) {
  const sqlQuery = `UPDATE ${tableName} SET username=?, email=?, password=? WHERE id=?`;
  const result = await db.query(sqlQuery, [
    data?.username,
    data?.email,
    data?.password,
    id,
  ]);

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return { message };
}
// async function removeUser(id) {
const removeUser = async (id) => {
  const sqlQuery = `DELETE FROM ${tableName} WHERE id=?`;

  const result = await db.query(sqlQuery, [id]);

  let message = 'Error in removing user';

  if (result.affectedRows) {
    message = `User Removed successfully with id = ${id} `;
  }

  return { message };
};

module.exports = {
  getUsers,
  getUser,
  checkLogin,
  removeUser,
  updateUser,
  getuserPass,
  insertInfo,
};
