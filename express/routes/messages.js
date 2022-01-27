var express = require('express');
var router = express.Router();
const messageServices = require('../services/message_services.js')

router.post('/addMessage', (req, res, next) => {
    console.log(req.body);
    messageServices.addMessage(req.body).then(
    () => res.send('success'),
    ).catch(
        err => next(err)
    )
});
router.get('/get', (req, res, next) => {
    console.log(req.query);
    messageServices.getMessage(req.query).then(
        (message) => res.status(200).json(message)
    ).catch(err => next(err))
});

module.exports = router;