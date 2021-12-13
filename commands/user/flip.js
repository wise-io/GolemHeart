const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

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
    const hintString = `\n\n_Hint: Want to flip your own coin? Use the /flip command._`;
    const file = new MessageAttachment('./assets/mtg_coin.png');
    const result = (Math.random() < 0.5);
    let resultString = '';
    if (result == 0) { resultString = 'heads'; } else { resultString = 'tails'; }

    let embed = new MessageEmbed()
      .setTitle(`Let's Flip a Coin!`)
      .setThumbnail('attachment://mtg_coin.png')

    const call = interaction.options.getInteger('call');
    if (call !== null) {
      let callString = '';
      if (call == 0) { callString = 'heads'; } else { callString = 'tails'; }
      if (call == result) {
        embed = new MessageEmbed(embed)
          .setColor('#00A300')
          .setDescription(`${interaction.user} called **${callString}** and won the flip!${hintString}`)
      } else {
        embed = new MessageEmbed(embed)
          .setColor('#FF0000')
          .setDescription(`${interaction.user} called **${callString}** and lost the flip. Better luck next time!${hintString}`)
      }
    } else {
      embed = new MessageEmbed(embed)
        .setColor('#FFB005')
        .setDescription(`${interaction.user} got **${resultString}**!${hintString}`)
    }
    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
