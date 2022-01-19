const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup Golemheart (see https://docs.golemheart.io/admin/setup)')
    .addSubcommand(subcommand =>
      subcommand
        .setName('brew')
        .setDescription('Brew command settings')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Select a channel to create brewing threads in'))
        .addBooleanOption(option =>
          option
            .setName('enabled')
            .setDescription('Enabled or disable the brew command'))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('wishlist')
        .setDescription('Wishlist command settings')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Select a channel to send user wishlists'))
        .addBooleanOption(option =>
          option
            .setName('enabled')
            .setDescription('Enabled or disable the wishlist command'))
    ),

  async execute(interaction) {

    // Validate user permissions
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      await interaction.reply({ content: `You must be an administrator to use this command.`, ephemeral: true });
      return;
    }

    // Variables
    let enabled, statusString, replyString, update;
    const command = interaction.options.getSubcommand();
    const channel = interaction.options.getChannel('channel');
    enabled = interaction.options.getBoolean('enabled');

    if (enabled == null) { enabled = true; }
    if (enabled) { statusString = 'enabled'; } else { statusString = 'disabled'; }
    if (enabled && channel == null) {
      await interaction.reply({ content: `To enable the ${command} command, you must select a channel using the ` + "`channel` option.", ephemeral: true });
      return;
    }

    // Define database update and reply string
    if (command === 'brew') {
      update = { $set: { 'brew.channelID': channel.id, 'brew.enabled': enabled } };
      replyString = `The ${command} command is now ${statusString}.`;
      if (enabled) { replyString = replyString + ` Brewing threads will be created in the ${channel} channel.`; }
    } else if (command === 'wishlist') {
      update = { $set: { 'wishlist.channelID': channel.id, 'wishlist.enabled': enabled } };
      replyString = `The ${command} command is now ${statusString}.`;
      if (enabled) { replyString = replyString + ` Wishlists will be sent to the ${channel} channel.`; }
    }

    // Update database and send reply
    await guildProfile.findByIdAndUpdate(interaction.guild.id, update, { upsert: true });
    await interaction.reply({ content: replyString, ephemeral: true });
  },
};
