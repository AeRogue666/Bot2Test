/*
Bienvenue sur le fichier principal de votre bot. Ceci est un peu la matrice du bot.
Vous trouverez ci-dessous toute les explications concernant chaque fonction du bot
et comment les modifier correctement.
*/

const Discord = require("discord.js"); //Ayant besoin du module discord.js pour faire tourner le bot sous Discord nous l'appelons. Vous devrez l'installer en faisant npm i discord.js dans une invite de commande (cmd).
const client = new Discord.Client(); //Voici le client. Il est souvent nommé "bot" dans les bots que vous pouvez télécharger sur github mais je préfère mettre client pour que cela soit plus compréhensible.
const moment = require("moment");

const config = require('./config.json'); 
/*Ayant besoin d'un fichier contenant les informations sensibles du bot comme le token ou l'ID de l'owner, 
nous faisons appelle à ce dernier pour bénéficier de ce contenu sans le mettre de façon lisible dans le code du bot.
Cela évite que nous ayons des informations privées et/ou sensibles qui se retrouvent dans le code du bot et que quelqu'un de mal intentionné vous vol votre bot (rigolez pas, ça arrive régulièrement ce genre de problème)*/

client.login(config.token) //Nous faisons appelle au token du bot.

//Ci-dessous nous créeons une constante qui se lance au démmarage du bot (d'où le client.on) Elle execute un démarrage avec affichage d'informations dans la console ainsi que sur Discord.
client.on("ready", function() {
    var clientcharge = `
------------------------------------------------------
> Lancement en cours...
------------------------------------------------------
${client.user.tag} s'est correctement lancé !
Serveur(s) : ${client.guilds.size}
Canaux : ${client.channels.size}
Membres : ${client.users.size}
Invitation du bot : 
https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=${config.nivperms}
LET'S GO!
------------------------------------------------------
---------- Bot de Test créé par AeRogue --------------
------------------------------------------------------
----------------- Logs du Bot ------------------------`

    console.log(clientcharge); //Nous faisons appelle à la variable clientcharge que nous avons créé ci-dessus. Le texte qu'elle contient s'affichera dans la console.
	
    //Ici nous définissons une boucle infinie de "jeux" qui défileront sous le pseudo du bot. Par exemple : Joue à mettre des vents (c'est gratuit)
    let statusArray = [
        `${config.prefix}help | Surveille ${client.guilds.size} serveurs !`, //Vous pouvez changer les jeux ! :D
		`${config.prefix}help | ${client.user.username} version ${config.version} !`,
        `${config.prefix}help | Possède ${client.users.size} membres !`,
		`${config.prefix}help | ${client.user.username} - Best Bot Ever`
	];
	
	setInterval(function() {
	client.user.setPresence({
        game: { 
            name: `${statusArray[~~(Math.random() * statusArray.length)]}`, //Nous appelons statusArray et executons de façon aléatoire un des jeux proposés ci-dessus.
			url:"https://twitch.tv/lebot", //Ceci permet d'afficher le bot avec une bannière façon Twitch sur Discord. Vous pouvez tout à fait le supprimer mais il faut penser à éditer aussi ci-dessous.
            type: 'STREAMING' //Ici nous déclarons que le bot est en mode stream. Il affichera donc qu'il est en plein stream ce qui permet l'affichage d'un décor violet comme sur Twitch derrière le bot. Vous pouvez remplacer STREAMING par WATCHING, cela affichera Joue à.
        },
        status: 'online' //Ceci définit le status du bot. Online (En ligne) , idle (AFK) , offline (Hors-Ligne) ou dnd (Ne pas déranger). 
    })
	 }, 3000); //Ceci est un timer qui permet de changer de jeu à interval régulier. Ici il est réglé sur 3 secondes.
});

client.on("message", async message => {

 var args = message.content.substring(config.prefix.length).split(" ");

switch (args[0]) {
case "help":
case "?":
console.log(`${message.author.tag} a utilisé ${config.prefix}help !`);
    
    message.reply("Veuillez regarder vos messages privés :inbox_tray:");

    message.author.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: `Commandes de ${config.BotName}`,
        fields: [{
            name: "Aide du Bot",
            value: `**${config.prefix}help [?]** - Permet d'afficher cette aide
**${config.prefix}botinfo [bi]** - Permet d'afficher des informations sur le bot
**${config.prefix}invite** - Permet d'inviter le bot`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: `© ${config.BotName}`
        }
      }
    });
        break;
case"botinfo":
case"bi":
console.log(` ${message.author.tag} viens d'utiliser ${config.prefix}botinfo !`);

		
        message.channel.send({embed: {
            color: 3447003,
            title: "Informations sur le bot de test",
            description: "Voici les informations sur le bot de test",
            fields: [{
                name: "Créateur :",
                value: `${config.OwnerName}`
              },
              {
                name: `__Invitation officielle pour rejoindre le serveur de ${config.BotName} :__ 》`,
                value: "https://discord.gg/Inviteversvotreserveur"
              },
              {
                name: `Pour inviter ${config.BotName} :`,
                value: "[:robot:](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=" + config.nivperms + ") :arrow_left:  Clique sur le robot"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: `© ${config.BotName}`
            }
          }
        });
break;
case "invite":
case "inv":
console.log(` ${message.author.tag} a utilisé ${config.prefix}invite !`);
//Si vous souhaitez que les gens puissent inviter votre bot :
message.reply(", tu souhaite m'inviter sur ton Discord ? Pas de problème ! Clique sur le lien --> https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=" + config.nivperms);
//Si vous ne souhaitez pas que les gens puissent inviter votre bot :
//message.reply("Désolé mais ce n'est pas possible. Je ne suis pas invitable. Par contre tu peux aller télécharger ma version officielle ici : https://github.com/BinaryBreakFast/Bot2Test");
break;
 }	
});