// junepark DataDetail_img.vue
<template>
  <div>
    <div class="grid_m datalist header" style="align-content: center; justify-content: center;">
      <div></div>
      <div>파일</div>
      <div>업로드일자</div>
      <div>상태</div>
      <div>라벨러</div>
      <div>검수1</div>
      <div>검수2</div>
      <div>검수3</div>
      <div>이력조회</div>
    </div>
    <template v-for="(item, idx) of c_job">
      <div class="grid_m datalist body" style="align-content: center; justify-content: center;" v-on:click="onViewClick(item.seq)">
        <div v-bind:style="`grid-row: 1/${item.rowcount}`">
          <div class="check_wrapper" style="padding:0 10px 0 0;">
            <div class="check_box" v-bind:class="[{on: checkData[item.seq]}]" v-on:click.stop="onCheckClick(item.seq)"></div>
          </div>
        </div>
        <div style="justify-self: left;" v-bind:style="`grid-row: 1/${item.rowcount}`">
          <img v-bind:src="getImg(item.seq, item.file_type)" style="vertical-align: middle;padding: 3px 5px 3px 0;max-width: 50px;max-height: 50px;"> {{item.org_file_name}}
        </div>
        <div v-bind:style="`grid-row: 1/${item.rowcount}`">{{getDateToStr(item.reg_date)}}</div>
        <template v-for="(subitem, subidx) of item.sublist">
          <div v-bind:class="{reject: subitem.reject_act === 'R'}">
            {{StatusToStr(subitem.status)}}
            <template v-if="subitem.reject_act === 'R'">
              <span style="font-size:9px;">(재할당)</span>
            </template>
            <template v-if="subitem.reject_act === 'A'">
              <span style="font-size:9px;">(재작업)</span>
            </template>
          </div>
          <div>{{subitem.user_name}}</div>
          <div>{{subitem.mb_name}}</div>
          <div>{{subitem.mc_name}}</div>
          <div>{{subitem.md_name}}</div>
          <div><div class="btn" style="width: 80px; height: 25px;" v-on:click.stop="onHisClick(subitem.job_seq)">이력조회</div></div>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import util from '../../utils/util';
import util_name from '../../utils/util_name';

export default {
  name: 'DataDetail_img',
  props: ['file_list'],
  components: {
  },
  async created() {
  },
  computed: {
    c_job() {
      if (this.file_list && this.file_list.length > 0) {
        return this.file_list;
      }
      return [];
    },
  },
  watch: {
  },
  data() {
    return {
      checkData: {},
    };
  },
  mounted() {
  },
  methods: {
    getImg(seq) {
      return `http://localhost:3600/apid1/d1/datastatus/getimg/${seq}/o`;
    },
    onHisClick(seq) {
      // this.$log.debug(seq);
      const option = {};
      option.seq = seq;
      option.file_type = 'i';
      option.isResult = 'o';// o 오리지널 r-결과
      // this.$log.debug(option);
      this.$emit('onHisClick', option);
    },
    onViewClick(seq) {
      const option = {};
      option.seq = 1;
      option.file_type = 'i';
      option.isResult = 'o';// // o 오리지널 r-결과
      this.$emit('onViewClick', option);
      // this.$refs.viewplayer.openVPPopup(option);
      // this.$refs.viewplayer.is_open = true;
    },
    InitCh() {
      this.checkData = {};
    },
    allCheck(b) {
      if (this.file_list) {
        Object.keys(this.file_list).forEach((key) => {
          const seq = this.file_list[key].seq;
          this.$set(this.checkData, seq, b);
        });
      }
    },
    onCheckClick(seq) {
      this.$set(this.checkData, seq, this.checkData[seq] !== true);
    },
    StatusToStr(code) {
      return util_name.StatusToStr(code);
    },
    getDateToStr(date) {
      return util.getDateToStr(date);
    },
    getCheckList() {
      const ch = {};
      ch.checkData = this.checkData;
      return ch;
    },
  },
};
</script>
<style scoped>
.grid_m.datalist {
  grid-template-columns: 50px 250px 80px 120px 100px 100px 100px 100px 100px;
}
.reject {
  color: red;
}
</style>
