const users = require('../services/users.service');
const authentication = require('../services/auth.service');

// async function signIn(req, res, next) {
const signIn = async (req, res, next) => {
  console.log(
    `🔥 ~ file: auth.controller.js ~ line 9 ~ signIn ~ req.body`,
    req.body
  );

  try {
    res.json(
      await authentication.checkLogin(req.body.email, req.body.password)
    );
  } catch (err) {
    console.error(`🚀 Error while getting users`, err.message);
    next(err);
  }
};

const signUp = async (req, res, next) => {
  console.log(
    `🔥 ~ file: auth.controller.js ~ line 16 ~ signUp ~ req, res, next`,
    req?.body
  );

  try {
    res.json(await authentication.insertUser(req.body));
  } catch (err) {
    console.error(`Error while creating User`);
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
