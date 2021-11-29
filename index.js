const { Client, Intents, Collection } = require('discord.js');
const keepAlive = require('./server.js')
const fs = require('fs');
//require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
client.buttons = new Collection();
const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

(async () => {
  keepAlive();
  for (file of functions) { require(`./functions/${file}`)(client); }
  client.handleEvents(eventFiles, "./events");
  client.handleCommands(commandFolders, "./commands");
  client.handleButtons();
  client.login(process.env['DISCORD_TOKEN']);
})();
