const db = require('./db.service');
const generateUniqueId = require('../utility/generateUniqueId');

const tableName = 'auth';

async function checkLogin(email, pass) {
  const sqlQuery = `SELECT  userID, username, email  FROM ${tableName} WHERE email=? && password=?`;
  const data = await db.query(sqlQuery, [email, pass]);
  // console.log(`🔥 ~ file: auth.service.js ~ line 9 ~ checkLogin ~ data`, data);
  // return {
  //   data
  // };
  if (data.length > 0) {
    return {
      response: {
        data: data,
        status: 'Successfully logged in',
      },
    };
  } else {
    let noUser = {
      response: {
        data: null,
        status: 'Ahhaha!! Either SignUp or Check Your Credential :( ',
      },
    };

    return noUser;
  }
}
async function insertUser(userInfo) {
  const sqlQuery = `INSERT INTO ${tableName} (userID, username, email, password) VALUES (?, ?, ?, ?)`;

  const userUniqueId = generateUniqueId();

  let response, result;
  try {
    result = await db.query(sqlQuery, [
      userUniqueId,
      userInfo?.username,
      userInfo?.email,
      userInfo?.password,
    ]);
    console.log(
      `🔥 ~ file: auth.service.js ~ line 48 ~ insertUser ~ result`,
      result
    );
  } catch (error) {
    //
    //
    response = {
      status: error?.code,
      message:
        error?.code === 'ER_DUP_ENTRY'
          ? `User Exists For mail ${userInfo?.email}`
          : 'Something Went Happened !!!',
      errorMessage:
        error?.code === 'ER_DUP_ENTRY'
          ? `User Exists For mail ${userInfo?.email}`
          : 'Something Went Happened !!!',
    };
  }

  if (result?.affectedRows) {
    response = {
      message: `User Inserted successfully with id = ${result?.insertId}`,
      status: `Ok`,
    };
  }

  return { response };
}

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;

async function updateUser(id, userInfo) {
  console.log(
    '🚀 ~ file: users.service.js ~ line 47 ~ updateUser ~ id, userInfo',
    id,
    userInfo
  );
  const sqlQuery = `UPDATE ${tableName} SET username=?, email=?, password=? WHERE id=?`;
  const result = await db.query(sqlQuery, [
    userInfo?.username,
    userInfo?.email,
    userInfo?.password,
    id,
  ]);

  let response = 'Error in updating user';

  if (result.affectedRows) {
    response = 'User updated successfully';
  }

  return { response };
}
// async function removeUser(id) {
const removeUser = async (id) => {
  const sqlQuery = `DELETE FROM ${tableName} WHERE id=?`;

  const result = await db.query(sqlQuery, [id]);

  let response = 'Error in removing user';

  if (result.affectedRows) {
    response = `User Removed successfully with id = ${id} `;
  }

  return { response };
};

module.exports = {
  checkLogin,
  insertUser,
};
