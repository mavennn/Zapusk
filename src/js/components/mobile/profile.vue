<template>
  <div class="skittles-profile" v-if="load">
    <!--   Тут персональная информация   -->
    <div class="sp-block">
      <div class="spb-title">
        Персональная информация
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
                Странa:
              </div>
              <div class="spbcrdr-val">
                {{ user.country }}
              </div>
            </div>

            <!--      Тут город        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                Город:
              </div>
              <div class="spbcrdr-val">{{ user.city }}</div>
            </div>

            <!--      email        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">Email:</div>
              <div class="spbcrdr-val">{{ user.email }}</div>
            </div>
            <div class="spbcrdr-btm-l">
              Не виден остальным
            </div>

            <!--      телефон        -->
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                Телефон
              </div>
              <div class="spbcrdr-val">{{ user.phone }}</div>
            </div>
            <div class="spbcrdr-btm-l">
              Не виден остальным
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Профиль спикера -->
    <div class="sp-block" v-if="user.permission === 'speaker'">
      <div class="spb-title">
        Компания
      </div>
      <div class="spb-content">
        <!--     Организация       -->
        <div class="spbc-row">
          <div class="spbcr-label">
            Компания:
          </div>
          <div class="spbcr-val">{{ user.companyName }}</div>
        </div>

        <!--     Сфера бизнеса     -->
        <div class="spbc-row">
          <div class="spbcr-label">
            Сфера бизнеса
          </div>
          <div class="spbcr-val">
            {{ user.businessSphere }}
          </div>
        </div>

        <!--    Cсылка на сайт компании     -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Ссылка на сайт компании
          </div>
          <div class="spbcw-val">{{ user.companyUrl || "-" }}</div>
        </div>

        <!--     Продукт компании     -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Продукт компании
          </div>
          <div class="spbcw-val">
            {{ user.questionsForSpeaker.yourProduct || "-" }}
          </div>
        </div>

        <!--    Вопрос про задачи      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Какие задачи решает ваша компания
          </div>
          <div class="spbcw-val">
            {{ user.questionsForSpeaker.companyTasks || "-" }}
          </div>
        </div>

        <!--    Вопрос про позиции      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            На какие позиции вам нужны кандидаты
          </div>
          <div class="spbcw-val">
            {{ user.questionsForSpeaker.positions || "-" }}
          </div>
        </div>

        <!--    Вопрос про задачи для кандидатов      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Какие задачи будут поручены кандидатам
          </div>
          <div class="spbcw-val">
            {{ user.questionsForSpeaker.candidatsTasks || "-" }}
          </div>
        </div>

        <!--    Вопрос про стажировку      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Готовы ли вы оплачивать стажировку
          </div>
          <div class="spbcw-val">
            {{ user.questionsForSpeaker.intership || "-" }}
          </div>
        </div>
      </div>
    </div>

    <!-- Профиль участника -->
    <div class="sp-block" v-if="user.permission === 'user'">
      <div class="spb-title">
        Мой ВУЗ
      </div>
      <div class="spb-content">
        <!--     Название вуза       -->
        <div class="spbc-row">
          <div class="spbcr-label">
            Мой ВУЗ
          </div>
          <div class="spbcr-val">{{ user.university }}</div>
        </div>

        <!--     Ваша специальность       -->
        <div class="spbc-row">
          <div class="spbcr-label">
            Моя специальность
          </div>
          <div class="spbcr-val">{{ user.speciality }}</div>
        </div>

        <!--     Год окончания       -->
        <div class="spbc-row">
          <div class="spbcr-label">
            Год окончания
          </div>
          <div class="spbcr-val">{{ user.endingYear }}</div>
        </div>

        <!--    Вопрос про английский      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Каким уровнем английского языка вы владете
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.english || "-" }}
          </div>
        </div>

        <!--    Вопрос про другие языки      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Владеете ли вы другими языками
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.anotherLanguage || "-" }}
          </div>
        </div>

        <!--    Вопрос про деньги      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Представь, что тебе достаточно денег до конца твоей жизни. Чем ты
            будешь заниматься
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.enoughMoney || "-" }}
          </div>
        </div>

        <!--    Вопрос про digital      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Какими digital компетенциями вы обладаете и на каком уровне
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.digital || "-" }}
          </div>
        </div>

        <!--    Вопрос про worldskills      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Участвовали ли вы ранее в чемионате WorldSkills
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.isWorldSkills || "-" }}
          </div>
        </div>

        <!--    Вопрос про Hackatons      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Участвовали ли вы ранее в чемионате хакатонах? Если да, то в каких
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.isHackaton || "-" }}
          </div>
        </div>

        <!--    Вопрос про школы программирвоания      -->
        <div class="spbc-wr">
          <div class="spbcw-label">
            Проходил ли или проходишь сейчас школу или курс программирования
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.courses || "-" }}
          </div>
        </div>

        <div class="spbc-wr">
          <div class="spbcw-label">
            Работаешь ли ты сейчас в любом режиме?
          </div>
          <div class="spbcw-val">
            {{ user.questionsForUser.isWorking || "-" }}
          </div>
        </div>
      </div>
    </div>

    <!--    Теги   -->
    <div class="sp-block">
      <div class="spb-title" v-if="user.permission === 'speaker'">
        Необходимые навыки
      </div>
      <div class="spb-title" v-if="user.permission === 'user'">
        Мои навыки
      </div>
      <div class="spb-content">
        <div class="spbc-onetag" v-for="wsr in user.hardSkills" :key="wsr">
          {{ getNameById(wsr, "hardSkills") }}
        </div>
        <div
          class="spbc-onetag"
          v-for="wsr in user.softSkills"
          :key="softSkills"
        >
          {{ getNameById(wsr, "softSkills") }}
        </div>
      </div>
    </div>

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
      user: {
        prefix: null,
        name: App.User.getName(),
        sname: App.User.getSname(),
        country: "",
        city: "",
        photo: "",
        hardSkills: [],
        softSkills: [],
        permission: "",
        email: App.User.getEmail(),

        /* поля юзера */
        birthday: String,
        university: String,
        speciality: String,
        endingYear: String,
        questionsForUser: {
          digital: String,
          english: String,
          anotherLanguage: String,
          isHackaton: String,
          isWorldSkills: String,
          courses: String,
          enoughMoney: String,
          achievements: String,
          isWorking: String
        },

        /* поля спикера */
        companyName: String,
        companyUrl: String,
        vacanciesUrl: String,
        businessSphere: String,
        questionsForSpeaker: {
          yourProduct: String,
          companyTasks: String,
          positions: String,
          candidatsTasks: String,
          intership: String
        },
        recording_status: Number
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
      })
      .then(() => {
        App.User.getUserInfo().then(data => {
          this.user.name = data.user.name || "";
          this.user.sname = data.user.sname || "";
          this.user.prefix = data.user.prefix || "";
          this.user.photo = data.user.photo || "";
          this.user.country = data.user.country || "";
          this.user.city = data.user.city || "";
          this.user.phone = data.user.phone || "";
          this.user.email = data.user.email || "";
          this.user.permission = data.user.permission || "";
          this.user.hardSkills = data.user.hardSkills || [];
          this.user.softSkills = data.user.softSkills || [];

          if (data.user.permission === "speaker") {
            this.user.companyName = data.user.companyName || "";
            this.user.companyUrl = data.user.companyUrl || "";
            this.user.vacanciesUrl = data.user.vacanciesUrl || "";
            this.user.businessSphere = data.user.businessSphere || "";

            this.user.questionsForSpeaker.yourProduct =
              data.user.questionsForSpeaker.yourProduct || "";
            this.user.questionsForSpeaker.companyTasks =
              data.user.questionsForSpeaker.companyTasks || "";
            this.user.questionsForSpeaker.positions =
              data.user.questionsForSpeaker.positions || "";
            this.user.questionsForSpeaker.candidatsTasks =
              data.user.questionsForSpeaker.candidatsTasks || "";
            this.user.questionsForSpeaker.intership =
              data.user.questionsForSpeaker.intership || "";
          } else if (data.user.permission === "user") {
            this.user.birthday = data.user.birthday || "";
            this.user.university = data.user.university || "";
            this.user.speciality = data.user.speciality || "";
            this.user.endingYear = data.user.endingYear || "";

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
            this.user.questionsForUser.isWorking =
              data.user.questionsForUser.isWorking || "";
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
