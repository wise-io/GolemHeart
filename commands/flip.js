const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userProfile = require('../schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips a coin and returns the result.')
    .addStringOption(option =>
      option.setName('call')
        .setDescription('Call the flip.')
        .setRequired(false)
        .addChoice('heads', 'heads')
        .addChoice('tails', 'tails')
    )
    .addIntegerOption(option =>
      option.setName('quantity')
        .setDescription('Number of coins to flip.')
        .setRequired(false)
        .addChoice('1', 1)
        .addChoice('2', 2)
        .addChoice('3', 3)
        .addChoice('4', 4)
        .addChoice('5', 5)
        .addChoice('6', 6)
        .addChoice('7', 7)
        .addChoice('8', 8)
        .addChoice('9', 9)
        .addChoice('10', 10)
    ),

  async execute(interaction, client) {
    // Flip variables
    let qtyString;
    const qty = interaction.options.getInteger('quantity');
    const call = interaction.options.getString('call');
    const flip = await client.flipCoin(call, qty);
    if (flip.qty == '1') { qtyString = 'a Coin' } else { qtyString = "Some Coins" }
    const results = flip.results.join(", ");

    // Database variables
    const filter = { _id: interaction.user.id, 'guilds.guildID': interaction.guild.id };
    const update = { $inc: { 'guilds.$.flips': flip.qty, 'guilds.$.flipCalls': flip.calls, 'guilds.$.flipWins': flip.wins } };
    const user = await userProfile.findOneAndUpdate(filter, update, { new: true });
    const stats = user.guilds.find(x => x.guildID === interaction.guild.id);
    const winPct = ((stats.flipWins / stats.flipCalls) * 100).toFixed(0);

    // Embed variables 
    let embed, color, title, description, footer;
    const flavorText = await client.getFlavorText('flip');
    const url = 'https://github.com/wise-io/GolemHeart/wiki/Commands#flip';
    const thumbnail = 'https://raw.githubusercontent.com/wise-io/GolemHeart/main/assets/gh-coin.png';

    if (call == null) {
      color = '#f3d758'; //Gold
      title = `${interaction.user.username} Flipped ${qtyString}`
      description = "```Results: " + `${results}` + "```\n" + `${flavorText}`;
      footer = `${interaction.user.username} has flipped ${stats.flips} coins.`;
    } else {
      if (flip.calls == flip.wins) { color = '#3ba55b'; } else { color = '#ec4245'; }
      title = `${interaction.user.username} Called ${call[0].toUpperCase() + call.slice(1)}`;
      footer = `${interaction.user.username} has won ${winPct}% of their calls.`;
      if (flip.qty == '1') {
        description = "```Wins: " + `${flip.wins}` + "\nResults: " + `${results}` + "```\n" + `${flavorText}`;
      } else {
        description = "```Wins (Consecutive): " + `${flip.wins} (${flip.conwins})` + "\nResults: " + `${results}` + "```\n" + `${flavorText}`;
      }
    }

    // Create embed
    embed = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setURL(url)
      .setDescription(description)
      .setThumbnail(thumbnail)
      .setFooter({ text: footer, iconURL: interaction.user.displayAvatarURL() });

    // Send reply
    await interaction.reply({ embeds: [embed] });
  },
};
