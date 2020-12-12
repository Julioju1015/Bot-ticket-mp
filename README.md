# Bot-ticket-mp

Voici un bot discord de ticket mp en v12 de discord.js

Pour ouvrir un ticket **mp le bot une fois qu'il est en ligne**

Pour fermer un ticket dire **close** dans la salons crée sur le serveur


# Configuration

Pour connfigiré votre bot vous rendre dans le fichier **index.js**

et y rentré le token de votre bot a la ligne **4**

```
const TOKEN = "token du bot";
```

Vous rendre dans le fichier **message.js**

et y rentré l'id de votre serveur a la ligne **23**

```
   var guild = bot.guilds.cache.find(g => g.id === "id de votre serveur")
```

A la ligne **24** du **message.js**, vous avez ce code : 

`const STAFF = guild.roles.cache.find(role => role.name == 'Tickets')`

Vous devez remplacer Tickets par le nom du rôle que les helpeurs auront. **Ce rôle ne sera pas crée automatiquement par le robot.**


# Information

Mon site: **http://julioju.gq/**

Besoins d'aide venir sur mon discord :**https://discord.gg/p2N8FDX**


