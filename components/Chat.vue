<template>
  <div class="wrap">
    <div class="card">

      <div class="card-header">
        <div class="row">
          <div class="col-4">
            <img :src=user.img width="100px" alt="User photo">
          </div>
          <div class="col-8">
            <h3>{{ user.username }}</h3>
            <div>
              {{ user.description ? user.description : 'Simple user' }}
            </div>
          </div>
        </div>
      </div>



      <div class="list-group chat-area" ref="chat">
        <Message v-for="msg in messages" :key="msg.id" v-bind:message="msg"/>
      </div>


      <div class="card-body">
        <div class="input-group">
          <textarea class="form-control"></textarea>
          <span class="input-group-text btn send-btn" @click="() => sendMessage('orbit')">Send</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';
import Message from "~/components/Message";

export default {
  components: {
    Message
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['messages']),
  },
  methods: {
    ...mapActions(['sendMessage']),
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

.list-group-item {
  border: #fff;
}

.card {
  border: #fff;
  background-color: rgba(176,175,255,0.69);
}
.wrap {
  border: 1px solid black;
}

.chat-area {
  height: 550px;
  overflow-y: scroll;
}

.arrow-right {
  width: 0;
  height: 0;
  border-top: 60px solid transparent;
  border-bottom: 60px solid transparent;

  border-left: 60px solid green;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: blue;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: red;
}
</style>
