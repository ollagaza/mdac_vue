<!--
=======================================
'	파일명 : ProjectList.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : project list
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Side_bar v-bind:menu_id="3"></Side_bar>
        <div class="content_layout">
          <div class="main_title">
            Data Management
          </div>
          <div class="sub_title">
            Project Manager
          </div>

          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text" v-model="status" style="width: 190px;" @change="fnProjectList(1)">
                <option value="" selected=true>상태(전체)</option>
                <option value="1">진행중</option>
                <option value="2">중지중</option>
                <option value="3">종료</option>
              </select>

              <select class="text" v-model="search_type" style="width: 200px;">
                <option value="project_name" selected=true>프로젝트명</option>
                <option value="LABELER">라벨러</option>
                <option value="CHECKER">검수자</option>
              </select>

              <input type="text" class="search input" v-model="keyword" @keyup.enter="fnProjectList(1)" />
              <div class="btn deepgray" style="margin-left:5px;width:80px;" v-on:click="fnProjectList(1)">검색</div>
              <div class="btn reg" style="margin-left:5px;width:100px;" v-on:click="fnProjectDetail('')">프로젝트등록</div>
              <div class="btn reg" style="margin-left:5px;width:80px;" v-on:click="Menu3">분류관리</div>
              <div class="btn reg" style="margin-left:5px;width:90px;" v-on:click="Menu4">클래스관리</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <!-- <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="project_change('1')">진행중</div>
              <div class="btn redfont" style="margin-left:5px;width:80px; height: 36px;" v-on:click="project_change('3')">종료</div>
              <div class="btn" style="margin-left:5px;width:80px; height: 36px;" v-on:click="project_change('2')">중지</div> -->

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;height: 33px;" @change="fnProjectList(1)">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div>
            </div>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div class="grid_m project header">
              <div>프로젝트코드</div>
              <div>프로젝트명</div>
              <div>할당라벨러</div>
              <div>할당검수자</div>
              <div>상태</div>
              <div>등록일</div>
              <div>통계</div>
            </div>

            <template v-if="project_list.length === 0">
              <div class="grid_m project nodata bottom">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="project_list.length > 0">
              <template v-for="(project, index) in project_list">
                <div class="grid_m project body" v-bind:class="{ bottom : project_list.length === index+1 }">
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.project_code }}</div>
                  <div style="align-items: left;justify-items: left !important;" v-on:click="fnProjectDetail(project.seq)">{{ project.project_name }}</div>
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.labeler_str }}</div>
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.checker_str }}</div>
                  <div v-on:click="fnProjectDetail(project.seq)"><div :class="{ 'process_work' : project.status === '1', 'process_stop' : project.status === '2', 'process_end' : project.status === '3' }" style="margin-left:5px;width:60px; height: 28px;" v-on:click="fnProjectList(1)">{{ project.status_str }}</div></div>
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.reg_date_dt }}</div>
                  <div><div class="btn history" style="margin-left:5px;width:60px; height: 28px;" v-on:click="statisticsGo(project.seq)">통계</div></div>
                </div>
              </template>
            </template>
          </div>

          <!-- <div class="pagination" v-if="paging.total_count > 0">
            <a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
            <a href="javascript:;" v-if="paging.first_page > 10" @click="fnPage(`${paging.first_page-1}`)"  class="prev">&lt;</a>
            <template v-for=" (n,index) in paginavigation()">
              <template v-if="paging.page==n">
                <strong :key="index">{{n}}</strong>
              </template>
              <template v-else>
                <a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
              </template>
            </template>
            <a href="javascript:;" v-if="paging.total_page > paging.last_page" @click="fnPage(`${paging.last_page+1}`)"  class="next">&gt;</a>
            <a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
          </div> -->

          <div style="margin: 20px 0 40px 0;">
            <Pagination ref="Pagination"
                        :pageNationObj = "cpage_navigation"
                        v-on:onMovePage = "onMovePage"></Pagination>
          </div>

        </div>
      </div>
    </div>

    <ProjectPopup ref="projectpopup"
             v-bind:modeType="modeType"
             v-on:callProjectList="fnProjectList"
    ></ProjectPopup>

  </div>
