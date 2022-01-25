var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/user_services.js')

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
  userServices.login({ username, password})
      .then(user => {
          res.json(user)
      }
  ).catch(err => next(err))
});

/** Route to Get User by ID. */
router.get('/:id', (req, res, next) => {
  userServices.getById(req.params.id).then(
      (user) => res.json(user)
  ).catch(err => next(err))
});
module.exports = router;
