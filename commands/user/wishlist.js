const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wishlist')
    .setDescription('Adds your wishlist to the designated channel')
    .addStringOption(option =>
      option
        .setName('link')
        .setDescription('Enter a link to your wishlist')
        .setRequired(true)),

  async execute(interaction, client) {

    let wishlistURL = '';
    try {
      wishlistURL = new URL(interaction.options.getString('link'));
    } catch (error) {
      await interaction.reply({ content: 'The submitted wishlist was not a valid URL. Please try again.', ephemeral: true });
      return;
    }

    const embed = new MessageEmbed()
      .setColor('#6DE194')
      .setTitle(`${interaction.user.username}'s Wishlist`)
      .setDescription(`${wishlistURL}\n-----\n Please message ${interaction.user} directly if you would like to send them items on their wishlist. Thanks for making our community a great place!`)
      .setURL(wishlistURL)
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter('Please remember, this is for gifting purposes only.', interaction.guild.iconURL())

    const guildObject = await db.get('g' + interaction.guild.id);
    if (guildObject == null || guildObject.wishlist_channel === undefined) {
      await interaction.reply({ content: 'The wishlist command has not been setup in this server. Please contact a server admin for assistance.', ephemeral: true });
      return;
    } else {
      const channel = await client.channels.fetch(guildObject.wishlist_channel);
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: `Your wishlist has been added to the ${channel} channel.`, ephemeral: true });
    }
  },
};
