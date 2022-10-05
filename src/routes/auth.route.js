const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/* GET Users. */
// router.get("/", authController.signIn); //main
// router.get("/:id", authController.getOne);
// router.get("/:user", authController.getPass);

/* GET AUTH. */
// router.get("/:email/:pass", authController.auth);

/* POST User */
router.post('/', authController.signUp);

// /* PUT User */
// router.put("/:id", authController.update);

// /* DELETE User */
// router.delete("/:id", authController.remove);

module.exports = router;
