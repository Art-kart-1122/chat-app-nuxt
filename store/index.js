export const state = () => ({
  user: {
    id: '',
    username: '',
    img: '',
    status: ''
  },
  contacts: [],
  currentContact: '',
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
  setCurrentContact(state, contactId) {
    console.log('CHANGE CURRENT CONTACT')
    state.currentContact = contactId;
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

  SOCKET_changeMessages(state, {roomId, messages}) {
    if(state.chatRoom === roomId) state.messages = messages;

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
  startMessages({dispatch, state, commit}, contact) {
    const {user} = state;
    commit('setCurrentContact', contact);
    dispatch('socketEmit', {
      action: 'changeChatRoomByUsers',
      payload: {id1: user.id, id2: contact.id}
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
  user: state => state.user,
  contacts: state => state.contacts.filter(cnt => cnt.id !== state.user.id),

  onlineUsers: state => state.contacts
    .filter(cnt => cnt.id !== state.user.id)
    .filter(user => user.status === 'online'),

  allUsers: state => state.contacts
    .filter(cnt => cnt.id !== state.user.id),

  messages: state => state.messages,
  currentContact: state => state.currentContact ? state.currentContact : state.user,
  chatSelected: state => !!state.chatRoom
}
