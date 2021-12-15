const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls the dice and returns the result.')
    .addStringOption(option =>
      option.setName('dice')
        .setDescription("Enter your dice in the following format: [quantity]d[sides] - Example: 2d20")
        .setRequired(true)
    ),

  async execute(interaction) {

    //Validate user input format
    let dice = interaction.options.getString('dice').toLowerCase();
    let regex = /^[0-9]+/;
    if (!regex.test(dice)) { dice = '1' + dice; }
    regex = /^[0-9]+d[0-9]+$/i;
    if (!regex.test(dice)) {
      await interaction.reply({ content: "Please try again using the following format for your roll: `[quantity]d[sides]`.\nExample: `/roll dice: 2d20`", ephemeral: true });
      return;
    }

    //Validate quantity
    const quantity = dice.substring(0, dice.indexOf('d'));
    if (!(quantity > 0 && quantity <= 50)) {
      await interaction.reply({ content: 'Please keep the dice pool between 1-50.', ephemeral: true });
      return;
    }

    //Validate sides
    const sides = dice.substring(dice.indexOf('d') + 1);
    if (!(sides > 1 && sides <= 100)) {
      await interaction.reply({ content: 'Please keep the die size between D2-D100.', ephemeral: true });
      return;
    }

    //Create embed
    let hintString = `\n\n_Hint: Want to roll your own dice? Use the /roll command._`;
    const file = new MessageAttachment('./assets/game_die.png');
    let embed = new MessageEmbed()
      .setColor('#e8586d')
      .setTitle("Let's Roll!")
      .setThumbnail('attachment://game_die.png')

    let results = [];
    let temp = 0;

    if (quantity == 1) {
      //Calculate result
      results.push(Math.floor(Math.random() * (Math.floor(sides) - 1) + 1));

      //Set resultString
      let resultString = results[0];
      if (results[0] == '20') {
        resultString = 'natural 20! Nice';
      } else if (results[0] <= (sides / 2) && sides > 3) {
        resultString = resultString + '. Better luck next time';
      }

      //Modify embed
      embed = new MessageEmbed(embed)
        .setDescription(`${interaction.user} rolled a D${sides} and got a ${resultString}!${hintString}`);

      //Send reply
      await interaction.reply({ embeds: [embed], files: [file] });

    } else {
      // Calculate results
      while (temp < quantity) {
        results.push(Math.floor(Math.random() * (Math.floor(sides) - 1) + 1));
        temp++;
      }

      //Create strings for embed
      let resultString = '';
      let quantityString = '';

      //Create result buttons
      let row = new MessageActionRow();
      if (quantity <= 4) {

        if (quantity == 2) {
          quantityString = 'a couple';
        } else {
          quantityString = 'a few';
        }

        let temp2 = 0;
        while (temp2 < quantity) {
          row = new MessageActionRow(row)
            .addComponents(
              new MessageButton()
                .setCustomId(`result${temp2}`)
                .setLabel(`${results[temp2]}`)
                .setStyle('SECONDARY')
                .setDisabled(true),
            )
          temp2++;
        }
      } else {
        quantityString = 'several';
        resultString = "\n```" + results.join(", ") + "```";
        hintString = hintString.substring(1);
      }

      //Create total result button
      const total = results.reduce((a, b) => a + b, 0);
      row = new MessageActionRow(row)
        .addComponents(
          new MessageButton()
            .setCustomId(`total`)
            .setLabel(`Total - ${total}`)
            .setStyle('PRIMARY')
            .setEmoji('🎲')
            .setDisabled(true),
        )

      //Modify embed
      embed = new MessageEmbed(embed)
        .setDescription(`${interaction.user} rolled ${quantityString} D${sides} dice. Here are the results!${resultString}${hintString}`)

      //Send reply
      await interaction.reply({ embeds: [embed], files: [file], components: [row] });
    }
  },
};
