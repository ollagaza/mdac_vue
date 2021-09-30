<!--
=======================================
'	파일명 : ClassPopup.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : class create / modify / view
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
        <div class="table_title">클래스 등록</div>
      </template>
      <template v-if="c_modeType === 'e'">
        <div class="table_title">클래스 정보</div>
      </template>
      <div style="padding-top: 20px">
        <div class="item_title">
          <div class="item">프로젝트</div>
          <div>
            <select
              class="text"
              v-model="project_seq"
              style="width: 380px; padding-right: 5px"
              :disabled="c_modeType === 'e' ? true : false">

                <option value="" selected=true>프로젝트를 선택해주세요</option>
                  <template v-for="(project, seq) in c_project_list">
                    <option v-bind:value="project.seq">{{project.project_name}}</option>
                  </template>                
            </select>
          </div>
        </div>

        <div class="item_title">
          <div class="item">클래스코드</div>
          <div>
            <input
              type="text"
              ref="class_id"
              v-model="class_id"
              style="width: 380px"
              placeholder="클래스코드를 입력하세요."
              maxlength="20"
            />
          </div>
        </div>
        <div class="item_title">
          <div class="item">클래스명</div>
          <div>
            <input
              type="text"
              ref="class_name"
              v-model="class_name"
              style="width: 380px"
              placeholder="클래스명을 입력하세요."
              maxlength="100"
            />
          </div>
        </div>
        <div class="item_title">
          <div class="item">상태</div>
          <div>
            <select
              class="text"
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
              class="btn navy"
              style="width: 160px; height: 50px"
              v-on:click="onVerify">
              등록
            </div>
          </template>
          <template v-else>
            <div
              class="btn navy"
              style="width: 160px; height: 50px"
              v-on:click="onModify">
              수정
            </div>
          </template>

          <div
            class="btn_cancel"
            style="width: 160px; height: 50px"
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
  name: "ClassPopup",
  components: { Datepicker },
  props: ["modeType","project_list"],
  mixins: [BaseMixin],
  created() {},
  data() {
    return {
      project_seq: "",
      seq: -1,
      class_id: "",
      class_name: "",
      is_used: "Y",
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
    c_project_list() {
      if (this.project_list) {
        return this.project_list;
      } else {
        return "[]";
      }
    },
    c_is_verify_project_seq() {
      return this.project_seq;
    },
    c_is_verify_class_id() {
      return this.class_id && this.class_id.length > 1;
    },
    c_is_verify_class_name() {
      return this.class_name && this.class_name.length > 1;
    },
    c_member_seq() {
      console.log(this.logged_info)
      if(this.logged_info) {
        return this.logged_info.seq;
      }
      return '';
    },    
  },
  watch:{
    // 클래스코드 한글 입력 방지
    class_id(val){
          const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if(reg.exec(val)!==null){
        return this.class_id = this.class_id.slice(0,-1);
        }
    }
  },
  mounted() {},
  methods: {
    onRest() {
      this.project_seq = "";
      this.class_id = "";
      this.class_name = "";
      this.is_used = "Y";
    },
    isCreateMode() {
      this.$log.debug("isType", this.isType);
      if (this.c_modeType === "c") {
        return true;
      }
      return false;
    },
    onModify() {
      if (!this.c_is_verify_class_id) {
        this.$refs.class_id.focus();
        this.onError("클래스코드를 입력해주세요.");
        return;
      }
      if (!this.c_is_verify_class_name) {
        this.$refs.class_name.focus();
        this.onError("클래스명을 입력해주세요.");
        return;
      }
      
      this.onNext();
    },
    onVerify() {
      this.$log.debug(this.isCreateMode());
      if (!this.c_is_verify_project_seq) {
        this.onError("프로젝트를 선택해주세요.");
        return;
      }
      if (!this.c_is_verify_class_id) {
        this.$refs.class_id.focus();
        this.onError("클래스코드를 입력해주세요.");
        return;
      }
      if (!this.c_is_verify_class_name) {
        this.$refs.class_name.focus();
        this.onError("클래스명을 입력해주세요.");
        return;
      }
      this.onNext();
    },
    async onNext() {
      this.$log.debug("on Next");
      //const bday = this.dateFormatter(this.birth_day);
      const class_info = {
        project_seq: this.project_seq,
        class_id: this.class_id,
        class_name: this.class_name,
        is_used: this.is_used,
        reg_member_seq: this.c_member_seq,
      };
      console.log(`c_member_seq===${this.c_member_seq}`);
      //this.$log.debug(class_info);
      let result = "";
      if (this.isCreateMode()) {
        await apiproject
          .createClass(class_info)
          .then((result) => {
            if (result.error === 0) {
              this.onSuccess("등록완료되었습니다.");
              this.$emit("callClassList", 1);
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
        result = await apiproject.updateClass(this.seq, class_info);
        if (result.error === 0) {
          this.onSuccess("정보가 수정되었습니다.");
          //this.$log.debug('완료');
          this.$emit("callClassList");

          //let some_date = {
          //  page : 2,
          //}
          //this.$emit('callParentFunction', some_date, (res) => {
          //});
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
      console.log(`modeType(ProjectPopup)===${this.modeType}`);

      const data = {
        class_seq: this.seq,
      };

      await apiproject.getClassInfo(data).then(async (result) => {
        this.$log.debug(result);
        if (result.error === 0) {
          if (result.class_info.length > 0) {
            this.onRest();
            this.project_seq = result.class_info[0].project_seq;
            this.seq = result.class_info[0].seq;
            this.class_id = result.class_info[0].class_id;
            this.class_name = result.class_info[0].class_name;
            this.is_used = result.class_info[0].is_used;
          }
          this.class_info = result.class_info;
          console.log(this.class_info);
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
.item {
  width: 100px;
  font-weight: 400;
  font-size: 14px;
  color: #504637;
  letter-spacing: -0.5px;
  padding-top: 12px;
}
.item_title {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
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
