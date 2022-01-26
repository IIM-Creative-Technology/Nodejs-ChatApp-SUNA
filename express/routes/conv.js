var express = require('express');
var router = express.Router();
const Conv = require('../models/conv');
const convServices = require('../services/conv_services.js')


router.post('/create', function(req, res, next) {
    convServices.createConv(req.body).then(
        () => res.send('success'),
        ).catch(
            err => next(err)
        )
});

router.use('/all', function(req, res, next) {
    convServices.getAll().then(
        (user) => res.status(200).json(user)
    ).catch(err => next(err))
});

router.get('/alone', function(req, res, next) {
    Conv.findOne({
            _id: req.params.id
        })
        .then(conv => res.status(200).json(conv))
        .catch(error => res.status(404).json({
            error
        }));
});

module.exports = router;