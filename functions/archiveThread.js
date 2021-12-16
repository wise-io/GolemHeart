const { Permissions } = require('discord.js');

module.exports = (client) => {
  client.archiveThread = async (interaction, { lockThread = false }) => {
    const thread = await client.channels.fetch(interaction.channel.id);
    const threadMessages = await thread.messages.fetch({ after: 1, limit: 1 });
    const message = threadMessages.first();
    const brewer = message.mentions.users.first();

    const isThreadActive = !thread.archived;
    const isUserBrewer = interaction.member === brewer;
    const isUserAdmin = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);

    let actionString = 'archived';

    //Archive thread
    if (isThreadActive && (isUserBrewer || isUserAdmin)) {
      if (lockThread) {
        if (!thread.locked) { await thread.setLocked(true); }
        actionString = 'locked';
      }

      await interaction.reply(`This thread was ${actionString} by ${interaction.user}.`);
      await thread.setArchived(true);
      return;
    } else {
      await interaction.reply({ content: `Only ${brewer} or an admin can archive/lock this thread.`, ephemeral: true });
    }
  }
};
