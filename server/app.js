const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const {Users} = require('./models/Users');
const {ChatRooms} = require('./models/ChatRooms');
const {Messages} = require('./models/Messages');

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

  socket.on('sendMessage', ({roomId, text, ownerId}) => {
    //validation message
    console.log(roomId, 'room ID for message')
    console.log(Messages.create({roomId, text, ownerId}), 'message');

    const updatedMessages = Messages.getMessagesByChatRoomId(roomId);
    console.log(updatedMessages)
    io.to(roomId).emit('changeMessages', updatedMessages);
    socket.emit('changeMessages', updatedMessages);
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
