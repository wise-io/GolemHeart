const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: { type: String }, // Discord User ID

  guilds: [
    {
      guildID: { type: String }, // Discord Guild ID
      brews: { type: Number, default: 0 }, // Count of user's brews
      rolls: { type: Number, default: 0 }, // Count of user's rolls
      flips: { type: Number, default: 0 }, // Count of user's flips
      flipCalls: { type: Number, default: 0 }, // Count of user's called flips
      flipWins: { type: Number, default: 0 }, // Count of user's won flips
    }
  ],

});

module.exports = model("Users", userSchema);
