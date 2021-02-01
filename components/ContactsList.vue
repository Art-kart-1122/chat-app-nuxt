<template>
  <div class="wrap">
    <div class="card">
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>

      <div class="list-group contact-area">

        <div v-for="user in onlineUsers" :key="user.id" @click="() => startMessages(user.id)" class="list-group-item">{{user.username}}</div>

      </div>

      <div class="card-body">
        <div class="input-group">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search..">
          <span class="input-group-text btn send-btn">Send</span>
        </div>
      </div>
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

<style>
.wrap {
  border: 1px solid black;
}
.contact-area {
  height: 550px;
  overflow-y: scroll;
}
.nav-item {
  width: 50%;
}

.list-group-item {
  border: #fff;
}

.card {
  border: #fff;
}
.contact-area {
  height: 656px;
}
</style>
