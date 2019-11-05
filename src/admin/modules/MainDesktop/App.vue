<template>
  <div id="wrapper">
    <admin-navigation></admin-navigation>
    <admin-menu></admin-menu>

    <div id="page-wrapper">
      <div class="container-fluid">
        <div id="mainDesktopVue">
          <main-page v-if="page === 'main'"></main-page>
          <speakers v-if="page === 'speakers'"></speakers>
          <users v-if="page === 'users'"></users>
          <schedule v-if="page === 'schedule'"></schedule>
          <meetimes v-if="page === 'meetimes'"></meetimes>
          <statistic v-if="page === 'statistic'"></statistic>
          <modal ref="modal"></modal>
          <mpage ref="mpage"></mpage>
        </div>
      </div>
    </div>
    <mfull ref="mfull"></mfull>
  </div>
</template>

<script>
import Mpage from "@Components/all/Mpage.vue";
import Modal from "@Components/all/Modal.vue";
import Mfull from "@Components/all/Mfull.vue";
import AdminMenu from "@Components/desktop/AdminMenu.vue";

Vue.mixin({
  methods: {
    goRoute(link) {
      if (!empty(link)) App.Router.push(link);
    },
    openUser(id) {
      App.User.openDetail(id);
    },
    isAdmin() {
      return App.User.isAdmin();
    },
    userName() {
      return App.User.getName();
    },
    closeModal() {
      App.Modal.close();
    },
    requestError,
    getDays
  }
});

export default {
  data() {
    return {
      page: "main",
      cur_object: 1,
      cur_complex: 1,
      cur_lead: 1
    };
  },
  components: {
    "admin-menu": AdminMenu,
    "main-page": () => App.Load.ComponentLoading("all/main"),
    speakers: () => App.Load.ComponentLoading("desktop/speakers"),
    users: () => App.Load.ComponentLoading("desktop/users"),
    schedule: () => App.Load.ComponentLoading("desktop/schedule"),
    meetimes: () => App.Load.ComponentLoading("desktop/meetimes"),
    statistic: () => App.Load.ComponentLoading("desktop/statistic"),
    Mpage,
    Modal,
    Mfull
  },
  created() {
    this.$on("goTab", data => {
      this.page = data;
    });
    App.Router.Emitter.on("speakers", data => {
      this.page = "speakers";
      data.next();
    });
    App.Router.Emitter.on("users", data => {
      this.page = "users";
      data.next();
    });
    App.Router.Emitter.on("schedule", data => {
      this.page = "schedule";
      data.next();
    });
    App.Router.Emitter.on("meetimes", data => {
      this.page = "meetimes";
      data.next();
    });
    App.Router.Emitter.on("statistic", data => {
      this.page = "statistic";
      data.next();
    });
  },
  methods: {},
  mounted() {
    App.Router.push(window.location.pathname + window.location.search);
    document.querySelector("body").style.overflow = "";
  }
};
</script>

<style lang="scss">
body {
  &.mfull-open {
    overflow: auto !important;
    #page-wrapper {
      display: none;
    }
  }
}
.sothebys_table {
  td {
    vertical-align: middle !important;
    padding: 8px;
    line-height: 1.57142857;
    border-top: 1px solid #e0e0e0;
  }
}
#page-wrapper {
  margin-left: 60px !important;
  &.am-hide {
    margin-left: 60px !important;
  }
}
.footer_in_body {
  margin: 0 -15px;
}
.box_contact_cart {
  padding: 7px;
  border-left: 3px solid #03a9f3;
  box-shadow: 0 0 5px #eee;
  margin-bottom: 10px;
  position: relative;
  .bcc_img {
    float: left;
    width: 20%;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .bcc_user {
    float: left;
    width: 80%;
    padding-left: 7px;
    hr {
      margin: 2px 0px;
    }
  }
}
.inedit {
  border-bottom: 1px dashed #ff6748;
  cursor: pointer;
}
.nowrap {
  white-space: nowrap;
}
.mt_50 {
  margin-top: 50px !important;
}
.fs_12 {
  font-size: 12px;
}
.mt_14 {
  margin-top: 14px;
}
.mt_30 {
  margin-top: 30px;
}
.mt_5 {
  margin-top: 5px;
}
.mr_5 {
  margin-right: 5px;
}
.mb_5 {
  margin-bottom: 5px;
}
.br_20 {
  border-radius: 20px;
}
.underline {
  border-bottom: 1px dashed;
  color: #fb3a3a;
  font-size: 11px;
}
.load_opacity {
  opacity: 0.3;
}
.sothebys_label {
  font-size: 11px;
  padding: 2px 8px;
}
</style>
