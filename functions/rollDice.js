module.exports = (client) => {
  client.rollDice = async (input) => {

    let regex;
    let rollResults = [];

    // Validate user input
    regex = /^[0-9]+/;
    if (!regex.test(input)) { input = '1' + input; }
    regex = /^[0-9]+d[0-9]+$/i;
    if (!regex.test(input)) {
      await interaction.reply({ content: "Please try again using the following format for your roll: `/roll dice: 2d20`", ephemeral: true });
      return;
    }

    // Validate quantity
    const quantity = input.substring(0, input.indexOf('d'));
    if (!(quantity > 0 && quantity <= 50)) {
      await interaction.reply({ content: 'Please keep the dice pool between 1-50.', ephemeral: true });
      return;
    }

    // Validate sides
    const sides = input.substring(input.indexOf('d') + 1);
    if (!(sides > 1 && sides <= 100)) {
      await interaction.reply({ content: 'Please keep the die size between D2-D100.', ephemeral: true });
      return;
    }

    // Calculate results
    let temp = 0;
    while (temp < quantity) {
      rollResults.push(Math.floor(Math.random() * (Math.floor(sides) - 1) + 1));
      temp++;
    }

    // Calculate total
    const rollTotal = rollResults.reduce((a, b) => a + b, 0);

    // Return roll
    return { dice: `D${sides}`, qty: quantity, results: rollResults, total: rollTotal };
  }
};
