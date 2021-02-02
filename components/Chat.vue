<template>
  <div class="wrap">
    <div class="card">

      <div class="card-header">

        <div class="img">
          <img :src=currentContact.img alt="User photo">
        </div>
        <div class="header">
          <div class="description">
            <h3>{{ currentContact.username }}</h3>
            <div class="description-text">
              {{ currentContact.description ? currentContact.description.slice(0, 200) + ' ...' : 'Simple user' }}
            </div>
          </div>
        </div>
      </div>


      <div class="list-group chat-area" ref="chat">
        <div v-if="chatSelected">
          <Message v-for="msg in messages" :key="msg.id" v-bind:msg="msg"/>
        </div>
        <div v-else>
          <div class="admin-msg">
            Choose contact
          </div>
        </div>
      </div>


      <div class="card-body">
        <div class="input-form">
          <input v-model="newMessage" v-on:keyup.enter="send" type="text" class="form-control" placeholder="Start chatting!" aria-label="Username" aria-describedby="basic-addon1">
          <button type="button" class="btn btn-primary" @click="send">Send message</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';
import Message from "~/components/Message";

export default {
  data: () => ({
    newMessage: ''
  }),

  components: {
    Message
  },

  computed: {
    ...mapGetters(['currentContact', 'chatSelected', 'messages'])
  },

  methods: {
    ...mapActions(['sendMessage']),

    _isValidMessage(msg) {
       return !!(msg && msg.replace(/\s+/g, ''))
    },

    send() {
      const msg = this.newMessage;
      if(this._isValidMessage(msg)) this.sendMessage(msg)
      this.newMessage = '';
    }
  },

  watch: {
    messages() {
      if (this.$refs.chat) {
        setTimeout(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }, 0)
      }
    }
  }
}
</script>


<style scoped>

.card-header {
  padding: 0px;
  display: flex;
  justify-content: flex-start;
  background-color: #BECBD9;
}

.admin-msg {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 20%;
  font-weight: bold;
  color: rgba(21,89,101,0.52);
}

.card {
  border: #fff;
  background-color: #D7DFE7;
}

.chat-area {
  height: 550px;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #BECBD9;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #9DAAB9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(17,18,8,0.69);
}

.input-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

input {
  width: 65%;
  min-width: 200px;
  margin-bottom: 10px;
}

button {
  width: 30%;
  white-space: nowrap;
  min-width: min-content;
  margin-left: 25px;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
}

img {
  width: 150px;
}

.header {
  padding: 10px;
  height: 150px;
}

.description {
  height: 130px;
  overflow-y: hidden;
}

.description-text {
  overflow-wrap: break-word;
}

</style>
