const users = require("../services/users.service");

async function getPass(req, res, next) {
  try {
    res.json(await users.getuserPass(req.params.user));
  } catch (err) {
    console.error(`🚀 Error while getting users`, err.message);
    next(err);
  }
}
async function get(req, res, next) {
  try {
    res.json(await users.getUsers(req.query.page));
  } catch (err) {
    console.error(`🚀 Error while getting users`, err.message);
    next(err);
  }
}
async function auth(req, res, next) {
  console.log(`💩 ~ file: users.controller.js ~ line 31 ~ auth ~ req`, req);
  try {
    res.json(await users.checkLogin(req.params.email, req.params.pass));
  } catch (err) {
    console.error(`🚀 Error while getting users`, err.message);
    next(err);
  }
}

const create = async (req, res, next) => {
  console.log(
    `💩 ~ file: users.controller.js ~ line 31 ~ create ~ req, res, next`,
    req,
    res,
    next
  );
  try {
    res.json(await users.insertUser(req.body));
  } catch (err) {
    console.error(`Error while creating User`, err.message);
    next(err);
  }
};

module.exports = {
  create,
  getPass,
  auth,
};
