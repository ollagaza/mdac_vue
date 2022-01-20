<!--
=======================================
'	파일명 : CodegroupPopup.vue
'	작성자 : djyu
'	작성일 : 2021.11.16
'	기능   : Codegroup create / modify / view
'	=====================================
-->
<template>
  <div class="popup_dim" v-bind:class="{ hide: !is_open }" style="">
    <div
      class="popup newdata"
      v-on:click.stop="() => false"
      v-on:mousedown.stop="() => false"
    >
      <template v-if="c_modeType === 'c' || c_modeType === ''">
        <div v-if="this.ref_codegroup.toString() === '0'" class="table_title">코드그룹 등록</div>
        <div v-if="this.ref_codegroup.toString() !== '0'" class="table_title">{{ this.ref_codegroup_name }} 등록</div>
      </template>
      <template v-if="c_modeType === 'e'">
        <div v-if="this.ref_codegroup.toString() === '0'" class="table_title">코드그룹 정보</div>
        <div v-if="this.ref_codegroup.toString() !== '0'" class="table_title">{{ this.ref_codegroup_name }} 정보</div>
      </template>
      <div style="padding-top: 20px">
        <div class="item_title">
          <div v-if="this.ref_codegroup.toString() === '0'" class="item">코드그룹아이디</div>
          <div v-if="this.ref_codegroup.toString() !== '0'" class="item">코드</div>
          <div>
            <input
              type="text"
              ref="codegroup_id"
              v-model="codegroup_id"
              style="width: 380px"
              placeholder="코드그룹아이디를 입력하세요."
              maxlength="20"
            />
          </div>
        </div>
        <div class="item_title">
          <div v-if="this.ref_codegroup.toString() === '0'" class="item">코드그룹명</div>
          <div v-if="this.ref_codegroup.toString() !== '0'" class="item">코드명</div>
          <div>
            <input
              type="text"
              ref="codegroup_name"
              v-model="codegroup_name"
              style="width: 380px"
              placeholder="코드그룹명을 입력하세요."
              maxlength="100"
            />
          </div>
        </div>
        <div v-if="this.ref_codegroup.toString() === '0'" class="item_title">
          <div class="item">우선순위</div>
          <div>
            <input
              type="text"
              ref="sort_no"
              v-model="sort_no"
              style="width: 380px"
              placeholder="우선순위를 입력하세요."
              maxlength="10"
            />
          </div>
        </div>
        <div class="item_title">
          <div class="item">상태</div>
          <div>
            <select
              class="selbox_popup"
              v-model="is_used"
              style="width: 200px; padding-right: 5px">
              <option value="Y">사용</option>
              <option value="N">사용안함</option>
            </select>
          </div>
        </div>
      </div>
      <div style="padding-top: 20px">
        <div style="display: flex; flex-direction: row">
          <div style="flex: 1"></div>

          <template v-if="c_modeType === 'c'">
            <div
              class="btn squareh pupple w64"
              v-on:click="onVerify">
              등록
            </div>
          </template>
          <template v-else>
            <div
              class="btn squareh pupple w64"
              v-on:click="onModify">
              수정
            </div>
          </template>

          <div
            class="btn squareh w64"
            style="margin: 0 0 0 5px;"
            v-on:click="onCancel">
            취소
          </div>
          <div style="flex: 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ko } from "vuejs-datepicker/dist/locale";
import moment from "moment/moment";
import Datepicker from "vuejs-datepicker";
import BaseMixin from "../Mixins/BaseMixin";
import apiproject from "../../api/ApiProject";

