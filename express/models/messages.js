const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  idConv: { 
    type: String, 
    required: true 
  },
  idUser1: { 
    type: String, 
    required: true 
  },
  message: {
    type: String, 
    required: true
  }
});

MessageSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.idConv
      delete returnedObject.idUser1
      delete returnedObject.message
  }
});

const Message =  mongoose.model("Message", MessageSchema);


module.exports = mongoose.model('Message', MessageSchema);