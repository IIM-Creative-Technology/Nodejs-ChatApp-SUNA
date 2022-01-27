const Conv = require('../models/conv.js')

async function createConv(params){

    // instantiate a user modal and save to mongoDB
    const conv = new Conv(params)
    await conv.save();
}

async function getMyConv(params) {
    console.log(params.id)
    allConv = []
    const conv = await Conv.find({_idUser1: params.id});
    if(conv[0]){
        allConv.push(conv)
    }
    const conv2 = await Conv.find({_idUser2: params.id});
    if(conv2[0]){
        allConv.push(conv2)
    }
    // call toJSON method applied during model instantiation
    return allConv;
}
async function getAll() {

    const conv = await Conv.find();
    // call toJSON method applied during model instantiation
    return conv;
}

module.exports = {
    createConv,
    getMyConv,
    getAll
};