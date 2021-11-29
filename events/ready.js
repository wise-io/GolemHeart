module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log('Ready!')
    client.user.setPresence({ activities: [{ name: `discord.js tutorials.`, type: 'WATCHING' }], status: 'online' });
  },
};