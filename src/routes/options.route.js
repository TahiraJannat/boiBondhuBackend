const express = require('express');
const router = express.Router();
const optionsController = require('../controllers/options.controller');

/* GET Options. */
router.get('/', optionsController.get);

module.exports = router;
