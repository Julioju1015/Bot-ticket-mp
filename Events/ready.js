const Discord = require("discord.js");

module.exports = (client) => {


    console.log(`${client.user.username} est en ligne`);

    let statuses = [
        `Bot crée par Julioju`,
        `Regarder ${client.users.size} membre`,
        `Ouvrir un ticket mp moi !`,
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "PLAYING"}); 

    }, 20000);

};

