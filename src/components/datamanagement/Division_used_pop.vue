<template>
  <div class="popup_dim" v-bind:class="{ hide: !is_open }">
    <div class="popup mc_popup">
      <div class="popup_title_top mc_title">
        <span></span>
        <span class="delete_btn" v-on:click.stop="onPopupClose"></span>
      </div>
      <div class="mc_myplan">
        <div>
          선택한 회원님(선택 {{selUserCo}}명)들을 <font style="color:#f22433;">{{szTitle}}</font>시키겠습니까?
        </div>
      </div>
      <div class="mc_cancel_reason">
        <textarea v-model="reject_text" :placeholder="'정지 사유를 작성해 주세요.'"></textarea>
      </div>
      <div class="mc_buttoms">
        <div class="btn w120 h40 space10 newgreen" v-on:click="onConfirm">확인</div>
        <div class="btn w120 h40 " v-on:click.stop="onPopupClose">취소</div>
      </div>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import { mapGetters } from 'vuex';
import EventBus from '../../utils/eventbus';

export default {
  name: 'Division_used_pop',
  props: [],
  components: { },
  data() {
    return {
      is_open: false,
      reject_text: null,
      idtext: '',
      param: null,
      sendParam: null,
      callback: null,
      szTitle: '',
      selUserCo: 0,
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(['logged_info', 'current_domain', 'lang']),
  },
  watch: {
  },
  methods: {
    openPopup(sendParam, callback, text = null) {
      this.selUserCo = 0;
      if (sendParam.checkData) {
        for (const key of Object.keys(sendParam.checkData)) {
          if (sendParam.checkData[key]) {
            this.selUserCo ++;
          }
        }
      }
      this.szTitle = sendParam.szTitle;
      this.is_open = true;
      this.param = sendParam.param;
      this.idtext = text;
      this.sendParam = sendParam;
      this.callback = callback;
    },
    onPopupClose() {
      this.is_open = false;
      this.callback = null;
      this.idtext = null;
      this.reject_text = null;
      this.param = null;
      this.sendParam = null;
    },
    onConfirm() {
      if (this.reject_text === null || this.reject_text === '') {
        EventBus.emit('alertPopupOpen', null, '정지사유를 입력 하여 주시기 바랍니다.', null);
      } else if (this.callback) {
        this.callback(this.sendParam, this.reject_text);
        this.onPopupClose();
      } else {
        this.onPopupClose();
      }
    },
  },
};
</script>

<style scoped>
.mc_popup {
  width: 500px;
  padding: 0 0;
}
.mc_popup > .popup_title_top.mc_title {
  border-bottom: 0px;
  background-repeat: no-repeat;
  font-size: 15px;
  font-weight: 300;
  color: #1a1a1a;
  padding-left: 24px;
  padding-right: 30px;
}
.mc_popup > .mc_myplan {
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 18px;
  color: #444444;
  padding-left: 40px;
  padding-bottom: 30px;
}
.mc_popup > .mc_cancel_reason {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 15px;
  color: #555555;
  padding-left: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid #dddddd;
}
.mc_popup > .mc_cancel_reason > .check {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 16px;
}
.mc_popup > .mc_cancel_reason > .check .check_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.mc_popup > .mc_cancel_reason > .check .check_wrapper .check_text {
  margin-left: 10px;
  font-weight: 400;
  font-size: 15px;
  color: #555555;
}
.mc_popup > .mc_cancel_reason > .check_etc {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
}
.mc_popup > .mc_cancel_reason > .check_etc .check_wrapper {
  display: flex;
  flex-direction: row;
  align-items: inherit;
  cursor: pointer;
  flex-basis: 100%;
}
.mc_popup > .mc_cancel_reason > .check_etc .check_wrapper .check_text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-weight: 400;
  font-size: 15px;
  color: #555555;
  flex-basis: calc(100% - 20px);
}
textarea {
  width: 380px;
  height: 70px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #333333;
  resize: none;
}
.mc_popup > .mc_cancel_reason > .check_etc .check_wrapper .check_text > textarea {
  margin-top: 12px;
  resize: none;
  width: 380px;
  height: 70px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #333333;
}
textarea::placeholder {
  color: #999999;
}
.mc_popup > .mc_buttoms {
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  justify-content: center;
  height: 75px;
}
</style>
