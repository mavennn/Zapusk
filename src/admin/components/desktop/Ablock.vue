<template>
  <div class="ablock">
    <div class="ab_img">
      <img id="cpm_edit_img" class="hover" :src="img" />
      <img id="ab_add" src="/src/icons/add/Add.svg" />
    </div>
    <div class="ab_text">
      <b class="hover">{{ text }}</b>
      <hr />
      <b v-if="connent" class="text-info cpointer" @click="onConnect"
        >Привязать</b
      >
      <b v-if="add" @click="onAdd" class="text-success cpointer">Cоздать</b>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
/*		types: Building Client Complex Contact Object User Village	*/

export default {
  props: {
    type: {},
    text: {},
    connent: {
      default: true
    },
    add: {
      default: true
    }
  },
  data() {
    return {};
  },

  methods: {
    onAdd() {
      this.$emit("onAdd");
    },
    onConnect() {
      this.$emit("onConnect");
    }
  },
  computed: {
    img() {
      return `/src/icons/round/${this.type}.svg`;
    }
  }
};
</script>

<style lang="scss">
.ablock {
  padding: 7px;
  border-left: 3px solid #03a9f3;
  box-shadow: 0 0 5px #eee;
  margin-bottom: 10px;
  position: relative;
  #ab_add {
    position: absolute;
    width: 35px;
    height: 35px;
    bottom: -5px;
    right: 6px;
  }
  .ab_img {
    float: left;
    position: relative;
    width: 20%;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .ab_text {
    float: left;
    margin-top: 3px;
    width: 80%;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    hr {
      margin: 2px 0px;
    }
  }
}
</style>
