<template>
  <section>
    <div class="container-md">
      <div class="row">
        <div class="col-8">
          <Chat/>
        </div>
        <div class="col-4">
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

</style>
