const {Users} = require('../models/Users');

module.exports = (socket) => {
  const spamBots = Users.getSpamBots();
  spamBots.forEach(bot => {
    require(bot.pathToExecutableFile)(socket, bot.params)
  })
}
