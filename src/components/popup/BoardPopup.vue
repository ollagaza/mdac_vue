<!--
=======================================
'	파일명 : BoardPopup.vue
'	작성자 : djyu
'	작성일 : 2021.11.30
'	기능   : board create / modify / view
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
        <div class="table_title">{{ board_title }} 등록</div>
      </template>
      <template v-if="c_modeType === 'e'">
        <div class="table_title">{{ board_title }} 정보</div>
      </template>
      <div style="padding-top: 20px">
        <div class="item_title">
          <div class="item">프로젝트</div>
          <div>
            <select
              class="selbox_popup"
              v-model="project_seq"
              style="width: 380px; padding-right: 5px"
              :disabled="c_modeType === 'e' ? true : false">

                <option v-if="this.board_code === '1'" value="" selected=true>프로젝트를 선택해주세요</option>
                <option v-if="this.board_code === '2'" value="" selected=true>전체</option>
                  <template v-for="(project, seq) in c_project_list">
                    <option v-bind:value="project.seq">{{project.project_name}}</option>
                  </template>                
            </select>
          </div>
        </div>

        <div class="item_title">
          <div class="item">제목</div>
          <div>
            <input
              type="text"
              ref="subject"
              v-model="subject"
              style="width: 380px"
              placeholder="제목을 입력하세요."
              maxlength="200"
            />
          </div>
        </div>
        <div class="item_title">
          <div class="item">내용</div>
          <div>
            <textarea class="text"
              ref="content"
              v-model="content"
              style="width: 380px;height: 300px;"
              placeholder="내용을 입력하세요."
            ></textarea>
          </div>
        </div>
        <div class="item_title">
          <div class="item">파일</div>
          <div>
            <input ref="image" id="input"
              type="file" name="image" multiple="multiple"
              class="hidden"
              style="width: 380px;"
              @change="uploadImage()"><!--  accept="image/*" -->
              <img  id="Preview_image_create" class="Preview_image">
          </div>
        </div>

        <div v-if="files.length > 0" class="item_title">
          <div class="item">첨부파일</div>
          <div>
              <div v-for="(item, idx) in files" v-bind:key="idx">
                  <!-- <img v-bind:src="item.fileurl"> -->
                  <div>
                    ▶ <a @click.prevent="downloadItem(item.fileurl, item.filename)" style="cursor:pointer;">{{ item.filename }}</a>
                  </div>
                </div>        

          </div>
        </div>

      </div>
      <div style="padding-top: 20px">
        <div style="display: flex; flex-direction: row">
          <div style="flex: 1"></div>

          <template v-if="c_modeType === 'c'">
            <div
              class="btn squareh pupple"
              v-on:click="onVerify">
              등록
            </div>
          </template>
          <template v-else>
            <div
              class="btn squareh pupple"
              v-on:click="onModify">
              수정
            </div>
          </template>

          <div
            class="btn squareh"
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
// import apiproject from "../../api/ApiProject";
import apiboard from '../../api/ApiBoard';
import util from '../../utils/util';

