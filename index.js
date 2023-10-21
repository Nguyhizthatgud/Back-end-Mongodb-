var WebSocketServer = require('websocket').server;

// Create websocket server
var server = require('http').createServer();
server.listen(8081);
var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}
// Create the server
wsServer.on('request', function (request) {
    console.log('Connection from origin ' + request.origin + '.');
    if (false) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    var connection = request.accept('', request.origin); 
    connection.on('message', function (message) {
        console.log('Received Message:', message.utf8Data);
        // Send the message to all clients
        wsServer.broadcastUTF(message.utf8Data);
    });
    connection.on('close', function (reasonCode, description) {
        console.log('Client has disconnected.');
    });
});