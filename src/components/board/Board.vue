<!--
=======================================
'	파일명 : Board.vue
'	작성자 : djyu
'	작성일 : 2021.11.15
'	기능   : board list
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Datalist_Left v-bind:menu_id="this.board_code === '1' ? 5 : 6"></Datalist_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div v-if="this.board_code === '1'" style="font-weight: 600; font-size: 15pt; color: #333">
            라벨링 가이드
          </div>
          <div v-if="this.board_code === '2'" style="font-weight: 600; font-size: 15pt; color: #333">
            공지사항
          </div>


          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">

              <select class="text" v-model="project_seq" style="width: 240px;height: 36px;" @change="fnBoardList(1)">
                <option value="" selected=true>전체프로젝트</option>
                  <template v-for="(project, seq) in project_list">
                    <option v-bind:value="project.seq">{{project.project_name}}</option>
                  </template>
              </select>

              <select class="text" v-model="search_type" style="width: 160px;height: 36px;">
                <option value="subject" selected=true>제목</option>
                <option value="content">내용</option>
              </select>

              <input type="text" v-model="keyword" @keyup.enter="fnBoardList(1)" />
              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnBoardList(1)">검색</div>
              <div class="btn navy" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnBoardDetail('')">등록</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <div class="check_wrapper" v-on:click="onAllCheckClick">
                <div class="check_box" v-bind:class="{ on: check_click }"></div> <div class="check_text">전체 선택</div>
              </div>

              <!-- <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="class_change('Y')">사용중</div>
              <div class="btn" style="margin-left:5px;width:80px; height: 36px;" v-on:click="class_change('N')">사용정지</div> -->
              <div class="btn red" style="margin-left:5px;width:80px; height: 36px;" v-on:click="board_change('D')">삭제</div>

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;" @change="fnBoardList(1)">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div>
            </div>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div class="grid_m class header">
              <div></div><!-- v-model="checked_all"  -->
              <div>프로젝트</div>
              <div>제목</div>
              <div>등록자</div>
              <div>등록일</div>
              <div>등록일</div>
            </div>

            <template v-if="board_list.length === 0">
              <div class="grid_m class nodata">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="board_list.length > 0">
              <template v-for="(pBoard, seq) in board_list">
                <div class="grid_m class body">
                  <!-- <div><input type="checkbox" class="check_box" value="member.seq" :id="'check_' + member.seq" v-model="member.selected"  @change="selected($event)" v-bind:class="[{on: checkData[member.seq]}, {admin: member.used_admin === 'A'}]" v-on:click="onCheckClick(member.seq)"></div>v-model="checked_user"  -->
                  <div class="check_box" v-bind:class="[{on: checkData[pBoard.seq]}]" v-on:click="onCheckClick(pBoard.seq)"></div>
                  <div v-on:click="fnBoardDetail(pBoard.seq)">{{ pBoard.project_name === null ? '전체' : pBoard.project_name }}</div>
                  <div style="margin-right: auto;margin-left:5px;" v-on:click="fnBoardDetail(pBoard.seq)">{{ pBoard.subject }}</div>
                  <div v-on:click="fnBoardDetail(pBoard.seq)">{{ pBoard.user_name }}</div>
                  <div v-on:click="fnBoardDetail(pBoard.seq)">{{ pBoard.reg_date_dt }}</div>
                  <div v-on:click="fnBoardDetail(pBoard.seq)">{{ pBoard.reg_date_dt }}</div>
                </div>
              </template>
            </template>
          </div>

          <div style="margin: 20px 0 40px 0;">
            <Pagination ref="Pagination"
                        :pageNationObj = "cpage_navigation"
                        v-on:onMovePage = "onMovePage"></Pagination>
          </div>
        </div>
      </div>
    </div>

    <BoardPopup ref="boardpopup"
             v-bind:modeType="modeType"
             v-bind:board_code="board_code"
             v-bind:project_list="project_list"
             v-on:callBoardList="fnBoardList"
    ></BoardPopup>
  </div>
</template>


<script>
import apiboard from '../../api/ApiBoard';
import apiproject from '../../api/ApiProject';
import BoardPopup from '../../components/popup/BoardPopup';
import BaseMixin from '../Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
import Datalist_Left from '../datamanagement/Datalist_Left';
import Pagination from '../../components/Pagination';

