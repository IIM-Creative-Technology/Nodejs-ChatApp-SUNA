const mongoose = require('mongoose');

const convSchema = mongoose.Schema({
  _idUser1: { type: mongoose.Schema.Types.ObjectId, required: true },
  _idUser2: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('conv', convSchema);