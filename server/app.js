const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const {SET_USER_STATUS, AUTHENTICATION,
  SEND_MESSAGE, CHANGE_CHATROOM_BY_USERS} = require('./util/actionsTypesFromClient');
const {CHANGE_MESSAGES, CHANGE_CONTACTS, CHANGE_CHAT_ROOM} = require('./util/actionsTypesToClient');
const spamBotsStart = require('./util/startSpamBots');


const {Users} = require('./models/Users');
const {ChatRooms} = require('./models/ChatRooms');
const {Messages} = require('./models/Messages');


io.on("connection", (socket) => {

  let curId ='';

  socket.on(AUTHENTICATION, ({id, username, img}, cb) => {

    // validation
    if (typeof cb !== "function") return socket.disconnect()
    //

    const isValid = !!(id && Users.getById(id));
    curId = isValid ? id : Users.create({username, img});

    // debug
    //console.log('SERVER AUTHENTICATION ', id);
    //

    socket.emit(CHANGE_CONTACTS, Users.getAll());
    socket.broadcast.emit(CHANGE_CONTACTS, Users.getAll());

    return isValid ? cb({isValid}) : cb({isValid, user: Users.getById(curId)})
  })

  socket.on(SET_USER_STATUS, (status) => {

    // validation
    if (!(curId && status
      && Users.isValidId(curId))) return socket.disconnect()
    //

    Users.setUserStatusByID(curId, status);
    const updatedUsers = Users.getAll();

    // debug
    //console.log('SERVER STATUS  ', curId, ' ', status);
    //

    socket.emit(CHANGE_CONTACTS, updatedUsers);
    socket.broadcast.emit(CHANGE_CONTACTS, updatedUsers);
  });

  socket.on(CHANGE_CHATROOM_BY_USERS, ({id1, id2}) => {

    //validation
    if(!(id1 && id2 && Users.isValidId(id1)
      && Users.isValidId(id2))) return socket.disconnect()
    //

    let roomId = ChatRooms.getChatRoomIdByUsersId({id1, id2});
    roomId = roomId ? roomId: ChatRooms.create(id1, id2);

    // debug
    //console.log('SERVER CHAT ROOM ', roomId);
    //

    socket.join(roomId);
    socket.emit(CHANGE_CHAT_ROOM, roomId);
    socket.emit(CHANGE_MESSAGES, {roomId, messages: Messages.getMessagesByChatRoomId(roomId)});
  })

  // start Spam bots
  spamBotsStart(socket)
  //

  socket.on(SEND_MESSAGE, async ({roomId, text, ownerId}) => {

    //validation
    if(!(roomId && text && ownerId &&
      ChatRooms.isValid(roomId) && Users.isValidId(ownerId))) return socket.disconnect()
    //

    const receiverId = ChatRooms.getUsersIdByChatroomId(roomId)
      .find(id => id !== ownerId);

    Messages.create({roomId, text, ownerId});
    socket.emit(CHANGE_MESSAGES, {roomId, messages: Messages.getMessagesByChatRoomId(roomId)});

    // debug
    //console.log('SERVER SEND MESSAGE')
    //

    if(Users.isBot(receiverId)) {

      console.log('SERVER SEND MESSAGE -- BOT')

      const path = Users.getById(receiverId).path
      const answer = await require(path)(text);
      if(answer) Messages.create({roomId, text: answer, ownerId: receiverId});
    }

    io.to(roomId).emit(CHANGE_MESSAGES, {roomId, messages: Messages.getMessagesByChatRoomId(roomId)});
  })

  socket.on('disconnect', () => {

    // validation
    if (!curId) return socket.disconnect();
    //

    // debug
    //console.log('SERVER DISCONNECT ', curId)
    //

    Users.setUserStatusByID(curId, 'offline');

    const updatedUsers = Users.getAll();
    socket.emit(CHANGE_CONTACTS, updatedUsers);
    socket.broadcast.emit(CHANGE_CONTACTS, updatedUsers);
  })

})

module.exports = {
  app,
  server,
};
