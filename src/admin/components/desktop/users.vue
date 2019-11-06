<template>
  <div>
    <div class="row bg-title">
      <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
        <h4 class="page-title">All Users</h4>
      </div>
      <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
        <ol class="breadcrumb">
          <li><a href="#">Dashboard</a></li>
          <li class="active">All Users</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="white-box">
          <div class="form-inline padding-bottom-15">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <button
                    id="demo-btn-addrow"
                    @click="addNewUser"
                    class="btn btn-outline btn-primary btn-sm"
                  >
                    <i class="icon wb-plus" aria-hidden="true"></i>Add New Row
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <table
            id="demo-foo-addrow"
            class="table table-bordered table-hover toggle-circle"
            data-page-size="7"
          >
            <thead>
              <tr>
                <th data-sort-initial="true" data-toggle="true"></th>
                <th data-sort-initial="true" data-toggle="true">ID</th>
                <th>id</th>
                <th data-sort-initial="true" data-toggle="true">Имя</th>
                <th>Фамилия</th>
                <th data-hide="phone, tablet">Организация</th>
                <th data-hide="phone, tablet">Пин</th>
                <th data-hide="phone, tablet">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="speaker in users" :key="speaker._id">
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-circle btn-lg"
                    @click="openEdit(speaker._id)"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
                <td>{{ speaker.ids }}</td>
                <td>{{ speaker._id }}</td>
                <td>{{ speaker.name }}</td>
                <td>{{ speaker.sname }}</td>
                <td>
                  <span v-if="speaker.organization">
                    {{ speaker.organization.name || "" }}
                  </span>
                </td>
                <td>
                  <span>{{ speaker.pin }}</span>
                </td>
                <td>
                  <a :href="`/user/print/${speaker._id}`" target="_blank">
                    <span class="label label-table label-warning">PRINT</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      users: {}
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    getSpeakers() {
      Request.postJson("/api/admin/users/list", { type: "user" }).then(data => {
        this.users = data;
      });
    },
    openEdit(id) {
      App.Mpage.open({ component: "speaker-detail", data: id });
    },
    addNewUser() {
      App.Mpage.open({ component: "user-add" });
    }
  },
  created() {
    this.getSpeakers();
    this.$root.$on("updateUsersList", () => {
      this.getSpeakers();
    });
  },
  beforeDestroy() {},
  components: {}
};
</script>
