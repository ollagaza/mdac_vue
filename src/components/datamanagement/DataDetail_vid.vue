// junepark DataDetail_img.vue
<template>
  <div>
    <div class="grid_m datalist header" style="align-content: center; justify-content: center;">
      <div></div>
      <div>파일</div>
      <div>업로드일자</div>
      <div></div>
      <div>상태</div>
      <div>클래스</div>
      <div>라벨러</div>
      <div>갯수</div>
      <div style="font-size: 9px;">
        작업/완료 검수1/완료/반려...완료
      </div>
    </div>
    <template v-for="(item, index) of c_file_list">
      <div class="grid_m datalist body" v-bind:class="{ bottom : c_file_list.length === index+1 }" style="align-content: center; justify-content: center;" v-on:click.stop="onListClick(item.seq)">
        <div v-bind:style="`grid-row: 1/${item.rowcount}`">
          <div class="check_wrapper" style="padding:0 10px 0 0;">
            <div class="check_box" v-bind:class="[{on: checkData[item.seq]}]" v-on:click.stop="onCheckClick(item.seq)"></div>
          </div>
        </div>
        <div style="justify-self: left;font-size:10px;" v-bind:style="`grid-row: 1/${item.rowcount}`" v-on:click.stop="onViewClick(item.seq)">
          <img v-bind:src="getVedioImg(item.seq, item.file_type)" style="vertical-align: middle;padding: 3px 5px 3px 0;max-width: 50px;max-height: 50px;"> {{item.org_file_name}}
        </div>
        <div v-bind:style="`grid-row: 1/${item.rowcount}`" style="text-align:center;">{{getDateTimeToStr(item.reg_date)}}</div>
        <template v-for="(subitem, subidx) of item.sublist">
          <div>
            <div class="check_wrapper" style="padding:0 10px 0 0;">
              <div v-if="subitem.job_seq" class="check_box"
                   v-bind:class="[{on: checkSubData[`${item.seq}_${subitem.job_seq}`]}]"
                   v-on:click.stop="onCheckSubClick(`${item.seq}_${subitem.job_seq}`)"></div>
            </div>
          </div>
          <div :class="{ 'process_work' : subitem.status.trim() === 'A0', 'process_stop' : subitem.status === '2', 'process_end' : subitem.status === '3' }"  v-bind:title="subitem.sumdata">{{StatusToStr(subitem.status)}}</div>
          <div>{{subitem.class_name}}</div>
          <div>{{subitem.user_name}}</div>
          <div>{{subitem.label_cnt}}</div>
          <div>{{subitem.sumdata}}</div>
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
    c_file_list() {
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
      checkSubData: {},
    };
  },
  mounted() {
  },
  methods: {
    getVedioImg(seq, type) {
      return `${this.current_domain}/apid1/d1/datastatus/getvedioimg/${seq}/o`;
    },
    onListClick(seq) {
      // this.$log.debug('list click');
      this.$emit('onListClick', seq);
    },
    onViewClick(seq) {
      const option = {};
      option.seq = seq;
      option.file_type = 'v';
      option.isResult = 'o';// // o 오리지널 r-결과
      this.$emit('onViewClick', option);
    },
    InitCh() {
      this.checkData = {};
      this.checkSubData = {};
    },
    allCheck(b) {
      if (this.file_list) {
        Object.keys(this.file_list).forEach((key) => {
          const seq = this.file_list[key].seq;
          const job_seq = this.file_list[key].job_seq;
          this.$set(this.checkData, seq, b);
        });
      }
      this.allCheck_sub(b);
    },
    allCheck_sub(b) {
      if (this.file_list) {
        Object.keys(this.file_list).forEach((key) => {
          Object.keys(this.file_list[key].sublist).forEach((subkey) => {
            const seq = this.file_list[key].seq;
            const job_seq = this.file_list[key].sublist[subkey].job_seq;
            const sub_item = `${seq}_${job_seq}`;
            this.$set(this.checkSubData, sub_item, b);
          });
        });
      }
    },
    onCheckClick(seq) {
      this.$set(this.checkData, seq, this.checkData[seq] !== true);
      const items = this.file_list.filter(item => item.seq === seq);
      for(const item of items[0].sublist) {
        const job_seq = item.job_seq;
        const sub_item = `${seq}_${job_seq}`;
        this.$set(this.checkSubData, sub_item, this.checkData[seq]);
      }
    },
    onCheckSubClick(seq) {
      this.$set(this.checkSubData, seq, this.checkSubData[seq] !== true);
    },
    StatusToStr(code) {
      return util_name.StatusToStr(code)
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
      // this.$log.debug(ch.checkData);
      ch.checkSubData = this.checkSubData;
      // this.$log.debug(ch.checkSubData);
      return ch;
    },
  },
};
</script>
<style scoped>
.grid_m.datalist {
  grid-template-columns: 50px 250px 100px 50px 140px 100px 80px 80px 250px;
}
</style>
