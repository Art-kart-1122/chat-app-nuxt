<template>
  <div class="list-group-item">
    <div class="wrap-msg reverse">
      <div class="head-msg">
        <div class="name">Artur</div>
        <div class="time">00:23</div>
      </div>
      <div class="body-msg-right">
        {{message.text}}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.list-group-item {
  background-color: rgba(176,175,255,0.69)
}
.produced {
  background: rgba(88,255,10,0.26);
  float: right;
}

.received {
  background: rgba(14,64,255,0.26);
}
.head-msg {
  display: flex;
  justify-content: space-between;
  background-color: rgba(255,209,120,0.69);
  padding: 5px 10px 5px 10px;

  border-radius: 10px 10px 0px 0px
}
.body-msg{
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 0px 0px 10px 10px;
  position: relative;
}
/*
.body-msg::after{
  margin-left: -50px;
  margin-bottom: 0px;
  content: '';
  width: 0;
  height: 0;
  border-top: 15px solid white;
  border-left: 15px solid transparent;
}
*/
.time {
  padding-right: 10px;
}
.name {
  font-weight: bold;
  padding-left: 10px;
}
.wrap-msg {
  padding: 0;
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
