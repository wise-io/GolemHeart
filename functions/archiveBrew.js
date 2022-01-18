const { Permissions } = require('discord.js');

module.exports = (client) => {
  client.archiveBrew = async (interaction, { lockBrew = false }) => {
    const thread = await client.channels.fetch(interaction.channel.id);
    const threadMessages = await thread.messages.fetch({ after: 1, limit: 1 });
    const message = threadMessages.first();

    const isThreadActive = !thread.archived;
    const isUserBrewer = message.embeds[0].description.includes(interaction.user.id);
    const isUserAdmin = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);

    let actionString = 'archived';

    //Archive thread
    if (isThreadActive && (isUserBrewer || isUserAdmin)) {
      if (lockBrew) {
        if (!thread.locked) { await thread.setLocked(true); }
        actionString = 'locked';
      }

      await interaction.reply(`This thread was ${actionString} by ${interaction.user}.`);
      await thread.setArchived(true);
      return;
    } else {
      await interaction.reply({ content: `Only the user who initiated this brew or an admin can archive/lock this thread.`, ephemeral: true });
    }
  }
};
