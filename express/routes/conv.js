var express = require('express');
var router = express.Router();
const Conv = require('../models/conv');
const convServices = require('../services/conv_services.js')
const auth = require('../helpers/jwt.js');
const jwt = require('jsonwebtoken');


router.post('/create', function(req, res, next) {
    convServices.createConv(req.body).then(
        () => res.send('success'),
        ).catch(
            err => next(err)
        )
});

router.use('/myConv', function(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, auth.SECRET);
    const id = decodedToken.id;
    convServices.getMyConv(id).then(
        (conv) => res.status(200).json(conv)
    ).catch(err => next(err))
});

router.get('/all', function(req, res, next) {
    convServices.getAll().then(
        (conv) => res.status(200).json(conv)
    ).catch(err => next(err))
});

module.exports = router;