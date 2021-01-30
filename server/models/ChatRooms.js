const uuid = require('uuid');
const {DB} = require('../database/database');

class ChatRooms {

  constructor() {
    throw new Error('ChatRooms is abstract class');
  }

  static create(usersId1, usersId2) {
    const id = uuid.v4();
    DB.rooms.push({
      id,
      users: [usersId1, usersId2]
    })
    return id
  }

  static getChatRoomIdByUsersId({id1, id2}) {
    return DB.rooms.filter(room => room.users.includes(id1))
      .filter(room => room.users.includes(id2))[0]?.id
  }
}

module.exports = {
  ChatRooms
}
