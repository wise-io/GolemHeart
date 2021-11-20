const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls the selected die and returns the result.'),
  async execute(interaction) {
    const row = new MessageActionRow()
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

    const embed = new MessageEmbed()
      .setColor('#e8586d')
      .setTitle('Roll a Die')
      .setDescription(':game_die: Select a die to roll. Good luck!')

    await interaction.reply({ embeds: [embed], components: [row] })

  },
};

/* Future Enhancements:

- paramaters to roll the specified die (no UI)

*/