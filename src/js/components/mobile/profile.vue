<template>
  <div class="skittles-profile" v-if="load">

<!--   Тут персональная информация   -->
    <div class="sp-block">
      <div class="spb-title">
        {{ lang == "en" ? "Personal Info" : "Персональная информация" }}
      </div>
      <div class="spb-content">
        <div class="spbc-row">
          <div class="spbcr-img" :style="getImg(user.photo)"></div>
          <div class="spbcr-desc">

<!--      Тут имя        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "Name" : "Имя" }}:
              </div>
              <div class="spbcrdr-val">{{ user.name }} {{ user.sname }}</div>
            </div>

<!--      Тут страна        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "Country" : "Страна" }}:
              </div>
              <div class="spbcrdr-val">
                {{ user.country }}
              </div>
            </div>

<!--      Тут город        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "City" : "Город" }}:
              </div>
              <div class="spbcrdr-val">{{ user.city }}</div>
            </div>

<!--      email        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">Email:</div>
              <div class="spbcrdr-val">{{ user.email }}</div>
            </div>
            <div class="spbcrdr-btm-l">
              {{
                lang == "en"
                  ? "Not visible in public profile"
                  : "Не виден остальным"
              }}
            </div>

<!--      телефон        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "Phone" : "Телефон" }}:
              </div>
              <div class="spbcrdr-val">{{ user.phone }}</div>
            </div>
            <div class="spbcrdr-btm-l">
              {{
                lang == "en"
                  ? "Not visible in public profile"
                  : "Не виден остальным"
              }}
            </div>

          </div>
        </div>
      </div>
    </div>


    <div class="sp-block">
      <div class="spb-title">
        {{ lang == "en" ? "My organization" : "Моя организация" }}
      </div>
      <div class="spb-content">
        <div class="spbc-row">

<!--     Организация пользователя       -->
          <div class="spbcr-label">
            {{ lang == "en" ? "Organization" : "Организация" }}:
          </div>
          <div class="spbcr-val">{{ user.organization.name }}</div>
        </div>

<!--     Должность пользователя     -->
        <div class="spbc-row">
          <div class="spbcr-label">
            {{ lang == "en" ? "Position" : "Должность" }}:
          </div>
          <div class="spbcr-val">{{ user.organization.position }}</div>
        </div>

<!--     Роль     -->
        <div class="spbc-row">
          <div class="spbcr-label">{{ lang == "en" ? "Role" : "Роль" }}:</div>
          <div class="spbcr-val">
            {{ user.organization.role }}
          </div>
        </div>

<!--     Вопрос про проблемы     -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            {{
              lang == "en"
                ? "What main issues/problems do you have in your country/organization in skills development?"
                : "Какие главные проблемы в Вашей организации/стране в развитии навыков?"
            }}:
          </div>
          <div class="spbcw-val">{{ user.organization.problems || "-" }}</div>
        </div>

<!--     Вопрос про перспективы     -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            {{
              lang == "en"
                ? "What perspectives/vision/goals/possibilities do you see for your country/organization?"
                : "Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?"
            }}:
          </div>
          <div class="spbcw-val">
            {{ user.organization.perspectives || "-" }}
          </div>
        </div>

<!--    Вопрос про преграды      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            {{
              lang == "en"
                ? "What main obstacles/barriers do you see on your way to your vision/goals?"
                : "Какие преграды Вы видите на пути к Вашим целям?"
            }}:
          </div>
          <div class="spbcw-val">{{ user.organization.barriers || "-" }}</div>
        </div>

      </div>
    </div>

<!--   Моя презентация   -->
    <div class="sp-block" v-if="user.presentation">
      <div class="spb-title">
        {{ lang == "en" ? "My Presentation" : "Моя презентация" }}
      </div>
      <div class="spb-content">
        <div class="spbc-block">
          <div class="spbc-event">
            <div class="spbce-title">{{ presentation.subject }}</div>
            <div class="spbce-divider">
              <div class="spbced-border"></div>
            </div>
            <div class="spbce-time">25 AUG 10:30</div>
          </div>
          <div class="spbc-button">
            <a :href="presentation.link" target="_blank"
              >Tap to open pitchdeck</a
            >
          </div>
        </div>
      </div>
    </div>