export default {
  name: "ClassPopup",
  components: { Datepicker },
  props: ["modeType","board_code", "project_list"],
  mixins: [BaseMixin],
  created() {},
  data() {
    return {
      board_title: this.board_code === '1' ? "라벨링 가이드" : "공지사항",
      project_seq: "",
      seq: -1,
      subject: "",
      content: "",
      files: [],
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
    c_board_code() {
      if (this.board_code) {
        return this.board_code;
      } else {
        return "1";
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
    c_is_verify_subject() {
      return this.subject && this.subject.length > 1;
    },
    c_is_verify_content() {
      return this.content && this.content.length > 1;
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
  },
  mounted() {},
  methods: {
    onRest() {
      this.project_seq = "";
      this.subject = "";
      this.content = "";
      this.$refs.image.value=null;
      this.files = [];
    },
    isCreateMode() {
      this.$log.debug("isType", this.isType);
      if (this.c_modeType === "c") {
        return true;
      }
      return false;
    },
    onModify() {
      this.$log.debug(this.isCreateMode());
      if (!this.c_is_verify_project_seq && this.board === '1') {
        this.onError("프로젝트를 선택해주세요.");
        return;
      }
      if (!this.c_is_verify_subject) {
        this.$refs.subject.focus();
        this.onError("제목을 입력해주세요.");
        return;
      }
      if (!this.c_is_verify_content) {
        this.$refs.content.focus();
        this.onError("내용을 입력해주세요.");
        return;
      }
      
      this.onNext();
    },
    onVerify() {
      this.$log.debug(this.isCreateMode());

      if (!this.c_is_verify_project_seq && this.board === '1') {
        this.onError("프로젝트를 선택해주세요.");
        return;
      }
      if (!this.c_is_verify_subject) {
        this.$refs.subject.focus();
        this.onError("제목을 입력해주세요.");
        return;
      }
      if (!this.c_is_verify_content) {
        this.$refs.content.focus();
        this.onError("내용을 입력해주세요.");
        return;
      }
      this.onNext();
    },
    async onNext() {
      this.$log.debug("on Next");
      //const bday = this.dateFormatter(this.birth_day);
      // console.log(this.image)
      let form = new FormData()
      form.append('board_code', this.board_code);
      if(this.project_seq) {
        form.append('project_seq', this.project_seq);
      }
      form.append('subject', this.subject);
      form.append('content', this.content);
      form.append('reg_member_seq', this.c_member_seq);
      // console.log(`content===${this.content}`)
      // return;
      let files = this.$refs['image'].files[0]
      for (let i = 0; i < this.$refs['image'].files.length; i++) {
        files = this.$refs['image'].files[i];
        form.append('image', files);
      }
      
      const board_info = {
        board_code: this.board_code,
        project_seq: this.project_seq,
        subject: this.subject,
        content: this.content,
        // files: files,
        reg_member_seq: this.c_member_seq,
      };
      // console.log(`c_member_seq===${this.c_member_seq}`);
      //this.$log.debug(class_info);
      let result = "";
      if (this.isCreateMode()) {
        await apiboard
          .createBoard(form)
          .then((result) => {
            if (result.error === 0) {
              this.onSuccess("등록완료되었습니다.");
              this.$emit("callBoardList", 1);
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
        // alert(this.seq);
        this.$log.debug("else");
        result = await apiboard.updateBoard(this.seq, form);
        if (result.error === 0) {
          this.onSuccess("정보가 수정되었습니다.");
          //this.$log.debug('완료');
          this.$emit("callBoardList");

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
        board_seq: this.seq,
      };

      await apiboard.getBoardInfo(this.c_board_code, data).then(async (result) => {
        this.$log.debug(result);
        if (result.error === 0) {
          if (result.board_info.length > 0) {
            this.onRest();

            if (result.board_info[0].project_seq === null) {
              result.board_info[0].project_seq = '';
            }
            this.project_seq = result.board_info[0].project_seq;
            this.seq = result.board_info[0].seq;
            this.subject = result.board_info[0].subject;
            this.content = result.board_info[0].content;

            var jsonArray 	= new Array();
            if(result.board_info[0].files) {
              for (var i = 0 ; i <= result.board_info[0].files.split('///').length-1; i++) {
                //this.files = 'http://localhost:3000/img/' +this.view.files.split(',')[i];
                var jsonObj		= new Object();
                  
                jsonObj.id		= 'file';
                jsonObj.fileurl	= '/uploads/' + this.c_board_code + '/' + result.board_info[0].files.split('///')[i];
                jsonObj.filename	= result.board_info[0].files.split('///')[i];
                jsonObj = JSON.stringify(jsonObj);
                //String 형태로 파싱한 객체를 다시 json으로 변환
                jsonArray.push(JSON.parse(jsonObj));
                console.log('/uploads/' + this.c_board_code + '/' +result.board_info[0].files.split('///')[i]);
                //console.log(jsonArray[0]);
              }
              this.files = jsonArray; //JSON.stringify(this.view.files.split(','));
              console.log('filenmJson : ' + JSON.stringify(jsonArray));
              console.log('filenm : ' + JSON.stringify(result.board_info[0].files.split('///')));            

            }
          }
          this.board_info = result.board_info;
          console.log(this.board_info);
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
    uploadImage: function() {
      // let form = new FormData()
      // let image = this.$refs['image'].files[0]

      // // alert(this.$refs['image'].files.length);

      // for (let i = 0; i < this.$refs['image'].files.length; i++) {
      //   image = this.$refs['image'].files[i];
      //   form.append('image', image);
      // }
      // //form.append('image', image)
      // apiboard.uploadFile(this.c_board_code, form).then(async (result) => {
      //   this.$log.debug(result);
      //   if (result.error === 0) {

      //     this.is_open = true;
      //   } else {
      //     this.onError(result.message);
      //     this.is_open = false;
      //   }
      // });      
      
    },
    clickInputTag: function() {
      this.$refs['image'].click()
    },
    downloadItem (url,filename) {
      util.downloadFile(document, filename, url);
      return;
      // console.log(url)
      // console.log(filename)
      // this.$axios.get(url, { responseType: 'blob' })
      //   .then(({ data }) => {
      //     let blob = new Blob([data], { type: 'text/html' })
      //     let link = document.createElement('a')
      //     link.href = window.URL.createObjectURL(blob)
      //     link.download = filename;
      //     link.click()
      //   .catch(error => {
      //     console.error(error)
      //   })
      // })
    }
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
