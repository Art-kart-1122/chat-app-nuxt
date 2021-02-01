const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const {Users} = require('./models/Users');
const {ChatRooms} = require('./models/ChatRooms');
const {Messages} = require('./models/Messages');

const spamBotsStart = require('./util/startSpamBots');

// !!!!! validation
// clean code
// EVENT NAME TO CONSTANT
//


io.on("connection", (socket) => {
  let curId ='';

  socket.on('Auth', ({id, username, img}, cb) => {
    //
    //console.log('AUTH')
    //

    if (typeof cb !== "function") return socket.disconnect()

    const isValid = !!(id && Users.getById(id));
    curId = isValid ? id : Users.create({username, img});

    socket.emit('changeContacts', Users.getAll());
    socket.broadcast.emit('changeContacts', Users.getAll());

    return isValid ? cb({isValid}) : cb({isValid, user: Users.getById(curId)})
  })

  socket.on('SetUserStatus', (status) => {

    if(curId) {
      Users.setUserStatusByID(curId, status);

      socket.emit('changeContacts', Users.getAll());
      socket.broadcast.emit('changeContacts', Users.getAll());
    }
  })

  socket.on('changeChatRoomByUsers', ({id1, id2}) => {
    let roomId = ChatRooms.getChatRoomIdByUsersId({id1, id2});
    roomId = roomId ? roomId: ChatRooms.create(id1, id2);

    socket.emit('changeChatRoom', roomId);
    socket.join(roomId);
    socket.emit('changeMessages', Messages.getMessagesByChatRoomId(roomId));
  })
  spamBotsStart(socket)
  socket.on('sendMessage', async ({roomId, text, ownerId}) => {
    //validation message
    //console.log(roomId, 'room ID for message')
    //Messages.create({roomId, text, ownerId});
    //
    // check if exist room and ownerId in room
    const receiverId = ChatRooms.getUsersIdByChatroomId(roomId)
      .find(id => id !== ownerId);
    Messages.create({roomId, text, ownerId});
    let updatedMessages = Messages.getMessagesByChatRoomId(roomId);
    socket.emit('changeMessages', updatedMessages);
    if(Users.isBot(receiverId)) {
      console.log('IS BOT')
      const path = Users.getById(receiverId).path
      console.log(path)
      const answer = await require(path)(text);
      console.log(answer, '-- answer')
      if(answer) {
        Messages.create({roomId, text: answer, ownerId});

        //const updatedMessages = Messages.getMessagesByChatRoomId(roomId);
        //socket.emit('changeMessages', updatedMessages);
      }
    } else {
      console.log('IS USER')
      //const updatedMessages = Messages.getMessagesByChatRoomId(roomId);
      //io.to(roomId).emit('changeMessages', updatedMessages);
      //socket.emit('changeMessages', updatedMessages);
    }
    updatedMessages = Messages.getMessagesByChatRoomId(roomId);
    io.to(roomId).emit('changeMessages', updatedMessages);
    //socket.emit('changeMessages', updatedMessages);


    //
    //const updatedMessages = Messages.getMessagesByChatRoomId(roomId);
    //console.log(updatedMessages)
    //io.to(roomId).emit('changeMessages', updatedMessages);
    //socket.emit('changeMessages', updatedMessages);
  })

  socket.on('sendMessageToBot', async ({roomId, text, ownerId}) => {
    const botId = ChatRooms.getUsersIdByChatroomId(roomId)
      .find(id => id !== ownerId);

    if(Users.isBot(botId)) {
      Messages.create({roomId, text, ownerId});

      const path = Users.getById(botId).path
      const answer = await require(path)();
      if(answer) {
        console.log('e')
        Messages.create({roomId, text: answer, ownerId});

        const updatedMessages = Messages.getMessagesByChatRoomId(roomId);
        socket.emit('changeMessages', updatedMessages);
      }
    }
  })

  socket.on('disconnect', () => {
    //
    //console.log('ONE DISCONNECT', curId);
    //
    if(curId) {
      Users.setUserStatusByID(curId, 'offline');

      socket.emit('changeContacts', Users.getAll());
      socket.broadcast.emit('changeContacts', Users.getAll());
    }
  })


})

module.exports = {
  app,
  server,
};
