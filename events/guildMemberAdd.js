const userProfile = require('../schemas/userSchema.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const userDBObject = { '_id': member.id };
    const guildDBObject = { 'guildID': member.guild.id };
    await userProfile.updateOne(userDBObject, { $push: { guilds: guildDBObject } }, { upsert: true });
  },
};
