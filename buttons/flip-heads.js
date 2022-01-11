module.exports = {
  data: { name: 'flip-heads' },
  async execute(interaction, client) {
    await client.flipUpdate(interaction, 'heads');
  }
};
