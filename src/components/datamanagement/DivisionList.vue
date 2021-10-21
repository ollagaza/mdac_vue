<!--
=======================================
'	파일명 : DivisionList.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : 분류 List
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Datalist_Left v-bind:menu_id="3"></Datalist_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            분류 리스트
          </div> 

          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text" v-model="project_seq" style="width: 240px;height: 36px;" @change="fnDivisionList(1)">
                <option value="" selected=true>전체프로젝트</option>
                  <template v-for="(project, seq) in project_list">
                    <option v-bind:value="project.seq">{{project.project_name}}</option>
                  </template>                
              </select>
              
              <select class="text" v-model="is_used" style="width: 130px;height: 36px;" @change="fnDivisionList(1)">
                <option value="" selected=true>상태(전체)</option>
                <option value="Y" selected=true>사용중</option>
                <option value="N">정지중</option>
              </select>
              
              <select class="text" v-model="search_type" style="width: 160px;height: 36px;">
                <option value="division_name" selected=true>분류명</option>
                <option value="division_id">분류코드</option>
              </select>
              
              <input type="text" v-model="keyword" @keyup.enter="fnDivisionList(1)" />
              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnDivisionList(1)">검색</div>
              <div class="btn navy" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnDivisionDetail('')">등록</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <div class="check_wrapper" v-on:click="onAllCheckClick">
                <div class="check_box" v-bind:class="{ on: check_click }"></div> <div class="check_text">전체 선택</div>
              </div>

              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="division_change('Y')">사용중</div>
              <div class="btn" style="margin-left:5px;width:80px; height: 36px;" v-on:click="division_change('N')">사용정지</div>
              <div class="btn red" style="margin-left:5px;width:80px; height: 36px;" v-on:click="division_change('D')">삭제</div>
            
              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;" @change="fnDivisionList(1)">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div>
            </div>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div class="grid_m division header">
              <div></div><!-- v-model="checked_all"  -->
              <div>프로젝트</div>
              <div>상위분류</div>
              <div>분류코드</div>
              <div>분류명</div>
              <div>상태</div>
              <div>등록일</div>
            </div>

            <div v-if="division_list.length === 0" class="grid_m division nodata">
              <div style='align-items: center;'>등록된 데이터가 없습니다</div>
            </div>

            <template v-if="division_list.length > 0">
              <template v-for="(pDivision, seq) in division_list">
                <div class="grid_m division body">
                  <!-- <div><input type="checkbox" class="check_box" value="member.seq" :id="'check_' + member.seq" v-model="member.selected"  @change="selected($event)" v-bind:class="[{on: checkData[member.seq]}, {admin: member.used_admin === 'A'}]" v-on:click="onCheckClick(member.seq)"></div>v-model="checked_user"  -->
                  <div class="check_box" v-bind:class="[{on: checkData[pDivision.seq]}]" v-on:click="onCheckClick(pDivision.seq)"></div>
                  <div v-on:click="fnDivisionDetail(pDivision.seq)">{{ pDivision.project_name }}</div>
                  <div v-on:click="fnDivisionDetail(pDivision.seq)">{{ pDivision.parent_path }}</div>
                  <div v-on:click="fnDivisionDetail(pDivision.seq)">{{ pDivision.division_id }}</div>
                  <div v-on:click="fnDivisionDetail(pDivision.seq)">{{ pDivision.division_name }}</div>
                  <div v-on:click="fnDivisionDetail(pDivision.seq)"><div :class="{ 'process_progress' : pDivision.is_used === 'Y', 'process_stop' : pDivision.is_used !== 'Y' }" style="margin-left:5px;width:60px; height: 26px;" v-on:click="fnDivisionList(1)">{{ pDivision.is_used_str }}</div></div>
                  <div v-on:click="fnDivisionDetail(pDivision.seq)">{{ pDivision.reg_date_dt }}</div>
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


    <DivisionPopup ref="divisionpopup"
             v-bind:modeType="modeType"
             v-bind:project_list="project_list"
             v-on:callDivisionList="fnDivisionList"
    ></DivisionPopup>    
  </div>
</template>


<script>
import apiproject from '../../api/ApiProject';
import DivisionPopup from '../../components/popup/DivisionPopup';
import BaseMixin from '../../components/Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
import Datalist_Left from './Datalist_Left';
import Pagination from '../../components/Pagination';

