const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Jokes = require('../jokes/jokes-model');


router.post('/register', (req, res) => {
  // implement registration
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10); // 2 ^ n

  Jokes.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Jokes.findBy({ username })
    .first()
    .then(user => {
      //check
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// function generateToken(user) {
//   const payload = {
//     username: user.username,
//   }

//   const options = {
//     //expiration of the token
//     expiresIn: '1d', //one day
//   }
//   return jwt.sign(payload, secrets.jwtSecret, options);
// }


module.exports = router;
