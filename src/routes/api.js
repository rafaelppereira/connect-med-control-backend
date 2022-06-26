const express = require('express');
const router = express.Router();
const imgbbUploader = require('imgbb-uploader');

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
    imgbbUploader(process.env.UPLOAD_API, image.path)
      .then(() => {
        res.json({ message: 'Upload feito com sucesso!' })
      }).catch((err) => {
        console.log(err);
      })

  } catch (error) {
    next(error);
  }
})

module.exports = router;