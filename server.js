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
mute = true
Gamelock = false
setsaison = false
setban = false
setmsg = false
message  =""
onsave = false
savetite = ""
savedata=""
onban=false
unban = false

//Your discord Username
Admin ="Miro【OR40】#8186"
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

function newsaison(saison){
    var i = 0;
    
for (; i < ocurenceI; i++) {
    console.log("tentative de supprimer I"+1)
if(load("I"+i)){
    remove("I"+i)
    remove("I"+i,idp)
    remove("Ix"+i)
    remove("Iy"+i)
}
}

    save('saison',saison)
    save("ocurenceI",0)

    console.log("Nothing new saison : "+saison );
}


//discord
client.on('ready', () => {

    
    console.log(`Logged in as ${client.user.tag}!`);
    botname = client.user.tag
   // msg.reply('Bonjour à tous !');
  });


  
  
  
  
  client.on('message', msg => {
      if(load(msg.author.tag)){
        msg.reply('Je suis pas autorisé à apprendre de toi ou te répondre.')
        save(msg.author.tag,1)

      }
      
    if(Admin ===msg.author.tag){

        if (msg.content === "!banuser") {
            msg.reply("Qui je dois bannir de mon apprentissage ?" );
            onban= true
            
        } else if(onban ==true){ 
            save("ban"+msg.content)
            save(msg.content,1)
          onban = false
            msg.reply("Voilà c'est fait." );
        }

        if (msg.content === "!unbanuser") {
            msg.reply("Qui je dois débannir de mon apprentissage ?" );
            unban= true
            
        } else if(unban ==true){ 
            remove("ban"+msg.content)
            remove(msg.content)
          unban = false
            msg.reply("Voilà c'est fait." );
        }


        if (msg.content === "!Gsave") {
            msg.reply("ok ! Il me faut le titre de l'information ! je met quoi comme titre ?" );
            onsave=true
         
        }else if(onsave==true){
  
            if(savetite ==""){
                
                savetite= msg.content
                msg.reply("Voilà titre ajouter ! Il me faut la data de l'information ! je met quoi comme data?" );
               
            }else if(savedata ==""){
                savedata= msg.content
                msg.reply("Ok, j'envoie cette data a tout les joueurs. titre : " +savetite+" data : " +savedata );
             
                onsave=false
            }

        }


        if (msg.content === "!lock") {
            msg.reply('je deconnecte tout les joueurs' );
            Gamelock = true
        }
        if (msg.content === "!unlock") {
            msg.reply('le jeu est réouvert' );
            Gamelock = false
        }
        if (msg.content === "!setsaison") {
            msg.reply("D'accord, qu'elle est le nom de la saison ?" );
            setsaison = true
            
        } else if(setsaison ==true){
            saison = msg.content
            setsaison = false
            newsaison(saison)

            msg.reply("Voilà c'est fait." );
        }
       
        if (msg.content === "!ban") {
            msg.reply("D'accord, qui je dois bannir du jeu ?" );
            setban = true
        } else if(setban == true){
            saison = msg.content
            setban = false
            msg.reply("Voilà c'est fait." );
        }

        if (msg.content === "!message") {
            msg.reply("D'accord, qui je dois afficher en du jeu ?" );
            Gamelock = true
            setmsg = true
        } else if(setmsg == true){
            message= msg.content
            Gamelock = false
            setmsg = false
            msg.reply("Voilà c'est fait." );
        }

    }
 lastmsg = msg.content
 if(Admin ===msg.author.tag){
    if(msg.content === "!mute"){
        msg.reply("Je passe en mode apprentissage!")
        mute = false
    }
    if(msg.content === "!unmute"){
        msg.reply("Je sort du mode apprentissage.")
        mute = true
    }
}
 if(mute){
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
            if(load(msg.author.tag)){
                cache = ""
            }else{
                msg.reply(load(msg.content)); 
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
 }else{
   if(load(msg.content)){
       console.log("Mode apprentissage activer reponse impossible.")
       cache = ""
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
ocurenceI = 0
if(load("ocurenceI")){
    ocurenceI = load("ocurenceI");
}
if(load("saison") != null){
    saison = load("saison")
}
if(load("ocurenceI")!= null){
    ocurenceI = load("ocurenceI")
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
         if(Gamelock == false){
                
            if(player >= PlayerMax){
                socket.emit('auth',"nope");
               }else{
                socket.emit('auth',"ok");
               }
         }else{
            socket.emit('auth',message);
         }
               
              
                console.log("nouveau joueur :"+ id)
        })




        if(savedata =! ""){
            if(savetite=!""){
                socket.broadcast.emit('save', savetite, savedata);
                console.log("data envoyer.")
                savedata = ""
                savetite = ""
            }
        }

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
                save("I"+ocurenceI,idp)
                save("Ix"+ocurenceI,posx)
                save("Iy"+ocurenceI,posy)
                ocurenceI = ocurenceI++
                save("ocurenceI",ocurenceI)
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
//envoie du chargement de la map
        socket.on('needI', function(i) {

            var I = load("I"+i)
            var Ix = load("Ix"+i)
            var Iy = load("Iy"+i)

            socket.emit('loader',I,Ix,Iy) 

       

        })


        socket.on('needocurence', function() {
            socket.emit('ocurence',ocurenceI)

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
        socket.on('spawnI', function(posisionx, posisiony,role) {

           

            socket.broadcast.emit('spawner', posisionx, posisiony, role);
            

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