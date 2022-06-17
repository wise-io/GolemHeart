const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Modal } = require('discord.js');
const { PermissionUtils } = require('../utils.js');
const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('brew')
    .setDescription('Starts a thread to work on a deck list (see https://docs.golemheart.io/commands/brew)')
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
      option.setName('link')
        .setDescription('Provide a link to your current cube / deck')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('private')
        .setDescription('Create a private thread (requires server level 2+)')
    ),

  async execute(interaction, client) {

    // Embed variables
    const color = '#01aff4'; // GolemHeart Blue
    const title = `${interaction.member.displayName}'s Brew`;
    const url = interaction.options.getString('link');
    const thumbnail = 'https://raw.githubusercontent.com/wise-io/GolemHeart/main/assets/gh-brew.png';
    const description = `${interaction.user} has started a new brew. You can find the **[list here](${url} '${url}')**. @Mention members to invite them to the thread. Have fun!`;
    const strategy = "```" + `${interaction.options.getString('strategy')}` + "```";
    const goals = "```" + `${interaction.options.getString('goals')}` + "```";
    const footer = { text: `Created by GolemHeart for ${interaction.member.displayName}`, iconURL: interaction.member.displayAvatarURL() };

    // Thread variables
    let channel;
    const threadName = `🔸${interaction.options.getString('title')}`;
    const threadReason = `Thread created by GolemHeart using the /brew command, initiated by ${interaction.user}.`;
    let threadType = 'GUILD_PUBLIC_THREAD';
    if (interaction.options.getBoolean('private') === 'TRUE') {
      if (interaction.guild.premiumTier === 'TIER_2' || interaction.guild.premiumTier === 'TIER_3') {
        threadType = 'GUILD_PRIVATE_THREAD';
      }
    }

    // Verify variables meet character length requirements
    if (threadName.length > 99) {
      await interaction.reply({ content: 'Please limit your brew title to 99 characters or less.', ephemeral: true });
      return;
    }
    if (strategy.length > 1000) {
      await interaction.reply({ content: 'Please limit your brew strategy to 1000 characters or less.', ephemeral: true });
      return;
    }
    if (goals.length > 1000) {
      await interaction.reply({ content: 'Please limit your brew goals to 1000 characters or less.', ephemeral: true });
      return;
    }


    // Check if link is on allowlist
    const isDomainAllowed = client.isURLAllowed(url);
    if (!isDomainAllowed) {
      const allowedDomains = "```" + client.urlAllowlist.join("\n") + "```"
      await interaction.reply({ content: `GolemHeart supports the following online deck builders:${allowedDomains}\nTo request support for a site, see here: <https://golemheart.io/issues/25>`, ephemeral: true });
      return;
    }

    // Get brew channel from database
    const guildDBObject = await guildProfile.findById(interaction.guild.id).exec();;
    const isBrewEnabled = guildDBObject.brew.enabled;
    const channelID = guildDBObject.brew.channelID;
    if (!isBrewEnabled || channelID == undefined) {
      await interaction.reply({ content: 'The brew command has not been setup or is disabled in this server. Please contact a server admin for assistance.', ephemeral: true });
      return;
    } else {
      channel = await client.channels.fetch(channelID);
    }

    // Create embed
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setThumbnail(thumbnail)
      .setDescription(description)
      .setURL(url)
      .setFooter(footer)
      .addFields(
        { name: 'Strategy', value: strategy },
        { name: 'Goals', value: goals },
      )

    // Create buttons
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

    if (!(await PermissionUtils.canSend(channel, true))) {
      await interaction.reply({ content: `GolemHeart does not have the necessary permissions to create a thread in the ${channel} channel. Please contact a server administrator for assistance.`, ephemeral: true })
    } else {
      
      // Create thread
      const thread = await channel.threads.create({
        name: threadName,
        type: threadType,
        reason: threadReason,
      });

      // Send embed, pin it, invite members, and send confirmation message
      await thread.send({ embeds: [embed], components: [row] }).then(message => message.pin());
      await thread.members.add(interaction.user.id);
      await interaction.reply({ content: `${interaction.user} has started a new brew. You can join them in the ${thread} thread. Have fun brewing together!` });
    }

  },
};
