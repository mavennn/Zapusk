<template>
  <div class="skittles-login">
<!--    <div class="cc-lang">-->
<!--      <div class="ss-usa" @click="setLang('en')"></div>-->
<!--      <div class="ss-rus" @click="setLang('ru')"></div>-->
<!--    </div>-->
    <div class="sl-input">
      <div class="sli-label">id:</div>
      <input class="sli-val" :type="intype" v-model="id" @change="login()" />
    </div>
    <div class="sl-input">
      <div class="sli-label">pin:</div>
      <input class="sli-val" :type="intype" v-model="pin" @change="login()" />
    </div>
    <div class="sl-forgot" @click="forgot">
      не помню
    </div>
  </div>
</template>

<script>
import router from "../../core/Router";

export default {
  data() {
    return {
      intype: "number",
      id: "",
      pin: ""
    };
  },
  props: {
    lang: {
      type: String,
      default: "en"
    }
  },
  computed: {},
  created() {},
  methods: {
    login() {
      if (this.id.length == 4 && this.pin.length == 4) {
        // App.Auth.login(this.id, this.pin).then(d => {
        //   if (isJson(d)) router.push({ path: "/agenda" });
        // });

        App.User.login(this.id, this.pin);
      }
    },
    forgot() {
      this.$root.$emit("forgot", false);
    }
  },
  beforeDestroy() {},
  watch: {
    pin: function() {
      if (this.pin.length == 4) this.login();
    }
  },
  components: {}
};
</script>

<style lang="scss">
.skittles-login {
  margin: 87px auto 0;
  width: 216px;
  .sl-input {
    display: flex;
    border-bottom: 2px solid white;
    color: white;
    font-family: "Montserrat";
    font-size: 14px;
    font-weight: 100;
    margin-bottom: 17px;
    .sli-label {
      text-transform: uppercase;
      line-height: 40px;
      width: 28px;
    }
    .sli-val {
      background: transparent;
      border: none !important;
      outline: none !important;
      color: white;
      font-family: "Montserrat";
      font-weight: 600;
      letter-spacing: 3px;
      text-align: right;
      font-size: 15px;
      width: 188px;
      padding-top: 2px;
    }
  }
  .sl-forgot {
    height: 12px;
    font-family: "Akrobat";
    font-size: 10px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #838383;
    text-transform: uppercase;
    margin-top: 20px;
  }
}
</style>
