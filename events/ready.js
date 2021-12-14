module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log('Ready!');
    client.user.setPresence({ activities: [{ name: `mongoDB tutorials.`, type: 'WATCHING' }], status: 'online' });
  },
};
