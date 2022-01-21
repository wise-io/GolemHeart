---
description: Usage information for the /roll command.
---

# Roll Dice

## Command Usage

{% hint style="info" %}
**Purpose:** The roll command was designed to... roll dice!
{% endhint %}

**Usage:** `/roll` `dice`\
The roll command allows users to roll virtual dice for magic cards that require it and returns the results. When multiple dice are rolled, a total (sum) of all of the results for that roll will also be returned.&#x20;

**Options:**

To be familiar to users who have used other die rolling Discord bots in the past, such as [Dice Maiden](https://github.com/Humblemonk/DiceMaiden), the roll command uses a single `dice` option.

**Syntax:** `[quantity][die]`

{% tabs %}
{% tab title="Roll - D20" %}
![/roll dice:20](<../.gitbook/assets/Screenshot 2022-01-16 163318.png>)
{% endtab %}

{% tab title="Roll - Five D6" %}
![/roll dice:5d6](<../.gitbook/assets/Screenshot 2022-01-16 163453.png>)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**Note:** If a quantity is not specified, a single die will be rolled.
{% endhint %}

## Flavor Text

When the `/roll` command is used, flavor text from a random magic card that mention rolling a die or dice will be added to the returned embed. For a list of cards that may have their flavor text appear on a roll embed, [click here](https://scryfall.com/search?q=%28oracle%3A%22roll+a%22+OR+oracle%3Adice%29+has%3Aflavor+-name%3A%22troll+ascetic%22\&as=grid\&order=name).