export default {
  name: 'BoardList',
  components: {
    BoardPopup,
    Datalist_Left,
    Pagination,
  },
  mixins: [BaseMixin],
  data() {
    return {
      board_code: this.$route.params.board_code ? this.$route.params.board_code: '1',   // 게시판종류
      project_list: '',         // 프로젝트 리스트
      board_list: '',           // 클래스 데이터 리스트
      project_seq: '',          // 프로젝트 select
      search_type: 'subject',   // 검색조건
      keyword: '',              // 검색어
      no:'',                    // 게시판 숫자
      paging:'',                // 페이징 데이터
      first_page:'',            // 페이징-시작페이지
      last_page: '',             // 페이징-마지막페이지
      total_count: 0,            // 게시물수
      total_page: 0,            // 전체페이지
      list_count: 20,            // 페이지카운트
      cur_page:this.$route.query.cur_page ? this.$route.query.cur_page:1,
      modeType: 'e',            // 수정/등록모드
      allChecked: false,        // All check
      checkData: {},
      check_click: false,

      page_navigation: {
        cur_page: 1,
        list_count: 20,
        total_count: 100,
        first_page: 1,
        page_count: 10,
      },
    };
  },
  watch: {
    '$route': function(){
      this.board_code = this.$route.params.board_code ? this.$route.params.board_code: '1';
      this.fnBoardList(1);    
    }
  },  
  computed: {
    cpage_navigation() {
      const null_navigation = {};
      if (this.page_navigation) {
        return this.page_navigation;
      }
      return null_navigation;
    },
    cis_data() {
      if (this.board_list && this.board_list.length > 0) {
        return true;
      }
      return false;
    }

  },
  mounted() {
    const data = {
        list_count:''
        ,search_type:''
        ,keyword:''
    }
    apiproject.getProjectInfo(data)
      .then((result) => {
        this.project_list = result.project_info;
      });
    this.fnBoardList(1);
  },
  methods: {
    Menu1() {
      this.$router.push({ name: 'datastatus' });
    },
    Menu2() {
      this.$router.push({ name: 'project' });
    },
    Menu3() {
      this.$router.push({ name: 'division' });
    },
    Menu4() {
      this.$router.push({ name: 'class' });
    },

    // 클래스 리스트 조회
    fnBoardList(pg) {
      //body = req.query;
      this.showLoading(true);
      let project_seq = this.project_seq;
      let search_type = this.search_type;
      let keyword = this.keyword;
      if(this.cur_page === 'undefined') {
        this.cur_page = 1;
      }

      let cur_page = pg === 'undefined' ? this.cur_page : pg;
      cur_page = cur_page ? cur_page : this.cur_page;
      this.cur_page = cur_page;
      const data = {
        cur_page:this.cur_page
        ,list_count:this.list_count
        ,project_seq:this.project_seq
        ,search_type:this.search_type
        ,keyword:this.keyword
      };
      // this.$log.debug('board_code', this.board_code)
      apiboard.getBoardInfo(this.board_code,data) // 클래스 API 호출
        .then((result) => {

          if (result.board_info.length > 0) {
            for (const key in result.board_info) {
              const reg_date = result.board_info[key].reg_date;
              if (reg_date) {
                result.board_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              }
            }
          }
          this.board_list = result.board_info;
          this.paging = result.paging;
          this.no = this.paging.total_count - ((this.paging.cur_page-1) * this.paging.list_count);
          // this.page_navigation = { cur_page: result.paging.total_page, list_count: result.paging.list_count, total_count: result.paging.total_count, first_page: result.paging.first_page, page_count: 10 };
          this.page_navigation = this.paging
        });
      this.showLoading(false);
    },
    onMovePage(page) {
      this.fnPage(page);
    },
    fnPage(n) {
      if(this.cur_page != n) {
        this.cur_page = n;
        this.fnBoardList(n);
      }
    },
    // 체크박스 전체
    onAllCheckClick() {
      this.check_click = !this.check_click;
      this.allCheck(this.check_click);
    },

    onCheckClick(seq) {
      this.$set(this.checkData, seq, this.checkData[seq] !== true);
      // this.$log.debug(this.checkData);
    },
    allCheck(value) {
      if (this.cis_data) {
        Object.keys(this.board_list).forEach((key) => {
          if (this.board_list[key].is_admin !== 'A') {
            const seq = this.board_list[key].seq;
            this.$set(this.checkData, seq, value);
          }
        });
      }
    },


    // 상태 변경
    board_change(itype) {
      const options = {};
      const checkData = this.checkData;
      let confirm_msg = '';
      let close_msg = '';
      let szTitle = '';
      switch(itype) {
        case 'D' :
          confirm_msg = '선택한 게시물을 삭제하시겠습니까?';
          close_msg = '삭제했습니다.';
          szTitle = '게시물삭제';
          break;
      }
      let selUserCo = 0;
      for (const key of Object.keys(checkData)) {
        if (checkData[key]) {
          selUserCo++;
        }
      }
      if (selUserCo < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 게시물이 없습니다.', null);
      } else {
        const sendParam = { itype: itype, szTitle: szTitle, checkData: checkData, close_msg: close_msg };
        if (itype === 'D') { // 삭제
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.board_delete, options);
        }
      }
    },
    // 삭제 실행
    board_delete(sendParam, setDate) {
      const checkData = sendParam.checkData;
      const arrData = [];
      Object.keys(checkData).forEach((key) => {
        if (checkData[key]) {
          arrData.push(key);
        }
      });
      // this.$log.debug('sendParam', sendParam, setDate);
      const params = {};
      params.used = sendParam.itype;
      params.boards = arrData;
      apiboard.delBoard(params).then((data) => {
        // console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnBoardList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },

    // 클래스 상세보기
    fnBoardDetail(seq) {
      // console.log(seq)
      if(seq === '')
      {
        this.modeType = 'c';
        this.$refs.boardpopup.openPopup();
      }else{
        this.modeType = 'e';
        this.$refs.boardpopup.openPopupBySeq(seq);
      }
    },
    checkedAll(checked) {
      //if (this.cis_data) {
        this.allChecked = checked
        for (let i in this.board_list) {
            this.board_list[i].selected = this.allChecked;
        }
      //}
    },
    selected (e) {
        for (let i in this.board_list) {
            if(! this.board_list[i].selected) {
                this.allChecked = false;
                return;
            } else {
                this.allChecked = true;
            }
        }
    },
    getSelected(){
        let user_ids = [];
        for (let i in this.board_list) {
            if(this.board_list[i].selected) {
                user_ids.push(this.board_list[i].seq);
            }
        }
        console.log(user_ids)
    },
  },
};
</script>

<style scoped>
.searchWrap {
  border: 1px solid #888;
  border-radius: 5px;
  text-align: center;
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.searchWrap input {
  width: 60%;
  height: 36px;
  border-radius: 3px;
  padding: 0 10px;
  border: 1px solid #888;
}
.grid_m.class {
  grid-template-columns: 50px 200px 400px 100px 100px 150px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
</style>
