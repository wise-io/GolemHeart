const { Permissions } = require('discord.js');

module.exports = {
  data: { name: 'lock-thread' },

  async execute(interaction, client) {
    try {
      
      //Ensure channel is a thread
      const thread = await client.channels.fetch(interaction.channel.id);
      if(!thread.isThread()) {
        await interaction.editReply({ content: 'There was an error while executing this button! Please report this issue at https://golemheart.io/issues .', ephemeral: true });
        return;
      }

      const threadMessages = await thread.messages.fetch({ after: 1, limit: 1 });
      const message = threadMessages.first();
      const brewer = message.mentions.users.first();
  
      const isThreadActive = !thread.archived;
      const isUserBrewer = interaction.user === brewer;
      const isUserAdmin = interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
      
      //Archive and lock thread
      if (isThreadActive && (isUserBrewer || isUserAdmin)) {
        await interaction.reply(`This thread was locked by ${interaction.user}.`);
        if (!thread.locked) { await thread.setLocked(true); }
        await thread.setArchived(true);
        return;
      } else {
        await interaction.reply({ content: `Only ${brewer} or an admin can lock this thread.`, ephemeral: true });
      }
    } catch(error) {
      console.log(error);
    }
  }
}
