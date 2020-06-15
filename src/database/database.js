var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true});
console.log('mongoose.connect called ... ')
var msgSchema = new Schema({
    username: String,
    data: String,
    time: String
}, { collection: 'msgcollection' }
);
const msgModel = mongoose.model('msgModel', msgSchema)
module.exports = { Mongoose: mongoose, MsgSchema: msgSchema }

try {
    const projectModel = projectModel.create({teste:"teste"});
    return projectModel ;
 }
 catch(err) {
     return err
 }


var saveMessage = function(username, data, time){

}