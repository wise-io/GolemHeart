module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    //console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!\nPlease report this issue at https://golemheart.io/issues .', ephemeral: true });
      }
    }

    if (interaction.isButton()) {

      // Roll command buttons
      if (interaction.customId.includes('roll-')) {
        if (interaction.customId.includes('d3')) {
          var sides = 3;
        } else if (interaction.customId.includes('d6')) {
          var sides = 6;
        } else if (interaction.customId.includes('d10')) {
          var sides = 10;
        } else if (interaction.customId.includes('d12')) {
          var sides = 12;
        } else if (interaction.customId.includes('d20')) {
          var sides = 20;
        }
        var result = Math.floor(Math.random() * (Math.floor(sides) - 1) + 1);
        if (result == '20') {
          result = 'natural 20! Nice';
        } else if (result <= (sides / 2) && sides > 3) {
          result = result + '... Better luck next time';
        }
        await interaction.reply({ content: `${interaction.user} rolled a D${sides} and got a ${result}!` })
      }

    }
  },
};