var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
console.log('mongoose.connect called ... ')

const msgSchema = new Schema({
    username: String,
    data: String,
    time: String,
    channel: String
}, { collection: 'msgcollection' }
);
const msgModel = mongoose.model('msgModel', msgSchema)

const channelSchema =  new Schema({
    name: String,
}, { collection: 'channelcollection' });
const Channel = mongoose.model('channelModel', channelSchema)

module.exports = { Mongoose: mongoose, MsgSchema: msgSchema, ChannelSchema: channelSchema }
