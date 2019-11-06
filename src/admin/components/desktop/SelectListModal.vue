<template>
  <div>
    <h4>{{ data.title }}</h4>

    <loadingc v-if="load" style="height: 300px;"></loadingc>

    <template v-if="!load">
      <div class="sellist_vser_block">
        <input
          class="form-control input-sm"
          placeholder="Поиск по значениям"
          v-if="(multi || !val) && !add_mode"
          v-model="search"
        />

        <div v-if="add_mode" class="sellist_add_mode">
          <input
            class="form-control input-sm"
            placeholder="Новое значение"
            v-model="search"
          />
          <button class="btn btn-success btn-sm" @click="addVal">
            Добавить
          </button>
        </div>

        <div
          v-if="add"
          class="sellist_addbtn"
          :class="{ 'text-success': !add_mode, 'text-default': add_mode }"
          @click="add_mode = !add_mode"
        >
          {{ add_mode ? "Отменить" : "Добавить свойство" }}
        </div>

        <div class="sellist_ft_block" v-if="multi && vals.length">
          <template>
            <div class="sellist_ft_sel_item" v-for="item in vals">
              <div class="sel_fib_sname">{{ item.sval || item.val }}</div>
              <div class="sel_fib_remove" @click="removeSel(item.key)">
                <i class="fa fa-times"></i>
              </div>
            </div>
          </template>
        </div>

        <button
          v-if="!multi && val"
          class="btn btn-success btn-sm waves-effect waves-light"
        >
          <span class="btn-label" @click="removeSel"
            ><i class="fa fa-remove"></i
          ></span>
          <b>Выбрано:</b> {{ val.sval || val.val }}
        </button>
      </div>
      <div class="selli_block_list">
        <div v-for="item in listItems">
          <div
            class="selli_valsli"
            :class="{ selected: selected[item.key] }"
            @click="select(item)"
          >
            {{ item.val }}
          </div>
        </div>
        <h4 v-if="!listItems.length" class="text-center">
          Значений не найдено
        </h4>
      </div>

      <div class="selli_bts text-right">
        <button class="btn btn-default btn-sm" @click="close">Закрыть</button>
        <button class="btn btn-success btn-sm" @click="done">Выбрать</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      search: "",
      load: true,
      list: [],
      multi: false,
      val: false,
      vals: [],
      selected: {},
      add: false,
      add_mode: false
    };
  },
  created() {
    this.multi = this.data.multi;
    this.SelectList = this.data.SelectList;
    this.add = this.SelectList.canAdd;
    this.SelectList.list().then(data => {
      this.list = data;
      if (this.data.val) {
        if (this.multi) {
          this.vals = this.data.val.map(val =>
            this.list.find(item => item.key == val)
          );
          this.vals.forEach(val => this.$set(this.selected, val.key, true));
        } else this.val = this.list.find(item => item.key == this.data.val);
      }

      this.load = false;
    });
  },
  methods: {
    select(item) {
      if (!this.multi) this.val = item;
      else {
        if (this.selected[item.key]) return this.removeSel(item.key);
        this.$set(this.selected, item.key, true);
        this.vals.push(item);
      }
    },
    removeSel(key) {
      if (!this.multi) {
        this.val = false;
      } else {
        let index = this.vals.findIndex(val => val.key == key);
        if (index > -1) {
          this.vals.splice(index, 1);
          this.$set(this.selected, key, false);
        }
      }
    },
    done() {
      this.SelectList.res(this.multi ? this.vals : this.val);
      App.Modal.close();
    },
    close() {
      this.SelectList.rej();
      App.Modal.close();
    },

    addVal() {
      console.log("this.search", this.search);

      if (empty(this.search))
        return swal("Ошибка", "Выберете значение", "error");

      this.SelectList.add({ name: this.search })
        .then(data => {
          this.add_mode = false;
          this.list.push(data);
        })
        .catch(requestError);
    }
  },
  computed: {
    listItems() {
      if (this.search.length < 3) return this.list;
      return this.list.filter(
        val => val.val.search(new RegExp(this.search, "i")) > -1
      );
    }
    //reg.test(str)
  }
};
</script>

<style lang="scss">
.sellist_add_mode {
  white-space: nowrap;
  display: flex;
  input {
    width: 300px;
  }
  button {
  }
}

.sellist_vser_block {
  margin-bottom: 10px;
  position: relative;
}
.sellist_addbtn {
  position: absolute;
  top: -30px;
  right: 0px;
  font-size: 12px;
  cursor: pointer;
}

.selli_block_list {
  height: 200px;
  overflow: scroll;
}

.selli_valsli {
  padding: 6px 10px;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
  &.selected {
    color: #00c292;
    font-weight: bold;
  }
}

.sellist_ft_block {
  padding-top: 10px;
  height: 60px;
  overflow: scroll;
}

.sellist_ft_sel_item {
  display: inline-block;
  white-space: nowrap;
  background-color: #00c68e;
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom: 3px;
  .sel_fib_sname {
    padding: 2px 8px 2px 15px;
    display: inline-block;
    color: #fff;
    font-size: 12px;
  }
  .sel_fib_remove {
    font-size: 11px;
    display: inline-block;
    color: #fff;
    padding: 5px 8px;
    background-color: #ab8ce4;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
.selli_bts {
  margin: 10px 0;
}
</style>
