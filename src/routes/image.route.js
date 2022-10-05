const express = require('express');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './UploadFiles/Images');
  },
  filename: (req, file, cb) => {
    console.log(file,Date.now() + path.extname(file.originalname));
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({
    storage: storage,
  });

const router = express.Router();




const imageController = require('../controllers/image.controller');

module.exports = router;

/* POST Image */

router.post('/', upload.single('image'), imageController.uploadImage);



// router.post('/', upload.single('image'), imageController.uploadImage);

module.exports = router;
