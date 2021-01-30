<template>
  <div class="card">

    <div class="card-header">
      <div class="row">
        <div class="col-4">
          <img src="" alt="ccc">
        </div>
        <div class="col-8">
          <h3>{{user}}</h3>
          <div>
            btjjtjtjyyyyyyy
            ghfjtytrhhtyjtr
          </div>
        </div>
      </div>
    </div>


    <ul class="list-group">
      <li class="list-group-item">Cras justo odio</li>
      <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Morbi leo risus</li>
      <li class="list-group-item">Porta ac consectetur ac</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>


    <div class="card-body">
      <div class="input-group">
        <textarea class="form-control"></textarea>
        <span class="input-group-text btn send-btn" @click="() => sendMessage('orbit')">Send</span>
      </div>
    </div>
  </div>

</template>


<script>
import {mapActions, mapGetters} from 'vuex';

export default {
computed: {
  ...mapGetters(['user'])
},
methods: {
  ...mapActions(['sendMessage'])
}
}
</script>
