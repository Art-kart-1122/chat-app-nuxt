const uuid = require('uuid');
const {DB} = require('../database/database');

class Messages {

  constructor() {
    throw new Error('Messages is abstract class');
  }

  static create({roomId, text, ownerId}) {
    const id = uuid.v4();
    const date = (new Date()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    DB.messages.push({
      id, roomId, text,
      ownerId, date
    })
    return id
  }

  static getMessageById(id) {
    return DB.messages.find(msg => msg.id === id)
  }

  static getMessagesByChatRoomId(id) {
    return DB.messages.filter(msg => msg.roomId === id)
  }
}

module.exports = {
  Messages
}
