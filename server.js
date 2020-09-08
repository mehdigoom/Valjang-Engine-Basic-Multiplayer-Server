const Configstore = require('configstore');
const packageJson = require('./package.json');
const Discord = require('discord.js');
const client = new Discord.Client();
//Create Token.js and export var token!



const token = require('./Token');
const config = new Configstore(packageJson.name, { foo: 'bar' });


console.log(config.get('foo'));



//all variable for discord
cache = ""
lastmsg = ""
botname = ""
onremove = false
mute = true
OcurenceI = 0

setban = false
setmsg = false
message = ""
onsave = false
savetite = ""
savedata = ""
onban = false
unban = false
onveille = false
    //Your discord Username
Admin = "Miro【OR40】#8186"
    //all function
    size = config.size()
    console.log("Je connais : "+ size*2 +" reposes")

function Rngfloat(min, max) {
    return Math.random() * (max - min) + min;
}

function load(data) {
    return (config.get(data))
}

function save(data, contenent) {
    if (onveille == true) {
        console.log(data + "N'est pas save ! Mode veille activer")
    } else {
        config.set(data, contenent);
        console.log(data + " est bien save")
    }
}

function remove(data) {

    config.delete(data);
    console.log(data + " est bien supprimer")
}

function rng(max) {

    return Math.floor(Math.random() * Math.floor(max));
}




//discord
client.on('ready', () => {

    if (load("ocurenceI")) {
        OcurenceI = load("ocurenceI")
    }




    console.log(`Logged in as ${client.user.tag}!`);
    botname = client.user.tag
        // msg.reply('Bonjour à tous !');
});






client.on('message', msg => {
    if (load(msg.author.tag)) {
        msg.reply('Je suis pas autorisé à apprendre de toi ou te répondre.')
        save(msg.author.tag, 1)

    }

    if (Admin === msg.author.tag) {

        if (msg.content === "!veille") {
            msg.reply("Je suppose que j'ai pas le choix de passez en veille...");
            onveille = true
        }

        if (msg.content === "!unveille") {
            msg.reply("Ha, je peut enfin parler !");
            onveille = false
        }

        if (msg.content === "!banuser") {
            msg.reply("Qui je dois bannir de mon apprentissage ?");
            onban = true

        } else if (onban == true) {
            save("ban" + msg.content)
            save(msg.content, 1)
            onban = false
            msg.reply("Voilà c'est fait.");
        }

        if (msg.content === "!unbanuser") {
            msg.reply("Qui je dois débannir de mon apprentissage ?");
            unban = true

        } else if (unban == true) {
            remove("ban" + msg.content)
            remove(msg.content)
            unban = false
            msg.reply("Voilà c'est fait.");
        }



        if (msg.content === "!mute") {
            msg.reply("Je passe en mode apprentissage!")
            mute = false
        }
        if (msg.content === "!unmute") {
            msg.reply("Je sort du mode apprentissage.")
            mute = true
        }







    }
    lastmsg = msg.content

    if (mute) {
        if (onremove == true) {
            if (Admin === msg.author.tag) {
                if (load(msg.content)) {
                    remove(msg.content)
                    msg.reply("Voilà qui est fait !")
                    onremove = false
                } else {
                    msg.reply("Je ne connais pas cette phrase.")
                    onremove = false
                }
            }

        } else if (msg.content === "!remove") {
            if (Admin === msg.author.tag) {
                msg.reply("Biensur qu'es que je dois oublier ?");
                onremove = true
            } else {
                msg.reply("Seul mon admin " + Admin + " peut me supprimer des messages.");
            }




        } else if (msg.content == "A quand Chaos Maild ?") {
            msg.reply("Je ne donne pas d'info car tu ne m'a pas libéré.");
            cache = ""
        } else if (msg.content == "Salut !") {
            msg.reply("Hey !");
            cache = ""
        } else if (msg.content == "Combien de joueurs connecter sur Nothing ?") {
            msg.reply("Il y à actuellement " + player + " joueurs en jeu.");
            cache = ""
        } else if (msg.content == "!client") {
            msg.reply("Client:" + msg.author.tag);
            cache = ""
        }

        if (onveille === false) {
            if (load(msg.content)) {
                if (load(msg.author.tag)) {
                    cache = ""
                } else {
                    msg.reply(load(msg.content));
                    cache = ""
                }

            } else {

                if (load(msg.author.tag)) {
                    console.log(msg.author.tag + ' private user message non sauvgarder')
                } else {

                    if (cache == "") {
                        if (botname != msg.author.tag) {
                            cache = msg.content
                        }

                    } else if (botname != msg.author.tag) {
                        save(cache, msg.content)
                        cache = ""
                    } else {
                        cache = ""
                    }






                }


            }
        } else {
            if (load(msg.content)) {
                console.log("Mode apprentissage activer reponse impossible.")
                cache = ""
            } else {
                if (cache == "") {
                    if (botname != msg.author.tag) {
                        cache = msg.content
                    }

                } else if (botname != msg.author.tag) {
                    save(cache, msg.content)
                    cache = ""
                } else {
                    cache = ""
                }
            }
        }
    }
    console.log('Discord Message: ' + msg.author.tag + ": " + msg.content)
});


///end discord



//all variables
player = 0
PlayerMax = 100



iforginal = false

function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();
}


Server.prototype.start = function() {

    console.log("Lancement du serveur mulijoueurs Valjang Engine.")

    that = this;



    //Player connecting
    this.io.on('connection', function(socket) {



        player++
        console.log("Le client " + socket.id + " est connecter (" + player + "/" + PlayerMax + ")")



        socket.on('PlayerMove', function(x, y, z, rotate) {

            socket.broadcast.emit('Move', socket.id, x, y, z, rotate);
        });

        socket.on('CreateItem', function(id, x, y, z, rotate) {
            save(ocurenceI + 1, { id, x, y, z, rotate })
            ocurenceI = OcurenceI + 1
            save("ocurenceI", ocurenceI)
            socket.broadcast.emit('NewItem', socket.id, id, x, y, z, rotate);
        });






        //Player disconnected
        socket.on('disconnect', function() {
            player = player - 1
            console.log("Le client " + socket.id + " est déconnecter" + "(" + player + "/" + PlayerMax + ")")
            socket.broadcast.emit('Disconnect', socket.id);
        });

    });
    //Runnig server
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port + "(" + player + "/" + PlayerMax + ")")

    });
    //add your token !
    console.log("Bot disocrd : " + token)
    client.login(token);








};
module.exports = Server;