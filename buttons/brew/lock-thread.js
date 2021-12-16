module.exports = {
  data: { name: 'lock-thread' },
  async execute(interaction, client) {
    client.archiveThread(interaction, { lockThread : true });
  }
}
