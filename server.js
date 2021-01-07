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
autor = ""
botname = ""
onremove = false
mute = true
OcurenceI = 0
visites = 0
setban = false
setmsg = false
message = ""
onsave = false
savetite = ""
savedata = ""
onban = false
unban = false
onveille = false
apris = 0
contexte ="" 
message1= ""
message2= ""
message3= ""
message4= ""

contexte1=""
contexte2=""
contexte3=""
contexte4=""
currentmessag = 1

    //Your discord Username
Admin = "Miro【놈놈니】#8186"
    //all function

function SetContexte(contexte){



}

function GetContete(){
if(load(message1+message2)){



}

if(load(message2+message3)){



}
if(load(message4+message1)){



}




}



    function Lsize(){
        size = config.size
        return(size)
    }
    size = config.size
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
        apris = apris +1
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
if(msg.author.tag == botname){}
else{




        if (load(msg.author.tag)) {

            save(msg.author.tag, 1)
    
        }
        if (msg.content == "!stat"){
            mysize = Lsize()
            msg.reply("Depuis mon dernier redemarage il y a eu "+visites+" visites sur Valjang.fr")
            msg.reply("Il y a actuellement " + player + " visiteur(s) sur Valjang.fr")
            msg.reply("Ma base de données contiens "+mysize*8+" Enrengistrements" )
            msg.reply("Je peux repondre a vos messages dans "+ mysize + " contextes differents")
            msg.reply("Mon administrateur est :" + Admin)
            msg.reply("Mon cache contien :'"+cache+"'")
            msg.reply("Dernier message recu est :"+ lastmsg)
            msg.reply("Depuis mon dernier redemarrage j'ai appris " + apris +" nouvelles choses")
           
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
    
    
    
    
            }  
            if (msg.content == "!client") {
                msg.reply("Client:" + msg.author.tag);
                cache = ""
            }
    
            if (onveille === false) {
                if (load(msg.content)) {
                    if (load(msg.author.tag)) {
                        cache = ""
                    } else {

//ajout contexte ici

                     //ancienne type de repose  // msg.reply(load(msg.content));

//verifier si load est utilisez dans un contexte
// si oui verifier le contexte [Si Lucy à un contexte elle repond sinon elle pose la question]

//[Question 1 ] Demande le contexte


//[Fontionnement du contexte] 


// [Contexte contien 2] 
// ocurnce (nombre de contexte est utiliser load)
// ID du contexte + load





//  [Reconnecence de contexe 3 ]

// Analyse des 4 dernier messages 

// Deduire un contexte

//repondre en fonction de celuis si. 

//si reponse disponible repondre //si phrase mais pas de contexte poser question (1)

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


    
}
   

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
let last 
visites++

        player++
        console.log("Le client " + socket.id + " est connecter (" + player + "/" + PlayerMax + ")")



        socket.on('PlayerMove', function(x, y, z, rotate) {

            socket.broadcast.emit('Move', socket.id, x, y, z, rotate);
        });

       
if(last =! lastmsg){
    socket.broadcast.emit('discord',lastmsg,autor);
    last = lastmsg
}
socket.on('version', function(a) {
    socket.emit('stable',load(version));
    socket.emit('indev',load(indev));
});
        socket.on('Lucy', function(Message) {
                console.log("Message web : "+Message)
            if(load("html"+Message)){
                socket.emit('html',load("html"+Message));
                console.log("Envoie HTML : "+load("html"+Message))
            }else if(load(Message)){
                socket.emit('mesage',load(Message));
                console.log("Envoie Message web : "+load(Message))
            }else{
                console.log("Envoie HTML : Err ")
                socket.emit('mesage',"Je ne connais pas de reponses :( Tu peux m'apprendre sur discord ! http://discord.valjang.fr");
            }
            
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