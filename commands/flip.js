const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userProfile = require('../schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flips coins and returns the results (see https://docs.golemheart.io/commands/flip)')
    .addStringOption(option =>
      option.setName('call')
        .setDescription('Call the flip.')
        .setRequired(false)
        .addChoices(
          { name: 'heads', value: 'heads' },
          { name: 'tails', value: 'tails' },
        )
    )
    .addIntegerOption(option =>
      option.setName('quantity')
        .setDescription('Number of coins to flip.')
        .setRequired(false)
        .addChoices(
          { name: '1', value: 1 },
          { name: '2', value: 2 },
          { name: '3', value: 3 },
          { name: '4', value: 4 },
          { name: '5', value: 5 },
          { name: '6', value: 6 },
          { name: '7', value: 7 },
          { name: '8', value: 8 },
          { name: '9', value: 9 },
          { name: '10', value: 10 },
        )
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
    let embed, color, title, description, userDesignation, footer;
    if (interaction.member.nickname) { userDesignation = interaction.member.nickname; } else { userDesignation = interaction.user.username; }
    const flavorText = await client.getFlavorText('flip');
    const url = 'https://docs.golemheart.io/commands/flip';
    const thumbnail = 'https://raw.githubusercontent.com/wise-io/GolemHeart/main/assets/gh-coin.png';

    if (call == null) {
      color = '#f3d758'; //Gold
      title = `${userDesignation} Flipped ${qtyString}`
      description = "```Results: " + results + "```\n" + flavorText;
      footer = `${userDesignation} has flipped ${stats.flips} coins.`;
    } else {
      if (flip.calls == flip.wins) { color = '#3ba55b'; } else { color = '#ec4245'; }
      title = `${userDesignation} Called ${call[0].toUpperCase() + call.slice(1)}`;
      footer = `${userDesignation} has won ${winPct}% of their calls.`;
      if (flip.qty == '1') {
        description = "```Wins: " + flip.wins + "\nResults: " + results + "```\n" + flavorText;
      } else {
        description = "```Wins (Consecutive): " + `${flip.wins} (${flip.conwins})` + "\nResults: " + results + "```\n" + flavorText;
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
