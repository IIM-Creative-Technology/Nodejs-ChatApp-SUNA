var express = require('express');
var router = express.Router();
const message = require('../models/messages');

router.post('/', function(req, res, next) {
    delete req.body._id;
    const message = new message({
        ...req.body
    });
    message.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

router.use('/', function(req, res, next) {
    Message.find()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({
            error
        }));
});

router.get('/alone', function(req, res, next) {
    Message.findOne({
            _id: req.params.id
        })
        .then(message => res.status(200).json(message))
        .catch(error => res.status(404).json({
            error
        }));
});

module.exports = router;