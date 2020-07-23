const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const TOKEN = "token du bot";

bot.login(TOKEN)

const loadEvents = (dir) => {
    fs.readdirSync(dir).forEach(dirs => {
        let events = fs.readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"))
        for(let file of events) {
            let getFileName = require(`${dir}/${dirs}/${file}`)
            let eventName = file.split('.')[0]
            bot.on(eventName, getFileName.bind(null, bot))
        }
    })
}

loadEvents("./Events/")