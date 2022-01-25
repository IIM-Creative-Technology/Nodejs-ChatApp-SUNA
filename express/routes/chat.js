var express = require('express');
var router = express.Router();
const Thing = require('../models/thing');

router.post('/', function(req, res, next) {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

router.use('/', function(req, res, next) {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({
            error
        }));
});

// router.get('/', function(req, res, next) {
//     Thing.findOne({
//             _id: req.params.id
//         })
//         .then(thing => res.status(200).json(thing))
//         .catch(error => res.status(404).json({
//             error
//         }));
// });

module.exports = router;