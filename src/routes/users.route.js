const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

/* GET Users. */
router.get("/", userController.get);
// router.get("/:id", userController.getOne);
// router.get("/:user", userController.getPass);

/* GET AUTH. */
router.get("/:email/:pass", userController.auth);

/* POST User */
router.post("/", userController.create);

/* PUT User */
router.put("/:id", userController.update);

/* DELETE User */
router.delete("/:id", userController.remove);

module.exports = router;
