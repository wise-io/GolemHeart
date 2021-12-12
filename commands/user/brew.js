const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const Database = require("@replit/database");
const db = new Database();

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

    //Check if decklist is valid url
    var decklistURL = '';
    try {
      decklistURL = new URL(interaction.options.getString('decklist'));
    } catch (error) {
      await interaction.reply({ content: 'The submitted deck list was not a valid URL. Please try again.', ephemeral: true });
      return;
    }

    //Get brew channel from database
    var channel = '';
    const guildObject = await db.get('g' + interaction.guild.id);
    if (guildObject == null || guildObject.brew_channel === undefined) {
      await interaction.reply({ content: 'The brew command has not been setup in this server. Please contact a server admin for assistance.', ephemeral: true });
      return;
    } else {
      channel = await client.channels.fetch(guildObject.brew_channel);
    }

    //Determine guild tier and set thread timeout to maximum value
    var timeout = 1440;
    if (interaction.guild.premiumTier === 'TIER_1') {
      timeout = 4320;
    } else if (interaction.guild.premiumTier === 'TIER_2' || interaction.guild.premiumTier === 'TIER_3') {
      timeout = 10080;
    }

    //Create thread
    var threadType = 'GUILD_PUBLIC_THREAD';
    if (interaction.options.getBoolean('private') === 'TRUE') {
      if (interaction.guild.premiumTier === 'TIER_2' || interaction.guild.premiumTier === 'TIER_3') { threadType = 'GUILD_PRIVATE_THREAD'; }
    }
    const thread = await channel.threads.create({
      name: interaction.options.getString('title'),
      autoArchiveDuration: timeout,
      type: threadType,
      reason: `Thread created by GolemHeart using the /brew command, initiated by ${interaction.user}.`,
    });

    //Create embed
    const embed = new MessageEmbed()
      .setColor('#6DE194')
      .setTitle(`${interaction.user.username}'s Decklist`)
      .setDescription(`${interaction.user} has started a brew! You can find the [decklist here](${decklistURL} '${decklistURL}'). Be sure to invite your friends to help by @mentioning them and have fun brewing together!`)
      .setURL(decklistURL)
      .setFooter(`Created by GolemHeart using the /brew command`, interaction.user.displayAvatarURL())
      .setTimestamp()
      .addFields(
        { name: 'Strategy', value: "```" + `${interaction.options.getString('strategy')}` + "```" },
        { name: 'Goals', value: "```" + `${interaction.options.getString('goals')}` + "```" },
      )

    //Create buttons
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('archive-thread')
          .setLabel('Archive Thread')
          .setEmoji('📦')
          .setStyle('SECONDARY'),

        new MessageButton()
          .setCustomId('lock-thread')
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
