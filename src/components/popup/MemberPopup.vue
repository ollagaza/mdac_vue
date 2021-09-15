<template>
  <div class="popup_dim" v-bind:class="{ hide: !is_open }" style="">
    <div class="popup newdata" v-on:click.stop="() => false" v-on:mousedown.stop="() => false">
      <template v-if="c_modeType === 'c' || c_modeType===''">
        <div class="table_title">
          작업자 등록
        </div>
      </template>
      <template v-if="c_modeType === 'e'">
        <div class="table_title">
          작업자 정보
        </div>
      </template>
      <div style="padding-top: 20px;">
        <template v-if="c_modeType === 'e'">
        <div class="item_title">
          <div class="item">ID</div>
          <div><input type="text" ref="user_id" v-model="user_id" style="width: 400px;" readonly=true></div>
        </div>
        </template>
        <template v-else>
        <div class="item_title">
          <div class="item">ID</div>
          <div><input type="text" ref="user_id" v-model="user_id" style="width: 400px;"></div>
        </div>
        </template>
        
        <div class="item_title">
          <div class="item">이름</div>
          <div><input type="text" ref="user_name" v-model="user_name" style="width: 400px;" placeholder="이름을 입력하세요."></div>
        </div>
        <div class="item_title">
          <div class="item">이메일</div>
          <div><input type="text" ref="email" v-model="email" style="width: 400px;" placeholder="이메일을 입력하세요."></div>
        </div>
        <div class="item_title">
          <div class="item">전화번호</div>
          <div><input type="text" ref="phone" v-model="phone" style="width: 400px;" placeholder="전화번호를 입력하세요."></div>
        </div>
        <div class="item_title">
          <div class="item">메모</div>
          <div><input type="text" ref="memo" v-model="memo" style="width: 400px;" placeholder=""></div>
        </div>
        <div class="item_title">
          <div class="item">상태</div>
          <div>
            <select class="text" v-model="is_used" style="width: 200px; padding-right: 5px;">
              <option value="Y">사용중</option>
              <option value="N">정지중</option>
            </select>
          </div>
        </div>
        <div class="item_title">
          <div class="item">정지사유</div>
          <div><input type="text" ref="reason" v-model="reason" style="width: 400px;" placeholder=""></div>
        </div>
      </div>
      <div style="padding-top: 20px;">
        <div style="display: flex; flex-direction: row;">
          <div style="flex: 1"></div>
          <div class="btn newgreen" style="width:160px; height: 50px;" v-on:click="onVerify">저장</div>
          <div class="btn_cancel" style="width:160px; height: 50px;" v-on:click="onCancel">취소</div>
          <div style="flex: 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ko } from 'vuejs-datepicker/dist/locale';
import moment from 'moment/moment';
import Datepicker from 'vuejs-datepicker';
import apiitem from '../../api/ApiItem';
import apilist from '../../api/ApiList';
import BaseMixin from '../Mixins/BaseMixin';

export default {
  name: 'MemberPopup',
  components: { Datepicker },
  props: ['modeType'],
  mixins: [BaseMixin],
  created() {
  },
  data() {
    return {
      seq: -1,
      user_name: '',
      user_id: 'TEST',
      email: '',
      phone: '',
      memo: '',
      is_used: 'Y',
      reason: '',
      is_open: false,
      date_locale_ko: ko,
      m_day: moment().format('YYYY-MM-DD'),
    };
  },
  computed: {
    ...mapGetters(['logged_info','is_logged']),
    c_sido() {
      return this.item_sido;
    },
    c_gugun() {
      return this.item_gugun;
    },
    c_group_item() {
      return this.group_item;
    },
    c_modeType() {
      if (this.modeType) {
        return this.modeType;
      } else {
        return 'c';
      }
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      // this.$log.debug('loadData ++++');
      if (this.logged_info) {
        // this.$log.debug('loadData ++++');
        this.member_seq = this.logged_info.seq;
        this.user_id = this.logged_info.user_id;
        this.user_name = this.logged_info.user_name;
        this.email = this.logged_info.email;
        this.phone = this.logged_info.phone;
        this.is_used = this.logged_info.is_used;
      }
    },    
    onRest() {
      this.user_id = '';
      this.user_name = '';
      this.email = '';
      this.phone = '';
      this.is_used = 'Y';
    },
    onVerify() {
      if (!this.othername || this.othername.length < 1) {
        this.onError('별칭을 입력하세요.');
        this.$refs.othername.focus();
      }
      const data = {};
      if (this.modeType === 'e') {
        data.seq = this.seq;
      }
      data.othername = this.othername;
      data.groupcode = this.groupcode;
      data.wherename = this.wherename;
      data.m_day = this.m_day;
      data.sido = this.sido;
      data.gugun = this.gugun;
      data.plantstatus = this.plantstatus;
      apilist.createMyplant(data, this.modeType)
      .then( (result) => {
        if (result.error === 0) {
          if (this.modeType === 'c') {
            this.onSuccess('등록되었습니다. ');
          } else {
            this.onSuccess('수정되었습니다. ');
          }
          this.$emit('onDataChange');
          this.is_open = false;
        } else {
          this.onError(`에러 발생함.${result.message}`);
        }
      })
      .catch((e) => {
        this.onError(e);
      });
    },
    onCancel() {
      this.closePopup();
    },
    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    async openPopupBySeq(seq) {
      this.seq = seq;
      if (this.modeType === 'e') {
        // await apilist.getMyplantInfo(seq)
        // .then(async (result) => {
        //   if (result.error === 0) {
        //     const info = result.data[0];
        //     this.othername = info.othername;
        //     this.groupcode = info.groupcode;
        //     this.wherename = info.wherename;
        //     this.m_day = info.m_day;
        //     this.sido = info.sido;
        //     if (this.sido) {
        //       await this.geGugun(this.sido);
        //     }
        //     this.gugun = info.gugun;
        //     this.plantstatus = info.plantstatus;
             this.is_open = true;
        //   } else {
        //     this.onError(result.message);
        //     this.is_open = false;
        //   }
        // })
        // .catch((e) => {

        // })
      }
    },
    async openPopup() {
      this.$log.debug('openPopup');
      this.is_open = true;
      await this.getGroup();
      await this.getSido();
      await this.geGugun(this.sido);
      this.onRest();
    },
    closePopup() {
      this.is_open = false;
    },

  },

};
</script>

<style scoped>
.newdata {
  width: 580px;
  padding: 50px;
}
input{
  border-bottom:1px solid #ccc;
  height: 40px;
  font-weight: 400;
  font-size: 14px;
  color: #333;
  letter-spacing: -0.5px;
}

input::placeholder{
  color:#aaa297;
}
.item{
  width:100px;font-weight: 400; font-size: 14px; color: #504637; letter-spacing: -0.5px; padding-top: 12px;
}
.item_title{
  display: flex; flex-direction: row; padding-top: 10px;
}
</style>
