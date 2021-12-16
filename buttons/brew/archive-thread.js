module.exports = {
  data: { name: 'archive-thread' },

  async execute(client) {
    client.archiveThread();
  }
}
