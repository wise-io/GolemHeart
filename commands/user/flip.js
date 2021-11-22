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
        .addChoice('Heads', 1)
        .addChoice('Tails', 2)
    ),
  async execute(interaction) {
    const file = new MessageAttachment('./assets/mtg_coin.png');
    const result = (Math.random() < 0.5) + 1;
    var resultString = '';
    if (result == 1) { resultString = 'Heads'; } else { resultString = 'Tails'; }
    var embed = new MessageEmbed()
      .setColor('#FFB005')
      .setTitle(`Let's Flip a Coin!`)
      .setDescription(`${interaction.user} got ${resultString}!\n\n_Hint: Want to flip your own coin? Use the /flip command._`)
      .setThumbnail('attachment://mtg_coin.png')

    const call = interaction.options.getInteger('call');
    if (call) {
      var callString = '';
      if (call == 1) { callString = 'Heads'; } else { callString = 'Tails'; }
      if (call == result) {
        var embed = new MessageEmbed(embed)
          .setDescription(`${interaction.user} called ${callString} and won the flip! Nice call!\n\n_Hint: Want to flip your own coin? Use the /flip command._`)
      } else {
        var embed = new MessageEmbed(embed)
          .setDescription(`${interaction.user} called ${callString} and lost the flip. Better luck next time!\n\n_Hint: Want to flip your own coin? Use the /flip command._`)
      }
    }

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};