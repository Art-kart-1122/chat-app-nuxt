<template>
  <div class="list-group-item wrap">
    <div v-if="contact.status === 'online'">
      <div class="online-icon"></div>
    </div>
    <div class="img">
      <img :src=contact.img alt="User photo">
    </div>
    <div class="header">
      <div class="description">
        <b>{{ contact.username }}</b>
        <div class="description-text">
          {{ contact.description ? contact.description.slice(0, 20) + ' ...' : 'Simple user'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}

</script>

<style scoped>
  .list-group-item {
    border: #fff;
  }

  img {
    width: 80px;
  }

  .wrap {
    height: 80px;
    padding: 0px;
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;
  }
  .wrap:hover {
    cursor: pointer;
    background-color: rgba(10,14,18,0.1);
  }
  .header {
    padding: 10px;
  }

  .description {
    overflow-y: hidden;
  }

  .description-text {
    overflow-wrap: break-word;
    overflow-y: hidden;
  }
  .online-icon {
    width: 20px;
    height: 20px;
    background: #0cff29;
    border-radius: 50%;
    position: absolute;
    z-index: 5;
    margin-left: 60px;
    bottom: 0;
  }
</style>
