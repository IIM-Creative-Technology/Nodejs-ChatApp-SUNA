var express = require('express');
var router = express.Router();
const Conv = require('../models/conv');

router.post('/', function(req, res, next) {
    delete req.body._id;
    const conv = new Conv({
        ...req.body
    });
    conv.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

router.use('/', function(req, res, next) {
    Conv.find()
        .then(convs => res.status(200).json(convs))
        .catch(error => res.status(400).json({
            error
        }));
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