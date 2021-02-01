<template>
  <section>
    <div class="container-md">
      <div class="row">
        <div class="col-8 merge">
          <Chat/>
        </div>
        <div class="col-4 merge">
          <ContactsList/>
        </div>
      </div>
    </div>
  </section>

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
  section {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-color: rgba(5,62,129,0.69);*/
  }
  .merge {
    padding: 0px;
  }

</style>
