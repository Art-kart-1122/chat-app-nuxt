<template>
  <div class="app-wrap">

    <div class="modal-contacts" @click="">
      <ContactsList/>
    </div>

    <div class="container-sm">
      <div class="row">
        <div class="col-8 merge">
          <Chat/>
        </div>
        <div class="col-4 merge adapt-hide">
          <ContactsList/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Chat from "~/components/Chat";
import ContactsList from "~/components/ContactsList";

import { mapActions } from "vuex";

export default {

  components: {
    Chat, ContactsList
  },

  beforeMount() {
    //this.userAuth();
  },
  methods: {

  }
}
</script>


<style scoped>
  .app-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(5,62,129,0.69);
  }
  .merge {
    padding: 0px;
  }
  .modal-contacts {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .row {
      display: flex;
      justify-content: center;
    }
    .modal-contacts {
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .adapt-hide {
      display: none;
    }
  }

  @media screen and (max-width: 700px) {
    .row {
      margin: 0px;
      max-width: 100%;
    }
  }

</style>
