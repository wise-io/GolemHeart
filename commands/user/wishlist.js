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
    const wishlistLink = interaction.options.getString('link')
    const embed = new MessageEmbed()
      .setColor('#6DE194')
      .setTitle(`${interaction.user.username}'s Wishlist`)
      .setDescription(`${wishlistLink}\n-----\n Please message <@${interaction.user.id}> directly if you would like to send them items on their wishlist. Thanks for making our community a great place!`)
      .setURL(wishlistLink)
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter('Please remember, this is for gifting purposes only.', interaction.guild.iconURL())

    var channelId = interaction.channel.id;
    const wishlist_channel = await db.get('wishlist_channel');
    if (wishlist_channel == null) { return; } else { channelId = wishlist_channel.id; }

    const channel = await client.channels.fetch(channelId);
    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: `Your wishlist has been added to the ${channel} channel.`, ephemeral: true });
  },
};

/* Future Enhancements:

- Make confirmation message temporary.
- Delete previously submitted wishlists for a user automatically.
- Enable customizations:
  - embed color
  - description
  - footer message

*/