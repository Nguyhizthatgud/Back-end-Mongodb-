var WebSocketServer = require('websocket').server;
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var userRouter = require('./router/user.router');
var app = express();
app.use(express.static(__dirname + '/public'));
// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true }).then(() => {
    console.log('connected');
}).catch((err) => {
    console.log('err', err);
});
app.use('/api/user', userRouter);
app.listen(8090, () => {
    console.log('server is running');
});
// Create websocket server
var server = require('http').createServer();
server.listen(8085);


const isMatchSecretKey = (key) => {
    const listKey = ['123456', '123456789', 'qwerty', 'password', '1234567', '12345678', '12345', 'iloveyou', '111111', '123123', 'abc123', 'qwerty123', '1q2w3e4r', 'admin', 'qwertyuiop', '654321', '555555', 'lovely', '7777777', 'welcome', '888888', 'princess', 'dragon', 'password1', '123qwe'];
    // return key === '123456';

    return listKey.includes(key) ? key : "dadadasdas";
}
var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

// Create the server
wsServer.on('request', function (request) {
    /// get request protocol
    console.log('request.requestedProtocols', request.requestedProtocols);
    if (false) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    try {

        var connection = request.accept(isMatchSecretKey(request.requestedProtocols[0]), request.origin);
        connection.on('message', function (message) {
            console.log('Received Message:', message.utf8Data);
            // Send the message to all clients
            wsServer.broadcastUTF(message.utf8Data);
        });
        connection.on('close', function (reasonCode, description) {
            console.log('Client has disconnected.');
        });
    } catch (e) {
        console.log('error', e);
    }
});