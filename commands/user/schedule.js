const { DateTime } = require("luxon");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Schedule a game')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('Set the time for the game')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('date')
        .setDescription('Set the date for the game (defaults to current date)')
        .setRequired(false)
    ),

  async execute(interaction) {

    //interaction.reply({ content: `${DateTime.now().setZone("America/Chicago").toLocaleString(DateTime.DATETIME_MED)}` });
    const epoch = Math.floor(DateTime.now() / 1000);
    interaction.reply({ content: `${interaction.user} would like to play a game: <t:${epoch}>` });

  },
};
