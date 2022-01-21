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
    <template v-for="(item, index) of c_job">
      <div class="grid_m datalist body" v-bind:class="{ bottom : c_job.length === index+1 }" style="align-content: center; justify-content: center;" v-on:click="onViewClick(item.seq)">
        <div v-bind:style="`grid-row: 1/${item.rowcount}`">
          <div class="check_wrapper" style="padding:0 10px 0 0;">
            <div class="check_box" v-bind:class="[{on: checkData[item.seq]}]" v-on:click.stop="onCheckClick(item.seq)"></div>
          </div>
        </div>
        <div style="display: flex; align-items: center;flex-wrap: wrap;justify-self: left;font-size:9px;" v-bind:style="`grid-row: 1/${item.rowcount}`">
          <img v-bind:src="getImg(item.seq, item.file_type)" style="vertical-align: middle;padding: 3px 5px 3px 0;max-width: 50px;max-height: 50px;"> {{item.org_file_name}}
        </div>
        <div v-bind:style="`grid-row: 1/${item.rowcount}`" style="text-align: center;">{{getDateTimeToStr(item.reg_date)}}</div>
        <template v-for="(subitem, subidx) of item.sublist">
          <div v-bind:class="{reject: subitem.reject_act === 'R'}">
            <div :class="{ 'process_work' : subitem.status.trim() === 'A0', 'process_stop' : subitem.status === '2', 'process_end' : subitem.status === '3' }">{{subitem.rf_status === '' ? StatusToStr(subitem.rf_status) : StatusToStr(subitem.status)}}</div>
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
          <div><div class="btn history" style="width: 80px;" v-on:click.stop="onHisClick(subitem.job_seq, item.seq)">{{subitem.rf_file_type}}이력조회</div></div>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import util from '../../utils/util';
import util_name from '../../utils/util_name';
import { mapGetters } from 'vuex';

export default {
  name: 'DataDetail_img',
  props: ['file_list'],
  components: {
  },
  async created() {
  },
  computed: {
    ...mapGetters(['current_domain']),
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
      const host_name = window.location.hostname;
      const protocol = (window.location.protocol).replace(/:$/, '');
      this.$log.debug(host_name, protocol, this.current_domain);
      return `${this.current_domain}/apid1/d1/datastatus/getimg/${seq}/o`;
    },
    onHisClick(seq, file_seq) {
      // this.$log.debug(seq);
      const option = {};
      option.seq = seq;
      option.file_seq = file_seq;
      option.file_type = 'i';
      option.isResult = 'o';// o 오리지널 r-결과
      // this.$log.debug(option);
      this.$emit('onHisClick', option);
    },
    onViewClick(seq) {
      const option = {};
      option.seq = seq;
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
    getDateTimeToStr(date) {
      return util.getDateTimeToStr(date);
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
  /* grid-template-columns: 50px 300px 110px 140px 100px 100px 100px 100px 100px; */
   grid-template-columns: 5% 28% 10% 12% 9% 9% 9% 9% 9%;
}
.reject {
  color: red;
}
</style>
