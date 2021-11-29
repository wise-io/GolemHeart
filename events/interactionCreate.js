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
      const button = client.buttons.get(interaction.customId);
      if (!button) return await interaction.reply({ content: `There was no button code found for this button.` });
      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this button!\nPlease report this issue at https://golemheart.io/issues .', ephemeral: true });
      }
    }
  },
};