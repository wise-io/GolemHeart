module.exports = {
  data: { name: 'brew-lock' },
  async execute(interaction, client) {
    client.archiveBrew(interaction, { lockBrew: true });
  }
}
