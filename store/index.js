export const state = () => ({
  user: {},
  messages: [],
  users: [],
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },

};
