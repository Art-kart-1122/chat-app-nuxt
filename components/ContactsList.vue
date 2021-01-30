<template>
  <div class="wrap">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
    </ul>
    <ul class="list-group">

      <li v-for="user in onlineUsers" :key="user.id" @click="() => startMessages(user.id)" class="list-group-item">{{user.username}}</li>

    </ul>
    <div class="input-group">
      <textarea class="form-control"></textarea>
      <span class="input-group-text btn send-btn">Send</span>
    </div>
  </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters(['onlineUsers'])
  },
  methods: {
    ...mapActions(['startMessages'])
  }

}
</script>
