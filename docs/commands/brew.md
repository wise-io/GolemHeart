---
description: Usage information for the /brew command.
---

# Brew Lists

## Command

{% hint style="info" %}
**Purpose:** The brew command was designed to encourage server members to brew new or improve existing decks / cubes / lists together.
{% endhint %}

**Usage:** `/brew` `title` `strategy` `goals` `decklist`\
The brew command allows users to create discussion threads focused around a particular deck / list they are currently working on. Users can invite their friends to join their brewing threads by @mentioning them.

**Options:**

* **Title:** The title of the brew
* **Strategy:** The strategy of the deck
* **Goals:** What the user wishes to accomplish with the brewing session
* **Decklist:** A link to the decklist for the brew

{% hint style="info" %}
**Note:** To prevent abuse, the `decklist` parameter only allows URLs from certain sites. For a list of supported sites, or to request support for an additional site, [**click here**.](https://github.com/wise-io/GolemHeart/issues/25)
{% endhint %}

{% tabs %}
{% tab title="Example 1" %}
An example of brew will go here, with an image of the embed that would be generated.
{% endtab %}

{% tab title="Example 2" %}
An example of brew will go here, with an image of the embed that would be generated.
{% endtab %}
{% endtabs %}

**Optional:** `private`\
When used, this parameter will make a private thread. Private threads are only visible by server admins and users that have been invited to the thread.&#x20;

{% hint style="warning" %}
**Note:** Private threads are only available for Discord servers that have been boosted to Level 2 or higher. If the `private` optional parameter is used on a server below this level, a public thread will be created instead.
{% endhint %}

## Threads

**From** [**Discord FAQ**](https://support.discord.com/hc/en-us/articles/4403205878423-Threads-FAQ#h\_01FDGC4JW2D665Y230KPKWQZPN)**:**

> _Threads allow multiple topics in a channel to exist and grow with their own dedicated space temporarily without having to commit to a new channel for the server. They make it easier to follow along with an unexpected topic that gains popularity and eliminates confusion when multiple, big topics are happening within a single channel._

Using threads for brews has several benefits:

* **Designated Space for Brewing:** Threads give users a designated space to work on their decks. All messages in a thread will be related to the deck or list they are working on, instead of needing to hunt for messages related to their brew in general chat.
* **Reduced Channel Clutter:** Users only see threads that they are members of on their Discord sidebar. Inactive threads are automatically archived after a set period of inactivity.
* **Reduced Notification Fatigue:** Users only receive Discord notifications for threads if they are a member of the thread. This allows users to leave notifications on for their threads so they know when they receive a message related to a deck / list they are working on or helping another user with.

{% hint style="info" %}
**More Info:** To learn more about Discord threads, read the [**FAQ**](https://support.discord.com/hc/en-us/articles/4403205878423-Threads-FAQ#h\_01FDGC4JW2D665Y230KPKWQZPN).
{% endhint %}

## Setup

During setup, it is recommended to create a designated channel to create brewing threads under. By doing this, your brew channel will serve as a "brewing board" that lists all of the brewing threads created by GolemHeart. This helps to increase visibility for your users' brews. \
\
For more information on setting up the `/brew` command, please read the documentation on the `/setup` command, linked below.

{% content-ref url="../admin/setup/brew.md" %}
[brew.md](../admin/setup/brew.md)
{% endcontent-ref %}
