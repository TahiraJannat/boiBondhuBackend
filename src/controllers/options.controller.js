const options = require('../services/options.service');

async function get(req, res, next) {
  try {
    res.json(await options.getOptions(req.query.page));
  } catch (err) {
    console.error(`🚀 Error while getting users`, err.message);
    next(err);
  }
}

module.exports = {
  get,
};
