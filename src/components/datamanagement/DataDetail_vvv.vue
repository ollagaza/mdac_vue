// junepark DataDetail_img.vue
<template>
  <div>
    <div style="display: flex; flex-direction: row; padding-bottom: 10px; align-items: center;">
      <div style="flex: 2; font-size: 16px; font-weight: 600;">상세보기</div>
      <div style="width: 100px" class="btn navy" v-on:click="onList">목록</div>
    </div>
    <div style="height: 300px;">
<!--      <div>파일명 :  / 파일사이즈 : / 시간 : </div>-->
      <div style="height:100%; background-color: black; display: flex; flex-direction: row; justify-content: center;">
        <video controls style="height: 280px;">
          <source v-bind:src="c_video_url" type="video/mp4">
        </video>
      </div>
    </div>
    <div class="grid_m datalist header" style="align-content: center; justify-content: center;">
      <div></div>
      <div>파일</div>
      <div>업로드일자</div>
      <div>상태</div>
      <div>클래스</div>
      <div>라벨러</div>
      <div>검수1</div>
      <div>검수2</div>
      <div>검수3</div>
      <div>이력조회</div>
    </div>
    <template v-for="(item, idx) of c_file_view">
      <div class="grid_m datalist body title" style="align-content: center; justify-content: center;">
        <div style="justify-self: left; padding-left: 20px;">
          라벨러 : {{item.user_name}} / {{item.job_seq}}
        </div>
        <div style="justify-self: left; padding-left: 20px;">
          갯수 : {{item.label_cnt}}
        </div>
        <div style="justify-self: left; padding-left: 20px;">
          클래스 : {{item.class_name}}
        </div>
        <div></div>
      </div>
      <template v-for="(subitem, subidx) of item.sublist">
        <div class="grid_m datalist body" style="align-content: center; justify-content: center;">
          <template v-if="item.rf_seq !== ''">
            <div>
              <div class="check_wrapper" style="padding:0 10px 0 0;">
                <div class="check_box" v-bind:class="[{on: checkData[subitem.view_seq]}]" v-on:click.stop="onCheckClick(subitem.view_seq)"></div>
              </div>
            </div>
            <div style="justify-self: left;">
              <img v-bind:src="getImg(subitem.rf_seq)" style="vertical-align: middle;padding: 3px 5px 3px 0;max-width: 50px;max-height: 50px;">
              {{ subitem.rf_org_file_name }} <!-- {{getBase(subitem.rf_file_name)}} --> {{ subitem.rf_pair_key}}
            </div>
            <div>{{getDateToStr(subitem.rf_reg_date)}}</div>
            <div v-bind:class="{reject: subitem.reject_act==='R'}">
              {{StatusToStr(subitem.rf_status)}}
              <template v-if="subitem.reject_act==='R'">
                <span style="font-size:9px">(재할당)</span>
              </template>
              <template v-if="subitem.reject_act==='A'">
                <span style="font-size:9px">(재작업)</span>
              </template>
            </div>
            <div>{{item.class_name}}</div>
            <div v-if="subitem.reject_act !== 'A'">{{subitem.user_name}}</div>
            <div v-else>{{subitem.user_name}}</div>
            <div>{{subitem.mb_name}}</div>
            <div>{{subitem.mc_name}}</div>
            <div>{{subitem.md_name}}</div>
            <div><div class="btn" style="width: 80px; height: 25px;" v-on:click="onHisClick(subitem.view_seq+'_'+subitem.reject_seq)">이력조회</div></div>
          </template>
          <template v-else>
            <div></div>
            <div style="grid-column: 2 /10; justify-self: left; padding-left: 10px;">{{item.rf_file}}등록된 데이타가 없습니다.</div>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import util from '../../utils/util';
import util_name from '../../utils/util_name';
import { mapActions, mapGetters } from 'vuex';
import path from 'path';

export default {
  name: 'DataDetail_img',
  props: ['list_file_view', 'file_seq'],
  components: {
  },
  async created() {
  },
  computed: {
    ...mapGetters(['current_domain']),
    c_file_view() {
      // this.$log.debug('this.list_file_view', this.list_file_view);
      if (this.list_file_view && this.list_file_view.length > 0) {
        return this.list_file_view;
      }
      return [];
    },
    c_video_url() {
      // this.$log.debug('this.file_seq', this.file_seq);
      this.$log.debug(`${this.current_domain}/apid1/d1/datastatus/getvideo/${this.file_seq}/o`);
      if (this.file_seq) {
        return `${this.current_domain}/apid1/d1/datastatus/getvideo/${this.file_seq}/o`;
      }
      return '';
    }
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
    //  return `${this.current_domain}/apid1/d1/datastatus/getimg/${seq}/i`;
    },
    onHisClick(seq) {
      // this.$log.debug(seq);
      const a_seq = seq.split('_');
      const option = {};
      option.seq = a_seq[0];
      option.file_type = 'v';
      option.isResult = 'r';// o 오리지널 r-결과
      option.ref_pair_key = a_seq[1];
      option.ref_seq = a_seq[2];
      option.reject_pair_key = a_seq[3];
      // this.$log.debug('his');
      // this.$log.debug(option);
      this.$emit('onHisClick', option);
    },
    onList(seq) {
      // this.$log.debug('list click');
      this.$emit('onList', seq);
    },
    InitCh() {
      this.checkData = {};
    },
    allCheck(b) {
      if (this.list_file_view) {
        Object.keys(this.list_file_view).forEach((key) => {
          Object.keys(this.list_file_view[key].sublist).forEach((subkey) => {
            const seq = this.list_file_view[key].sublist[subkey].view_seq;
            this.$set(this.checkData, seq, b);
          });
        });
      }
    },
    onCheckClick(seq) {
      // this.$log.debug(seq);
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
    getBase(filename) {
      this.$log.debug(filename);
      const basename = filename.split('//');
      const path_name = basename[basename.length - 1];
      // this.$log.debug(path_name);
      return path_name;
    }
  },
};
</script>
<style scoped>
.grid_m.datalist {
  grid-template-columns: 50px 200px 80px 120px 90px 90px 90px 90px 90px 100px;
}
.grid_m.title {
  grid-template-columns: 200px 200px 400px 200px;
  /*background-color: #1C3048;*/
  background-color: #345987;
  height: 30px;
  color: white;
}
.reject{
  color: red;
}
</style>
