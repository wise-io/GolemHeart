---
description: Usage information for the /flip command.
---

# Flip Coins

## Command Usage

{% hint style="info" %}
**Purpose:** The flip command was designed to... flip coins!
{% endhint %}

**Usage:** `/flip` `call` `quantity`\
``The flip command allows users to flip virtual coins for magic cards that require it. If used without the below options, it simply returns `heads` or `tails` at random.

**Options:**

* **Call (optional):** Allows a user to call a flip (heads or tails)\
  _Useful for cards that specify winning a flip, such as_ [_Chance Encounter_](https://scryfall.com/card/mh2/277/chance-encounter)_._
* **Quantity (optional):** Allows a user to specify how many coins to flip (1-10)\
  _Useful for cards like_ [_Goblin Traprunner_](https://scryfall.com/card/mh2/130/goblin-traprunner)_._

{% tabs %}
{% tab title="Flip - No Call" %}
![/flip](<../.gitbook/assets/Screenshot 2022-01-16 164659.png>)
{% endtab %}

{% tab title="Flip - Call" %}
![/flip call:heads](<../.gitbook/assets/Screenshot 2022-01-16 164800.png>)
{% endtab %}

{% tab title="Multi-Flip" %}
![/flip call:tails quantity:3](<../.gitbook/assets/Screenshot 2022-01-16 164856.png>)
{% endtab %}
{% endtabs %}

## Flavor Text

When the `/flip` command is used, flavor text from a random magic card that mention coin flipping will be added to the returned embed. For a list of cards that may have their flavor text appear on a flip embed, [click here](https://scryfall.com/search?q=%28o%3A%22flip+a+coin%22+OR+o%3A%22coin+flip%22+OR+o%3A%22flips+a+coin%22+OR+o%3A%22coins%22%29+has%3Aflavor\&as=grid\&order=name).

## User Stats

When the `/flip` command is used, GolemHeart keeps track of various user stats on a per-server basis.

* **Flips -** The number of coins a user has flipped
* **Flip Calls -** The number of times a user has called a flip
* **Wins -** The number of called flips a user has won

These stats are displayed in the footer of a flip embed in one of two ways:

1. For uncalled flips, the footer will display the total number of coins a user has flipped.
2. For called flips, the footer will display the win percentage of a user's called flips.