export default {
  name: 'DivisionList',
  components: {
    DivisionPopup,
    Datalist_Left,
    Pagination,
  },
  //props: ['page_navigation'],
  mixins: [BaseMixin],
  data() {
    return {
      project_list: '',         // 프로젝트 리스트
      division_list: '',        // 분류 데이터 리스트
      project_seq: '',          // 프로젝트
      is_used: '',              // 사용여부
      search_type: 'division_name',// 검색조건
      keyword: '',              // 검색어
      no:'',                    // 게시판 숫자
      paging:'',                // 페이징 데이터
      first_page:'',            // 페이징-시작페이지
      last_page: '',             // 페이징-마지막페이지
      total_count: 0,            // 게시물수
      total_page: 0,            // 전체페이지
      list_count: 20,                  // 페이지카운트
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
      // paginavigation:function() { // 페이징 처리
      //   var pageNumber = [];
      //   var first_page = this.paging.first_page;
      //   var last_page = this.paging.last_page;
      //   for (var i = first_page; i <= last_page; i++) pageNumber.push(i);
      //   return pageNumber;
      // },
    };
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
      if (this.division_list && this.division_list.length > 0) {
        return true;
      }
      return false;
    }

  },
  mounted() {
    const data = {
        list_count:''
        ,status:''
        ,search_type:''
        ,keyword:''
    }
    apiproject.getProjectInfo(data)
      .then((result) => {
        this.project_list = result.project_info;
      });    
    this.fnDivisionList(1);
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
    
    // 분류리스트 조회
    fnDivisionList(pg) {
      //body = req.query;
      this.showLoading(true);
      //this.page_navigation = { cur_page: 1, list_count: 9, total_count: 100, first_page: 11, page_count: 10 };
      const params = {
      //  stype: null,
      //  search: null,
      //  page: this.page_navigation.cur_page,
      };
      //if (this.roption.search && this.roption.search.length > 0) {
      //  params.search_type = this.roption.search_type;
      //  params.search = this.roption.search;
      //}
      let project_seq = this.project_seq;
      let is_used = this.is_used;
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
        ,is_used:this.is_used
        ,search_type:this.search_type
        ,keyword:this.keyword          
      };
      // 분류조회 API 호출
      apiproject.getDivisionInfo(data)
        .then((result) => {
          
          // this.$log.debug(result);
          if (result.division_info.length > 0) {
              // this.paging = 10;
              // this.no = 1;            
            for (const key in result.division_info) {
              const reg_date = result.division_info[key].reg_date;
              if (reg_date) {
                result.division_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              }
              if (result.division_info[key].is_used == 'Y') {
                result.division_info[key].is_used = 'Y';
                result.division_info[key].is_used_str = '사용중';
              } else {
                result.division_info[key].is_used_str = "정지중";
              }
              if(!result.division_info[key].parent_path) {
                result.division_info[key].parent_path = "-"
              }
            }
          }
          this.division_list = result.division_info;
          this.paging = result.paging;
          this.no = this.paging.total_count - ((this.paging.cur_page-1) * this.paging.list_count);
          this.page_navigation = this.paging
          // console.log(this.paging)
        });
      this.showLoading(false);
    },   
    onMovePage(page) {
      this.fnPage(page);
    },
    fnPage(n) {
      if(this.cur_page != n) {
        this.cur_page = n;
        this.fnDivisionList(n);
      }
    },
    isUsed: function (state) {
      if(state == 2) return true;
      else false;
    },
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
        Object.keys(this.division_list).forEach((key) => {
          if (this.division_list[key].is_admin !== 'A') {
            const seq = this.division_list[key].seq;
            this.$set(this.checkData, seq, value);
          }
        });
      }
    },

    // 분류 상태 변경
    division_change(itype) {
      const options = {};
      const checkData = this.checkData;
      let confirm_msg = '';
      let close_msg = '';
      let szTitle = '';
      switch(itype) {
        case 'Y' :
          confirm_msg = '선택 분류를 사용중으로 변경하시겠습니까?';
          close_msg = '사용중으로 변경되었습니다.';
          szTitle = '사용중';
          break;
        case 'N' :
          confirm_msg = '선택 분류를 사용정지로 변경하시겠습니까?';
          close_msg = '사용정지 시켰습니다.';
          szTitle = '사용정지';
          break;
        case 'D' :
          confirm_msg = '선택 분류를 삭제하시겠습니까?';
          close_msg = '삭제했습니다.';
          szTitle = '분류삭제';
          break;
      }
      let selUserCo = 0;
      for (const key of Object.keys(checkData)) {
        if (checkData[key]) {
          selUserCo++;
        }
      }
      if (selUserCo < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 분류가 없습니다.', null);
      } else {
        const sendParam = { itype: itype, szTitle: szTitle, checkData: checkData, close_msg: close_msg };
        if (itype === 'D') { // 활동정지??
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.division_delete, options);
        } else {
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.division_used_change, options);
        }
      }
    },

    // 분류 상태 변경 실행
    division_used_change(sendParam, setDate) {
      const checkData = sendParam.checkData;
      const arrData = [];
      Object.keys(checkData).forEach((key) => {
        if (checkData[key]) {
          arrData.push(key);
        }
      });
      const params = {};
      params.used = sendParam.itype;
      params.divisions = arrData;
      apiproject.setDivisionUsed(params).then((data) => {
        console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnDivisionList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },     

    // 분류 삭제
    division_delete(sendParam, setDate) {
      const checkData = sendParam.checkData;
      const arrData = [];
      Object.keys(checkData).forEach((key) => {
        if (checkData[key]) {
          arrData.push(key);
        }
      });
      const params = {};
      params.used = sendParam.itype;
      params.divisions = arrData;
      apiproject.delDivision(params).then((data) => {
        console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnDivisionList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },   
    
    // 분류 상세 보기
    fnDivisionDetail(seq) {
      if(seq === '')
      {
        this.modeType = 'c';
        this.$refs.divisionpopup.openPopup();
      }else{
        this.modeType = 'e';
        this.$refs.divisionpopup.openPopupBySeq(seq);
      }
    },
    checkedAll(checked) {
      //if (this.cis_data) {
        this.allChecked = checked
        for (let i in this.division_list) {
            this.division_list[i].selected = this.allChecked;
        }
      //}
    },
    selected (e) {
        for (let i in this.division_list) {
            if(! this.division_list[i].selected) {
                this.allChecked = false;
                return;
            } else {
                this.allChecked = true;
            }
        }
    },
    getSelected(){
        let user_ids = [];
        for (let i in this.division_list) {
            if(this.division_list[i].selected) {
                user_ids.push(this.division_list[i].seq);
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
.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}
.first, .prev, .next, .last {
  border: 0px solid #666;
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

.grid_m.division {
  grid-template-columns: 50px 150px 150px 150px 200px 150px 150px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
</style>
