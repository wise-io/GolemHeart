const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionUtils } = require('../utils.js');
const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wishlist')
    .setDescription('Adds your wishlist to the wishlist channel (see https://docs.golemheart.io/commands/wishlist)')
    .addStringOption(option =>
      option
        .setName('link')
        .setDescription('Enter a link to your wishlist')
        .setRequired(true)),

  async execute(interaction, client) {

    //Check if wishlist url is on allowlist
    const wishlistURL = interaction.options.getString('link');
    const isDomainAllowed = client.isURLAllowed(wishlistURL);
    if (isDomainAllowed === false) {
      const allowedDomains = "```" + client.urlAllowlist.join("\n") + "```"
      await interaction.reply({ content: `GolemHeart supports wishlists from the following online deck builders:${allowedDomains}\nTo request support for a site, see here: <https://github.com/wise-io/GolemHeart/issues/25>`, ephemeral: true });
      return;
    }

    //Get wishlist channel from database
    let channel;
    const guildDBObject = await guildProfile.findById(interaction.guild.id).exec();
    const isWishlistEnabled = guildDBObject.wishlist.enabled;
    const channelID = guildDBObject.wishlist.channelID;
    if (!isWishlistEnabled || channelID == undefined) {
      await interaction.reply({ content: 'The wishlist command has not been setup or is disabled in this server. Please contact a server admin for assistance.', ephemeral: true });
      return;
    } else {
      channel = await client.channels.fetch(channelID);
    }

    //Create embed
    const embed = new MessageEmbed()
      .setColor('#6DE194')
      .setTitle(`${interaction.user.username}'s Wishlist`)
      .setDescription(`${wishlistURL}\n-----\n Please message ${interaction.user} directly if you would like to send or trade them items on their wishlist. Thanks for making our community a great place!`)
      .setURL(wishlistURL)
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({ text: `Follow all gifting & trading rules of the ${interaction.guild.name} server`, iconURL: interaction.guild.iconURL() })

    // Send reply
    if (!(PermissionUtils.canSend(channel, true))) {
      await interaction.reply({ content: `GolemHeart does not have the necessary permissions to send a wishlist in the ${channel} channel. Please contact a server administrator for assistance.`, ephemeral: true })
    } else {
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: `Your wishlist has been added to the ${channel} channel.`, ephemeral: true });
    }
  },
};
