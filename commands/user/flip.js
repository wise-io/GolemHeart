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
    var resultString = '';
    if (result == 0) { resultString = 'heads'; } else { resultString = 'tails'; }
    var embed = new MessageEmbed()
      .setColor('#FFB005')
      .setTitle(`Let's Flip a Coin!`)
      .setDescription(`${interaction.user} got **${resultString}**!${hintString}`)
      .setThumbnail('attachment://mtg_coin.png')

    const call = interaction.options.getInteger('call');
    var consecWins = 0;
    if (call !== null) {
      var callString = '';
      var pluralString = '';
      if (call == 0) { callString = 'heads'; } else { callString = 'tails'; }
      if (call == result) {
        consecWins = consecWins + 1;
        if (consecWins > 1) { pluarlString = 's' };
        var embed = new MessageEmbed(embed)
          .setDescription(`${interaction.user} called **${callString}** and won the flip! They have won ${consecWins} consecutive flip${pluralString}.${hintString}`)
      } else {
        if (consecWins == 0) {
          var embed = new MessageEmbed(embed)
            .setDescription(`${interaction.user} called **${callString}** and lost the flip. Better luck next time!${hintString}`)
        } else {
          var embed = new MessageEmbed(embed)
            .setDescription(`${interaction.user} called **${callString}** and lost the flip. They ended thier streak with ${consecWins} win${pluralString}.${hintString}`)
        }
      }
    }

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
