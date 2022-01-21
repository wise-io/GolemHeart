---
description: Setup and recommendations for the /brew command.
---

# Setup Brew

## Command Usage

{% hint style="info" %}
**Note:** A user must have _Administrator_ permissions in order to use this command.
{% endhint %}

**Usage:** `/setup brew` `channel` `enabled`\
``The `/setup brew` command is required in order to specify a channel to create brewing under. It can also be used to disable the command entirely.

**Options:**

* **Channel:** Displays a list of the server's channels. The selected channel is where brewing threads will be created.
* **Enabled:** Allows selecting true or false. If false is selected, the `/brew` command will be disabled. If true is selected, or if this option is omitted, the command will be enabled.

## Recommendations

### Brew Channel

It can be helpful to setup a dedicated channel to create your brewing threads. Doing so provides a "Brewing Board" of sorts, which can help users find new brewing threads to join.

{% hint style="info" %}
**Default Inactivity Timeout:** The default thread inactivity timeout can be controlled in the channel settings for your Brew channel.
{% endhint %}

**Recommended Permissions for Brew Channel** (@everyone):

* **View Channel**\
  _Allows users to see the channel._
* **Send Messages in Threads**\
  _Allows users to participate in threads._
* **Add Reactions**\
  _Allows users to react to "thread created" messages._
* **Read Message History**\
  _Allows users to see "thread created" messages before they joined the server._
