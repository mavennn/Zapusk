<template>
  <div class="am-sidebar am-hide">
    <div class="ams-name"></div>

    <ul class="ams-list">
      <li>
        <a
          @click="goRoute('/admin/users/')"
          class="waves-effect"
          style="border-left: 0"
        >
          <i class="fa fa-globe menu_icon" style="margin-left: 2px"></i>
          <span class="amsl-name">Users</span></a
        >
      </li>

      <li>
        <a
          @click="goRoute('/admin/speakers/')"
          class="waves-effect"
          style="border-left: 0"
        >
          <i class="fa fa-book menu_icon" style="margin-left: 2px"></i>
          <span class="amsl-name">Speakers</span></a
        >
      </li>

      <li>
        <a
          @click="goRoute('/admin/schedule/')"
          class="waves-effect"
          style="border-left: 0"
        >
          <i class="fa fa-book menu_icon" style="margin-left: 2px"></i>
          <span class="amsl-name">Schedule</span></a
        >
      </li>

      <li>
        <a
          @click="goRoute('/admin/blocks/')"
          class="waves-effect"
          style="border-left: 0"
        >
          <i class="fa fa-book menu_icon" style="margin-left: 2px"></i>
          <span class="amsl-name">Blocks</span></a
        >
      </li>

      <li>
        <a @click="logout" class="waves-effect" style="border-left: 0">
          <i class="fa fa-power-off menu_icon" style="margin-left: 2px"></i>
          <span class="amsl-name">Log out</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      App.User.logout();
    },
    goTime() {
      return Request.url.admin("/timetable/");
    },
    logout() {
      App.User.logout();
    }
  }
};
</script>

<style lang="scss">
.am-sidebar {
  position: absolute;
  width: 220px;
  height: calc(100% - 60px);
  z-index: 500;
  .ams-name {
    width: 100%;
    text-align: center;
    color: white;
    padding: 15px 0;
  }
  .ams-list {
    padding: 0;
    list-style: none;
    margin: 0;
    li {
      display: block;
      a {
        background: rgba(0, 0, 0, 0);
        transition: 0.3s;
        width: 100%;
        padding: 15px;
        margin: 0;
        i,
        span {
          color: #a6acbc;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.07);
        }
      }
    }
  }
  &.am-hide {
    width: 60px;
    .ams-name {
    }
    .ams-list {
      li {
        a {
          white-space: nowrap;
          padding: 15px 20px;
          span {
            transition: 0.3s;
            overflow: hidden;
            width: 0;
            display: inline-block;
            line-height: 14px;
          }
          &:hover {
            background: #4f5467;
            width: 220px;
            span {
              width: auto;
            }
          }
        }
      }
    }
  }
}
</style>
