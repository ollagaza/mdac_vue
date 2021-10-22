<template>
  <div class="popup_dim" ref="vPref"  v-bind:class="{ hide: !is_open }">
    <div class="popup_his" style="background-color: #fff">
      <div style="height: 50px; font-size: 15px; font-weight: 400; padding: 20px 0 10px 20px; ">
        이력정보
      </div>
      <div style="height: 360px; width: 460px; padding-left: 30px; display: flex; flex-direction: column; justify-content: left; align-content: start; overflow: auto">
        <div class="grid_m datalist" style="background-color: #ccc">
          <div>상태</div>
          <div>등록일</div>
          <div>내용</div>
          <div>등록자</div>
        </div>
        <template v-for="(item, idx) in c_his_list">
          <div class="grid_m datalist">
            <div>{{log_typeToStr(item.log_type)}}</div>
            <div>{{getDateToStr(item.reg_date)}}</div>
            <div>{{getDateToStr(item.log_text)}}</div>
            <div>{{item.user_name}}</div>
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

import ApiUser from '../../api/ApiUser';
import util from '../../utils/util';
import util_name from '../../utils/util_name';
import os from 'os';

export default {
  name: 'HisPopup',
  components: {},
  mixins: [],
  data() {
    return {
      is_open: false,
      seq: -1,
      his_list: [],
      log_type_name: '',
    };
  },
  created() {
  },
  beforeDestroy() {
  },
  computed: {
    c_his_list() {
      if (this.his_list && this.his_list.length > 0) {
        return this.his_list;
      }
      return [];
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    closePopup() {
      this.is_open = false;
    },
    openHisPopup(option, size = null, pos = null) {
      this.$log.debug(option);
      this.seq = option.seq;
      this.load_data(option);
      this.is_open = true;
    },
    load_data(option) {
      // alert(option.member_seq);
      ApiUser.getUserHistory(option.member_seq, option)
        .then((result) => {
          this.$log.debug(result);
          this.his_list = result.member_info;          
        })
        .catch((e) => {
        });
    },
    getDateToStr(date) {
      return util.getDateToStr(date);
    },
    StatusToStr(code) {
      return util_name.StatusToStr(code);
    },
    log_typeToStr(code) {
      return util_name.log_typeToStr(code);
    }
  },
}
</script>

<style scoped>
.popup_his{
  width: 500px;
  height: 500px;
}
.grid_m.datalist {
  grid-template-columns: 90px 90px 160px 90px;
  grid-template-rows: 30px;
}
</style>
