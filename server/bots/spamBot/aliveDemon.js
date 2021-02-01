const {ChatRooms} = require('../../models/ChatRooms');
const {Messages} = require('../../models/Messages');

const aliveDemon = (io, id) => {
  console.log(id)

  const max = 120;
  const min = 10;
  const randomTime = Math.floor(Math.random() * (max - min + 1) + min);
  const chats = ChatRooms.getChatRoomsByOneUserId(id);

  chats.forEach(chat => {
    console.log('I am work')
    const text = `I am Spam bot (-/_/-) .... ${Math.random()}`;
    Messages.create({roomId: chat.id, text, ownerId:id});

    const updatedMessages = Messages.getMessagesByChatRoomId(chat.id);

    io.to(chat.id).emit('changeMessages', {roomId: chat.id, messages:updatedMessages});
  })
  setTimeout(() => aliveDemon(io, id), randomTime * 1000)
}

module.exports = aliveDemon
