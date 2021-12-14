module.exports = (client) => {
  client.handleButtons = async (buttonFiles, path) => {
    for (const file of buttonFiles) {
      const button = require(`.${path}/${file}`);
      client.buttons.set(button.data.name, button);
    }
  }
};
