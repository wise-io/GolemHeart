const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userProfile = require('../schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls dice and returns the results (see https://docs.golemheart.io/commands/roll)')
    .addStringOption(option =>
      option.setName('dice')
        .setDescription("Example: 2d20")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    // Roll variables
    const input = interaction.options.getString('dice').toLowerCase();
    const roll = await client.rollDice(input);

    // Database variables
    const filter = { _id: interaction.user.id, 'guilds.guildID': interaction.guild.id };
    const update = { $inc: { 'guilds.$.rolls': roll.qty } };
    const user = await userProfile.findOneAndUpdate(filter, update, { new: true });
    const stats = user.guilds.find(x => x.guildID === interaction.guild.id);

    // Embed variables
    let title, description, userDesignation;
    if (interaction.member.nickname) { userDesignation = interaction.member.nickname; } else { userDesignation = interaction.user.username; }
    const flavorText = await client.getFlavorText('roll');
    const color = '#01aff4'; // GolemHeart Blue
    const url = 'https://docs.golemheart.io/commands/roll';
    const thumbnail = 'https://raw.githubusercontent.com/wise-io/GolemHeart/main/assets/gh-die.png';
    const footer = `${interaction.user.username} has rolled ${stats.rolls} dice.`;

    if (roll.qty == 1) {
      title = `${userDesignation} Rolled a ${roll.dice}`;
      description = "```Results: " + roll.results.join(", ") + "```\n" + flavorText;
    } else {
      title = `${userDesignation} Rolled ${roll.qty} ${roll.dice}`;
      description = "```Total: " + roll.total + "\nResults: " + roll.results.join(", ") + "```\n" + flavorText;
    }

    // Create embed
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setURL(url)
      .setDescription(description)
      .setThumbnail(thumbnail)
      .setFooter({ text: footer, iconURL: interaction.user.displayAvatarURL() });

    // Send reply
    await interaction.reply({ embeds: [embed] });
  }
};
