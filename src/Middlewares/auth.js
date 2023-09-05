const jwt = require('jsonwebtoken');

const SECRET_KEY = 'CodingBuddyAPI';

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      const user = jwt.verify(token, SECRET_KEY);
      req.userID = user.id;
    } else {
      res.status(401).json({ message: 'Unothorized user' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'err : Unothorized user' });
  }

  next();
};

module.exports = auth;
