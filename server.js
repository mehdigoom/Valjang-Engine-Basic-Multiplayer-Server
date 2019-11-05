function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();
}
Server.prototype.start = function() {

    console.log("Lancement du serveur mulijoueurs Valjang Engine.")
    that = this;
    this.io.on('connection', function(socket) {
        console.log("Le client " + socket.id + " est connecter")
        socket.broadcast.emit('print_server_message', "le client" + socket.id + "est connecter!");
 

       


        socket.on('my_posision', function(posisionx, posisiony, id) {

            //console.log("le client :" + id + " est en posision pos X :" + posisionx + " Pos Y" + posisiony)

            socket.broadcast.emit('player_pos', posisionx, posisiony, id);
            //console.log(room_name)

        })

        socket.on('spawnI', function(posisionx, posisiony) {

            console.log("le client :  a spwn  pos X :" + posisionx + " Pos Y" + posisiony)

            socket.broadcast.emit('spawner', posisionx, posisiony);
            //console.log(room_name)

        })
        
        socket.on('disconnect', function() {
            console.log("Le client " + socket.id + " est déconnecter")
        });

    });
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port)
    });
};
module.exports = Server;