var app = require('express')();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
var database = require('./database/database')
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

users = [];
connections = [];

const port = process.env.PORT || 3000;
server.listen(port, ()=> console.log(`Server running on port ${port}...`));

app.get('/:_id', function(req, res) {
    var Chans = database.Mongoose.model('channelcollection', database.ChannelSchema, 'channelcollection');
    var id = req.params._id;
    var talk = Chans.findById(id).lean().exec(function (err, conversa) {
        console.log(conversa);
    });
    var query = { channel: id }
    var Msgs = database.Mongoose.model('msgcollection', database.MsgSchema, 'msgcollection');
    var historico = Msgs.find(query).lean().exec(function (err, conversa) {
        console.log(conversa);
    });
    
    res.sendFile((__dirname + '/index.html'));
    
});

app.get('/', function(req, res){
    res.sendFile((__dirname + '/home.html'));
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    io.sockets.emit()

    socket.on('disconnect', function(data){
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket connected', connections.length)
    });

    socket.on('send message', function(data, time, conversa){
        console.log('[ %s ]\t %s: \t %s', time, socket.username, data );
        io.sockets.emit('new message', {msg: data, user: socket.username});
        var Msgs = database.Mongoose.model('msgcollection', database.MsgSchema, 'msgcollection');
        var msg = new Msgs({ username: socket.username, data: data, time: time, channel: conversa });
        msg.save();
    });

    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });
    
    socket.on('get channels', function(data, callback){
        var Chans = database.Mongoose.model('channelcollection', database.ChannelSchema, 'channelcollection');
        Chans.find({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            io.sockets.emit('emit channels', result);
        });
    });

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }

});
