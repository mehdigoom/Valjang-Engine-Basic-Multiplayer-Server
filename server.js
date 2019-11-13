player = 0
function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();
}

function Rngfloat(min, max) {
    return Math.random() * (max - min) + min;
}

function rng(max) {

    return Math.floor(Math.random() * Math.floor(max));
}
Server.prototype.start = function() {

    console.log("Lancement du serveur mulijoueurs Valjang Engine.")
    that = this;
    this.io.on('connection', function(socket) {
player ++
        console.log("Le client " + socket.id + " est connecter (" + player+"/100)")
            //socket.broadcast.emit('print_server_message', "le client" + socket.id + "est connecter!");


        socket.on('needchunk', function(posisionx, posisiony, id) {
            // console.log("Je genere un Chunk !")
            let idp
            let posx
            let posy

            for (var i = 0; i < 20; i++) {
                idp = rng(10)
                posx = Rngfloat(posisionx - 50, posisionx + 50)
                posy = Rngfloat(posisiony - 50, +posisiony + 50)
                socket.emit('Gen', posx, posy, idp);
                socket.broadcast.emit('Gen', posx, posy, idp);
            }



            // console.log("Et voila !")
        })




        socket.on('my_posision', function(posisionx, posisiony, id) {

            //console.log("le client :" + id + " est en posision pos X :" + posisionx + " Pos Y" + posisiony)

            socket.broadcast.emit('player_pos', posisionx, posisiony, id);
            //console.log(room_name)

        })

        socket.on('spawnI', function(posisionx, posisiony) {

            //console.log("le client :  a spwn  pos X :" + posisionx + " Pos Y" + posisiony)

            socket.broadcast.emit('spawner', posisionx, posisiony, id);
            //console.log(room_name)

        })

        socket.on('disconnect', function() {
            this.player--
            console.log("Le client " + socket.id + " est déconnecter"+"("+ player+"/100)")
            socket.broadcast.emit('Disconnect', socket.id);
        });

    });
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port +"("+ player+"/100)")

    });
};
module.exports = Server;