<template>
  <div>
    <auth v-if="page == 'auth'"></auth>
    <forgot v-if="page == 'forgot'"></forgot>
  </div>
</template>

<script>
import Auth from "./Auth.vue";
import Forgot from "./Forgot.vue";
export default {
  data() {
    return {
      page: "auth",
      token: ""
    };
  },
  methods: {},
  created() {
    if (~window.location.pathname.indexOf("/recovery/")) {
      this.token = window.location.pathname.replace("/recovery/", "");
      this.page = "change-pass";
    }
    this.$on("goTab", data => {
      this.page = data;
    });
  },
  components: {
    auth: Auth,
    forgot: Forgot
  }
};
</script>

<style lang="scss"></style>
