const books = require('../services/books.service');
require('dotenv').config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const env = process.env;

const imagePreviewURL = `${env.SERVER_NAME}:${env.SERVER_PORT}/images`;

async function get(req, res, next) {
  try {
    res.json(await books.getAllBooks());
  } catch (err) {
    console.error(`🚀 Error while getting books`, err.message);
    next(err);
  }
}

async function getSingleBookInfo(req, res, next) {
  try {
    res.json(await books.getSingle(req.params.bookID));
  } catch (err) {
    console.error(`🚀 Error while getting books`, err.message);
    next(err);
  }
}

// async function getPass(req, res, next) {
//   try {
//     res.json(await books.getuserPass(req.params.user));
//   } catch (err) {
//     console.error(`🚀 Error while getting books`, err.message);
//     next(err);
//   }
// }

// async function auth(req, res, next) {
//   console.log(`💩 ~ file: books.controller.js ~ line 31 ~ auth ~ req`, req);
//   try {
//     res.json(await books.checkLogin(req.params.email, req.params.pass));
//   } catch (err) {
//     console.error(`🚀 Error while getting books`, err.message);
//     next(err);
//   }
// }

const create = async (req, res, next) => {
  // console.log(`🔥`, req?.file);
  // console.log(`🔥`, req?.body);
  const getImageAPIUrl = '';
  const booksInfo = {
    // userID: req?.body?.userID,
    // bodyData: {
    ...req?.body,
    bookImageURL: `${imagePreviewURL}/${req?.file?.filename}`,
    // },
  };
  try {
    res.json(await books.insertInfo(booksInfo));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
  // res.send('Success upload')
};

const update = async (req, res, next) => {
  try {
    res.json(await books.updateUser(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  // async function remove(req, res, next) {
  try {
    res.json(await books.removeUser(req.params.id));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
};

module.exports = {
  get,
  getSingleBookInfo,
  create,
  remove,
  update,
};
