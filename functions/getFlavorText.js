module.exports = (client) => {
  client.getFlavorText = async (type) => {

    let flavorText;

    const flipFlavorText = [

      `“I believe the spell to have a 50% failure rate. I must be careful, lest I lose my sanity to the unbending force of pure, untempered time.”
      —Journal of Sigbar the Cautious`,

      `“According to the strange journal I found, the spell succeeds half the time. Why, if I cast it twice, that’s a guaranteed success!”
      —Rantings of Sigbar the Wild`,

      `Quyzl was told by his mentor to “make more time” for his studies.
      —Stitch in Time`,

      `“No refunds. I cheated you fair and square.”
      —Tavern Scoundrel`,

      `“What was heads again?”
      —Mercadian magistrate`,

      `“Double or nothing.”
      —Krark, the Thumbless`,

      `“I can think of one goblin it ain’t so lucky for.”
      —Slobad, goblin tinkerer`,

      `The best traprunners know exactly where to step. The others... do their best.
      —Goblin Traprunner`,

      `Always easily impressed, Durg was about to be blown away.
      —Goblin Archaeologist`,

      `A stroke of luck can smite an army.
      —Fighting Chance`,

      `“What are the odds, indeed?”
      —Yusri, to Desera`,

      `“Fuses? We have more than enough! Now... which one was it?”
      —Flearan One-Eye, goblin engineer`,

      `Flame chooses its own course.
      —Fickle Efreet`,

      `The more victims he kills, the more likely he is to get the right one.
      —Goblin Assassin`,

      `“The longer it’s caged, the madder it gets.”
      —Firecat handler`,

      `“What are we celebratin’ again?”
      —Goblin Festival`,

      `The destruction he causes is nothing next to the chaos in his mind.
      —Goblin Psycopath`,

      `As a child, Slobad fashioned a music box out of the wayward digit. Its simple tune was his sole companion on many lonely nights.
      —Krark's Thumb`,

      `The thumb is said to bring its owner good luck up until the end of their life. The duration has yet to be specified.
      —Krark's Thumb`,

      `“Entertain me.”
      —Rakdos, the Showstopper`,

      `He watches the pass in both directions, and all must pay his toll.
      —Two-Headed Giant`,

      `Rakdos cultists are her best customers. They never flinch at pain and are seldom good at math.
      —Tavern Swindler`,

      `There’s a chance to win every battle.
      —Orcish Captain`,

    ];

    if (type === 'flip'){
      flavorText = '\n>>> _' + flipFlavorText[Math.floor(Math.random() * flipFlavorText.length)] + '_';
    } else {
      flavorText = '\n>>> _' + `The heart of a golem gives life to more than just the iron husk around it.\n—Golem's Heart` + '_';
    }

    return flavorText;
  }
};
