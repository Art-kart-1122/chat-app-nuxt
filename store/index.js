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
  messages: [],
  systemMessage: ''
})

export const mutations = {
  // local mutations

  setUser(state, user) {
    state.user = user;
  },

  setUserStatus(state, status) {
    state.user.status = status;
  },

  setCurrentContact(state, contactId) {
    state.currentContact = contactId;
  },

  // mutations from server

  SOCKET_changeContacts(state, contacts) {
    state.contacts = contacts;
  },

  SOCKET_changeChatRoom(state, chatRoomId) {
    state.chatRoom = chatRoomId;
  },

  SOCKET_changeMessages(state, {roomId, messages}) {
    if(state.chatRoom === roomId) state.messages = messages;
  },

  SOCKET_changeSystemMessage(state, {roomId, message, receiverId}) {
    if(state.chatRoom === roomId && state.user.id === receiverId) state.systemMessage = message;
  }
}

// server receiver action
const SEND_MESSAGE = 'sendMessage';
const CHANGE_CHATROOM_BY_USERS = 'changeChatRoomByUsers';
const SET_USER_STATUS = 'setUserStatus';
const AUTHENTICATION = 'Auth';
const SEND_SYSTEM_MESSAGE = 'sendSystemMessage';

export const actions = {

  // local actions

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

  // server actions

  socketEmit(_, { action, payload, cb }) {
    return this._vm.$socket.emit(action, payload, cb);
  },

  SOCKET_connect({dispatch}) {
    dispatch('userAuth');

    // debug
    //console.log('CLIENT CONNECT');
    //
  },

  SOCKET_reconnect({dispatch}) {
    dispatch('userAuth');
  },

  userAuth({dispatch, state, commit}) {
    dispatch('getUserDataFromLocalStorage');
    const { user } = state;

    // debug
    //console.log('CLIENT AUTH')
    //

    dispatch('socketEmit', {
      action: AUTHENTICATION,
      payload: user,
      cb: ({isValid, user}) => {
        if(isValid) {

          // debug
          //console.log('CLIENT AUTH -- VALID');
          //

          commit('setUserStatus', 'online');
        } else {

          // debug
          //console.log('CLIENT AUTH -- NEW');
          //

          dispatch('setUserDataToLocalStorage', user);
          commit('setUser', user);
        }

        dispatch('socketEmit', {
          action: SET_USER_STATUS,
          payload: 'online'
        });
      }
    })
  },

  startMessages({dispatch, state, commit}, contact) {
    const {user} = state;
    commit('setCurrentContact', contact);

    // debug
    //console.log('CLIENT CHANGE CHAT ROOM ');
    //

    dispatch('socketEmit', {
      action: CHANGE_CHATROOM_BY_USERS,
      payload: {id1: user.id, id2: contact.id}
    })
  },

  sendMessage({dispatch, state}, text) {

    // debug
    //console.log('CLIENT SEND MESSAGE')
    //

    dispatch('socketEmit', {
      action: SEND_MESSAGE,
      payload: {roomId: state.chatRoom, text, ownerId: state.user.id}
    })
  },

  notify({dispatch, state}, text) {
    // debug
    //console.log('CLIENT SEND SYSTEM MESSAGE')
    //
    dispatch('socketEmit', {
      action: SEND_SYSTEM_MESSAGE,
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
  chatSelected: state => !!state.chatRoom,
  systemMessage: state => state.systemMessage
}
