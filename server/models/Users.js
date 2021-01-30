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
      id, username: `U${Math.random()}`,
      img: '/user.png', status: 'online'
    })

    //
    //console.log('ADD NEW USER ', id)
    //
    return id
  }

  static getAll() {
    return DB.users
  }

  static getById(id) {
    return DB.users.find(user => user.id === id)
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
