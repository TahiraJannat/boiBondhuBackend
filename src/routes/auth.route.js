const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

module.exports = router;

/* GET Users. */
router.get("/", authController.get); //main
// router.get("/:id", authController.getOne);
// router.get("/:user", authController.getPass);

/* GET AUTH. */
router.get("/:email/:pass", authController.auth);

/* POST User */
router.post("/", authController.create);

// /* PUT User */
// router.put("/:id", authController.update);

// /* DELETE User */
// router.delete("/:id", authController.remove);

module.exports = router;
