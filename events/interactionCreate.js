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
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }

    if (interaction.isButton()) {

      // Roll command buttons
      if (interaction.customId.includes('roll-')) {
        var sides = 0;
        if (interaction.customId.includes('d4')) {
          sides = 4;
        } else if (interaction.customId.includes('d6')) {
          sides = 6;
        } else if (interaction.customId.includes('d8')) {
          sides = 8;
        } else if (interaction.customId.includes('d10')) {
          sides = 10;
        } else if (interaction.customId.includes('d12')) {
          sides = 12;
        } else if (interaction.customId.includes('d20')) {
          sides = 20;
        }
      }
      var result = Math.round(Math.random() * sides) + 1;
      if (result == '20') { result = 'nat 20! Nice!' }
      await interaction.reply({ content: `${interaction.user} rolled a D${sides} and got a ${result}!` })
    }
  },
};