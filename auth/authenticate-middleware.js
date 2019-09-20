/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const Jokes = require('../jokes/jokes-model');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) { //they logged in correctly
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass' })
  }

};
