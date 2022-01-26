var express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
var router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/user_services.js');
const { response, json } = require('express');
const SECRET = 'mykey'

/* GET users listing. */
router.get('/all', (req, res, next) => {
  userServices.getAll().then(
      (user) => res.status(200).json(user)
  ).catch(err => next(err))
});

/** Route to register an User */
router.post('/register', (req, res, next) => {
  const {password} = req.body
  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(password, salt);

  userServices.register(req.body).then(
      () => res.send('success')
  ).catch(
      err => next(err)
  )
});

/** Route to Login an User */
router.post('/login', (req, res, next) => {
  const { username, password} = req.body;
  userServices.login({ username, password}, res);
});

/** Route to Get User by ID. */
router.get('/alone', (req, res, next) => {
  userServices.getById(req.headers.authorization.split(' ')[1]).then(
    (user) => {
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          username: user.username
        },
      })
    })
    .catch(err => next(err))
});

router.get('/me', (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, SECRET)
    const userId = decodedToken.id
    User.findOne({ _id : userId })
      .then((user) => {
        if(!user) return res.status(401).json({ error : 'User not found' })
          res.status(201).json({
            user : {
              _id: user._id,
              email: user.email,
              username: user.username
            }
          }); 
      })

  } catch (error) {
    res.status(401).json({
      error : "Invalid token"
    })
  }
})

module.exports = router;
