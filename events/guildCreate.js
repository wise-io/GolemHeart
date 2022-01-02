const guildProfile = require('../schemas/guildSchema.js');

module.exports = {
  name: 'guildCreate',
  async execute(guild) {
    const guildDBObject = { '_id': guild.id };
    await guildProfile.updateOne(guildDBObject, guildDBObject, { upsert: true });
    console.log(`Guild profile setup in database for guild ID: ${guild.id}`);
  },
};
