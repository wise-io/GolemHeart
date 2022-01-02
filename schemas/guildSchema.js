const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
  //General Information
  _id: { type: String }, //Guild ID
  joinedAt: { type: Number, default: Date.now() }, //Date bot joined guild

  //Guild Settings
  brewChannelID: { type: String }, //Channel ID to create brew threads
  wishlistChannelID: { type: String }, //Channel ID to send wishlist embeds
});

module.exports = model("Guilds", guildSchema);
