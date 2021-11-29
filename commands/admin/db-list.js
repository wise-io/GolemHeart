const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('db-list')
    .setDescription('List all database keys'),

  async execute(interaction) {

    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      await interaction.reply({ content: `You must be an administrator to use this command.`, ephemeral: true });
      return;
    }

    await interaction.reply({ content: `This command doesn't do anything yet.`, ephemeral: true });
  },
};