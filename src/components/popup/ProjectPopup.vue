<!--
=======================================
'	파일명 : ProjectPopup.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : project create / modify / view
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
        <div class="table_title">프로젝트 등록</div>
      </template>
      <template v-if="c_modeType === 'e'">
        <div class="table_title">프로젝트 정보</div>
      </template>
      <div style="padding-top: 20px">
        <div class="item_title">
          <div class="item">프로젝트명</div>
          <div>
            <input
              type="text"
              ref="project_name"
              v-model="project_name"
              style="width: 380px"
              placeholder="프로젝트명을 입력하세요."
              maxlength="100"
            />
          </div>
        </div>
        <div class="item_title">
          <div class="item">클래스사용</div>
          <div>
            <select
              class="text"
              v-model="is_class"
              style="width: 200px; padding-right: 5px">
              <option value="Y">사용</option>
              <option value="N">사용안함</option>
            </select>
          </div>
        </div>
        <div class="item_title">
          <div class="item">메모</div>
          <div>
            <input
              type="text"
              ref="memo"
              v-model="memo"
              style="width: 380px"
              placeholder=""
            />
          </div>
        </div>
        <div class="item_title">
          <div class="item">상태</div>
          <div>
            <select
              class="text"
              v-model="status"
              style="width: 200px; padding-right: 5px">
              <option value="1">진행중</option>
              <option value="2">중지중</option>
              <option value="3">종료</option>
            </select>
          </div>
        </div>
        <template v-if="status === '2'">
          <div class="item_title">
            <div class="item">중지사유</div>
            <div>
              <input
                type="text"
                ref="reason"
                v-model="reason"
                style="width: 380px"
                placeholder=""
              />
            </div>
          </div>
        </template>
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
  name: "ProjectPopup",
  components: { Datepicker },
  props: ["modeType"],
  mixins: [BaseMixin],
  created() {},
  data() {
    return {
      seq: -1,
      project_name: "",
      is_class: "N",
      memo: "",
      status: "1",
      reason: "",
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
    c_is_verify_project_name() {
      return this.project_name && this.project_name.length > 1;
    },
    c_member_seq() {
      console.log(this.logged_info)
      if(this.logged_info) {
        return this.logged_info.seq;
      }
      return '';
    },    
  },
  mounted() {},
  methods: {
    onRest() {
      this.project_name = "";
      this.is_class = "N";
      this.memo = "";
      this.status = "1";
      this.reason = "";
    },
    isCreateMode() {
      this.$log.debug("isType", this.isType);
      if (this.c_modeType === "c") {
        return true;
      }
      return false;
    },
    onModify() {
      if (!this.c_is_verify_project_name) {
        this.$refs.project_name.focus();
        this.onError("프로젝트명을 입력해주세요.");
        return;
      }
      if (this.status === "2" && this.reason === "") {
        this.$refs.reason.focus();
        this.onError("중지사유를 입력해주세요.");
        return;
      }
      this.onNext();
    },
    onVerify() {
      // this.$log.debug(this.isCreateMode());
      if (!this.c_is_verify_project_name) {
        this.$refs.project_name.focus();
        this.onError("프로젝트명을 입력해주세요.");
        return;
      }
      this.onNext();
    },
    async onNext() {
      // this.$log.debug("on Next");
      //const bday = this.dateFormatter(this.birth_day);
      const project_info = {
        project_name: this.project_name,
        is_class: this.is_class,
        status: this.status,
        memo: this.memo,
        reason: this.reason,
        reg_member_seq: this.c_member_seq,
      };
      // this.$log.debug(project_info);
      let result = "";
      if (this.isCreateMode()) {
        await apiproject
          .createProject(project_info)
          .then((result) => {
            if (result.error === 0) {
              this.onSuccess("등록완료되었습니다.");
              this.$emit("callProjectList", 1);
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
        // this.$log.debug("else");
        result = await apiproject.updateProject(this.seq, project_info);
        if (result.error === 0) {
          this.onSuccess("정보가 수정되었습니다.");
          //this.$log.debug('완료');
          this.$emit("callProjectList");

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
        project_seq: this.seq,
      };

      await apiproject.getProjectInfo(data).then(async (result) => {
        // this.$log.debug(result);
        if (result.error === 0) {
          if (result.project_info.length > 0) {
            this.onRest();
            this.seq = result.project_info[0].seq;
            this.project_name = result.project_info[0].project_name;
            this.is_class = result.project_info[0].is_class;
            this.memo = result.project_info[0].memo;
            this.status = result.project_info[0].status;
            this.reason = result.project_info[0].reason;
          }
          this.project_info = result.project_info;
          console.log(this.project_info);
          this.is_open = true;
        } else {
          this.onError(result.message);
          this.is_open = false;
        }
      });

      //}
    },
    async openPopup() {
      // this.$log.debug("openPopup");
      this.is_open = true;
      this.onRest();
    },
    closePopup() {
      this.is_open = false;
    },
    fnCheckUsed() {
      // console.log(this.status);
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
