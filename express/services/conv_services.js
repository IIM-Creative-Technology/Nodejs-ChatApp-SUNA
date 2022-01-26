const Conv = require('../models/conv.js')

async function createConv(params){

    // instantiate a user modal and save to mongoDB
    const conv = new Conv(params)
    await conv.save();
}

async function getAll() {

    const conv = await Conv.find();
    // call toJSON method applied during model instantiation
    return conv;
}

module.exports = {
    createConv,
    getAll
};