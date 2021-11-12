<template>
  <div class="popup_dim" ref="vPref" v-bind:class="{ hide: !is_open }">
    <div class="popup_his" style="background-color: #fff">
      <div style="height: 50px; font-size: 15px; font-weight: 400; padding: 20px 0 10px 20px; ">
        이력정보
      </div>
      <div style="height: 40px; width: 460px;padding-left: 30px; display: flex; flex-direction: row; justify-content: left; align-content: start;" v-if="c_result_file">
        <!-- <div style="width: 230px; display: flex; flex-direction: row;">
          <div style="font-size: 12px; font-weight: 400;padding: 7px 10px 0 0;">결과 이미지 파일</div>
          <div class="btn" style="padding: 0px 10px 5px 10px; height: 30px; background-color: #ccc;" v-on:click="down('i')">{{getFilename('i')}}</div>
        </div> -->
        <div style="width: 230px; display: flex; flex-direction: row;">
          <div style="font-size: 12px; font-weight: 400;padding: 7px 10px 0 0;">결과 {{ rf_file_type === 'x' ? 'XML' : rf_file_type === 'j' ? 'JSON' : '' }} 파일</div>
          <div class="btn" style="padding: 0px 10px 5px 10px; height: 30px; background-color: #ccc;" v-on:click="down(`${rf_file_type}`,`${ref_pair_key}`)">{{getFilename('x') ? getFilename('x') : rf_file_type === 'x' ? 'XML Download' : rf_file_type === 'j' ? 'JSON Download' : 'Download'}}</div>
        </div>
      </div>
      <template v-if="reg_file">
        <div style="width:440px; text-align: right;padding-bottom: 5px;">등록일 {{getDateToStr(reg_file.reg_date)}}</div>
      </template>
      <div v-bind:style="c_result_file ? 'height: 330px' : 'height:370px'" style="width: 460px; padding-left: 30px; display: flex; flex-direction: column; justify-content: left; align-content: start; overflow: auto">
        <div class="grid_m datalist" style="background-color: #ccc">
          <div>상태</div>
          <div>등록일</div>
          <div>완료일</div>
          <div>작업자</div>
          <div>등록자</div>
        </div>
        <template v-for="(item, idx) in c_his_list">
          <div class="grid_m datalist" v-if="item.job_status === 'B2' || item.job_status === 'B5' || item.job_status === 'C2' || item.job_status === 'C5' || item.job_status === 'D2' || item.job_status === 'D5'">
            <div>{{StatusToStr(item.job_name + '1')}}할당</div>
            <div>{{getDateToStrJob(item)}}</div>
            <div></div>
            <div>{{getWorker(item)}}</div>
            <div>{{item.reg_member}}</div>
          </div>
          <div class="grid_m datalist">
            <div>{{StatusToStr(item.job_status)}}</div>
            <div>{{getDateToStrJob(item)}}</div>
            <div>{{getDateToStr(item.job_date)}}</div>
            <div>{{getWorker(item)}}</div>
            <div>{{item.reg_member}}</div>
          </div>
        </template>
        <template v-if="c_per_list.length > 0">
          <div style="width: 100%; text-align: center; height: 50px; padding-top: 20px;">
            <div style="width: 100%; text-align: center; height: 30px; padding-top: 5px; background-color: #aaa297">
            이전 이력
            </div>
          </div>
        </template>
        <template v-for="(item, idx) in c_per_list">
          <div class="grid_m datalist">
            <div>{{StatusToStr(item.job_status)}}</div>
            <div>{{StatusToStr(item.reg_date)}}</div>
            <div>{{getDateToStr(item.job_date)}}</div>
            <div>{{item.user_name}}</div>
            <div>{{item.reg_member}}</div>
          </div>
        </template>
      </div>
      <div style="height: 50px; width:100%; display: flex; flex-direction: row; justify-content: center; align-content: center;">
        <div class="btn" style="width: 100px; align-self: center;" v-on:click="closePopup">닫기</div>
      </div>
    </div>
  </div>
