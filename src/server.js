var app = require('express')();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
var fs = require('fs');
var database = require('./database/database')

users = [];
connections = [];

const port = process.env.PORT || 3000;
server.listen(port, ()=> console.log(`Server running on port ${port}...`));

app.get('/', function(req, res) {
    res.sendFile((__dirname + '/index.html'));
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', function(data){
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket connected', connections.length)
    });
    // Send message
    socket.on('send message', function(data, time){
        console.log(socket.username + ': ' + data);
        io.sockets.emit('new message', {msg: data, user: socket.username});
        var Msgs = database.Mongoose.model('msgcollection', database.MsgSchema, 'msgcollection');
        var msg = new Msgs({ username: socket.username, data: data, time: time });
        msg.save();
    });

    // New User
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }

});
