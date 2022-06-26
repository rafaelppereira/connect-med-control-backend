const express = require('express');
const router = express.Router();
const imgbbUploader = require('imgbb-uploader');

const Images = require('../models/Image');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(function(req, res, next) {
  next();
})

router.get('/ping', (req, res) => {
  res.json({ pong: true });
});

// Image Upload 
router.post('/upload', upload.single('image'), (req, res, next) => {
  try {
    require('dotenv').config();
    const image = req.file;
    imgbbUploader('d40daf77340d0af6d9172a93db15f1ef', image.path)
      .then(async (response) => {
        let newImage = await Images.create({
          name: image.originalname,
          url: response.url
        })
        res.json({ id: newImage.id });
      }).catch((err) => {
        console.log(err);
      })

  } catch (error) {
    next(error);
  }
})

module.exports = router;