export default {
  name: "CodegroupPopup",
  components: { Datepicker },
  props: ["modeType","ref_codegroup","ref_codegroup_name"],
  mixins: [BaseMixin],
  created() {},
  data() {
    return {
      seq: -1,
      codegroup_id: "",
      codegroup_name: "",
      is_used: "Y",
      sort_no: "1",
      is_open: false,
      date_locale_ko: ko,
      m_day: moment().format("YYYY-MM-DD"),
    };
  },
  computed: {
    ...mapGetters(["logged_info", "is_logged"]),
    c_modeType() {
      if (this.modeType) {
        return this.modeType;
      } else {
        return "c";
      }
    },    
    c_ref_codegroup() {
      if (this.ref_codegroup) {
        return this.ref_codegroup;
      } else {
        return "";
      }
    },
    c_is_verify_codegroup_id() {
      return this.codegroup_id && this.codegroup_id.length > 1;
    },
    c_is_verify_codegroup_name() {
      return this.codegroup_name && this.codegroup_name.length > 0;
    },
    c_member_seq() {
      // console.log(this.logged_info)
      if(this.logged_info) {
        return this.logged_info.seq;
      }
      return '';
    },    
  },
  watch:{
    // 클래스코드 한글 입력 방지
    codegroup_id(val){
          const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if(reg.exec(val)!==null){
        return this.codegroup_id = this.codegroup_id.slice(0,-1);
        }
    }
  },
  mounted() {},
  methods: {
    onRest() {
      this.codegroup_id = "";
      this.codegroup_name = "";
      this.is_used = "Y";
      this.sort_no = "1";
    },
    isCreateMode() {
      this.$log.debug("isType", this.isType);
      if (this.c_modeType === "c") {
        return true;
      }
      return false;
    },
    onModify() {
      if (!this.c_is_verify_codegroup_id) {
        this.$refs.codegroup_id.focus();
        this.onError("코드그룹아이디를 입력해주세요.");
        return;
      }
      if (!this.c_is_verify_codegroup_name) {
        this.$refs.codegroup_name.focus();
        this.onError("코드그룹명을 입력해주세요.");
        return;
      }
      
      this.onNext();
    },
    onVerify() {
      this.$log.debug(this.isCreateMode());
      if (!this.c_is_verify_codegroup_id) {
        this.$refs.codegroup_id.focus();
        this.onError("코드그룹 아이디를 입력해주세요.");
        return;
      }
      if (!this.c_is_verify_codegroup_name) {
        this.$refs.codegroup_name.focus();
        this.onError("코드그룹명을 입력해주세요.");
        return;
      }
      this.onNext();
    },
    async onNext() {
      this.$log.debug("on Next");
      //const bday = this.dateFormatter(this.birth_day);
      const codegroup_info = {
        ref_codegroup: this.ref_codegroup,
        codegroup_id: this.codegroup_id,
        codegroup_name: this.codegroup_name,
        is_used: this.is_used,
        sort_no: this.sort_no,
        reg_member_seq: this.c_member_seq,
      };

      let result = "";
      if (this.isCreateMode()) {
        await apiproject
          .createCodegroup(codegroup_info)
          .then((result) => {
            if (result.error === 0) {
              this.onSuccess("등록완료되었습니다.");
              this.$emit("callCodegroupList", 1);
              //this.$router.push({ name: 'index' });
              this.onCancel();
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
        this.$log.debug("else");
        result = await apiproject.updateCodegroup(this.seq, codegroup_info);
        if (result.error === 0) {
          this.onSuccess("정보가 수정되었습니다.");
          //this.$log.debug('완료');
          this.$emit("callCodegroupList");

          this.onCancel();
        } else {
          this.onError("정보 수정 실패하였습니다.");
        }
        // this.setData(result);
      }
    },
    onCancel() {
      this.closePopup();
    },
    dateFormatter(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async openPopupBySeq(seq) {
      this.seq = seq;

      const data = {
        codegroup_seq: this.seq,
      };

      await apiproject.getCodegroup(data).then(async (result) => {
        this.$log.debug(result);
        if (result.error === 0) {
          if (result.codegroup_info.length > 0) {
            this.onRest();
            this.seq = result.codegroup_info[0].seq;
            this.codegroup_id = result.codegroup_info[0].codegroup_id;
            this.codegroup_name = result.codegroup_info[0].codegroup_name;
            this.is_used = result.codegroup_info[0].is_used;
            this.sort_no = result.codegroup_info[0].sort_no;
          }
          this.codegroup_info = result.codegroup_info;
          // console.log(this.codegroup_info);
          this.is_open = true;
        } else {
          this.onError(result.message);
          this.is_open = false;
        }
      });

      //}
    },
    async openPopup() {
      console.log(this.is_open);
      this.$log.debug("openPopup");
      this.is_open = true;
      this.onRest();
    },
    closePopup() {
      this.is_open = false;
    },
    fnCheckUsed() {
      console.log(this.status);
    },
  },
};
</script>

<style scoped>
.newdata {
  width: 580px;
  padding: 50px;
}
input {
  border-bottom: 1px solid #ccc;
  height: 40px;
  font-weight: 400;
  font-size: 14px;
  color: #333;
  letter-spacing: -0.5px;
}

input::placeholder {
  color: #aaa297;
}
.btn_idauth {
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

.member_input {
  display: flex;
  flex-direction: row;
}
</style>
