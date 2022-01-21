---
description: Usage information for the /wishlist command.
---

# Share Wishlists

## Command Usage

{% hint style="info" %}
**Purpose:** The wishlist command was designed to encourage server members to share their card wish lists for the purposes of gifting or trading with other members.\
\
_For servers with no selling or trading rules, there is an option to_ [_disable this command_](../admin/setup/wishlist.md)_._
{% endhint %}

**Usage:** `/wishlist` `link`\
The wishlist command allows users to share their card wish lists to a designated wishlist channel.

**Options:**

The wishlist command has a single `link` parameter. This should be a valid link to a decklist on a supported deck building website.

{% hint style="info" %}
**Note:** To prevent abuse, the `link` parameter only allows URLs from certain sites. For a list of supported sites, or to request support for an additional site, [**click here**.](https://github.com/wise-io/GolemHeart/issues/25)
{% endhint %}

## Setup

This command is disabled by default because it requires additional setup.\
\
For more information on setting up the `/wishlist` command, please read the documentation on the `/setup` command, linked below.

{% content-ref url="../admin/setup/wishlist.md" %}
[wishlist.md](../admin/setup/wishlist.md)
{% endcontent-ref %}
