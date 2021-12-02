module.exports = {
  data: {
    name: `archive-thread`
  },
  async execute(interaction, client) {
    const thread = await client.channels.fetch(interaction.channel.id);
    const threadMessages = await thread.messages.fetch({ after: 1, limit: 1 });
    const message = threadMessages.first();
    const brewer = message.mentions.users.first();

    if (!thread.archived && interaction.user === brewer) {
      await interaction.reply(`This thread was archived by ${interaction.user}.`);
      await thread.setArchived(true);
      return;
    } else {
      await interaction.reply({ content: `Only ${brewer} or an admin can archive this thread.`, ephemeral: true });
    }
  }
}