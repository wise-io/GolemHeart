module.exports = (client) => {
  client.flipCoin = async (callString, quantity) => {
    let flipCalls, resultString;
    let flipResults = [];
    let flipWins = 0;
    let flipConWins = 0;
    if (quantity == null) { quantity = 1; }
    if (callString == 'heads' || callString == 'tails') { flipCalls = quantity; } else { flipCalls = 0; }

    let temp = 0;
    while (temp < quantity) {
      const result = (Math.random() < 0.5);
      if (result == 0) { resultString = 'heads'; } else { resultString = 'tails'; }
      if (resultString == callString) { flipWins++; }
      if (flipWins > temp) { flipConWins++; }
      flipResults.push(resultString);
      temp++;
    }

    return { calls: flipCalls, qty: quantity, results: flipResults, wins: flipWins, conwins: flipConWins };
  }
};
