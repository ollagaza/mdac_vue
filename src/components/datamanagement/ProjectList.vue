<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Datalist_Left v-bind:menu_id="2"></Datalist_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            프로젝트 리스트
          </div>

          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text" v-model="status" style="width: 160px;height: 36px;" @change="fnProjectList(1)">
                <option value="" selected=true>상태(전체)</option>
                <option value="1">진행중</option>
                <option value="2">중지중</option>
                <option value="3">종료</option>
              </select>

              <select class="text" v-model="search_type" style="width: 180px;height: 36px;">
                <option value="project_name" selected=true>프로젝트명</option>
                <option value="LABELER">라벨러</option>
                <option value="CHECKER">검수자</option>
              </select>

              <input type="text" v-model="keyword" @keyup.enter="fnProjectList(1)" />
              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnProjectList(1)">검색</div>
              <div class="btn navy" style="margin-left:5px;width:100px; height: 36px;" v-on:click="fnProjectDetail('')">프로젝트등록</div>
              <div class="btn navy" style="margin-left:5px;width:80px; height: 36px;" v-on:click="Menu3">분류관리</div>
              <div class="btn navy" style="margin-left:5px;width:90px; height: 36px;" v-on:click="Menu4">클래스관리</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <!-- <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="project_change('1')">진행중</div>
              <div class="btn red" style="margin-left:5px;width:80px; height: 36px;" v-on:click="project_change('3')">종료</div>
              <div class="btn" style="margin-left:5px;width:80px; height: 36px;" v-on:click="project_change('2')">중지</div> -->

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="ipp" style="width: 120px;" @change="fnProjectList(1)">
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
              <div>프로젝트명</div>
              <div>할당라벨러</div>
              <div>할당검수자</div>
              <div>상태</div>
              <div>등록일</div>
              <div>통계</div>
            </div>

            <template v-if="project_list.length === 0">
              <div class="grid_m project nodata">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="project_list.length > 0">
              <template v-for="(project, seq) in project_list">
                <div class="grid_m project body">
                  <div style="align-items: left;justify-items: left !important;" v-on:click="fnProjectDetail(project.seq)">{{ project.project_name }}</div>
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.labeler_str }}</div>
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.checker_str }}</div>
                  <div v-on:click="fnProjectDetail(project.seq)"><div :class="{ 'process_progress' : project.status === '1', 'process_stop' : project.status === '2', 'process_end' : project.status === '3' }" style="margin-left:5px;width:60px; height: 26px;" v-on:click="fnProjectList(1)">{{ project.status_str }}</div></div>
                  <div v-on:click="fnProjectDetail(project.seq)">{{ project.reg_date_dt }}</div>
                  <div><div class="btn navy" style="margin-left:5px;width:60px; height: 25px;" v-on:click="fnProjectDetail('')">통계</div></div>
                </div>
              </template>
            </template>
          </div>

          <div class="pagination" v-if="paging.totalCount > 0">
            <a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
            <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>
            <template v-for=" (n,index) in paginavigation()">
              <template v-if="paging.page==n">
                <strong :key="index">{{n}}</strong>
              </template>
              <template v-else>
                <a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
              </template>
            </template>
            <a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>
            <a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
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
import Datalist_Left from './Datalist_Left';
//import Pagination from '../../components/Pagination';

export default {
  name: 'ProjectList',
  components: {
    ProjectPopup,
    Datalist_Left,
    //Pagination,
  },
  //props: ['page_navigation'],
  mixins: [BaseMixin],
  data() {
    return {
      project_list: '',             // 프로젝트 데이터 리스트
      status: '',                   // 사용여부
      search_type: 'project_name',  // 검색조건
      keyword: '',                  // 검색어
      no:'',                        // 게시판 숫자
      paging:'',                    // 페이징 데이터
      start_page:'',                // 페이징-시작페이지
      end_page: '',                 // 페이징-마지막페이지
      totalCount: 0,                // 게시물수
      total_page: 0,                // 전체페이지
      ipp: 20,                      // 페이지카운트
      page:this.$route.query.page ? this.$route.query.page:1,
      modeType: 'e',            // 수정/등록모드
      allChecked: false,        // All check
      checkData: {},
      check_click: false,
      paginavigation:function() { //페이징 처리
        var pageNumber = [];
        var start_page = this.paging.start_page;
        var end_page = this.paging.end_page;
        for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      },
    };
  },
  computed: {
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
    fnProjectList(pg) {
      this.showLoading(true);
      const params = {
      };
      let status = this.status;
      // console.log(status)
      let search_type = this.search_type;
      let keyword = this.keyword;
      //this.$log.debug(`this.page===${this.page}`)
      if(this.page === 'undefined') {
        this.page = 1;
      }

      let page = pg === 'undefined' ? this.page : pg;
      page = page ? page : this.page;
      this.page = page;
      this.body = { // 데이터 전송
        page:this.page
        ,status:this.status
        ,search_type:this.search_type
        ,keyword:this.keyword
      }

      const data = {
        page:this.page
        ,ipp:this.ipp
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
          this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
        });
      this.showLoading(false);
    },

    fnPage(n) {
      if(this.page != n) {
        this.page = n;
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
      //console.log(`seq===${seq}`)
      //console.log(`modeType===${this.modeType}`)
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
    cpage_navigation() {
      const null_navigation = {};
      if (this.page_navigation) {
        return this.page_navigation;
      }
      return null_navigation;
    },
    onMovePage(page) {
      this.checkData = {};
      this.$emit('onMovePage', page);
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
.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}
.first, .prev, .next, .last {
  border: 1px solid #666;
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
  grid-template-columns: 350px 150px 150px 150px 100px 100px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
</style>
