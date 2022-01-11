const { MessageActionRow, MessageEmbed } = require('discord.js');
const userProfile = require('../schemas/userSchema.js');

module.exports = (client) => {
  client.flipUpdate = async (interaction, call) => {

    // Flip variables
    const flip = await client.flipCoin(call);
    const coinFlipper = interaction.message.interaction.user;
    const isUserCoinFlipper = interaction.user === coinFlipper;
    const isUserRight = call === flip.result;
    if (!isUserCoinFlipper) {
      await interaction.reply({ content: `Only ${coinFlipper} can flip thier coin again. To flip your own coin, use /flip.`, ephemeral: true });
      return;
    }

    // Database variables
    const filter = { _id: interaction.user.id, 'guilds.guildID': interaction.guild.id };
    const update = { $inc: { 'guilds.$.flips': 1, 'guilds.$.flipCalls': flip.called, 'guilds.$.flipWins': flip.win } };
    const user = await userProfile.findOneAndUpdate(filter, update, { new: true });
    const stats = user.guilds.find(x => x.guildID === interaction.guild.id);
    const winPct = ((stats.flipWins / stats.flipCalls) * 100).toFixed(0);

    // Embed variables
    let color, description;
    let embed = new MessageEmbed(interaction.message.embeds[0]);
    let row = new MessageActionRow(interaction.message.components[0]);
    let footer = `${interaction.user.username} has won ${winPct}% of their calls.`;

    if (call === undefined) {
      color = '#FFB005'; //Gold
      description = `${interaction.user} got **${flip.result}**!`;
      footer = `${interaction.user.username} has flipped ${stats.flips} coins.`;
    } else {

      let wins = parseInt(interaction.message.embeds[0].description.split('Consecutive Wins: ')[1].replace(/[^0-9]/g, ''));

      if (isUserRight) {
        description = `${interaction.user} called **${call}** and ` + "`won` the flip. ```Consecutive Wins: " + (wins + 1) + "```";
        color = '#3ba55b'; //Green
      } else {
        color = '#ec4245'; //Red
        description = `${interaction.user} called **${call}** and ` + "`lost` the flip. ```Consecutive Wins: " + (wins) + "```";
        row.components[0].setDisabled(true);
        row.components[1].setDisabled(true);
      }
    }

    // Modify embed
    embed = new MessageEmbed(embed)
      .setColor(color)
      .setDescription(description)
      .setFooter({ text: footer, iconURL: interaction.user.displayAvatarURL() });

    // Update reply
    interaction.update({ embeds: [embed], components: [row] });
  }
};
