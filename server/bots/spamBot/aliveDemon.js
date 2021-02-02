const {ChatRooms} = require('../../models/ChatRooms');
const {Messages} = require('../../models/Messages');

const {CHANGE_MESSAGES} = require('../../util/actionsTypesToClient');

const aliveDemon = (socket, id) => {

  // debug
  //console.log('SPAM BOT WORK')
  //

  const max = 120;
  const min = 10;
  const randomTime = Math.floor(Math.random() * (max - min + 1) + min);
  const chats = ChatRooms.getChatRoomsByOneUserId(id);

  chats.forEach(chat => {

    const text = `I am Spam bot (-/_/-) .... ${Math.random()}`;

    Messages.create({roomId: chat.id, text, ownerId: id});
    const updatedMessages = Messages.getMessagesByChatRoomId(chat.id);

    socket.to(chat.id).emit(CHANGE_MESSAGES, {roomId: chat.id, messages: updatedMessages});
  })
  setTimeout(() => aliveDemon(socket, id), randomTime * 1000)
}

module.exports = aliveDemon
