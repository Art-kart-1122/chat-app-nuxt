const uuid = require('uuid');
const {DB} = require('../database/database');

class Users {
  constructor() {
    throw new Error('Users is abstract class');
  }
  static status = ['online','offline'];

  static create({username, img }) {
    const id = uuid.v4();

    // hardcode
    DB.users.push({
      id, username: `User${Math.floor(Math.random() * 100)}`,
      img: '/user.png', status: 'online',
      isBot: false
    })

    //
    //console.log('ADD NEW USER ', id)
    //
    return id
  }

  static getAll() {
    return DB.users.map(user => ({id: user.id, username: user.username, img: user.img, status: user.status}))
  }

  static getById(id) {
    return DB.users.find(user => user.id === id)
  }

  static isBot(id) {
    return this.getById(id)?.isBot
  }
  static getSpamBots() {
    return DB.users.filter(user => user.isSpamBot)
  }
  static setUserStatusByID(id, status) {
    if(this.getById(id) && this.status.includes(status)) {

      const idx = DB.users.findIndex(user => user.id === id);
      DB.users[idx].status = status;

      //
      console.log('CHANGE STATUS')
      console.log(DB.users[idx].id, DB.users[idx].status)
      //

    } else {
      throw new Error('SetUserStatusByID')
    }
  }
}

module.exports = {
  Users
}
