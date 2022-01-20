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
          <div class="item">아이디</div>
          <div><input type="text" ref="user_id" v-model="user_id" style="width: 380px;" readonly=true></div>
        </div>
        </template>
        <template v-else>
        <div class="item_title">
          <div class="item">아이디</div>
          <div class="member_input"><input type="text" name="" placeholder="아이디를 영문소문자 숫자 혼용 (4 ~ 16자)" value="" style="width: 250px;" ref="user_id" v-model="user_id" v-on:keypress="onVerifyCheckKeyPress" v-on:keyup="onVerifyCheck('userid')" maxlength="16">
            <div class="btn_idauth" v-on:click="onVerifyUserId">ID중복확인</div></div>
        </div>
        </template>
        <template v-if="c_modeType === 'c'">
        <div class="item_title">
          <div class="item"></div>
          <div>{{user_id_error}}</div>
        </div>
        </template>
        <div class="item_title">
          <div class="item">비밀번호</div>
          <div class="member_input"><input type="password" name="" value="" ref="password" v-model="password"  style="width: 380px;" placeholder="" maxlength="16"></div>
        </div>
        
        <div class="item_title">
          <div class="item">비밀번호확인</div>
          <div class="member_input"><input type="password" name="" value="" v-model="password_confirm"  style="width: 380px;" placeholder="" maxlength="16"></div>
        </div>
        <div class="item_title">
          <div class="item"></div>
          <div>{{password_error}}</div>
        </div>
        
        <div class="item_title">
          <div class="item">이름</div>
          <div><input type="text" ref="user_name" v-model="user_name" style="width: 380px;" placeholder="이름을 입력하세요." maxlength="100"></div>
        </div>
        <div class="item_title">
          <div class="item">이메일</div>
          <div><input type="text" ref="email" v-model="email" style="width: 380px;" placeholder="이메일을 입력하세요." maxlength="50"></div>
        </div>
        <div class="item_title">
          <div class="item">전화번호</div>
          <div><input type="text" ref="phone" v-model="phone" style="width: 380px;" placeholder="전화번호를 입력하세요." maxlength="12"></div>
        </div>
        <div class="item_title">
          <div class="item">메모</div>
          <div><input type="text" ref="memo" v-model="memo" style="width: 380px;" placeholder=""></div>
        </div>
        <div class="item_title">
          <div class="item">상태</div>
          <div>
            <select class="selbox_popup" v-model="is_used" style="width: 200px; padding-right: 5px;">
              <option value="Y">사용중</option>
              <option value="N">정지중</option>
            </select>
          </div>
        </div>
        <template v-if="is_used!=='Y'">
        <div class="item_title">
          <div class="item">정지사유</div>
          <div><input type="text" ref="reason" v-model="reason" style="width: 380px;" placeholder=""></div>
        </div>
        </template>
      </div>
      <div style="padding-top: 20px;">
        <div style="display: flex; flex-direction: row;">
          <div style="flex: 1"></div>

          <template v-if="c_modeType === 'c'">
            <div class="btn squareh pupple w64" v-on:click="onVerify">등록</div>
          </template>
          <template v-else>
            <div class="btn squareh pupple w64" v-on:click="onModify">수정</div>
          </template>
                    
          <div class="btn squareh w64" style="margin: 0 0 0 5px;" v-on:click="onCancel">취소</div>
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
import BaseMixin from '../Mixins/BaseMixin';
import apiuser from '../../api/ApiUser';

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
      user_id: '',
      verify_user_id: '',
      email: '',
      phone: '',
      memo: '',
      is_used: 'Y',
      reason: '',
      is_open: false,
      date_locale_ko: ko,
      m_day: moment().format('YYYY-MM-DD'),
      user_id_error: 'ID중복확인 해주세요',
      password: '',
      password_confirm: '',
      password_error: '영문, 숫자, 특수문자 모두포함(8~16자)',
    };
  },
  computed: {
    ...mapGetters(['logged_info','is_logged']),
    c_modeType() {
      if (this.modeType) {
        return this.modeType;
      } else {
        return 'c';
      }
    },
    c_is_verify_user_id() {
      return this.user_id && this.verify_user_id === this.user_id;
    },
    c_is_verify_password() {
      if (this.password === null) {
        return false;
      }
      if (!(this.password.length >= 8 && this.password.length <= 16)) {
        this.password_error = '비밀번호는 8자이상 16자리 미만 입니다.';
        return false;
      }

      if (this.password !== this.password_confirm){
        this.password_error = '비밀번호가 일치하지 않습니다.';
        return false;
      } else {
        const regexp_eng = /[a-zA-Z]/;
        const regexp_num = /[0-9]/;
        const regexp_spc = /[!@#$%^&*\-_=+~/\\|]/;
        if (!regexp_eng.test(this.password)) {
          this.password_error = '비밀번호에 영문이 포함되어야 합니다.';
          return false;
        }
        if (!regexp_num.test(this.password)) {
          this.password_error = '비밀번호에 숫자가 포함되어야 합니다.';
          return false;
        }
        if (!regexp_spc.test(this.password)) {
          this.password_error = '비밀번호에 특수문자가 포함되어야 합니다.';
          return false;
        }
        this.password_error = '사용가능합니다.';
        return true;
      }
    },
    c_is_verify_user_name() {
      return this.user_name && this.user_name.length > 1;
    },
    c_member_seq() {
      // console.log(this.logged_info)
      if(this.logged_info) {
        return this.logged_info.seq;
      }
      return '';
    },    
  },
  mounted() {
    
  },
  methods: {   
    onRest() {
      this.user_id = '';
      this.user_name = '';
      this.password = '';
      this.password_confirm = '';
      this.email = '';
      this.phone = '';
      this.memo = '';
      this.is_used = 'Y';
      this.reason = '';
    },
    isCreateMode() {
      this.$log.debug('isType', this.isType);
      if (this.c_modeType === 'c') {
        return true;
      }
      return false;
    },
    isCheckEmail(myValue) {
      const email = myValue;
      const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      if (exptext.test(email) === false) {
        // 이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
        // alert('이메일형식이 올바르지 않습니다.');
        return false;
      }
      return true;
    },
    onVerifyPassword() {
      if (this.c_is_verify_password) {
      }
    },
    onModify(){
      if(this.password) {
        if (!this.c_is_verify_password) {
          this.$refs.password.focus();
          this.onError('Password를 확인해주세요.');
          return;
        }
      }
      if (!this.c_is_verify_user_name) {
        this.$refs.user_name.focus();
        this.onError('이름을 입력해주세요.');
        return;
      }
      if (!this.email || this.email.length < 10) {
        this.$refs.email.focus();
        this.onError('email을 입력해주세요.');
        return;
      }
      if (!this.isCheckEmail(this.email)){
        this.$refs.email.focus();
        this.onError('email형식을 확인해주세요.');
        return;
      }
      if (!this.phone || this.phone.length < 10) {
        this.$refs.cellphone.focus();
        this.onError('핸드폰번호를 입력해주세요.');
        return;
      }
      const regexp_num = /^[0-9]+$/;
      if (!regexp_num.test(this.phone)) {
        this.$refs.phone.focus();
        this.onError('핸드폰번호를 확인해주세요.');
        return;
      }
      if (this.is_used !== 'Y' && this.reason === '') {
        this.$refs.reason.focus();
        this.onError('정지사유를 입력해주세요.');
        return;
      }
      this.onNext();
    },
    onVerify() {
      // this.$log.debug(this.isCreateMode());
      //console.log(`c_is_verify_user_id===${this.c_is_verify_user_id}`)
      if (!this.c_is_verify_user_id) {
        this.$refs.user_id.focus();
        this.onError('ID를 확인해주세요.');
        return;
      }
      if (!this.c_is_verify_password) {
        this.$refs.password.focus();
        this.onError('Password를 확인해주세요.');
        return;
      }
      if (!this.c_is_verify_user_name) {
        this.$refs.user_name.focus();
        this.onError('이름을 입력해주세요.');
        return;
      }
      if (!this.email || this.email.length < 10) {
        this.$refs.email.focus();
        this.onError('email을 입력해주세요.');
        return;
      }
      if (!this.isCheckEmail(this.email)){
        this.$refs.email.focus();
        this.onError('email형식을 확인해주세요.');
        return;
      }
      if (!this.phone || this.phone.length < 10) {
        this.$refs.phone.focus();
        this.onError('핸드폰번호를 입력해주세요.');
        return;
      }
      const regexp_num = /^[0-9]+$/;
      if (!regexp_num.test(this.phone)) {
        this.$refs.phone.focus();
        this.onError('핸드폰번호를 확인해주세요.');
        return;
      }
      this.onNext();
    },
    async onNext() {
      // this.$log.debug('on Next');
      //const bday = this.dateFormatter(this.birth_day);
      const member_info = {
        user_id: this.user_id,
        user_name: this.user_name,
        password: this.password,
        email: this.email,
        phone: this.phone,
        is_used: this.is_used,
        memo: this.memo,
        reason: this.reason,
        mod_member_seq: this.c_member_seq,
      };
      // this.$log.debug(member_info);
      let result = '';
      if (this.isCreateMode()) {
        await apiuser.createUser(member_info)
          .then((result) => {
            if (result.error === 0) {
              this.onSuccess('등록완료되었습니다.');
              this.$emit('callMemberList',1) 
              //this.$router.push({ name: 'index' });
              this.onCancel()
            } else {
              this.onError(`등록에 실패하였습니다. (${this.result.message})`);
            }
            this.$log.debug(result);
          })
          .catch((e) => {
            this.onError(`등록에 실패하였습니다. (${e})`);
          });
      } else {
        //alert(this.seq);
        // this.$log.debug('else');
        result = await apiuser.updateUser(this.seq, member_info);
        if (result.error === 0){
          this.onSuccess('정보가 수정되었습니다.');
          //this.$log.debug('완료');
          this.$emit('callMemberList') 

          //let some_date = {
          //  page : 2,
          //}
          //this.$emit('callParentFunction', some_date, (res) => {
          //});
          this.onCancel()
        } else {
          this.onError('정보 수정 실패하였습니다.');
        }
        // this.setData(result);
      }
    },
    onCancel() {
      this.closePopup();
    },
    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    async openPopupBySeq(seq) {
      this.seq = seq;
      // console.log(`modeType(MemberPopup)===${this.modeType}`)
      //if (this.modeType === 'e') {
 
      const data = { 
        member_seq: this.seq
      };      
    
      await apiuser.getUserInfos(data)
        .then(async (result) => {
          
          // this.$log.debug(result);
          if (result.error === 0) {
            if (result.member_info.length > 0) {
                this.onRest()
                this.seq = result.member_info[0].seq
                this.user_id = result.member_info[0].user_id
                this.user_name = result.member_info[0].user_name
                this.email = result.member_info[0].email
                this.phone = result.member_info[0].phone
                this.memo = result.member_info[0].memo
                this.is_used = result.member_info[0].is_used
                this.reason = result.member_info[0].reason
            }
            this.member_list = result.member_info;
            console.log(this.member_list)
            this.is_open = true;
          } else {
            this.onError(result.message);
            this.is_open = false;
          }
      });

      //}
    },
    async openPopup() {
      console.log(this.is_open)
      this.$log.debug('openPopup');
      this.is_open = true;
      this.onRest();
    },
    closePopup() {
      this.is_open = false;
    },
    onVerifyCheck(verify_postion) {
      switch (verify_postion) {
        case 'userid':
          if (!this.c_is_verify_user_id && this.user_id !== '') {
            this.user_id_error = '아이디 중복확인을 해주세요.';
          } else {
            this.user_id_error = null;
          }
          break;
        default:
          break;
      }
    },
    onVerifyCheckKeyPress($event) {
      //if ($event.keyCode === 13) {
      //    this.onVerifyUserId();
      //    return;
      //}
    },    
    onVerifyUserId() {
      if (this.c_is_verify_user_id) {
        return;
      }
      // const options = {};
      // options.popup_image = '/img/renewal/MDAC/mark.png';
      const check = this.user_id.replace(/[a-zA-Z0-9]/gi, '');
      const user_id = this.user_id.replace(/[^a-zA-Z0-9]/gi, '');
      // alert(check + ',' +user_id);
      if (check.length > 0) {
        this.user_id_error = '아이디는 영문 숫자만 가능합니다.';
        this.user_id = user_id;
        return;
      }
      if (user_id.length < 4) {
        this.user_id_error = '4자이상 입력해주세요.';
        this.user_id = user_id;
        return;
      }
      apiuser.verifyUserId(user_id)
        .then((result) => {
          if (!result || result.co > 0) {
            this.$log.debug(result);
            this.user_id_error = '이미 사용 중입니다. 다른 아이디를 입력해주세요.';
            return;
          }
          this.user_id_error = '사용 가능한 아이디 입니다.';
          this.onVerifyIdComplete(user_id);
        })
        .catch((error) => {
          this.$log.error(error);
          this.user_id_error = '이미 사용 중입니다. 다른 아이디를 입력해주세요.';
      });
      
      // console.log('sdfdsfdf')
    },
    onVerifyIdComplete(user_id) {
      this.verify_user_id = user_id;
      this.user_id = user_id;
    },
    fnCheckUsed() {
        console.log(this.is_used)
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
.btn_idauth{
  width: 120px;
  height: 40px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  letter-spacing: -0.5px;
  background-color: #878374;
  text-align: center;
  padding-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.btn_idauth:hover {
  background-color: #6e5f49;
}

.member_input{
  display: flex;
  flex-direction: row;
}
</style>
