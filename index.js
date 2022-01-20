const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const fs = require('fs');
const mongoose = require('mongoose');

client.buttons = new Collection();
client.commands = new Collection();

const buttonFiles = fs.readdirSync("./buttons").filter(file => file.endsWith(".js"));
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const handlers = fs.readdirSync("./handlers").filter(file => file.endsWith(".js"));

(async () => {
  for (file of functions) { require(`./functions/${file}`)(client); }
  for (file of handlers) { require(`./handlers/${file}`)(client); }
  client.handleButtons(buttonFiles, "./buttons");
  client.handleCommands(commandFiles, "./commands");
  client.handleEvents(eventFiles, "./events");

  // Connect to the database
  await mongoose.connect(process.env['MONGO_URI'], {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to database.');
    })
    .catch((err) => {
      console.log('Unable to connect to database.\nError: ' + err);
    });

  client.login(process.env['DISCORD_TOKEN']);
})();
