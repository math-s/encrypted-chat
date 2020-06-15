var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chat');

var msgSchema = new mongoose.Schema({
    username: String,
    data: String
}, { collection: 'msgcollection' }
);
 
module.exports = { Mongoose: mongoose, MsgSchema: msgSchema }
