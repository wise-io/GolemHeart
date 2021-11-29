const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('brew')
    .setDescription('Start a thread to work on a deck list.'),
  async execute(interaction) {
    await interaction.reply('This command does nothing... yet!');
  },
};
