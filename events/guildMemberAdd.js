const userProfile = require('../schemas/userSchema.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    
    // Add user profile to database
    const userDBObject = { '_id': member.id };
    const guildDBObject = { 'guildID': member.guild.id };
    await userProfile.updateOne(userDBObject, { $push: { guilds: guildDBObject } }, { upsert: true });
  },
};
