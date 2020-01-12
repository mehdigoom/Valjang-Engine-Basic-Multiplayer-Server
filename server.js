const Configstore = require('configstore');
const packageJson = require('./package.json');
const Discord = require('discord.js');
const client = new Discord.Client();
//Create Token.js and export var token!
const token = require('./Token');
const config = new Configstore(packageJson.name, {foo: 'bar'});
 
console.log(config.get('foo'));


//all variable for discord
cache = ""
lastmsg = ""
botname = ""
onremove = false
//Your discord Username
Admin ="Miro#8186"
//all function

function Rngfloat(min, max) {
    return Math.random() * (max - min) + min;
}

function load(data) {
   return(config.get(data)) 
}
function save(data,contenent) {
    config.set(data, contenent);
console.log(data +" est bien save")
}
function remove(data) {

    config.delete(data);
    console.log(data +" est bien supprimer")
}

function rng(max) {

    return Math.floor(Math.random() * Math.floor(max));
}




//discord
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    botname = client.user.tag
   // msg.reply('Bonjour à tous !');
  });
  

  
  
  
  
  client.on('message', msg => {
 lastmsg = msg.content

 
 if (onremove == true) {
    if(Admin ===msg.author.tag){
        if(load(msg.content)){
remove(msg.content)
msg.reply("Voilà qui est fait !")
onremove = false
        }else{
            msg.reply("Je ne connais pas cette phrase.") 
            onremove = false
        }
    }
    
}else if (msg.content === "!remove") {
if(Admin ===msg.author.tag){
    msg.reply("Biensur qu'es que je dois oublier ?");
    onremove = true
}else{
    msg.reply("Seul mon admin "+Admin+" peut me supprimer des messages.");
}





}else if (msg.content === "Qu'elle est la saison actuelle sur Nothing ?") {
      msg.reply('La saision actuelle est la saison ' + saison);
      cache = ""
    }else if ( msg.content  == "A quand Chaos Maild ?"){
        msg.reply("Je ne donne pas d'info car tu ne m'a pas libéré."); 
        cache = ""
    }else if ( msg.content  == "Salut !"){
        msg.reply("Hey !"); 
        cache = ""
    }else if ( msg.content  == "Combien de joueurs connecter sur Nothing ?"){
        msg.reply("Il y à actuellement "+ player +" joueurs en jeu."); 
        cache = ""
    }else if ( msg.content  == "!client"){
        msg.reply("Client:"+ msg.author.tag);
        cache = "" 
    }else if (load(msg.content)){
        msg.reply(load(msg.content)); 
        cache = ""
    }else if ( msg.content  == "!nope"){
        msg.reply("Ok, j'apprendrais pas de tes messages. Tu peux utiliser !yup pour me laisser de nouvau apprendre de tes mots :)"); 
        save(msg.author.tag,1)
        cache = ""
    }else if ( msg.content == "!yup"){        
       
        if(load(msg.author.tag)){
            remove(msg.author.tag)
            msg.reply("Merci ! j'apprend desormais de tes mots :D")
            cache = ""
        }else{
            msg.reply("j'apprend deja de tes messages :O")
            cache = ""
        }

    }else{

        if(load(msg.author.tag)){
            console.log(msg.author.tag+' private user message non sauvgarder')
        }else{
            
            if(cache == ""){
                if(botname != msg.author.tag){
                    cache = msg.content
                }
                 
            }else if(botname != msg.author.tag){
                    save(cache,msg.content )
                    cache = ""
                }else{
                    cache = ""
                }
               
          




}


    }
    console.log('Discord Message: '+ msg.author.tag +": "+msg.content )
  });


///end discord



//all variables
player = 0
PlayerMax = 100
saison = 1
if(load("saison") != null){
    saison = load("saison")
}

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
        player ++
        console.log("Le client " + socket.id + " est connecter (" + player+"/"+PlayerMax+")")
          


           //identification
           socket.on('idplayer', function(id) {
            console.log(socket.id+" à demander à rejoindre la partie")
            
            if(player >= PlayerMax){
                socket.emit('auth',"nope");
               }else{
                socket.emit('auth',"ok");
               }
               
              
                console.log("nouveau joueur :"+ id)
        })






            //map generator
        socket.on('needchunk', function(posisionx, posisiony, zone) {
          
            let idp //Item id
            let posx //Item posison X
            let posy //Item posison Y

            for (var i = 0; i < 20; i++) {
                idp = rng(10)
                posx = Rngfloat(posisionx - 50, posisionx + 50)
                posy = Rngfloat(posisiony - 50, +posisiony + 50)
                socket.emit('Gen', posx, posy, idp);
                socket.broadcast.emit('Gen', posx, posy, idp);
            }



            
        })


        socket.on('Getrole', function() {
            console.log(socket.id+" à demander un role")
//0 = original 
//1 finder
//2 killer
//3 protecteur
           let id = rng(4)
       if(id == 0){
           if(this.iforginal){
            id = rng(4)
           }else{
               this.iforginal = true
           }


       }
       socket.emit('YourRole',id)
        })


//new saison 
        socket.on('end', function(id,reason) {

           
            saison = saison +1
            save("saison",saison)
            socket.broadcast.emit('saison',saison) 

       

        })



        socket.on('needsaison', function() {
            console.log(socket.id+" à demander à savoir la saison actuelle.")
            socket.emit('saison',saison) 

       

        })
            //posision player Syc
        socket.on('my_posision', function(posisionx, posisiony, id) {

           

            socket.broadcast.emit('player_pos', posisionx, posisiony, id);
           

        })

        //Drop item
        socket.on('spawnI', function(posisionx, posisiony,id) {

           

            socket.broadcast.emit('spawner', posisionx, posisiony, id);
            

        })
            //Player disconnected
        socket.on('disconnect', function() {
            player = player -1
            console.log("Le client " + socket.id + " est déconnecter"+"("+ player+"/"+PlayerMax+")")
            socket.broadcast.emit('Disconnect', socket.id);
        });

    });
    //Runnig server
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port +"("+ player+"/"+PlayerMax+")")
        console.log("La saison "+saison+" Demarre !")
    });
    //add your token !
    console.log(token)
client.login(token);








};
module.exports = Server;