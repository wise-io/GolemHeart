module.exports = {
  data: { name: 'lock-thread' },

  async execute(client) {
    client.archiveThread({ lockThread: true });
  }
}
