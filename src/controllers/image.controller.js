const images = require('../services/images.service');

const uploadImage = async (req, res, next) => {
  console.log(`🔥 ~ file: image.controller.js ~ line 4 ~ uploadImage ~ req`, req?.file?.originalname , '---',req?.file?.filename )
  // try {
  //   res.json(await images.insertImage(req.body));
  // } catch (err) {
  //   console.error(`Error while creating User`, err.message);
  //   next(err);
  // }
    res.send('Success upload')

};

module.exports = {
  uploadImage,
};
