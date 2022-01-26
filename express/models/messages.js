const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
  _idConv: { type: mongoose.Schema.Types.ObjectId, required: true },
  _idUser1: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: {type: String, required: true}
});

module.exports = mongoose.model('messages', messagesSchema);