<template>
  <div class="skittles-menu" :class="{ 'sm-closed': closed }">
    <div class="sm-backdrop" @click="closed = true"></div>
    <div class="sm-wrapper">
      <div class="smw-group">
        <div class="smwg-item" @click="closed = true">
          <div class="smwgi-close"></div>
          <span>ID: {{ id }}</span>
        </div>
        <div class="smwg-item" @click="nav('/')">
          {{ lang == "en" ? "agenda" : "повестка дня" }}
        </div>
        <div class="smwg-item" @click="nav('/profile')">
          {{ lang == "en" ? "my profile" : "мой профиль" }}
        </div>
        <div class="smwg-item" @click="helpme()">
          {{ lang == "en" ? "help" : "Помощь" }}
        </div>
        <!--                <div class="smwg-item" @click="changeLang()">{{lang == 'en'?'Русский язык':'English'}}</div>-->
      </div>
      <div class="smw-divider"></div>
      <div class="smw-group">
        <div class="smwg-item" @click="logout">
          {{ lang == "en" ? "log out" : "выйти" }}
        </div>
      </div>
    </div>
    <Help />
  </div>
</template>

<script>
import Help from "./help.vue";
export default {
  data() {
    return {
      closed: true,
      speaker: false,
      isUser: false,
      lang: "en",
      id: ""
    };
  },
  props: {},
  computed: {},
  created() {
    // this.id = JSON.parse(localStorageProxy.getItem("user")).ids;
    this.lang = localStorageProxy.getItem("lang");
    this.$root.$on("open_menu", () => {
      this.closed = false;
    });

    if (App.User.arUser) {
      this.isUser = App.User.arUser.permission == "user";
    } else {
      this.isUser = false;
    }
  },

  methods: {
    helpme() {
      this.$root.$emit("helpme", false);
    },
    changeLang() {
      localStorageProxy.setItem("lang", this.lang == "en" ? "ru" : "en");

      location.reload();
    },
    nav(path) {
      this.closed = true;
      App.Router.push(path);
    },
    logout() {
      App.User.logout();
    }
  },
  beforeDestroy() {},
  watch: {},
  components: {
    Help
  }
};
</script>

<style lang="scss">
.skittles-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  .sm-backdrop {
    width: 100%;
    height: 100%;
  }
  .sm-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 50vw;
    background: #f5f5f5;
    transition: 0.3s;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    .smw-group {
      padding: 10px 0px;
      .smwg-item {
        padding: 15px 17px;
        font-size: 14px;
        text-transform: uppercase;
        .smwgi-close {
          width: 33px;
          height: 14px;
          background: url("/src/build/img/menu_active.svg") center no-repeat;
          background-size: contain;
          margin-bottom: 23px;
        }
      }
    }
    .smw-divider {
      width: 100%;
      border-bottom: solid 1px #979797;
    }
  }
  &.sm-closed {
    left: unset;
    .sm-wrapper {
      right: -50vw;
    }
  }
}
</style>