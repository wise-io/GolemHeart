module.exports = (client) => {

  client.isURLAllowed = (link) => {
    const allowedDomains = client.urlAllowlist;
    return allowedDomains.some(allowedDomain => link.toLowerCase().startsWith(allowedDomain.toLowerCase()));
  }

  client.urlAllowlist = [
    'https://aetherhub.com/',
    'https://archidekt.com/',
    'https://cubecobra.com/',
    'https://deckbox.org/',
    'https://deckstats.net/',
    'https://manabox.app/',
    'https://manastack.com/',
    'https://www.moxfield.com/',
    'https://mtgarena.pro/',
    'https://mtgdecks.net/',
    'https://www.mtggoldfish.com/',
    'https://scryfall.com/',
  ];
};
