<template>
  <div class="skittles-reg">

<!--	ввод имени, фамилии, email и телефона  -->
    <div class="sr-block" v-if="step === 0">
      <div class="sr-input">
        <div class="sri-label">{{ lang === "en" ? "First name" : "Имя" }}*:</div>
        <input class="sri-val" v-model="user.name" />
      </div>
      <div class="sr-input">
        <div class="sri-label">
          {{ lang === "en" ? "Family name" : "Фамилия" }}*:
        </div>
        <input class="sri-val" v-model="user.sname" />
      </div>
      <div class="sr-input">
        <div class="sri-label">
          E-mail ({{
            lang === "en" ? "not visible to public" : "не виден остальным"
          }})*:
        </div>
        <input class="sri-val" v-model="user.email" />
      </div>
      <div class="sr-input">
        <div class="sri-label">
          {{
            lang === "en"
              ? "Phone number (not visible to public)"
              : "Телефон (не виден остальным)"
          }}:
        </div>
        <input class="sri-val" v-model="user.phone" />
      </div>
      <div class="sr-policy">
        <div class="sr-check"></div>
        <div class="sr-links">
          <template v-if="lang == 'ru'">
            Я согласен с условиями
            <a href="https://wsk2019.ru/ru/policy" target="_blank"
              >политики конфиденциальности</a
            >
          </template>
          <template v-else>
            I agree to
            <a href="https://wsk2019.ru/policy" target="_blank"
              >privacy policy</a
            >
          </template>
        </div>
      </div>
    </div>

<!--	ввод пинкода     -->
    <div class="sr-block" v-if="step == 1">
      <div class="sr-title">
        {{ lang == "en" ? "Set the pin code" : "Задайте pin код" }}
      </div>
      <div class="sr-pin">
        <span v-for="(i, key) in user.password.split('')" v-bind:key="key"
          >*
        </span>
      </div>
      <div class="sr-buttons">
        <div
          class="srb-item"
          v-for="(n, key) in buttons"
          v-bind:key="'n_' + key"
          @click="enterNum(n)"
        >
          {{ n }}
        </div>
        <div class="srb-del" @click="delNum()">
          <div class="srbd-icon"></div>
        </div>
      </div>
    </div>


<!--	показ информации о входе    -->
    <div class="sr-block" v-if="step == 2">
      <div class="sr-label">{{ lang == "en" ? "your id" : "ваш id" }}:</div>
      <div class="sr-val">{{ id }}</div>
      <div class="sr-label">
        {{ lang == "en" ? "your pin code" : "ваш pin код" }}:
      </div>
      <div class="sr-val">{{ user.password }}</div>
      <div class="sr-advice">
        {{
          lang == "en"
            ? "take a screenshot to avoid losing login info"
            : "сделайте скриншот во избежание утери id и pin кода"
        }}
      </div>
    </div>
    <div class="sr-next" v-if="step != 1" @click="nextStep()">
      <template v-if="step < 2"
        >{{ lang == "en" ? "next" : "далее" }}
        <i class="fa fa-angle-right" aria-hidden="true"></i
      ></template>
      <template v-else>{{ lang == "en" ? "log in" : "войти" }}</template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        sname: "",
        email: "",
        phone: "",
        password: ""
      },
      id: "",
      step: 0,
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
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
    enterNum(n) {
      if (this.user.password.length < 4) {
        this.user.password += `${n}`;
      }
      if (this.user.password.length == 4) {
        this.nextStep();
      }
    },
    delNum() {
      this.user.password = this.user.password.substring(
        0,
        this.user.password.length - 1
      );
    },
    nextStep() {
      switch (this.step) {
        case 0:
          if (this.user.name != "" && this.user.sname != "") {
            this.step++;
            break;
          } else if (this.user.name == "" || this.user.sname == "") {
            if (this.lang == "en") {
              swal("Error", "Fill in the required fields", "info");
            } else {
              swal("Ошибка", "Заполните обязательные поля", "info");
            }
            break;
          } else {
            if (this.lang == "en") {
              swal("Error", "Invalid E-mail", "info");
            } else {
              swal("Ошибка", "Некорректный E-mail", "info");
            }
            break;
          }
        case 1:
          if (this.user.password.length == 4) {
            App.User.createUser(this.user).then(data => {
              this.id = data.ids;
            });
            this.step++;
            break;
          } else {
            if (this.lang == "en") {
              swal("Info", "Pin must contain 4 digits", "info");
            } else {
              swal("Ошибка", "Пин должен содержать 4 символа", "error");
            }
            break;
          }
        case 2:
			App.User.login(this.id, this.user.password).then(() => {
				location.href = "/edit";
			});
          break;
      }
    }
  },
  beforeDestroy() {},
  watch: {},
  components: {}
};
</script>

<style lang="scss">
.skittles-reg {
  .sr-block {
    padding-bottom: 50px;
    .sr-input {
      padding: 10px 15px 0;
      .sri-label {
        font-family: "Akrobat";
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #000000;
      }
      .sri-val {
        border: solid 1px #838383;
        width: 100%;
        height: 30px;
        margin: 6px 0 0px;
        outline: none !important;
        &:focus {
          border: solid 1px #62b5e5;
        }
      }
    }
    .sr-title {
      font-family: "Akrobat";
      font-size: 10px;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: #838383;
      text-transform: uppercase;
      margin-top: 20px;
    }
    .sr-pin {
      height: 10px;
      text-align: center;
      font-size: 27px;
      font-family: Montserrat;
      margin-top: 17px;
      letter-spacing: 3px;
    }
    .sr-buttons {
      width: 193px;
      margin: 22px auto 0px;
      display: flex;
      flex-wrap: wrap;
      .srb-item {
        color: white;
        background: #62b5e5;
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        border-radius: 50%;
        margin: 5px 8px;
        transition: 0.2s;
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        &:nth-child(10) {
          margin-left: 72px;
        }
        &:active {
          background: rgb(0, 217, 255);
        }
      }
      .srb-del {
        border: solid 1px #df4661;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin: 5px 8px;
        transition: 0.2s;
        padding: 15px 16px 16px 15px;
        background: white;
        .srbd-icon {
          background: url(/src/build/img/cancel.png) center no-repeat;
          background-size: contain;
          width: 16px;
          height: 16px;
        }
        &:active {
          background: #ff859b;
        }
      }
    }
    .sr-label {
      font-family: Akrobat;
      font-size: 10px;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: #838383;
      text-transform: uppercase;
      margin-top: 34px;
      margin-bottom: 24px;
      &:first-child {
        margin-top: 58px;
      }
    }
    .sr-val {
      font-size: 18px;
      line-height: 0.56;
      letter-spacing: 3.68px;
      text-align: center;
      color: #132d75;
    }
    .sr-advice {
      font-family: Akrobat;
      font-size: 10px;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: #838383;
      text-transform: uppercase;
      margin-top: 45px;
    }
  }
  .sr-next {
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
    .fa-angle-right {
      font-size: 18px;
    }
  }
  .sr-policy {
    padding: 15px;
    display: flex;
    .sr-check {
      background: url(/src/build/img/check_sign_icon_blue.png) center no-repeat;
      background-size: contain;
      width: 27px;
      margin-right: 10px;
      margin-left: 5px;
    }
    .sr-links {
      flex: 1;
      a {
        color: #62b5e5;
        white-space: nowrap;
        line-height: 24px;
      }
    }
  }
}
</style>
