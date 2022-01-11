const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const userProfile = require('../schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips a coin and returns the result.')
    .addStringOption(option =>
      option.setName('call')
        .setDescription('Call the flip.')
        .setRequired(false)
        .addChoice('heads', 'heads')
        .addChoice('tails', 'tails')
    ),
  async execute(interaction, client) {
    // Flip variables
    const call = interaction.options.getString('call');
    const flip = await client.flipCoin(call);

    // Database variables
    const filter = { _id: interaction.user.id, 'guilds.guildID': interaction.guild.id };
    const update = { $inc: { 'guilds.$.flips': 1, 'guilds.$.flipCalls': flip.called, 'guilds.$.flipWins': flip.win } };
    const user = await userProfile.findOneAndUpdate(filter, update, { new: true });
    const stats = user.guilds.find(x => x.guildID === interaction.guild.id);
    const winPct = ((stats.flipWins / stats.flipCalls) * 100).toFixed(0);

    // Embed variables 
    let embed, color, description, footer, row, disableButton;
    const flavorText = await client.getFlavorText('flip');
    const thumbnail = 'https://raw.githubusercontent.com/wise-io/GolemHeart/main/assets/mtg_coin.png';
    const title = `Let's Flip a Coin!`;

    // Flip without call
    if (call == null) {
      color = '#FFB005'; //Gold
      description = `${interaction.user} got **${flip.result}**!`;
      footer = `${interaction.user.username} has flipped ${stats.flips} coins.`;

      row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`flip-noCall`)
            .setLabel(`Flip Another Coin`)
            .setStyle('SECONDARY'),
        )
      
    } else {
      // Flip with call
      footer = `${interaction.user.username} has won ${winPct}% of their calls.`;

      if (call == flip.result) {
        color = '#3ba55b'; //Green
        description = `${interaction.user} called **${call}** and ` + "`won` the flip. ```Consecutive Wins: 1```";
        disableButton = false;
      } else {
        color = '#ec4245'; //Red
        description = `${interaction.user} called **${call}** and ` + "`lost` the flip.";
        disableButton = true;
      }

      row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`flip-heads`)
            .setLabel(`Flip - Heads`)
            .setStyle('SECONDARY')
            .setDisabled(disableButton),

          new MessageButton()
            .setCustomId(`flip-tails`)
            .setLabel(`Flip - Tails`)
            .setStyle('SECONDARY')
            .setDisabled(disableButton),
        )
    }

    // Create embed
    embed = new MessageEmbed()
      .setTitle(title)
      .setThumbnail(thumbnail)
      .setColor(color)
      .setDescription(description)
      .setFooter({ text: footer, iconURL: interaction.user.displayAvatarURL() })
      .addField('\u200b', flavorText, false);

    // Send reply
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
