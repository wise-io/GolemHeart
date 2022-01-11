module.exports = {
  data: { name: 'flip-noCall' },
  async execute(interaction, client) {
    await client.flipUpdate(interaction);
  }
};
