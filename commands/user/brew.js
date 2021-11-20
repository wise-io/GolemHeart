const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('brew')
    .setDescription(' '),
  async execute(interaction) {
    await interaction.reply('');
  },
};