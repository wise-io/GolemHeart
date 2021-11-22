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
        .addChoice('D20', 20)
    )
    .addIntegerOption(option =>
      option.setName('quantity')
        .setDescription('Select the amount of dice to roll (default: one).')
        .setRequired(false)
        .addChoice('Two', 2)
        .addChoice('Three', 3)
        .addChoice('Four', 4)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger('die');
    const quantity = interaction.options.getInteger('quantity');

    const file = new MessageAttachment('./assets/game_die.png');
    var row = new MessageActionRow();
    var embed = new MessageEmbed()
      .setColor('#e8586d')
      .setTitle("Let's Roll!")
      .setDescription('Select a die to roll. Good luck!\n\n_Hint: Anyone can click on a button below to roll a die._')
      .setThumbnail('attachment://game_die.png')

    if (sides) {

      var result1 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);

      if (quantity) {
        var result2 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
        var result3 = 0;
        var result4 = 0;
        var quantityString = 'few';
        if (quantity == 2) { quantityString = 'couple'; }

        embed = new MessageEmbed(embed)
          .setDescription(`${interaction.user} rolled a ${quantityString} D${sides} dice. Here are the results!\n\n_Hint: Want to roll your own dice? Use the /roll command._`)

        row = new MessageActionRow(row)
          .addComponents(
            new MessageButton()
              .setCustomId('result1')
              .setLabel(`1st Roll - ${result1}`)
              .setStyle('SECONDARY')
              .setDisabled(true),

            new MessageButton()
              .setCustomId('result2')
              .setLabel(`2nd Roll - ${result2}`)
              .setStyle('SECONDARY')
              .setDisabled(true),
          )
        if (quantity == 3) {
          result3 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
          row = new MessageActionRow(row)
            .addComponents(
              new MessageButton()
                .setCustomId('result3')
                .setLabel(`3rd Roll - ${result3}`)
                .setStyle('SECONDARY')
                .setDisabled(true),
            )

        } else if (quantity == 4) {
          result3 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
          result4 = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);

          row = new MessageActionRow(row)
            .addComponents(
              new MessageButton()
                .setCustomId('result3')
                .setLabel(`3rd Roll - ${result3}`)
                .setStyle('SECONDARY')
                .setDisabled(true),

              new MessageButton()
                .setCustomId('result4')
                .setLabel(`4th Roll - ${result4}`)
                .setStyle('SECONDARY')
                .setDisabled(true),
            )
        }

        const totalResult = result1 + result2 + result3 + result4;
        row = new MessageActionRow(row)
          .addComponents(
            new MessageButton()
              .setCustomId(`totalResult`)
              .setLabel(`Total - ${totalResult}`)
              .setStyle('PRIMARY')
              .setEmoji('🎲')
              .setDisabled(true),
          )

      } else {
        if (result1 == '20') {
          result1 = 'natural 20! Nice';
        } else if (result1 <= (sides / 2) && sides > 3) {
          result1 = result1 + '... Better luck next time';
        }
        embed = new MessageEmbed(embed).setDescription(`${interaction.user} rolled a D${sides} and got a ${result1}!\n\n_Hint: Want to roll your own dice? Use the /roll command._`);
      }

    } else {
      var row = new MessageActionRow()
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
    }

    if (!quantity) {
      await interaction.reply({ embeds: [embed], files: [file] });
    } else {
      await interaction.reply({ embeds: [embed], files: [file], components: [row] });
    }
  },
};