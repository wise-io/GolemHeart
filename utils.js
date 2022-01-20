const { DMChannel, GuildChannel, NewsChannel, TextChannel, Permissions } = require('discord.js');

class ClientUtils {
  static async findNotifyChannel(guild) {

    // Prefer the system channel
    let systemChannel = await guild.channels.fetch(guild.systemChannelId);
    if (systemChannel && PermissionUtils.canSend(systemChannel, true)) { return systemChannel; }

    // Otherwise look for a text/news channel
    return (await guild.channels.fetch()).find(
      channel =>
        (channel instanceof TextChannel || channel instanceof NewsChannel) &&
        PermissionUtils.canSend(channel, true)
    );
  }
}

class PermissionUtils {
  static canSend(channel, embedLinks = false) {

    if (channel instanceof DMChannel) {
      return true;

    } else if (channel instanceof GuildChannel) {
      let channelPerms = channel.permissionsFor(channel.client.user);
      return channelPerms.has([
        Permissions.FLAGS.VIEW_CHANNEL, // Needed to view the channel
        Permissions.FLAGS.SEND_MESSAGES, // Needed to send messages
        ...embedLinks ? [Permissions.FLAGS.EMBED_LINKS] : [], // Needed to send embedded links
      ]);

    } else {
      return false;
    }
  }
}

module.exports = { ClientUtils, PermissionUtils };
