const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup Golemheart')
    .addSubcommand(subcommand =>
      subcommand
        .setName('brew')
        .setDescription('Brew command settings')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Select a channel to create brewing threads in')
            .setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('wishlist')
        .setDescription('Wishlist command settings')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Select a channel to send user wishlists in')
            .setRequired(true))
    ),

  async execute(interaction) {
    // Validate user permissions
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      await interaction.reply({ content: `You must be an administrator to use this command.`, ephemeral: true });
      return;
    }

    const channel = interaction.options.getChannel('channel');
    let updateCommand;
    let replyString;

    if (interaction.options.getSubcommand() === 'brew') {
      updateCommand = { brewChannelID: channel.id };
      replyString = `Brewing threads will be created in the ${channel} channel.`;
    } else if (interaction.options.getSubcommand() === 'wishlist') {
      updateCommand = { wishlistChannelID: channel.id };
      replyString = `Wishlists will be sent to the ${channel} channel.`;
    }

    await guildProfile.updateOne({ _id: interaction.guild.id }, updateCommand, { upsert: true });
    await interaction.reply({ content: replyString, ephemeral: true });
  },
};
