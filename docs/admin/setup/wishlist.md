---
description: Setup and recommendations for the /wishlist command.
---

# Setup Wishlist

## Command Usage

{% hint style="info" %}
**Note:** A user must have _Administrator_ permissions in order to use this command.
{% endhint %}

**Usage:** `/setup wishlist` `channel` `enabled`\
``The `/setup wishlist` command is required in order to specify a channel to send wishlist embeds. It can also be used to disable the command entirely.

**Options:**

* **Channel:** Displays a list of the server's channels. The selected channel is where wishlist embeds will be sent.
* **Enabled:** Allows selecting true or false. If false is selected, the `/wishlist` command will be disabled. If true is selected, or if this option is omitted, the command will be enabled.

## Recommendations

### Wishlist Channel

It can be helpful to setup a dedicated channel to send your wishlists. Doing so provides users an easy way to see what cards other members may be needing for their decks.

**Recommended Permissions for Wishlist Channel** (@everyone):

* **View Channel**\
  _Allows users to see the channel._
* **Add Reactions**\
  _Allows users to react to wishlists._
* **Read Message History**\
  _Allows users to see wishlists added before they joined the server._
