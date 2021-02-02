<template>
  <div class="app-wrap">


    <div class="container-sm">
      <div class="row">
        <div class="col-8 merge">

          <div class="modal-open-btn" @click="openModal"></div>

          <div v-if="showModal">
            <div class="modal-contacts" @click.self="closeModal">
                <ContactsList/>
            </div>
          </div>

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

export default {
  data: () => ({
    showModal: false
  }),

  components: {
    Chat, ContactsList
  },

  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    }
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
    background-color: #586670;
  }
  .merge {
    padding: 0px;
  }

  .modal-contacts {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 10;
    justify-content: center;
    align-items: center;
    background-color: rgba(8,11,18,0.15);
  }

  .modal-open-btn {
    display: none;
    width: 50px;
    height: 50px;
    background: #586670;
    border-radius: 50%;
    position: absolute;
    z-index: 5;
    cursor: pointer;
  }

  @media screen and (max-width: 1000px) {
    .row {
      display: flex;
      justify-content: center;
    }

    .adapt-hide {
      display: none;
    }

    .modal-open-btn {
      display: block;
    }
  }

  @media screen and (max-width: 700px) {
    .row {
      margin: 0px;
      width: 100%;
      min-width: 400px;
    }
  }

</style>
