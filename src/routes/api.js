const express = require('express');
const router = express.Router();
const imgbbUploader = require('imgbb-uploader');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Images = require('../models/Image');
const User = require('../models/User');
const Auth = require('../middlewares/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(function(req, res, next) {
  next();
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
});

// SignIn Method
router.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({
      where: { email, password }
    });

    if (user) {
      const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.json({ status: true, token });
      return;
    }
  }

  res.json({ status: false });
});

router.get('/ping', Auth.private, (req, res) => {
  res.json({ pong: true });
});

// Get all Images
router.get('/images', async (req, res) => {
  const list = await Images.findAll();
  res.json({ list });
});

module.exports = router;