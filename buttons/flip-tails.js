module.exports = {
  data: { name: 'flip-tails' },
  async execute(interaction, client) {
    await client.flipUpdate(interaction, 'tails');
  }
};
