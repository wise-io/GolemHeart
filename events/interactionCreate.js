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

    if (interaction.isButton()) {}
  },
};