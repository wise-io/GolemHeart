module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log('Ready!');
    client.user.setPresence({ activities: [{ name: `EDH with friends.`, type: 'PLAYING' }], status: 'online' });
  },
};
