const express = require('express');
const path = require('path');
const booksController = require('../controllers/books.controller');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './UploadFiles/Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

// app.get('/file/:name', function (req, res, next) {
//   var options = {
//     root: path.join(__dirname, 'UploadFiles/Images'),
//     dotfiles: 'deny',
//     headers: {
//       'x-timestamp': Date.now(),
//       'x-sent': true
//     }
//   }

// router.post('/', upload.single('image'), imageController.uploadImage);

/* GET Books Info. */
router.get('/', booksController.get);
router.get('/:bookID', booksController.getSingleBookInfo);
// router.get("/:user", booksController.getPass);

/* GET AUTH. */
// router.get("/:email/:pass", booksController.auth);

/* POST Books */
router.post('/', upload.single('image'), booksController.create);
// router.post('/', upload.single('image'), imageController.uploadImage);

/* PUT Books */
// router.put("/:id", booksController.update);

/* DELETE Books */
// router.delete("/:id", booksController.remove);

module.exports = router;
