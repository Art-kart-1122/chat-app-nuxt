export const state = () => ({
  user: {
    id: '',
    username: '',
    img: '',
    status: ''
  },
  contacts: [],
  chatRoom: '',
  messages: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setUserStatus(state, status) {
    state.user.status = status;
  },

  SOCKET_changeContacts(state, contacts) {
    state.contacts = contacts;
    //
    console.log('CHANGE CONTACTS')
    console.log(state.contacts)
  },

  SOCKET_changeChatRoom(state, chatRoomId) {
    state.chatRoom = chatRoomId;

    console.log('CHANGE CHAT')
    console.log(state.chatRoom)
  },

  SOCKET_changeMessages(state, messages) {
    state.messages = messages;

    console.log('CHANGE MESSAGES')
    console.log(state.messages)
  }
}


export const actions = {
  socketEmit(_, { action, payload, cb }) {
    //
    //console.log('SOCKET EMIT')
    //
    return this._vm.$socket.emit(action, payload, cb);
  },

  getUserDataFromLocalStorage({commit}) {
    commit('setUser', {
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      img: localStorage.getItem('img'),
      status: localStorage.getItem('status')
    })
  },

  setUserDataToLocalStorage(_, {id, username, img, status}) {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('img', img);
    localStorage.setItem('status', status);
  },

  SOCKET_connect({dispatch}) {
    //
    //console.log('CLIENT CONNECT');
    //
    dispatch('userAuth')
  },

  userAuth({dispatch, state, commit}) {
    //
    //console.log('USER AUTH');
    //
    dispatch('getUserDataFromLocalStorage');

    const { user } = state;
    dispatch('socketEmit', {
      action: 'Auth',
      payload: user,
      cb: ({isValid, user}) => {
        if(isValid) {
          commit('setUserStatus', 'online');
        } else {
          dispatch('setUserDataToLocalStorage', user);
          commit('setUser', user);
        }

        dispatch('socketEmit', {
          action: 'SetUserStatus',
          payload: 'online'
        });
      }
    })
  },
  startMessages({dispatch, state}, receiverId) {
    const {user} = state;
    dispatch('socketEmit', {
      action: 'changeChatRoomByUsers',
      payload: {id1: user.id, id2: receiverId}
    })
  },
  sendMessage({dispatch, state}, text) {
    dispatch('socketEmit', {
      action: 'sendMessage',
      payload: {roomId: state.chatRoom, text, ownerId: state.user.id}
    })
  }
}

export const getters = {
  user: state => state.user.username,
  contacts: state => state.contacts,
  onlineUsers: state => state.contacts.filter(user => user.status === 'online')
}
