module.exports = {
  data: { name: 'brew-archive' },
  async execute(interaction, client) {
    client.archiveBrew(interaction, {});
  }
};
