<template>
  <div class="wrap">
    <div class="card">
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <div class="nav-link" @click="() => changeTab('Online')" v-bind:class="{'active': activeTab === 'Online'}" aria-current="page">Online</div>
          </li>
          <li class="nav-item">
            <div class="nav-link" @click="() => changeTab('All')" v-bind:class="{'active': activeTab === 'All'}" >All</div>
          </li>
        </ul>
      </div>

      <div class="list-group contact-area">

        <div v-if="queryStr">
          <Contact v-for="user in filteredUsers" :key="user.id" @click.native="() => changeContact(user)"
                   v-bind:class="{'selected': activeContact === user.id}" v-bind:contact="user"></Contact>
        </div>
        <div v-else-if="activeTab === 'Online'">
          <Contact v-for="user in onlineUsers" :key="user.id" @click.native="() => changeContact(user)"
                   v-bind:class="{'selected': activeContact === user.id}" v-bind:contact="user"></Contact>
        </div>
        <div v-else-if="activeTab === 'All'">
          <Contact v-for="user in allUsers" :key="user.id" @click.native="() => changeContact(user)"
                   v-bind:class="{'selected': activeContact === user.id}" v-bind:contact="user"></Contact>
        </div>
      </div>

      <div class="card-body">
        <div class="input-group">
          <input v-model="queryStr" class="form-control mr-sm-2" type="search" placeholder="Search" v-on:input="changeQueryStr">
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';
import Contact from "~/components/Contact";

export default {
  data: () => ({
    activeContact: '',
    activeTab: 'Online',
    queryStr: '',
    filteredUsers: []
  }),

  components: {
    Contact
  },

  computed: {
    ...mapGetters(['onlineUsers', 'allUsers'])
  },

  methods: {
    ...mapActions(['startMessages']),

    changeContact(user) {
      this.startMessages(user);
      this.activeContact = user.id;
    },

    changeTab(tabName) {
      this.activeTab = tabName;
    },

    _isValidQueryStr(str) {
      return !!(str && str.replace(/\s+/g, '') && str.length < 10)
    },

    _filter(users, str) {
      return users.filter(user => user.username.toLowerCase()
        .indexOf(str.toLowerCase()) !== -1);
    },

    changeQueryStr() {
      const str = this.queryStr;

      if(this._isValidQueryStr(str)) {
        this.queryStr = str;
        this.filteredUsers = this.activeTab === 'Online' ?
          this._filter(this.onlineUsers, str) : this._filter(this.allUsers, str)
      }
    }
  }

}
</script>

<style>

.contact-area {
  height: 550px;
  overflow-y: scroll;
}

.nav-item {
  width: 50%;
  cursor: pointer;
}

.card {
  border: #fff;
}

.contact-area {
  height: 660px;
}

.nav-link {
  background-color: #F8F8F8;
}

.card-body {
  padding-bottom: 5px;
}

.selected {
  background-color: #BECBD9;
}

.input-group {
  padding-bottom: 9px;
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

</style>
