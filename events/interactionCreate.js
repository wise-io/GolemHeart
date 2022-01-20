const userProfile = require('../schemas/userSchema.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    // Create user profile in database if necessary.
    const guildDBObject = { guildID: interaction.guild.id };
    const userDBObject = { '_id': interaction.user.id, 'guilds.guildID': { $ne: guildDBObject.guildID } };
    try {
      await userProfile.updateOne(userDBObject, { $push: { guilds: guildDBObject } });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error accesing the database. Please report this issue at <https://golemheart.io/issues>.', ephemeral: true });
    }

    // Execute commands
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command! Please report this issue at <https://golemheart.io/issues>.', ephemeral: true });
      }

      // Execute buttons
    } else if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return await interaction.reply({ content: `There was no code found for this button.`, ephemeral: true });
      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this button! Please report this issue at <https://golemheart.io/issues>.', ephemeral: true });
      }
    }
  },
};
