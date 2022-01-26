const Message = require('../models/messages.js')
const auth = require('../helpers/jwt.js')

async function addMessage(params){

    // instantiate a user modal and save to mongoDB
    const message = new Message(params)
    await message.save();
}

module.exports = {
    addMessage,
};