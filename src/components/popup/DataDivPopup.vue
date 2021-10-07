// make by junepark DataDivPopup.vue
<template>
  <div class="popup_dim" v-bind:class="{ hide: !is_open }" style="">
    <div class="popup newdata" v-on:click.stop="() => false" v-on:mousedown.stop="() => false">
      <div style="font-size: 18px; font-weight: 600">분류 선택</div>
      <div style="padding-top: 20px">
        <template v-for="idx of maxdepth+1">
          <div class="item_title">
            <div class="item">분류{{idx}}</div>
            <div>
              <select v-model="arr_seq[idx-1]" v-on:change="selChange(idx, $event)" style="padding:0 20px; border: 1px solid #ccc; height: 30px; width: 200px;">
                <option value="-1"> 선택 </option>
                <template v-for="(items, idx) in list[idx-1]">
                  <option v-bind:value="items.seq"> {{items.division_name}}</option>
                </template>
              </select>
            </div>
          </div>
        </template>
      </div>
      <div style="padding-top: 20px">
        <div style="display: flex; flex-direction: row">
          <div style="flex: 1"></div>
          <div class="btn navy" style="width: 120px; height: 40px; font-size: 15px" v-on:click="onVerify">선택</div>
          <div class="btn_cancel" style="width: 120px; height: 40px; font-size: 15px; padding-top: 9px" v-on:click="onCancel">취소</div>
          <div style="flex: 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/eventbus';

export default {
  name: 'DataDivPopup',
  components: { },
  props: ['pro_seq', 'maxdepth', 'division', 'list_div'],
  created() {

  },
  data() {
    return {
      CON_MAX: 10,
      arr_seq: [],
      project_seq: '',
      is_open: false,
      list: [],
    };
  },
  computed: {
    c_arr_seq(idx) {
      if (idx === 0 && this.arr_seq[idx] === -1) {
        this.arr_seq[idx] = this.division;
      }
    },
  },
  mounted() {},
  methods: {
    get_arr_seq(idx) {
      this.$log.debug('in data', idx);
      if (idx === 0 && this.arr_seq[idx] === -1) {
        this.$log.debug('in data');
        this.arr_seq[idx] = this.division;
      }
      return this.arr_seq[idx];
    },
    selChange(item, event) {
      const seq = event.target.value;
      if (seq > 0) {
        this.list[item] = this.getParItem(seq);
      } else {
        this.list[item] = [];
        this.arr_seq[item] = -1;
      }
      for (let idx = item + 1; idx < this.CON_MAX; idx++) {
        this.arr_seq[idx] = -1;
        this.list[idx] = [];
      }
    },
    getParItem(seq) {
      // this.$log.debug('getParItem', seq, this.list_div);
      const iseq = parseInt(seq, 10);
      if (this.list_div && this.list_div.length > 0) {
        const par_item = this.list_div.filter(item => item.parent_division_seq === iseq);
        return par_item;
      }
      return null;
    },
    getItem(seq) {
      const iseq = parseInt(seq, 10);
      if (this.list_div && this.list_div.length > 0) {
        const item = this.list_div.filter(item => item.seq === iseq);
        return item;
      }
      return null;
    },
    onRest() {
      for (let idx = 0; idx < this.CON_MAX; idx++) {
        this.arr_seq[idx] = -1;
        this.list[idx] = [];
      }
    },
    onVerify() {
      this.onNext();
    },
    onNext() {
      const seq = this.arr_seq[this.maxdepth];
      const par_item = this.list_div.filter(item => item.seq === seq);
      if (par_item && par_item.length > 0 && seq) {
        this.$emit('onDiv', this.arr_seq[0], par_item[0]);
        this.closePopup();
      } else {
        EventBus.emit('alertPopupOpen', null, `분류${this.maxdepth + 1}까지 선택하세요.`, null);
      }
    },
    onCancel() {
      this.closePopup();
    },
    async openPopup(div_seq, sel_seq) {
      this.$log.debug('openPopup', sel_seq);
      this.is_open = true;
      this.onRest();
      this.list[0] = this.getParItem(0);
      if (div_seq > -1) {
        this.arr_seq[0] = div_seq;
        this.list[1] = this.getParItem(div_seq);
      }
      const sel_div = this.list_div.filter(item => item.seq === sel_seq);
      if (sel_div && sel_div.length > 0) {
        this.arr_seq[sel_div[0].depth] = sel_div[0].seq;
        // this.$log.debug('sel_div', sel_div[0].depth, sel_div[0].seq, this.arr_seq[sel_div[0].depth]);
        if (this.list_div && this.list_div.length > 0) {
          let iDepth = sel_div[0].depth;
          let par_seq = sel_div[0].parent_division_seq;
          while (iDepth > 0) {
            const par_item = this.getItem(par_seq);
            this.arr_seq[iDepth - 1] = par_item[0].seq;
            par_seq = par_item[0].parent_division_seq;
            this.$log.debug('iDepth', iDepth - 1, this.arr_seq[iDepth - 1]);
            iDepth -= 1;
          }
          for (let i = 0; i < this.CON_MAX; i++) {
            if (this.arr_seq[i] !== -1) {
              this.list[i + 1] = this.getParItem(this.arr_seq[i]);
              // this.$log.debug(i, this.arr_seq[i], this.list[i]);
            }
          }
        }
      }
    },
    closePopup() {
      this.is_open = false;
    },
  },
};
</script>

<style scoped>
.newdata {
  width: 380px;
  padding: 50px;
}
.item {
  width: 100px;
  font-weight: 400;
  font-size: 14px;
  color: #504637;
  letter-spacing: -0.5px;
  padding: 4px 0 0 0;
}
.item_title {
  display: flex;
  flex-direction: row;
  height: 40px;
}
</style>
