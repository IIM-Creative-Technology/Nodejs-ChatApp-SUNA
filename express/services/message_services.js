const Message = require('../models/messages.js')

async function addMessage(params){

    // instantiate a user modal and save to mongoDB
    const message = new Message(params)
    await message.save();
}
async function getMessage(params){
    console.log(params)
    // instantiate a user modal and save to mongoDB
    const message = await Message.find({_idConv: params.id})
    console.log(message)
    return message
}

module.exports = {
    addMessage,
    getMessage
};