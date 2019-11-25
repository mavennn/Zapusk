<template>
  <div>
    <div class="row bg-title">
      <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
        <h4 class="page-title">All Speakers</h4>
      </div>
      <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
        <ol class="breadcrumb">
          <li><a href="#">Dashboard</a></li>
          <li class="active">All Vendors</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="white-box">
          <!--        Add new row Button       -->
          <div class="form-group">
            <button
                    id="demo-btn-addrow"
                    @click="addNewSpeaker"
                    class="btn btn-outline btn-primary btn-sm"
            >
              <i class="icon wb-plus" aria-hidden="true"></i>Add Speaker
            </button>
          </div>
          <h3 class="box-title m-b-0">Speakers list</h3>
          <!--     Speakers table     -->
          <table
            id="demo-foo-addrow"
            class="table table-bordered table-hover toggle-circle"
            data-page-size="7"
          >
            <thead>
              <tr>
                <th data-hide="phone, tablet"></th>
                <th data-hide="phone, tablet">ID</th>
                <th>id</th>
                <th data-sort-initial="true" data-toggle="true">Имя</th>
                <th>Фамилия</th>
                <th data-hide="phone, tablet">Организация</th>
                <th data-hide="phone, tablet">-</th>
                <th data-hide="phone, tablet">Пин</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="speaker in speakers" :key="speaker._id">
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-circle btn-lg"
                    @click="openEdit(speaker._id)"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success btn-circle btn-lg"
                    @click="openDetail(speaker._id)"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                </td>
                <td>{{ speaker.ids }}</td>
                <td>{{ speaker._id }}</td>
                <td>{{ speaker.name }}</td>
                <td>{{ speaker.sname }}</td>
                <td>
                  <span v-if="speaker.companyName">{{
                    speaker.companyName
                  }}</span>
                </td>
                <td>
                  <a :href="`/user/print/${speaker._id}`" target="_blank">
                    <span class="label label-table label-warning">PRINT</span>
                  </a>
                </td>
                <td>{{ speaker.pin }}</td>
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
  name: "speakers",
  data() {
    return {
      speakers: {}
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    getSpeakers() {
      Request.postJson("/api/admin/users/list", { type: "speaker" }).then(
        data => {
          this.speakers = data;
        }
      );
    },
    openEdit(id) {
      App.Mpage.open({ component: "speaker-detail", data: id });
    },
    openDetail(id) {
      App.Mpage.open({ component: "speaker-detail-info", data: id });
    },
    addNewSpeaker() {
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
