module.exports = {
  data: { name: 'archive-thread' },
  async execute(interaction, client) {
    client.archiveThread(interaction, {});
  }
}
