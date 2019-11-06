<template>
  <div class="sblock">
    <div class="sb_img">
      <img id="cpm_edit_img" class="hover" :src="img" @click="open" />
    </div>

    <div class="sb_user">
      <template v-if="type == 'Add'">
        <div class="sb_one hover" @click="open">
          <b>{{ topt }}</b>
        </div>
      </template>

      <template v-else>
        <b class="hover">{{ topt }}</b>
        <hr />
        <span>{{ bottomt }}</span>
        <div v-if="remove" class="sb_remove">
          <button @click="onRemove" class="btn btn-danger btn-circle">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </template>
    </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>
/*		types: building client complex contact object user village	*/

export default {
  props: {
    tabs: Array,
    multiple: {
      type: Boolean,
      default: false
    },
    type: {},
    topt: {},
    remove: { default: false },
    bottomt: {},
    id: String || Number
  },
  data() {
    return {};
  },
  methods: {
    open() {
      if (this.type == "Add") this.openSearch();
      if (empty(this.id)) return;
      else if (this.type == "Client") this.openClient(this.id);
      else if (this.type == "Contact") this.openContact(this.id);
      else if (this.type == "Lead") this.openLead(this.id);
      else if (this.type == "Object") this.openObject(this.id);
      else if (this.type == "Building") this.openBuilding(this.id);
      else if (this.type == "Complex") this.openComplex(this.id);
      else if (
        ["User", "Assigned", "Observer", "Subass", "SubAssigned"].includes(
          this.type
        )
      )
        this.openUser(this.id);
    },
    openSearch() {
      App.Search.open(this.tabs, this.multiple)
        .then(data => {
          this.$emit("select", data);
        })
        .catch(console.error);
    },
    onRemove() {
      this.$emit("onRemove", { id: this.id });
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
.sblock {
  padding: 7px;
  border-left: 3px solid #03a9f3;
  box-shadow: 0 0 5px #eee;
  margin-bottom: 10px;
  position: relative;
  .sb_img {
    float: left;
    width: 20%;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .sb_user {
    position: relative;
    float: left;
    width: 80%;
    padding-left: 7px;
    white-space: nowrap;
    overflow: hidden;
    .sb_remove {
      position: absolute;
      right: 0px;
      top: 7px;
    }
    .sb_one {
      font-size: 16px;
      padding: 14px 0;
    }
    hr {
      margin: 2px 0px;
    }
  }
}
</style>
