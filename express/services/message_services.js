const Message = require('../models/messages.js')

async function addMessage(params){

    // instantiate a user modal and save to mongoDB
    const message = new Message(params)
    await message.save();
}
async function getMessage(params){
    console.log(params.id)
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
    console.log(message)
    return message
}

async function deleteMessage(params){
    const message = await Message.find({_id: params.id})
    await message.delete()
}

async function getAll(){
    const message = await Message.find()
    return message
}

module.exports = {
    addMessage,
    getMessage,
    deleteMessage,
    getAll
};