const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { ClientUtils } = require('../utils.js');
const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  name: 'guildCreate',
  async execute(guild) {

    // Add guild profile to database
    const guildDBObject = { '_id': guild.id };
    await guildProfile.updateOne(guildDBObject, guildDBObject, { upsert: true });

    // Create Getting Started embed
    const embed = new MessageEmbed()
      .setColor('#01aff4')
      .setTitle('Thank you for using GolemHeart!')
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setDescription('GolemHeart helps your server brew, discuss, and play **Magic: The Gathering!**')
      .addField('Getting Started', "GolemHeart uses [Discord slash commands](https://discord.com/blog/slash-commands-are-here). Take a look and see what's available by typing `/` and browsing the commands for GolemHeart!")
      .addField('Setup Commands',
        "A couple GolemHeart commands require a bit of setup before they can be used.\n\n" +
        ">>> **/brew** - Select a channel for brew threads using `/setup brew` with the `channel` option. A dedicated channel is recommended for brewing threads.\n\n" +
        "**/wishlist** - Select a channel for wishlist embeds using `/setup wishlist` with the `channel` option. A dedicated channel is recommended for wishlists."
      )

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('View Documentation')
          .setStyle('LINK')
          .setURL('https://docs.golemheart.io/')
      );

    // Send welcome embed to notify channel
    let notifyChannel = await ClientUtils.findNotifyChannel(guild);
    if (notifyChannel) { notifyChannel.send({ embeds: [embed], components: [row] }); }

    //Send welcome message to owner
    let owner = await guild.fetchOwner();
    if (owner) { owner.send({ embeds: [embed], components: [row] }); }
  },
};
