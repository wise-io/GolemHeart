const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('brew')
    .setDescription('Start a thread to work on a deck list')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Set the thread title')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('strategy')
        .setDescription('Describe the strategy of your deck')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('goals')
        .setDescription('Describe the goals of this brewing session')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('decklist')
        .setDescription('Provide a link to your current deck list')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('private')
        .setDescription('Create a private thread (requires server level 2+)')
    ),

  async execute(interaction, client) {

    //Check if decklist url is on allowlist
    const decklistURL = interaction.options.getString('decklist');
    const isDomainAllowed = client.isURLAllowed(decklistURL);
    if (isDomainAllowed === false) {
      const allowedDomains = "```" + client.urlAllowlist.join("\n") + "```"
      await interaction.reply({ content: `GolemHeart supports the following online deck builders:${allowedDomains}\nTo request support for a site, see here: <https://github.com/wise-io/GolemHeart/issues/25>`, ephemeral: true });
      return;
    }

    //Get brew channel from database
    let channel;
    const guildDBObject = await guildProfile.findById(interaction.guild.id).select('brewChannelID').exec();
    const channelID = guildDBObject.brewChannelID;
    console.log(channelID);
    if (channelID == undefined) {
      await interaction.reply({ content: 'The brew command has not been setup in this server. Please contact a server admin for assistance.', ephemeral: true });
      return;
    } else {
      channel = await client.channels.fetch(channelID);
    }

    //Determine guild tier and set thread timeout to maximum value
    let timeout = 1440;
    if (interaction.guild.premiumTier === 'TIER_1') {
      timeout = 4320;
    } else if (interaction.guild.premiumTier === 'TIER_2' || interaction.guild.premiumTier === 'TIER_3') {
      timeout = 10080;
    }

    //Create thread
    let threadType = 'GUILD_PUBLIC_THREAD';
    if (interaction.options.getBoolean('private') === 'TRUE') {
      if (interaction.guild.premiumTier === 'TIER_2' || interaction.guild.premiumTier === 'TIER_3') {
        threadType = 'GUILD_PRIVATE_THREAD';
      }
    }
    const thread = await channel.threads.create({
      name: `🔸${interaction.options.getString('title')}`,
      autoArchiveDuration: timeout,
      type: threadType,
      reason: `Thread created by GolemHeart using the /brew command, initiated by ${interaction.user}.`,
    });

    //Create embed
    const embed = new MessageEmbed()
      .setColor('#6DE194')
      .setTitle(`${interaction.user.username}'s Brew`)
      .setDescription(`${interaction.user} has started a brew! You can find the [decklist here](${decklistURL} '${decklistURL}'). @Mention your friends to get started, and have fun!`)
      .setURL(decklistURL)
      .setFooter({ text: `Created by GolemHeart using the /brew command`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp()
      .addFields(
        { name: 'Strategy', value: "```" + `${interaction.options.getString('strategy')}` + "```" },
        { name: 'Goals', value: "```" + `${interaction.options.getString('goals')}` + "```" },
      )

    //Create buttons
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('brew-archive')
          .setLabel('Archive Thread')
          .setEmoji('📦')
          .setStyle('SECONDARY'),

        new MessageButton()
          .setCustomId('brew-lock')
          .setLabel('Lock Thread')
          .setEmoji('🔒')
          .setStyle('DANGER'),
      )

    //Send embed, pin it, invite members, and send confirmation message
    await thread.send({ embeds: [embed], components: [row] }).then(message => message.pin());
    await thread.members.add(interaction.user.id);
    await interaction.reply({ content: 'Your thread has been created. Have fun brewing!', ephemeral: true });
  },
};