<!--   Продукты WSR, в которых я заинтересован   -->
<!--    <div class="sp-block">-->
<!--      <div class="spb-title">-->
<!--        {{-->
<!--          lang == "en"-->
<!--            ? "WSR Products  I am interested in"-->
<!--            : "Продукты WSR, в которых я заинтересован"-->
<!--        }}-->
<!--      </div>-->
<!--      <div class="spb-content">-->
<!--        <div class="spbc-onetag" v-for="wsr in user.wsrProducts" :key="wsr">-->
<!--          {{ getNameById(wsr, "wsrProducts") }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    Теги   -->
      <div class="sp-block">
          <div class="spb-title">
              {{
              lang == "en"
              ? "My Skills"
              : "Мои навыки"
              }}
          </div>
          <div class="spb-content">
              <div class="spbc-onetag" v-for="wsr in user.hardSkills" :key="wsr">
                  {{ getNameById(wsr, "hardSkills") }}
              </div>
              <div class="spbc-onetag" v-for="wsr in user.softSkills" :key="softSkills">
                  {{ getNameById(wsr, "softSkills") }}
              </div>
          </div>
      </div>

<!--   Cотрудничества, в которых я заинтересован   -->
<!--    <div class="sp-block" v-if="user.partnership">-->
<!--      <div class="spb-title">-->
<!--        {{-->
<!--          lang == "en"-->
<!--            ? "Partnership I am interested in"-->
<!--            : "Сотрудничества, в которых я заинтересован"-->
<!--        }}-->
<!--      </div>-->
<!--      <div class="spb-content">-->
<!--        <div class="spbc-group">-->
<!--          <div class="spbcg-title">-->
<!--            {{ lang == "en" ? "Country" : "Страны" }}:-->
<!--          </div>-->
<!--          <div class="spbcg-body">-->
<!--            <div-->
<!--              class="spbcgb-tag"-->
<!--              v-for="country in user.partnership.country"-->
<!--              :key="country"-->
<!--            >-->
<!--              {{ getNameById(country, "country") }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="spbc-group">-->
<!--          <div class="spbcg-title">-->
<!--            {{ lang == "en" ? "Partnership mode" : "Вид сотрудничества" }}:-->
<!--          </div>-->
<!--          <div class="spbcg-body">-->
<!--            <div-->
<!--              class="spbcgb-tag"-->
<!--              v-for="mode in user.partnership.partnershipMode"-->
<!--              :key="mode"-->
<!--            >-->
<!--              {{ getNameById(mode, "partnershipMode") }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="spbc-group">-->
<!--          <div class="spbcg-title">-->
<!--            {{ lang == "en" ? "Industry" : "Отрасль" }}:-->
<!--          </div>-->
<!--          <div class="spbcg-body">-->
<!--            <div-->
<!--              class="spbcgb-tag"-->
<!--              v-for="industry in user.partnership.industry"-->
<!--              :key="industry"-->
<!--            >-->
<!--              {{ getNameById(industry, "industry") }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="spbc-group">-->
<!--          <div class="spbcg-title">-->
<!--            {{ lang == "en" ? "Best practice" : "Лучшая практика" }}:-->
<!--          </div>-->
<!--          <div class="spbcg-body">-->
<!--            <div-->
<!--              class="spbcgb-tag"-->
<!--              v-for="bestPractice in user.partnership.bestPractice"-->
<!--              :key="bestPractice"-->
<!--            >-->
<!--              {{ getNameById(bestPractice, "bestPractice") }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="permission != 'user'" class="spbc-group">-->
<!--          <div class="spbcg-title">{{ lang == "en" ? "Role" : "Роль" }}:</div>-->
<!--          <div class="spbcg-body">-->
<!--            <div-->
<!--              class="spbcgb-tag"-->
<!--              v-for="role in user.partnership.role"-->
<!--              :key="role"-->
<!--            >-->
<!--              {{ getNameById(role, "role") }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="sp-next" @click="goRoute('/edit')">
      edit
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permission: "user",
      lang: "en",
      load: false,
      opts: {
        role: [],
        country: [],
        wsrProducts: [],
      },
      user: {
        prefix: null,
        name: App.User.getName(),
        sname: App.User.getSname(),
        prefname: "",
        country: "",
        city: "",
        photo: "",
        email: App.User.getEmail(),
        organization: {
          name: "",
          position: "",
          role: "",
          problems: "",
          perspectives: "",
          barriers: ""
        },
        wsrProducts: [],
        partnership: {
          country: [], // max - 3
          partnershipMode: [], // max - 3
          bestPractice: [],
          industry: [], // max - 3
          role: [] // max - 3
        },
        hardSkills: [],
        softSkills: [],
      }
    };
  },
  props: {},
  computed: {},
  created() {
    this.lang = localStorageProxy.getItem("lang");
    this.permission = JSON.parse(localStorageProxy.getItem("user")).permission;
    App.User.getTags()
      .then(data => {
          this.opts = data;
        // if ((this.lang = "en")) {
        //   this.opts.wsrProducts[0].name = "Expert society development";
        //   this.opts.wsrProducts[1].name = "SkillsCamp";
        //   this.opts.wsrProducts[2].name = "WorldSkills Academy";
        //   this.opts.wsrProducts[3].name = "SkillsPassport";
        //   this.opts.wsrProducts[4].name = "FutureSkills";
        //   this.opts.wsrProducts[5].name = "JuniorSkills";
        //   this.opts.wsrProducts[6].name = "DigitalSkills";
        //   this.opts.wsrProducts[7].name =
        //     "WorldSkills Hi-Tech and industry competitions";
        //   this.opts.wsrProducts[8].name = "Skills of the Wise";
        //   this.opts.wsrProducts[9].name =
        //     "Transformation of national/regional skills development system";
        // }
      })
      .then(() => {
        App.User.getUserInfo().then(data => {
          this.user.name = data.user.name || "";
          this.user.sname = data.user.sname || "";
          this.user.prefix = data.user.prefix || "";
          this.user.photo = data.user.photo || "";
          this.user.prefname = data.user.prefname || "";
          this.user.country = data.user.country || "";
          this.user.city = data.user.city || "";
          this.user.phone = data.user.phone || "";
          this.user.email = data.user.email || "";
          this.user.hardSkills = data.user.hardSkills || [];
          this.user.softSkills = data.user.softSkills || [];
          if (data.user.organization) {
            this.user.organization.name = data.user.organization.name || "";
            this.user.organization.position =
              data.user.organization.position || "";
            this.user.organization.role = data.user.organization.role || "";
            this.user.organization.problems =
              data.user.organization.problems || "";
            this.user.organization.perspectives =
              data.user.organization.perspectives || "";
            this.user.organization.barriers =
              data.user.organization.barriers || "";
          }
          if (data.user.wsrProducts) {
            this.user.wsrProducts.push(...data.user.wsrProducts);
          }

          if (data.user.partnership) {
            if (data.user.partnership.country) {
              this.user.partnership.country.push(
                ...data.user.partnership.country
              );
            }
            if (data.user.partnership.partnershipMode) {
              this.user.partnership.partnershipMode.push(
                ...data.user.partnership.partnershipMode
              );
            }
            if (data.user.partnership.industry) {
              this.user.partnership.industry.push(
                ...data.user.partnership.industry
              );
            }
            if (data.user.partnership.bestPractice) {
              this.user.partnership.bestPractice.push(
                ...data.user.partnership.bestPractice
              );
            }
            if (data.user.partnership.role) {
              this.user.partnership.role.push(...data.user.partnership.role);
            }
          }
          this.load = true;
        });
      });
  },
  methods: {
    getUserInfo() {},
    getImg(url) {
      if (!url) return "background: grey";
      return `background: url(${url}) center no-repeat`;
    },
    getName(arr, opt) {
      let str = "";
      let arr1 = [];
      if (typeof arr == "string" || typeof arr == "undefined") {
        arr1.push(arr);
      } else {
        arr1 = arr;
      }
      if (undefined === arr1) {
        console.log(opt);
      }

      // arr1.forEach(item => {
      //   this.opts[opt].forEach(elem => {
      //     if (item == elem._id) {
      //       str += `${elem.name}, `;
      //     }
      //   });
      // });
      return str.slice(0, str.length - 2);
    },
    getNameById(id, opt) {
      if (empty(this.opts[opt])) return false;
      return this.opts[opt].filter(v => v._id == id)[0].name;
    }
  },
  beforeDestroy() {},
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.skittles-profile {
  padding: 70px 15px;
  .sp-block {
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
        padding-bottom: 13px;
        display: flex;
        .spbcr-img {
          background-size: cover !important;
          width: 54px;
          height: 54px;
        }
        .spbcr-desc {
          flex: 1;
          margin-left: 17px;
          .spbcrd-row {
            display: flex;
            margin-bottom: 4px;
            .spbcrdr-label {
              width: 74px;
              font-family: Akrobat;
              font-size: 12px;
              line-height: 1;
              letter-spacing: -0.3px;
              color: #17479e;
            }
            .spbcrdr-val {
              font-family: Akrobat;
              font-size: 12px;
              line-height: 1;
              letter-spacing: -0.3px;
              color: #132d75;
            }
          }
          .spbcrdr-btm-l {
            font-size: 10px;
            color: #838383;
            letter-spacing: 0;
            line-height: 12px;
          }
        }
        .spbcr-label {
          flex: 1;
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #17479e;
        }
        .spbcr-val {
          flex: 1;
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #132d75;
        }
      }
      .spbc-wr {
        .spbcw-label {
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #17479e;
          margin-bottom: 10px;
        }
        .spbcw-val {
          font-family: Akrobat;
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #132d75;
          margin-bottom: 10px;
        }
      }
      .spbc-block {
        padding-bottom: 12px;
        .spbc-event {
          display: flex;
          .spbce-title {
            font-family: Akrobat;
            font-size: 12px;
            font-weight: 600;
            line-height: 0.83;
            letter-spacing: normal;
            color: #17479e;
            text-transform: uppercase;
          }
          .spbce-divider {
            flex: 1;
            padding: 4px;
            .spbced-border {
              border-bottom: dashed 1px #132d75;
              width: 100%;
            }
          }
          .spbce-time {
            font-family: Akrobat;
            font-size: 12px;
            font-weight: 600;
            line-height: 0.83;
            letter-spacing: normal;
            text-align: right;
            color: #4a4a4a;
            text-transform: uppercase;
          }
        }
        .spbc-button {
          font-family: Akrobat;
          font-size: 10px;
          font-weight: 600;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.2;
          letter-spacing: normal;
          color: #838383;
          text-transform: uppercase;
          margin-top: 5px;
        }
      }
      .spbc-onetag {
        font-family: Akrobat;
        font-size: 10px;
        line-height: 1.5;
        letter-spacing: normal;
        color: #000000;
        border-radius: 13px;
        border: solid 1px #479ccf;
        padding: 3px 10px 2px 22px;
        position: relative;
        width: fit-content;
        margin-bottom: 13px;
        &:before {
          content: "";
          display: block;
          top: 3px;
          left: 3px;
          width: 12px;
          height: 12px;
          position: absolute;
          border: 1px solid #479ccf;
          border-radius: 50%;
        }
        &:after {
          content: "";
          display: block;
          top: 6px;
          left: 6px;
          width: 8px;
          height: 8px;
          position: absolute;
          background: #479ccf;
          border-radius: 50%;
        }
      }
      .spbc-group {
        .spbcg-title {
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #17479e;
          margin-bottom: 10px;
        }
        .spbcg-body {
          display: flex;
          flex-wrap: wrap;
          .spbcgb-tag {
            font-family: Akrobat;
            font-size: 10px;
            line-height: 1.5;
            letter-spacing: normal;
            color: #000000;
            border-radius: 13px;
            border: solid 1px #479ccf;
            padding: 3px 10px 2px 22px;
            position: relative;
            width: fit-content;
            margin-bottom: 13px;
            margin-right: 10px;
            &:before {
              content: "";
              display: block;
              top: 3px;
              left: 3px;
              width: 12px;
              height: 12px;
              position: absolute;
              border: 1px solid #479ccf;
              border-radius: 50%;
            }
            &:after {
              content: "";
              display: block;
              top: 6px;
              left: 6px;
              width: 8px;
              height: 8px;
              position: absolute;
              background: #479ccf;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .sp-next {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: #62b5e5;
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    text-align: center;
    padding: 11px;
    left: 0;
  }
}
</style>
