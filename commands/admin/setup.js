const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup Golemheart')
    .addSubcommand(subcommand =>
      subcommand
        .setName('wishlist')
        .setDescription('Wishlist command settings')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Select a channel')
            .setRequired(true))
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
      await interaction.reply({ content: `You must be an administrator to use this command.`, ephemeral: true});
      return;
    }
    
    await db.set('wishlist_channel', channel);
    console.log(`Setup - Wishlist channel set to ${channel}.`);
    await interaction.reply({ content: `Wishlists will be sent to the ${channel} channel.`, ephemeral: true });
  },
};