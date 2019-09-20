const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Jokes = require('../jokes/jokes-model');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Jokes.add(user)
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
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
  }

  const options = {
    //expiration of the token
    expiresIn: '1d', //one day
  }
  return jwt.sign(payload, secrets.jwtSecret, options);
}


module.exports = router;
