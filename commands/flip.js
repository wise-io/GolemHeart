const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const userProfile = require('../schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips a coin and returns the result.')
    .addIntegerOption(option =>
      option.setName('call')
        .setDescription('Call the flip.')
        .setRequired(false)
        .addChoice('Heads', 0)
        .addChoice('Tails', 1)
    ),
  async execute(interaction) {
    const file = new MessageAttachment('./assets/mtg_coin.png');
    const result = (Math.random() < 0.5);
    const call = interaction.options.getInteger('call');
    const filter = { _id: interaction.user.id, 'guilds.guildID': interaction.guild.id };
    let update;

    let embed = new MessageEmbed()
      .setTitle(`Let's Flip a Coin!`)
      .setThumbnail('attachment://mtg_coin.png')

    // Called Flips
    if (call !== null) {
      let callString;
      if (call == 0) { callString = 'heads'; } else { callString = 'tails'; }
      if (call == result) {
        update = { $inc: { 'guilds.$.flips': 1, 'guilds.$.flipCalls': 1, 'guilds.$.flipWins': 1 } };
        embed = new MessageEmbed(embed)
          .setColor('#00A300')
          .setDescription(`${interaction.user} called **${callString}** and won the flip. Nice call!`)
      } else {
        update = { $inc: { 'guilds.$.flips': 1, 'guilds.$.flipCalls': 1 } };
        embed = new MessageEmbed(embed)
          .setColor('#FF0000')
          .setDescription(`${interaction.user} called **${callString}** and lost the flip. Better luck next time!`)
      }

      // Uncalled flips
    } else {
      update = { $inc: { 'guilds.$.flips': 1 } };
      let resultString;
      if (result == 0) { resultString = 'heads'; } else { resultString = 'tails'; }
      embed = new MessageEmbed(embed)
        .setColor('#FFB005')
        .setDescription(`${interaction.user} got **${resultString}**!`)
    }

    // Update user stats
    const userDBObject = await userProfile.findOneAndUpdate(filter, update, { new: true });
    let userStats = userDBObject.guilds.find(x => x.guildID === interaction.guild.id);
    let userStatsString;
    if (call !== null) {
      const userWinPercentage = ((userStats.flipWins / userStats.flipCalls) * 100).toFixed(0);
      userStatsString = `${interaction.user.username} wins ${userWinPercentage}% of their calls.`;
    } else {
      userStatsString = `${interaction.user.username} has flipped ${userStats.flips} coins.`;
    }
    embed = new MessageEmbed(embed)
      .setFooter({ text: userStatsString, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