</template>


<script>
import apiproject from '../../api/ApiProject';      // API
import ProjectPopup from '../../components/popup/ProjectPopup'; // 프로젝트 팝업
import BaseMixin from '../../components/Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
// import Datalist_Left from './Datalist_Left';
import Side_bar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';

export default {
  name: 'ProjectList',
  components: {
    ProjectPopup,
    Side_bar,
    Pagination,
  },
  //props: ['page_navigation'],
  mixins: [BaseMixin],
  data() {
    return {
      project_list: '',             // 프로젝트 데이터 리스트
      status: '',                   // 사용여부
      search_type: 'project_name',  // 검색조건
      keyword: this.$route.params.keyword ? this.$route.params.keyword: '', // 검색어
      no:'',                        // 게시판 숫자
      paging:'',                    // 페이징 데이터
      first_page:'',                // 페이징-시작페이지
      last_page: '',                 // 페이징-마지막페이지
      total_count: 0,                // 게시물수
      total_page: 0,                // 전체페이지
      list_count: 20,                      // 페이지카운트
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
      // paginavigation:function() { //페이징 처리
      //   var pageNumber = [];
      //   var first_page = this.paging.first_page;
      //   var last_page = this.paging.last_page;
      //   for (var i = first_page; i <= last_page; i++) pageNumber.push(i);
      //   return pageNumber;
      // },
    };
  },
  watch: {
    '$route': function(){
      this.keyword = this.$route.params.keyword ? this.$route.params.keyword: '';
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
      if (this.project_list && this.project_list.length > 0) {
        return true;
      }
      return false;
    }

  },
  mounted() {
    this.fnProjectList(1);
  },
  methods: {
    Menu3() {
      this.$router.push({ name: 'division' });
    },
    Menu4() {
      this.$router.push({ name: 'class' });
    },
    // 프로젝트 리스트 조회
    fnProjectList(pg) {
      this.showLoading(true);
      const params = {
      };
      let status = this.status;
      let search_type = this.search_type;
      let keyword = this.keyword;
      if(this.cur_page === 'undefined') {
        this.cur_page = 1;
      }

      let cur_page = pg === 'undefined' ? this.cur_page : pg;
      cur_page = cur_page ? cur_page : this.cur_page;
      this.cur_page = cur_page;
      this.body = { // 데이터 전송
        cur_page:this.cur_page
        ,status:this.status
        ,search_type:this.search_type
        ,keyword:this.keyword
      }

      const data = {
        cur_page:this.cur_page
        ,list_count:this.list_count
        ,status:this.status
        ,search_type:this.search_type
        ,keyword:this.keyword
      }

      // 프로젝트 조회 API 호출
      apiproject.getProjectInfo(data)
        .then((result) => {

          if (result.project_info.length > 0) {
              //this.paging = 10;
              //this.no = 1;
            for (const key in result.project_info) {
              const reg_date = result.project_info[key].reg_date;
              if (reg_date) {
                result.project_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              }
              if (result.project_info[key].status == '1') {
                result.project_info[key].status_str = '진행중';
              } else if(result.project_info[key].status == '3') {
                result.project_info[key].status_str = "종료";
              } else {
                result.project_info[key].status_str = "중지중";
              }

              if(result.project_info[key].labeler_cnt == 0)
              {
                result.project_info[key].labeler_str = '-'
              }else{
                result.project_info[key].labeler_str = `${result.project_info[key].labeler_cnt} 명`
              }
              if(result.project_info[key].checker_cnt == 0)
              {
                result.project_info[key].checker_str = '-'
              }else{
                result.project_info[key].checker_str = `${result.project_info[key].checker_cnt} 명`
              }
            }
            // this.page_navigation = { cur_page: 4, list_count: 9, total_count: 100, first_page: 11, page_count: 10 };
          }
          this.project_list = result.project_info;
          this.paging = result.paging;
          this.no = this.paging.total_count - ((this.paging.cur_page-1) * this.paging.list_count);
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
        this.fnProjectList(n);
      }
    },
    onAllCheckClick() {
      this.check_click = !this.check_click;
      this.allCheck(this.check_click);
    },

    onCheckClick(user_id) {
      this.$set(this.checkData, user_id, this.checkData[user_id] !== true);
      // this.$log.debug(this.checkData);
    },
    allCheck(value) {
      if (this.cis_data) {
        Object.keys(this.project_list).forEach((key) => {
          if (this.project_list[key].is_admin !== 'A') {
            const seq = this.project_list[key].seq;
            this.$set(this.checkData, seq, value);
          }
        });
      }
    },

    // 프로젝트 상태 변경
    project_change(itype) {
      const options = {};
      const checkData = this.checkData;
      let confirm_msg = '';
      let close_msg = '';
      let szTitle = '';
      switch(itype) {
        case '1' :
          confirm_msg = '선택 프로젝트를 진행중으로 변경 하시겠습니까?';
          close_msg = '진행중으로 변경되었습니다.';
          szTitle = '진행중';
          break;
        case '2' :
          confirm_msg = '선택 프로젝트를 중지중으로 변경 하시겠습니까?';
          close_msg = '중지중으로 변경되었습니다.';
          szTitle = '중지중';
          break;
        case '3' :
          confirm_msg = '선택 프로젝트를 종료로 변경 하시겠습니까?';
          close_msg = '종료로 변경되었습니다.';
          szTitle = '종료';
          break;
      }
      let selUserCo = 0;
      for (const key of Object.keys(checkData)) {
        if (checkData[key]) {
          selUserCo++;
        }
      }
      if (selUserCo < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 프로젝트가 없습니다.', null);
      } else {
        const sendParam = { itype: itype, szTitle: szTitle, checkData: checkData, close_msg: close_msg };
        if (itype === 'N') { // 사용안함
          this.$refs.used_pop.openPopup(sendParam, this.member_used_change);
        } else if(itype === 'D') { // 삭제
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.member_delete, options);
        } else {
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.member_used_change, options);
        }
      }
    },

    // 프로젝트 상세 보기
    fnProjectDetail(seq) {
      if(seq === '')
      {
        this.modeType = 'c';
        this.$refs.projectpopup.openPopup();
      }else{
        this.modeType = 'e';
        this.$refs.projectpopup.openPopupBySeq(seq);
      }
    },
    checkedAll(checked) {
      //if (this.cis_data) {
        this.allChecked = checked
        for (let i in this.project_list) {
            this.project_list[i].selected = this.allChecked;
        }
      //}
    },
    selected (e) {
        for (let i in this.project_list) {
            if(! this.project_list[i].selected) {
                this.allChecked = false;
                return;
            } else {
                this.allChecked = true;
            }
        }
    },
    getSelected(){
        let user_ids = [];
        for (let i in this.project_list) {
            if(this.project_list[i].selected) {
                user_ids.push(this.project_list[i].seq);
            }
        }
        console.log(user_ids)
    },
    // 통계로 이동
    statisticsGo(project_seq) {
      this.$router.push({ name: 'statisticsproject', params: { search_seq: '4', project_seq: project_seq }});
    }
  },
};
</script>

<style scoped>
.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}
.first, .prev, .next, .last {
  border: 0px solid #ccc;
  margin: 0 5px;
}
.pagination span {
  display: inline-block;
  padding: 0 5px;
  color: #333;
}
.pagination a {
  text-decoration: none;
  display: inline-blcok;
  padding: 0 5px;
  color: #666;
}

.grid_m.project {
  /* grid-template-columns: 120px 300px 150px 150px 150px 130px 100px; */
  grid-template-columns: 10% 27% 14% 14% 14% 12% 9%;
}
.grid_m.nodata {
  grid-template-columns: 100%;
}
</style>
