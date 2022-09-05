const db = require("./db.service.");

const tableName = "auth";

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
      data: "No User !! OR  Credential Mismatch !! :( ",
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
async function insertUser(userInfo) {
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
    message = "Something Wrong or Duplicatie Mail";
  }

  if (result.affectedRows) {
    console.log(
      "🚀 ~ file: users.service.js ~ line 32 ~ insertUser ~ result.affectedRows",
      result
    );
    message = `User Inserted successfully with id = ${result?.insertId}`;
  }

  return { message };
}

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;

async function updateUser(id, userInfo) {
  console.log(
    "🚀 ~ file: users.service.js ~ line 47 ~ updateUser ~ id, userInfo",
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

  let message = "Error in updating user";

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return { message };
}
// async function removeUser(id) {
const removeUser = async (id) => {
  const sqlQuery = `DELETE FROM ${tableName} WHERE id=?`;

  const result = await db.query(sqlQuery, [id]);

  let message = "Error in removing user";

  if (result.affectedRows) {
    message = `User Removed successfully with id = ${id} `;
  }

  return { message };
};

module.exports = {
  getUsers,
  getUser,
  checkLogin,
  insertUser,
  removeUser,
  updateUser,
  getuserPass,
};
