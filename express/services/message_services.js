const Message = require('../models/messages.js')

async function addMessage(params){

    // instantiate a user modal and save to mongoDB
    const message = new Message(params)
    await message.save();
}
async function getMessage(params){
    console.log(params)
    // instantiate a user modal and save to mongoDB
    const message = await Message.find({_idConv: params.id}).populate({
        path: '_idConv',
        model: 'conv',
        populate: [{
            path: '_idUser1',
            model: 'User',
        },{
            path: '_idUser2',
            model: 'User',
        }
    ]
    }).populate('_idUser1')
    console.log('message')
    console.log(message[0].message)
    return message
}

module.exports = {
    addMessage,
    getMessage
};