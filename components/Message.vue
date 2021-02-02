<template>
  <div class="">

    <div v-if="msg.ownerId === user.id">
      <div class="wrap-msg reverse">
        <div class="head-msg">
          <div class="name">{{user.username}}</div>
          <div class="time">{{msg.date}}</div>
        </div>
        <div class="body-msg-right">
          {{msg.text}}
        </div>
      </div>
    </div>

    <div v-else>
      <div class="wrap-msg">
        <div class="head-msg">
          <div class="name">{{currentContact.username}}</div>
          <div class="time">{{msg.date}}</div>
        </div>
        <div class="body-msg">
          {{msg.text}}
        </div>
      </div>
    </div>

  </div>

</template>


<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['user', 'currentContact'])
  }
}
</script>

<style scoped>

.head-msg {
  display: flex;
  justify-content: space-between;
  background-color: #BECBD9;
  padding: 5px 10px 5px 10px;

  border-radius: 10px 10px 0px 0px
}
.body-msg{
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 0px 0px 10px 10px;
  position: relative;
}

.time {
  padding-right: 10px;
}
.name {
  font-weight: bold;
  padding-left: 10px;
}

.wrap-msg {
  margin: 10px 0px 10px 0px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 65%;
  border-radius: 10%;
}


.body-msg:before {
  content: "";
  position: absolute;
  right: 100%;
  top: 0px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-right: 15px solid white;
  border-bottom: 10px solid transparent;
}

.reverse {
  float: right;
}
.reverse > .head-msg {
  background-color: #F0CBB3;
}

.body-msg-right{
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 0px 0px 10px 10px;
  position: relative;
}

.body-msg-right:before {
  content: "";
  position: absolute;
  left: 100%;
  top: 0px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 15px solid white;
  border-bottom: 10px solid transparent;
}
</style>
