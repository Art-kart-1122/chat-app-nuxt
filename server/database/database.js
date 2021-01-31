const path = require('path');

const DB = {
  users: [
    {id: '1', username: 'Echo bot', img: '/echo.png', status: 'online', isBot: true, path: './bots/echoBot.js'},
    {id: '2', username: 'Reverse bot', img: '/reverse.png', status: 'online', isBot: true, path: './bots/reverseBot.js'},
    {id: '3', username: 'Spam bot', img: '/spam.png', status: 'online', isBot: true,
      path: './bots/spamBot/receivedMessageHandler.js', isSpamBot: true, pathToExecutableFile: '../bots/spamBot/aliveDemon.js', params: '3'},
    {id: '4', username: 'Ignore bot', img: '/ignore.png', status: 'online', isBot: true, path: './bots/ignoreBot.js'},
  ],
  rooms: [],
  messages: [],
}

module.exports = {
  DB
}
