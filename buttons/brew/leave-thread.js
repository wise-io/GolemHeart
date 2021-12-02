module.exports = {
  data: {
    name: `leave-thread`
  },
  async execute(interaction, client) {
    const thread = await client.channels.fetch(interaction.channel.id);
    await thread.members.remove(interaction.user.id);
    await interaction.reply({ content: 'You have left the thread and will no longer receive notifications.', ephemeral: true });
  }
}