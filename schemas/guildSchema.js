const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
  // General Information
  _id: { type: String }, // Guild ID
  joinedAt: { type: Number, default: Date.now() }, // Date bot joined guild

  // Settings
  brew: {
    channelID: { type: String }, // Channel ID to create brew threads
    enabled: { type: Boolean, default: false}, // Enables / disables brew command
  },

  wishlist: {
    channelID: { type: String }, // Channel ID to send wishlist embeds
    enabled: { type: Boolean, default: false}, // Enables / disables wishlist command
  },

});

module.exports = model("Guilds", guildSchema);
