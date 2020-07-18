const {
  Client,
  Attachment,
  RichEmbed
} = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Client();
const config = require("./config.json");
client.commands = new Discord.Collection();


////////Charche events//////
fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./Events/${f}`);
        let event = f.split('.')[0];
        client.on(event, events.bind(null, client));
    });
});


////////Fonction///////
function SendMessageTicket(message) {
  console.log(config.serverID)
  var server = client.guilds.get(config.serverID);
  c = server.channels.find("name", "ticket-" + message.author.id)
  var Attachment = (message.attachments).array();
  if (Attachment[0] !== undefined) {
      var pp = Attachment[0].url;
  } else {
      var pp = "";
  }

  const embed = new RichEmbed()
      .setColor("#FF4D0B")
      .addField(`Nouveau message de ${message.author.username}`, message.content + " " + pp)
      .setTimestamp();
  c.send({
      embed: embed
  });
}


client.on("message", async message => {
  var server = client.guilds.get(config.serverID);
  if (message.author.bot) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.channel.type !== "dm") {
      if (message.channel.name.indexOf('ticket') > -1 && command != "close") {
          var ret = message.channel.name.replace('ticket-', '');

          var pq = client.users.get(ret)
          const embed = new RichEmbed()
              .setColor("#FF4D0B")
              .addField(`Nouveau message de ${message.author.username}`, message.content)
              .setTimestamp();
          pq.send({
              embed: embed
          });

      } else {
          if (command == "close" && message.channel.name.indexOf('ticket') > -1) {
              var ret = message.channel.name.replace('ticket-', '');
              var pq = client.users.get(ret)
              const embed = new RichEmbed()
                  .setColor("#FF4D0B")
                  .addField(`Nouveau message`, "Votre demande a été fermé inutile de répondre à ce message")
                  .setTimestamp();
              pq.send({
                  embed: embed
              });

              message.channel.delete()
          }
      }
  }



  if (message.channel.type === "dm") {
      if (server.channels.exists("name", "ticket-" + message.author.id)) return SendMessageTicket(message);
      server.createChannel(`ticket-${message.author.id}`, "text").then(c => {
          for (i = 0; i < config.ModeratorRoles.length; i++) {
              var role1 = client.guilds.get(config.serverID).roles.find("name", config.ModeratorRoles[i]);
              c.overwritePermissions(role1, {
                  SEND_MESSAGES: true,
                  READ_MESSAGES: true
              });
          }
          let role2 = client.guilds.get(config.serverID).roles.find("name", "@everyone");
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          message.channel.send(`:white_check_mark: Votre demande a été transmit au staff.`);
          const embed = new RichEmbed()
              .setColor("#FF4D0B")
              .addField(`Nouvelle demande de ${message.author.username}#${message.author.discriminator}`, message.content)
              .setTimestamp();
          c.send({
              embed: embed
          });

      }).catch(console.error); // envoie erreur dans la console
  }
});

client.login(config.token);
