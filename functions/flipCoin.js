module.exports = (client) => {
  client.flipCoin = async (callString) => {
    let flipResult, flipCalled, flipWin;
    const result = (Math.random() < 0.5);
    if (result == 0) { flipResult = 'heads'; } else { flipResult = 'tails'; }
    if (callString == 'heads' || callString == 'tails') { flipCalled = 1; } else { flipCalled = 0; }
    if (flipResult == callString) { flipWin = 1; } else { flipWin = 0; }
    return { result: flipResult, called: flipCalled, win: flipWin };
  }
};
