const express = require('express');
const router = express.Router();
const imgbbUploader = require('imgbb-uploader');
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
        });
        console.log(response.url);
        res.json({ id: newImage.id });
      }).catch((err) => {
        console.log(err);
      })
  } catch (error) {
    next(error);
  }
});

// router.post('/register', async (req, res) => {
//   let { email, password, name, role, avatarurl } = req.body;
//   let hasUser = await User.findOne({ where: {email} });

//   console.log(hasUser);

//   if (!hasUser) {
//     let newUser = await User.create({ 
//       email, 
//       password, 
//       name, 
//       role, 
//       avatarurl 
//     });
      
//     res.json({ id: newUser.id });
//   } else {
//     res.json({ error: 'E-mail já existe' });
//   }

//   // res.json({ error: 'E-mail e/ou senha não cadastrados' });
// })

// SignIn Method
// router.post('/login', async (req, res) => {
//   if (req.body.email && req.body.password) {
//     let email = req.body.email;
//     let password = req.body.password;

//     let user = await User.findOne({
//       where: { email, password }
//     });

//     if (user) {
//       const token = JWT.sign(
//         { id: user.id, 
//           email: user.email, 
//           name: user.name, 
//           role: user.role, 
//           avatarurl: user.avatarurl
//         },
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: '1h' }
//       );

//       res.json({ status: true, token });
//       return;
//     }
//   }

//   res.json({ status: false });
// });

router.get('/user', (req, res) => {
  if (req.headers.authorization) {
    const [authType, token] = req.headers.authorization.split(' ');
    if (authType === 'Bearer') {
      try {
        const decoded = JWT.verify(
          token, 
          process.env.JWT_SECRET_KEY
        );

        res.json({ user: decoded });
      } catch(err) {}
    }
  } else {
    res.json({ error: 'User not find' });
  }
});

// Get all Images
router.get('/images', async (req, res) => {
  const list = await Images.findAll();
  res.json({ list });
});

// router.get('/ping', Auth.private, (req, res) => {
//   res.json({ pong: true });
// });


module.exports = router;