</template>
<script>

import ApiStatus from '../../api/ApiStatus';
import util from '../../utils/util';
import util_name from '../../utils/util_name';
import os from 'os';
import { mapGetters } from 'vuex';

export default {
  name: 'HisPopup',
  components: {},
  mixins: [],
  data() {
    return {
      is_open: false,
      seq: -1,
      rf_file_type: 'x',
      ref_pair_key: -1,
      his_list: [],
      per_list: [],
      file_list: [],
      reg_file: {},
    };
  },
  created() {
  },
  beforeDestroy() {
  },
  computed: {
    ...mapGetters(['logged_info', 'current_domain']),
    c_reg_file() {
      if (this.reg_file) {
        return this.reg_file;
      }
      return {};
    },
    c_his_list() {
      if (this.his_list && this.his_list.length > 0) {
        return this.his_list;
      }
      return [];
    },
    c_per_list() {
      if (this.per_list && this.per_list.length > 0) {
        return this.per_list;
      }
      return [];
    },
    c_result_file(file_type) {
      if (this.file_list && this.file_list.length > 0) {
        return this.file_list;
      }
      return null;
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    getWorker(item) {
      if (item) {
        if (item.user_name) {
          return item.user_name;
        } else {
          return item.labeler_member;
        }
      }
      return '';
    },
    down(file_type,ref_pair_key) {
      if (this.c_result_file) {
        const data = { file_type };
        console.log(file_type)
        console.log(ref_pair_key)
        // this.$log.debug(data);
        const file_name = 'filename';
        // const hostname = location.host;
        // const protocol = (window.location.protocol).replace(/:$/, '');
        const url = `${this.current_domain}/apid1/d1/datastatus/resultdown/${this.seq}?file_type=${file_type}&pair_key=${ref_pair_key}`;
        util.downloadFile(document, file_name, url);
        return;
      }
      alert('다운파일이 없습니다.');
    },
    getFile(file_type) {
      if (this.c_result_file) {
        const img_file = this.file_list.filter(item => item.file_type === file_type);
        return img_file[0];
      }
      return '';
    },
    getFilename(file_type) {
      const file = this.getFile(file_type);
      if (file) {
        return file.base;
      }
      return '';
    },
    closePopup() {
      this.is_open = false;
    },
    openHisPopup(option, size = null, pos = null) {
      this.$log.debug(option);
      this.seq = option.seq;
      if(option.file_type === 'v') {
        this.rf_file_type = option.rf_file_type;
        this.ref_pair_key = option.ref_pair_key;
      } else {
        this.rf_file_type = 'a';
        this.ref_pair_key = 0;
      }
      this.load_data(option);
      this.is_open = true;
    },
    load_data(option) {
      // alert(option.seq, option.file_type);
      ApiStatus.getHis(option.seq, option)
        .then((result) => {
          this.$log.debug(result);
          this.his_list = result.list;
          this.per_list = [];
          if (result.perlist) {
            this.per_list = result.perlist;
          }
          if (result.filelist) {
            this.file_list = result.filelist;
          }
          if (result.reg_file) {
            this.reg_file = result.reg_file[0];
          }
        })
        .catch((e) => {
        });
    },
    getDateToStr(date) {
      return util.getDateToStr(date);
    },
    getDateToStrJob(item) {
      this.$log.debug('+++++++++++++++++++item:', item);
      if (item && item.reg_date) {
        return util.getDateToStr(item.reg_date);
      } else {
        return util.getDateToStr(item.labeler_regdate);
      }
    },
    StatusToStr(code) {
      this.$log.debug('+++++++++++');
      if(!code || code === null){
        return '라벨할당';
      } else {
        return util_name.StatusToStr(code);
      }
    },
  },
}
</script>

<style scoped>
.popup_his{
  width: 500px;
  height: 500px;
}
.grid_m.datalist {
  grid-template-columns: 90px 90px 90px 90px 90px;
  grid-template-rows: 30px;
}
</style>
