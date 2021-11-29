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
      await interaction.reply({
        content: `You must have administrator permissions to use this command.`,
        ephemeral: true
      });
      return;
    }

    const keys = await db.list();
    console.log(`\nDatabase Keys:\n${keys}\n`);
    await interaction.reply({ content: `A list of database keys has been sent to the console.`, ephemeral: true });
  },
};
