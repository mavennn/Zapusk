<template>
  <div class="skittles-profile">
    <div class="sp-block">
      <!-- title персональная информация -->
      <div class="spb-title">
        Персональная информация
      </div>
      <div class="spb-content">
        <!-- фото пользователя -->
        <div class="spbc-row">
          <div class="spbcr-img" :style="getImg(user.photo)">
            <div
              class="spbcri-icon"
              :class="{ 'spbcrii-none': user.photo && user.photo !== '' }"
            ></div>
            <input
              @change="loadFile($event)"
              class="spbcri-input"
              id="img_input"
              type="file"
              accept="image/*"
            />
          </div>
        </div>

        <!-- форма обращения -->
<!--        <div class="spbc-inputgroup">-->
<!--          <div class="spbcig-label">-->
<!--            {{ lang == "en" ? "Prefix" : "Форма обращения" }}*:-->
<!--          </div>-->
<!--          <div class="spbcig-select">-->
<!--            {{-->
<!--              user.prefix ||-->
<!--                (lang == "en" ? "Select prefix" : "Выберите форму обращения")-->
<!--            }}-->
<!--            <i class="fa fa-angle-down" aria-hidden="true"></i>-->
<!--            <div class="spbcigs-click" @click="togglePrefix()"></div>-->
<!--            <div class="spbcigs-dropdown" v-if="prefix_opt">-->
<!--              <div-->
<!--                class="spbcigsd-option"-->
<!--                @click="setPrefix(lang == 'en' ? 'Mr.' : 'г-н')"-->
<!--              >-->
<!--                {{ lang == "en" ? "Mr." : "г-н" }}-->
<!--              </div>-->
<!--              <div-->
<!--                class="spbcigsd-option"-->
<!--                @click="setPrefix(lang == 'en' ? 'Mrs.' : 'г-жа')"-->
<!--              >-->
<!--                {{ lang == "en" ? "Mrs." : "г-жа" }}-->
<!--              </div>-->
<!--              <div-->
<!--                class="spbcigsd-option"-->
<!--                @click="setPrefix(lang == 'en' ? 'Dr.' : 'доктор')"-->
<!--              >-->
<!--                {{ lang == "en" ? "Mrs." : "доктор" }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <!-- Имя -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Имя:
          </div>
          <input
            v-model="user.name"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите имя'"
          />
        </div>

        <!-- Фамилия -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Фамилия:
          </div>
          <input
            v-model="user.sname"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите фамилию'"
          />
        </div>

        <!-- Страна -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Страна:
          </div>
          <div class="spbcig-select">
            {{ getName(user.country, "country") || "Выберите страну" }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
            <div class="spbcigs-click" @click="toggleCountry1()"></div>
            <div class="spbcigs-dropdown" v-if="country1_opt">
              <div
                class="spbcigsd-option"
                @click="setCountry1(c._id)"
                v-for="(c, key) in opts.country"
                v-bind:key="'c' + key"
              >
                {{ c.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Город -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Город:
          </div>
          <input
            v-model="user.city"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите город'"
          />
        </div>

        <!-- Email -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">E-mail*:</div>
          <input
            v-model="user.email"
            class="spbcig-val"
            type="text"
            placeholder="Input your e-mail"
          />
          <div class="spbcig-desc">
            Не виден остальным
          </div>
        </div>

        <!-- Телефон -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Телефон:
          </div>
          <!-- <div class="spbcig-comb">
                        <div class="spbcig-select">
                            +9 11
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                            <div class="spbcigs-dropdown">
                                <div class="spbcigsd-option">+9 11</div>
                            </div>
                        </div>
                        <input class="spbcig-val" type="text" placeholder="Input your phone number" />
                    </div> -->
          <input
            v-model="user.phone"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите телефон'"
          />
          <div class="spbcig-desc">
            Не виден остальным
          </div>
        </div>
      </div>
    </div>
    <div class="sp-block">
      <!-- title организация -->
      <div class="spb-title">ВУЗ*</div>
      <div class="spb-content">
        <!-- Название организации -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Название ВУЗ'а *:
          </div>
          <input
            v-model="user.university"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите название ВУЗ\'а'
            "
          />
        </div>

        <!-- Специальность -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Специальность*:
          </div>
          <input
            v-model="user.speciality"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите специальность'"
          />
        </div>

        <!-- Год окончания -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Год окончания*:
          </div>
          <input
            v-model="user.endingYear"
            class="spbcig-val"
            type="text"
            :placeholder="'Введите год окончания'"
          />
        </div>

        <!-- Вопрос про достаточно денег -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Представь, что тебе достаточно денег до конца твоей жизни. Чем ты будешь заниматься?
          </div>
          <input
            v-model="user.questionsForUser.enoughMoney"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про английский -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Твой уровень владения английским языком:
          </div>
          <input
            v-model="user.questionsForUser.english"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про другой язык -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Владеешь ли ты другим языком ?
          </div>
          <input
            v-model="user.questionsForUser.anotherLanguage"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про Worldskills -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Участвовал ли ты когда-нибудь в чемпионате Worldskills ?
          </div>
          <input
            v-model="user.questionsForUser.isWorldSkills"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про Hackatons -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Участвовал ли ты когда-нибудь в хакатонах? Если да, то в каких ?
          </div>
          <input
            v-model="user.questionsForUser.isHackaton"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про школу программирования -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Проходил ли или проходишь сейчас школу или курс программирования ?
          </div>
          <input
            v-model="user.questionsForUser.courses"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про digital -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Какими digital компетенциями ты обладаешь и на каком уровне ?
          </div>
          <input
            v-model="user.questionsForUser.digital"
            class="spbcig-val"
            type="text"
          />
        </div>

        <!-- Вопрос про работу -->
        <div class="spbc-inputgroup">
          <div class="spbcig-label">
            Работаешь ли ты сейчас в любом режиме ?
          </div>
          <input
            v-model="user.questionsForUser.isWorking"
            class="spbcig-val"
            type="text"
          />
        </div>
      </div>
    </div>

    <!-- Блоr c тегами -->
    <div class="sp-block">
      <!-- Hard Skills -->
      <div class="spb-title">
        Hard Skills*
      </div>
      <div class="spb-content">
        <!-- подсказочка p.s. она может и не нужна -->
        <div class="spbc-advice">
          Нажмите на интересующие вас навыки
        </div>

        <!-- hard skills теги   -->
        <div
          class="spbc-taggroup"
          v-for="(w, key) in opts.hardSkills"
          v-bind:key="'w' + key"
        >
          <div
            @click="toggleHardSkill(w._id)"
            class="spbc-onetag"
            :class="{
              'spbct-active': user.hardSkills && user.hardSkills.includes(w._id)
            }"
          >
            {{ w.name }}
          </div>
          <div
            v-if="![0, 8, 9].includes(key)"
            class="spbc-taginfo"
            @click="
              getTagInfo(
                key,
                user.wsrProducts && user.wsrProducts.includes(w._id)
              )
            "
          ></div>
        </div>

        <!-- title softskills -->
        <div class="spb-title">
          Soft Skills*
        </div>

        <!-- подсказка для softskills -->
        <div class="spbc-advice">
          Нажмите на навыки, интересующие Вас
        </div>

        <!-- тут сами теги -->
        <div
          class="spbc-taggroup"
          v-for="(w, key) in opts.softSkills"
          v-bind:key="'w' + key"
        >
          <div
            @click="toggleSoftSkill(w._id)"
            class="spbc-onetag"
            :class="{
              'spbct-active': user.softSkills && user.softSkills.includes(w._id)
            }"
          >
            {{ w.name }}
          </div>
          <div
            v-if="![0, 8, 9].includes(key)"
            class="spbc-taginfo"
            @click="
              getTagInfo(
                key,
                user.wsrProducts && user.wsrProducts.includes(w._id)
              )
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- кнопочка сохранить -->
    <div class="sp-save" @click="save()">
      Cохранить
    </div>
    <CompDesc :lang="lang" />
  </div>
</template>

<script>
import CompDesc from "./compdesc.vue";
export default {
  data() {
    return {
      permission: "user",
      lang: "ru",
      phonecodes: [""],
      opts: {
        role: []
      },
      prefix_opt: false,
      country1_opt: false,
      country2_opt: false,
      mode_opt: false,
      ind_opt: false,
      role1_opt: false,
      role2_opt: false,
      best_opt: false,
      user: {
        prefix: null,
        name: App.User.getName(),
        sname: App.User.getSname(),
        birthday: "",
        university: "",
        speciality: "",
        endingYear: "",
        country: "",
        city: "",
        photo: "",
        email: App.User.getEmail(),
        hardSkills: [],
        softSkills: [],
        questionsForUser: {
          enoughMoney: "",
          digital: "",
          english: "",
          anotherLanguage: "",
          courses: "",
          isWorldSkills: "",
          isHackaton: "",
          isWorking: ""
        }
      }
    };
  },
  props: {},
  computed: {},
  created() {
    this.lang = localStorageProxy.getItem("lang");
    this.permission = JSON.parse(localStorageProxy.getItem("user")).permission;
    this.$root.$on("selectcomp", obj => {
      this.toggleWsr(this.opts.wsrProducts[obj.id]._id);
    });
    App.User.getTags().then(data => {
      this.opts = data;
      if ((this.lang = "en")) {
        this.opts.wsrProducts[0].name = "Expert society development";
        this.opts.wsrProducts[1].name = "SkillsCamp";
        this.opts.wsrProducts[2].name = "WorldSkills Academy";
        this.opts.wsrProducts[3].name = "SkillsPassport";
        this.opts.wsrProducts[4].name = "FutureSkills";
        this.opts.wsrProducts[5].name = "JuniorSkills";
        this.opts.wsrProducts[6].name = "DigitalSkills";
        this.opts.wsrProducts[7].name =
          "WorldSkills Hi-Tech and industry competitions";
        this.opts.wsrProducts[8].name = "Skills of the Wise";
        this.opts.wsrProducts[9].name =
          "Transformation of national/regional skills development system";
      }
    });
    App.User.getUserInfo().then(data => {
      this.user.name = data.user.name;
      this.user.sname = data.user.sname;
      this.user.birthday = data.user.birthday || "";
      this.user.email = data.user.email;
      this.user.prefix = data.user.prefix || "";
      this.user.photo = data.user.photo || "";
      this.user.country = data.user.country || "";
      this.user.city = data.user.city || "";
      this.user.phone = data.user.phone || "";
      this.user.hardSkills = data.user.hardSkills || [];
      this.user.softSkills = data.user.softSkills || [];
      this.user.university = data.user.university || "";
      this.user.speciality = data.user.speciality || "";
      this.user.endingYear = data.user.endingYear || "";

      /* вопросы */
      this.user.questionsForUser.enoughMoney =
        data.user.questionsForUser.enoughMoney || "";
      this.user.questionsForUser.digital =
        data.user.questionsForUser.digital || "";
      this.user.questionsForUser.english =
        data.user.questionsForUser.english || "";
      this.user.questionsForUser.anotherLanguage =
        data.user.questionsForUser.anotherLanguage || "";
      this.user.questionsForUser.isWorldSkills =
        data.user.questionsForUser.isWorldSkills || "";
      this.user.questionsForUser.isHackaton =
        data.user.questionsForUser.isHackaton || "";
      this.user.questionsForUser.courses =
        data.user.questionsForUser.courses || "";
      this.user.questionsForUser.isWorldSkills =
        data.user.questionsForUser.isWorking || "";
    });
  },
  methods: {
    getTagInfo(key, selected) {
      this.$root.$emit("compdesc", { id: key, selected: selected });
    },
    save() {
      App.User.editProfile(this.user)
        .then(() => {
          // App.Mpage.closeLast();
          location.href="/profile";
          // this.goRoute("/profile");
        })
        .catch(() => {
            swal("Ошибка", "Заполните обязательные поля", "error");
        });
    },
    convertImg() {
      const file = document.getElementById("img_input").files[0];
      toBase64(file).then(data => {
        this.user.photo = data;
      });
    },
    getName(arr, opt) {
      let str = "";
      let arr1 = [];
      if (typeof arr == "string" || typeof arr == "undefined") {
        arr1.push(arr);
      } else {
        arr1 = arr;
      }
      arr1.forEach(item => {
        if (this.opts[opt])
          this.opts[opt].forEach(elem => {
            if (item == elem._id) {
              str += `${elem.name}, `;
            }
          });
      });
      return str.slice(0, str.length - 2);
    },
    getNameRole(id) {
      let str = "";
      if (!this.opts.role) return str;
      this.opts.role.forEach(elem => {
        if (id == elem._id) {
          str += `${elem.name}`;
        }
      });
      return str;
    },
    getImg(url) {
      if (url != "") {
        return `background: url(${url}) center no-repeat`;
      } else {
        return `background: white`;
      }
    },
    loadFile(event) {
      let someFiles = event.target.files[0];
      this.upload(someFiles);
    },
    upload(file) {
      if (
        file.name.toLowerCase().indexOf("jpg") === -1 &&
        file.name.toLowerCase().indexOf("png") === -1 &&
        file.name.toLowerCase().indexOf("jpeg") === -1
      )
        return swal("Error", "File format must be jpg, png or jpeg!", "error");
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.upload.onprogress = event => {};
      let filena = file.name.toLowerCase().split(".")[
        file.name.toLowerCase().split(".").length - 1
      ];
      that.photo = App.User.arUser._id + "." + filena;
      xhr.onload = xhr.onerror = function() {
        if (this.status == 200) {
          let data;
          try {
            data = JSON.parse(this.response);
            if (isJson(data)) {
              that.user.photo = "/src/img/photos/" + that.photo;
            } else {
              swal("Error", ans(data), "error");
            }
          } catch (e) {
            swal("Error", "Error", "error");
          }
        } else {
        }
      };
      xhr.open(
        "POST",
        "/api/user/loadphoto/" + App.User.arUser._id + "." + filena,
        true
      );
      xhr.send(file);
    },
    togglePrefix() {
      this.country1_opt = false;
      this.role1_opt = false;
      this.role2_opt = false;
      this.country2_opt = false;
      this.mode_opt = false;
      this.ind_opt = false;
      this.prefix_opt = !this.prefix_opt;
      this.best_opt = false;
    },
    setPrefix(v) {
      this.user.prefix = v;
      this.prefix_opt = false;
    },
    toggleCountry1() {
      this.prefix_opt = false;
      this.role1_opt = false;
      this.role2_opt = false;
      this.country2_opt = false;
      this.mode_opt = false;
      this.ind_opt = false;
      this.country1_opt = !this.country1_opt;
      this.best_opt = false;
    },
    setCountry1(v) {
      this.user.country = v;
      this.country1_opt = false;
    },
    toggleCountry2() {
      this.prefix_opt = false;
      this.role1_opt = false;
      this.role2_opt = false;
      this.country1_opt = false;
      this.mode_opt = false;
      this.ind_opt = false;
      this.country2_opt = !this.country2_opt;
      this.best_opt = false;
    },
    setCountry2(v) {
      if (this.user.partnership.country.includes(v)) {
        this.user.partnership.country.forEach((item, i) => {
          if (item == v) {
            this.user.partnership.country.splice(i, 1);
          }
        });
      } else {
        if (this.user.partnership.country.length < 3) {
          this.user.partnership.country.push(v);
          if (this.user.partnership.country.length == 3) {
            this.country2_opt = false;
          }
        }
      }
    },
    toggleMode() {
      this.prefix_opt = false;
      this.role1_opt = false;
      this.role2_opt = false;
      this.country1_opt = false;
      this.country2_opt = false;
      this.ind_opt = false;
      this.mode_opt = !this.mode_opt;
      this.best_opt = false;
    },
    setMode(v) {
      if (this.user.partnership.partnershipMode.includes(v)) {
        this.user.partnership.partnershipMode.forEach((item, i) => {
          if (item == v) {
            this.user.partnership.partnershipMode.splice(i, 1);
          }
        });
      } else {
        if (this.user.partnership.partnershipMode.length < 3) {
          this.user.partnership.partnershipMode.push(v);
          if (this.user.partnership.partnershipMode.length == 3) {
            this.mode_opt = false;
          }
        }
      }
    },
    toggleInd() {
      this.prefix_opt = false;
      this.role1_opt = false;
      this.role2_opt = false;
      this.country1_opt = false;
      this.country2_opt = false;
      this.mode_opt = false;
      this.ind_opt = !this.ind_opt;
      this.best_opt = false;
    },
    setInd(v) {
      if (this.user.partnership.industry.includes(v)) {
        this.user.partnership.industry.forEach((item, i) => {
          if (item == v) {
            this.user.partnership.industry.splice(i, 1);
          }
        });
      } else {
        if (this.user.partnership.industry.length < 3) {
          this.user.partnership.industry.push(v);
          if (this.user.partnership.industry.length == 3) {
            this.ind_opt = false;
          }
        }
      }
    },
    toggleBest() {
      this.prefix_opt = false;
      this.role1_opt = false;
      this.role2_opt = false;
      this.country1_opt = false;
      this.country2_opt = false;
      this.mode_opt = false;
      this.ind_opt = false;
      this.best_opt = !this.best_opt;
    },
    setBest(v) {
      if (this.user.partnership.bestPractice.includes(v)) {
        this.user.partnership.bestPractice.forEach((item, i) => {
          if (item == v) {
            this.user.partnership.bestPractice.splice(i, 1);
          }
        });
      } else {
        if (this.user.partnership.bestPractice.length < 3) {
          this.user.partnership.bestPractice.push(v);
          if (this.user.partnership.bestPractice.length == 3) {
            this.best_opt = false;
          }
        }
      }
    },
    toggleRole1() {
      this.prefix_opt = false;
      this.country1_opt = false;
      this.country2_opt = false;
      this.mode_opt = false;
      this.ind_opt = false;
      this.role2_opt = false;
      this.role1_opt = !this.role1_opt;
      this.best_opt = false;
    },
    setRole1(v) {
      this.user.organization.role = v;
      this.role1_opt = false;
    },
    toggleRole2() {
      this.prefix_opt = false;
      this.country1_opt = false;
      this.country2_opt = false;
      this.mode_opt = false;
      this.ind_opt = false;
      this.role1_opt = false;
      this.role2_opt = !this.role2_opt;
      this.best_opt = false;
    },
    setRole2(v) {
      if (this.user.partnership.role.includes(v)) {
        this.user.partnership.role.forEach((item, i) => {
          if (item == v) {
            this.user.partnership.role.splice(i, 1);
          }
        });
      } else {
        if (this.user.partnership.role.length < 3) {
          this.user.partnership.role.push(v);
          if (this.user.partnership.role.length == 3) {
            this.role2_opt = false;
          }
        }
      }
    },
    toggleWsr(v) {
      if (this.user.wsrProducts.includes(v)) {
        this.user.wsrProducts.forEach((item, i) => {
          if (item == v) {
            this.user.wsrProducts.splice(i, 1);
          }
        });
      } else {
        this.user.wsrProducts.push(v);
      }
    },
    toggleHardSkill(v) {
      if (this.user.hardSkills.includes(v)) {
        this.user.hardSkills.forEach((item, i) => {
          if (item == v) {
            this.user.hardSkills.splice(i, 1);
          }
        });
      } else {
        this.user.hardSkills.push(v);
      }
    },
    toggleSoftSkill(v) {
      if (this.user.softSkills.includes(v)) {
        this.user.softSkills.forEach((item, i) => {
          if (item == v) {
            this.user.softSkills.splice(i, 1);
          }
        });
      } else {
        this.user.softSkills.push(v);
      }
    }
  },
  beforeDestroy() {},
  watch: {},
  components: {
    CompDesc
  }
};
</script>

<style lang="scss" scoped>
.skittles-profile {
  padding: 70px 15px;
  .sp-block {
    padding-bottom: 10px;
    .spb-title {
      font-family: Akrobat;
      font-size: 12px;
      line-height: 1.08;
      letter-spacing: normal;
      color: #000000;
      text-transform: uppercase;
      padding: 7px 0;
      border-bottom: solid 1px #979797;
    }
    .spb-content {
      padding: 9px 0 0px;
      .spbc-row {
        display: flex;
        .spbcr-img {
          border: solid 1px #979797;
          width: 54px;
          height: 54px;
          position: relative;
          padding: 14px;
          background-size: cover !important;
          .spbcri-icon {
            width: 24px;
            height: 24px;
            background: url(/src/build/img/camera.png) center no-repeat;
            background-size: contain;
            &.spbcrii-none {
              background: transparent;
            }
          }
          .spbcri-input {
            top: 0;
            width: 0;
            height: 0;
            left: 0;
            position: absolute;
            &:before {
              content: "";
              display: block;
              width: 54px;
              height: 54px;
            }
          }
        }
      }
      .spbc-inputgroup {
        padding-top: 10px;
        .spbcig-label {
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: normal;
          color: #132d75;
          padding-bottom: 6px;
        }
        .spbcig-select {
          border: solid 1px #838383;
          position: relative;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.75;
          color: black;
          padding: 4px 31px 4px 10px;
          .fa-angle-down {
            color: #838383;
            position: absolute;
            top: 7px;
            right: 11px;
            font-size: 16px;
          }
          .spbcigs-click {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .spbcigs-dropdown {
            display: block;
            margin-left: -1px;
            border: solid 1px #838383;
            position: absolute;
            top: 29px;
            left: 0;
            width: calc(100% + 2px);
            background: white;
            z-index: 1000;
            max-height: 150px;
            overflow-y: auto;
            .spbcigsd-option {
              padding: 10px;
            }
          }
        }
        .spbcig-val {
          border: solid 1px #838383;
          padding: 3px 10px;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.75;
          letter-spacing: normal;
          color: black;
          width: 100%;
        }
        .spbcig-desc {
          font-family: Akrobat;
          font-size: 10px;
          font-weight: 300;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.2;
          letter-spacing: normal;
          color: #838383;
          margin-top: 3px;
        }
        .spbcig-comb {
          display: flex;
          .spbcig-val {
            flex: 1;
          }
          .spbcig-select {
            margin-right: 10px;
            width: 65px;
          }
        }
      }
      .spbc-advice {
        font-family: Akrobat;
        font-size: 10px;
        line-height: 1.2;
        letter-spacing: normal;
        color: #838383;
        text-transform: uppercase;
        padding-bottom: 10px;
      }
      .spbc-taggroup {
        display: flex;
        margin-bottom: 13px;
        .spbc-onetag {
          font-family: Akrobat;
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: normal;
          color: #838383;
          border-radius: 13px;
          border: solid 1px #cccccc;
          padding: 3px 10px 2px 22px;
          position: relative;
          width: fit-content;
          &:before {
            content: "";
            display: block;
            top: 3px;
            left: 3px;
            width: 12px;
            height: 12px;
            position: absolute;
            border: 1px solid #cccccc;
            border-radius: 50%;
          }
          &:after {
            content: "";
            display: none;
            top: 6px;
            left: 6px;
            width: 8px;
            height: 8px;
            position: absolute;
            background: #479ccf;
            border-radius: 50%;
          }
          &.spbct-active {
            border: solid 1px #479ccf;
            color: #000000;
            &:before {
              border: 1px solid #479ccf;
            }
            &:after {
              display: block;
            }
          }
        }
        .spbc-taginfo {
          background: url(/src/build/img/info.png) center no-repeat;
          background-size: contain;
          width: 14px;
          margin-left: 12px;
        }
      }
    }
  }
  .sp-save {
    margin-bottom: -70px;
    margin-top: 20px;
    margin-left: -15px;
    width: calc(100% + 30px);
    background-color: #62b5e5;
    color: white;
    text-align: center;
    padding: 10px;
    text-transform: uppercase;
    font-size: 14px;
  }
}
</style>
