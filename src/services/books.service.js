const generateUniqueId = require('../utility/generateUniqueId');
const db = require('./db.service');

const tableName = 'booksInfo';

async function getAllBooks() {
  const sqlQuery = `SELECT * FROM ${tableName} ORDER BY created_at DESC`;
  const data = await db.query(sqlQuery);
  return {
    response: {
      data,
    },
  };
}
async function getSingle(bookID) {
  const sqlQuery = `SELECT * FROM ${tableName} WHERE bookID=?`;
  const data = await db.query(sqlQuery, [bookID]);
  return {
    response: {
      data,
    },
  };
}

async function insertInfo(booksInfo) {
  // console.log(
  //   `🔥 ~ file: books.service.js ~ line 47 ~ insertInfo ~ booksInfo`,
  //   booksInfo
  // );
  let response = 'Error';
  //   INSERT INTO booksInfo (uploadedBy, bookTitle, bookAuthor, bookCat, bookDesc, bookLocation, bookImageURL)
  // VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', 'gdsgs', 'Norway', 'Norway');
  const bookID = generateUniqueId();
  const sqlQuery = `INSERT INTO ${tableName} (uploadedBy,bookID, bookTitle, bookAuthor, bookCat, bookDesc, bookLocation, bookImageURL)  VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

  try {
    result = await db.query(sqlQuery, [
      booksInfo?.uploadedBy,
      bookID,
      booksInfo?.bookTitle,
      booksInfo?.bookAuthor,
      booksInfo?.bookCat,
      booksInfo?.bookDesc,
      booksInfo?.bookLocation,
      booksInfo?.bookImageURL,
    ]);

    if (await result.affectedRows) {
      response = {
        message: `successfully uploaded`,
        status: 200,
      };
    } else {
      console.log(
        `🔥 ~ file: books.service.js ~ line 67 ~ insertInfo ~ error`,
        result
      );
    }
  } catch (error) {
    console.log(
      `🔥 ~ file: books.service.js ~ line 67 ~ insertInfo ~ error`,
      error
    );
    response = {
      status: error?.code,
      message: 'Cant upload !!!',
      errorMessage: error,
    };
  }

  return { response };
}
// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;

module.exports = {
  insertInfo,
  getSingle,
  getAllBooks,
};
