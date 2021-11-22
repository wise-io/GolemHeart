const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls the selected die and returns the result.')
    .addIntegerOption(option =>
      option.setName('die')
        .setDescription('Select a die to roll.')
        .setRequired(false)
        .addChoice('D3', 3)
        .addChoice('D4', 4)
        .addChoice('D6', 6)
        .addChoice('D8', 8)
        .addChoice('D10', 10)
        .addChoice('D12', 12)
        .addChoice('D20', 20))
    .addIntegerOption(option =>
      option.setName('quantity')
        .setDescription('Select the amount of dice to roll (default: one).')
        .setRequired(false)
        .addChoice('Two', 2)
        .addChoice('Three', 3)
        .addChoice('Four', 4)),

  async execute(interaction) {
    const file = new MessageAttachment('./assets/game_die.png');
    var embed = new MessageEmbed()
      .setColor('#e8586d')
      .setTitle("Let's Roll!")
      .setDescription('Select a die to roll. Good luck!')
      .setThumbnail('attachment://game_die.png')
      .setFooter('Want to roll your own dice? Use the /roll command.', 'attachment://game_die.png')

    const sides = interaction.options.getInteger('die');
    if (sides) {
      const quantity = interaction.options.getInteger('quantity')
      if (quantity) {
        const result1 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
        const result2 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
        var totalResult = result1 + result2;
        embed = new MessageEmbed(embed)
          .setDescription(`${interaction.user} rolled a few D${sides} dice. Here are the results!`)
          .addFields(
            { name: 'Roll 1', value: `${result1}`, inline: true },
            { name: 'Roll 2', value: `${result2}`, inline: true },
          )
        if (quantity == 2){
          embed = new MessageEmbed(embed).addFields({name: 'Roll Total', value: `${totalResult}`});
        } else if (quantity == 3) {
          const result3 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
          totalResult = totalResult + result3;
          embed = new MessageEmbed(embed).addFields(
            { name: 'Roll 3', value: `${result3}`, inline: true },
            { name: 'Roll Total', value: `${totalResult}`},
            )
        } else if (quantity == 4) {
          const result3 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
          const result4 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
          totalResult = totalResult + result3 + result4;
          embed = new MessageEmbed(embed)
            .addFields(
              { name: 'Roll 3', value: `${result3}`, inline: true },
              { name: 'Roll 4', value: `${result4}`, inline: true },
              { name: 'Roll Total', value: `${totalResult}` },
            )
        }

      } else {
        var result = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
        if (result == '20') {
          result = 'natural 20! Nice';
        } else if (result <= (sides/2)) {
          result = result + '... Better luck next time';
        }
        embed = new MessageEmbed(embed).setDescription(`${interaction.user} rolled a D${sides} and got a ${result}!`);
      }

      await interaction.reply({ embeds: [embed], files: [file] });

    } else {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('roll-d3')
            .setLabel('D3')
            .setStyle('SECONDARY'),

          new MessageButton()
            .setCustomId('roll-d6')
            .setLabel('D6')
            .setStyle('SECONDARY'),

          new MessageButton()
            .setCustomId('roll-d10')
            .setLabel('D10')
            .setStyle('SECONDARY'),

          new MessageButton()
            .setCustomId('roll-d12')
            .setLabel('D12')
            .setStyle('SECONDARY'),

          new MessageButton()
            .setCustomId('roll-d20')
            .setLabel('D20')
            .setStyle('SECONDARY'),
        )

      await interaction.reply({ embeds: [embed], files: [file], components: [row] });
    }
  },
};