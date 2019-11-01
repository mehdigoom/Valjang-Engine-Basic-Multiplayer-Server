function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();
}
Server.prototype.start = function() {
    that = this;
    this.io.on('connection', function(socket) {
        console.log("Le client " + socket.id + " est connecter")
        socket.on('disconnect', function() {
            console.log("Le client " + socket.id + " est déconnecter")
        });

    });
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port)
    });
};
module.exports = Server;