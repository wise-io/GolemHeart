const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls the selected die and returns the result.')
    .addIntegerOption(option =>
      option.setName('die')
        .setDescription('Select a die to roll.')
        .setRequired(false)
        .addChoice('D4', 4)
        .addChoice('D6', 6)
        .addChoice('D8', 8)
        .addChoice('D10', 10)
        .addChoice('D12', 12)
        .addChoice('D20', 20)
    ),
  async execute(interaction) {
    const sides = interaction.options.getInteger('die');
    if (sides) {
      var result = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
      if (result == '20') { result = 'natural 20! Nice!'; }
      await interaction.reply({ content: `${interaction.user} rolled a D${sides} and got a ${result}!` });
    } else {
      const row = await new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('roll-d6')
            .setLabel('D6')
            .setStyle('SECONDARY'),

          new MessageButton()
            .setCustomId('roll-d8')
            .setLabel('D8')
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

      const embed = await new MessageEmbed()
        .setColor('#e8586d')
        .setTitle('Roll a Die')
        .setDescription(':game_die: Select a die to roll. Good luck!')

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  },
};

/* Future Enhancements:

- paramaters to roll the specified die (no UI)

*/