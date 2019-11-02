function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();
}
Server.prototype.start = function() {
    let room_name = "Room1"
    console.log("Lancement du serveur mulijoueurs Valjang Engine.")
    that = this;
    this.io.on('connection', function(socket) {
        console.log("Le client " + socket.id + " est connecter")
        socket.broadcast.emit('print_server_message', "le client" + socket.id + "est connecter!");
        socket.to(room_name).emit('print_server_message', "|" + room_name + "|" + "L'utilisateur " + socket.id + "à rejoin la game!")
        socket.join(room_name)

        socket.on('leave_room', function(username) {
            console.log("Lutilisateur :" + username + "à quité le salon" + room_name)
            socket.to(room_name).emit('print_server_message', "|" + room_name + "| l'utilsateur " + "est partie")
            socket.leave(room_name);
        })

        socket.on('my_name_is', function(username) {

            console.log("le client " + socket.id + "à le nom " + username)

            socket.to(room_name).emit('print_server_message', "Salut ! " + username + "!")


        })
        socket.on('my_posision', function(posisionx, posisiony) {

            //console.log("le client :" + socket.id + " est en posision pos X :" + posisionx + " Pos Y" + posisiony)
            let id = socket.id
            socket.to(room_name).emit('print_server_message', posisionx, posisiony)
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