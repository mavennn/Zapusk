<template>
  <div class="skittles-sign" :class="{ 'ss-light': tab == 'reg' }">
    <div class="ss-logo"></div>

    <div class="ss-toggler">
      <div
        class="sst-item"
        :class="{ 'ssti-active': tab == 'login' }"
        @click="tab = 'login'"
      >
        {{ lang == "en" ? "sign in" : "войти" }}
      </div>
      <div
        class="sst-item"
        :class="{ 'ssti-active': tab == 'reg' }"
        @click="tab = 'reg'"
      >
        {{ lang == "en" ? "registration" : "регистрация" }}
      </div>
    </div>
    <login v-if="tab == 'login'" :lang="lang" />
    <Reg v-if="tab == 'reg'" :lang="lang" />
    <forgot v-if="tab == 'forgot'" :lang="lang" />
  </div>
</template>

<script>
import Login from "@Components/mobile/login.vue";
import Reg from "@Components/mobile/reg.vue";
import Forgot from "@Components/mobile/forgot.vue";
export default {
  data() {
    return {
      tab: "login",
      lang: localStorageProxy.getItem("lang")
    };
  },
  props: {},
  computed: {},
  mounted() {
    this.$root.$on("forgot", () => {
      this.tab = "forgot";
    });
    localStorageProxy.setItem("lang", "ru");
    // if (!localStorageProxy.getItem("lang")) {
    //   swal.fire({
    //     title: "Выберите язык / Choose language",
    //     input: "select",
    //     inputOptions: {
    //       ru: "Русский",
    //       en: "English"
    //     },
    //     inputPlaceholder: "Язык / Language",
    //     showCancelButton: false,
    //     allowEscapeKey: false,
    //     allowOutsideClick: false,
    //     inputValidator: value => {
    //       return new Promise(resolve => {
    //         localStorageProxy.setItem("lang", value);
    //         this.lang = value;
    //         resolve();
    //       });
    //     }
    //   });
    // }
  },
  created() {},
  methods: {
    setLang(value) {
      localStorageProxy.setItem("lang", value);
      this.lang = value;
    }
  },
  beforeDestroy() {},
  watch: {},
  components: {
    Login,
    Reg,
    Forgot
  }
};
</script>

<style lang="scss">
.cc-lang {
  position: relative;
  margin: 0 auto;
  width: 190px;
  .ss-usa {
    background: url(/src/usa.png);
    width: 80px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 43px;
    position: absolute;
    top: -60px;
  }
  .ss-rus {
    background: url(/src/rus.png);
    width: 80px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 43px;
    position: absolute;
    right: 15px;
    top: -60px;
  }
}
.skittles-sign {
  padding: 1px;
  width: 100vw;
  min-height: 100vh;
  background-color: #132d75;
  transition: 0.1s;
  .ss-logo {
    width: 142px;
    height: 110px;
    background: url(/src/src/img/wsrlogo-01.png) center no-repeat;
    background-size: contain;
    margin: 29px auto 30px;
  }
  .ss-toggler {
    display: flex;
    width: 170px;
    margin: 0 auto;
    .sst-item {
      transition: 0.1s;
      white-space: nowrap;
      color: white;
      text-transform: uppercase;
      padding: 7px 8px;
      margin: 0 7px;
      font-size: 14px;
      font-weight: 100;
      &.ssti-active {
        border: solid 1px #62b5e5;
      }
    }
  }
  &.ss-light {
    background-color: white;
    .ss-logo {
      background: url(/src/src/img/wsrlogo-01.png) center no-repeat;
      background-size: contain;
      width: 189px;
      height: 147px;
      margin: 16px auto 6px;
    }
    .ss-toggler {
      .sst-item {
        color: black;
      }
    }
  }
}
</style>
