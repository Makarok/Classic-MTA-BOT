const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});



bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: '.help | Classic-MTA',
            type: "STREAMING",
            url: "https://www.youtube.com/watch?v=SKIioRnkTBk"
        }
    });
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nie można znaleźć użytkownika!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie posiadam permisji!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ta osoba nie może zostać wyrzucona!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("KICK")
    .setColor("#e56b00")
    .addField("Wyrzucona osoba", `${kUser} z numerem ID ${kUser.id}`)
    .addField("Wyrzucona przez", `<@${message.author.id}> z numerem ID ${message.author.id}`)
    .addField("Powód", kReason);

    message.guild.member(kUser).kick(kReason);

    return message.channel.send(kickEmbed);
  }

  if(cmd === `${prefix}clear`){

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie posiadam permisji!");
    if(!args[0]) return message.channel.send("Podaj ilość wiadomości do skasowania.");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Usunięto ${args[0]} wiadomości.`).then(msg => msg.delete(2000));
    });
  }

  if(cmd === `${prefix}say`){

    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
  }


  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nie można znaleźć użytkownika!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Nie posiadam permisji!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ta osoba nie może zostać zbanowana!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("BAN")
    .setColor("#bc0000")
    .addField("Zbanowana osoba", `${bUser} z numerem ID ${bUser.id}`)
    .addField("Zbanowana przez", `<@${message.author.id}> z numerem ID ${message.author.id}`)
    .addField("Powód", bReason);


    message.guild.member(bUser).ban(bReason);
    return message.channel.send(banEmbed);
  }

  if(cmd === `${prefix}forum`){

    return message.channel.send("W trakcie prac.");
  }

  if(cmd === `${prefix}krul`){

    return message.channel.send("Makari krulem Makari panem zawsze będę jego fanem.");
  }

  if(cmd === `${prefix}members`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Licznik osób")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Ilość osób", message.guild.memberCount);

    return message.channel.send(serverembed);
  }


  if(cmd === `${prefix}help`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Komendy na serwerze")
    .setColor("#15f153")
    .addField(".members" ,"Sprawdzanie ilości osób na serwerze")
    .addField(".forum", "Wysyła link do forum");
    //.setFooter("Classic-MTA");

    return message.channel.send(botembed);
  }

});

bot.login(tokenfile.token);
