const {Users} = require('../models/Users');

module.exports = (io) => {
  const spamBots = Users.getSpamBots();
  spamBots.forEach(bot => {
    require(bot.pathToExecutableFile)(io, bot.params)
  })
}
