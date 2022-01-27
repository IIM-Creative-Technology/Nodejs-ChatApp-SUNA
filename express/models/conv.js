const mongoose = require('mongoose');

const convSchema = mongoose.Schema({
  _idUser1: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
  _idUser2: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
});

module.exports = mongoose.model('conv', convSchema);