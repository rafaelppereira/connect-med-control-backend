const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Auth = {
  private: (req, res, next) => {
    let success = false;

    if (req.headers.authorization) {
      const [authType, token] = req.headers.authorization.split(' ');
      if (authType === 'Bearer') {
        try {
          JWT.verify(
            token, 
            process.env.JWT_SECRET_KEY
          );

          success = true;
        } catch(err) {}
      }
    }

    if (success) {
      next();
    } else {
      res.status(403) // Not authorized
      res.json({ error: 'User not authorized' });
    }
  }
}

module.exports = Auth;