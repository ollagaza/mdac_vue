<!--
=======================================
'	파일명 : MemberList.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : 회원리스트
'	=====================================
-->
<template>
  <div class="layout"><!-- float: left;position:absolute; -->
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Side_bar v-bind:menu_id="10"></Side_bar>
        <div class="content_layout">
          <div class="main_title">
            Member
          </div>
          <div class="sub_title">
            작업자 관리
          </div>
          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text" v-model="is_used" style="width: 10%;" @change="fnMemberList(1)">
                <option value="" selected=true>상태(전체)</option>
                <option value="Y" selected=true>사용중</option>
                <option value="N">정지중</option>
              </select>

              <select class="text" v-model="search_type" style="width: 10%;">
                <option value="user_name" selected=true>이름</option>
                <option value="user_id">아이디</option>
              </select>

              <input type="text" class="search input" v-model="keyword" @keyup.enter="fnMemberList(1)" style="width:60%;" />
              <div class="btn deepgray" style="margin-left:5px;width: 10%;" v-on:click="fnMemberList(1)">검색</div>
              <div class="btn reg" style="margin-left:5px;width:10%;" v-on:click="fnMemberDetail('')">등록</div>
            </div>
          </div>

          <div class="">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <div class="check_wrapper" v-on:click="onAllCheckClick">
                <div class="check_box" v-bind:class="{ on: check_click }"></div> <div class="check_text">전체 선택</div>
              </div>


              <div class="btn navy" style="margin-left:5px;width:80px;" v-on:click="member_change('Y')">사용중</div>
              <div class="btn" style="margin-left:5px;width:80px;" v-on:click="member_change('N')">사용정지</div>
              <div class="btn redfont" style="margin-left:5px;width:80px;" v-on:click="member_change('D')">삭제</div>

              <div class="btn purple" style="margin-left:5px;width:80px;" v-on:click="python_go()">Python</div>

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;height: 33px;" @change="fnMemberList(1)">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div>
            </div>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div class="grid_m member header">
              <div></div><!-- v-model="checked_all"  -->
              <div>이름</div>
              <div>아이디</div>
              <div>이메일</div>
              <div>전화번호</div>
              <div>사용여부</div>
              <div>등록일</div>
              <div>통계</div>
              <div>이력</div>
            </div>

            <template v-if="member_list.length === 0">
              <div class="grid_m member nodata bottom">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="member_list.length > 0">
              <template v-for="(member, index) in member_list">
                <div class="grid_m member body" v-bind:class="{ bottom : member_list.length === index+1 }">
                  <!-- <div><input type="checkbox" class="check_box" value="member.seq" :id="'check_' + member.seq" v-model="member.selected"  @change="selected($event)" v-bind:class="[{on: checkData[member.seq]}, {admin: member.used_admin === 'A'}]" v-on:click="onCheckClick(member.seq)"></div>v-model="checked_user"  -->
                  <template v-if="member.is_admin==='Y'">
                    관리자
                  </template>
                  <template v-else>
                  <div class="check_box" v-bind:class="[{on: checkData[member.seq]}, {admin: member.is_admin === 'Y'}]" v-on:click="onCheckClick(member.seq)"></div>
                  </template>
                  <div v-on:click="fnMemberDetail(member.seq)">{{ member.user_name }}</div>
                  <div v-on:click="fnMemberDetail(member.seq)">{{ member.user_id }}</div>
                  <div v-on:click="fnMemberDetail(member.seq)">{{ member.email }}</div>
                  <div v-on:click="fnMemberDetail(member.seq)">{{ member.phone }}</div>
                  <div v-on:click="fnMemberDetail(member.seq)"><div :class="{ 'process_work' : member.is_used === 'Y', 'process_stop' : member.is_used !== 'Y' }" style="margin-left:5px;width:60px;" v-on:click="fnMemberList(1)">{{ member.is_used_str }}</div></div>
                  <div v-on:click="fnMemberDetail(member.seq)">{{ getDateToStr(member.reg_date) }}</div>
                  <div><div class="btn history" style="margin-left:5px;width:60px;" v-on:click="statisticsGo(member.seq)">통계</div></div>
                  <div v-on:click="getSelected"><div class="btn history" style="margin-left:5px;width:60px;" v-on:click.stop="onHisClick(member.seq)">이력</div></div>
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

          <div style="margin: 20px 0 0 0;">
            <Pagination ref="Pagination"
                        :pageNationObj = "page_navigation"
                        v-on:onMovePage = "onMovePage"></Pagination>
          </div>
        </div>
      </div>
    </div>

    <MemberPopup ref="memberpopup"
             v-bind:modeType="modeType"
             v-on:callMemberList="fnMemberList"
    ></MemberPopup>
    <Member_used_pop ref="used_pop"></Member_used_pop>

    <ViewHisMemPopup ref="viewhis"></ViewHisMemPopup>

  </div>
</template>


<script>
import apiuser from '../../api/ApiUser';
import MemberPopup from '../../components/popup/MemberPopup';
import BaseMixin from '../../components/Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
import Member_used_pop from './Member_used_pop';
import Member_Left from './Member_Left';
import Side_bar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import ViewHisMemPopup from '../../components/popup/ViewHisMemPopup';
import util from '../../utils/util';

export default {
  name: 'MemberList',
  components: {
    MemberPopup,
    Member_used_pop,
    Member_Left,
    Pagination,
    ViewHisMemPopup,
    Side_bar,
  },
  // props: ['page_navigation'],
  mixins: [BaseMixin],
  data() {
    return {
      member_list: '',              // 회원 데이터 리스트
      is_used: '',                  // 사용여부
      search_type: 'user_name',     // 검색조건
      keyword: '',                  // 검색어
      no: '',                       // 게시판 숫자
      paging: '',                   // 페이징 데이터
      first_page: '',               // 페이징-시작페이지
      last_page: '',                 // 페이징-마지막페이지
      total_count: 0,                // 게시물수
      total_page: 0,                // 전체페이지
      list_count: 20,                      // 페이지카운트
      page:this.$route.query.page ? this.$route.query.page:1,
      modeType: 'e',                // 수정/등록모드
      allChecked: false,            // All check
      checkData: {},
      check_click: false,

      page_navigation: {
        cur_page: 1,
        list_count: 20,
        total_count: 100,
        first_page: 1,
        page_count: 10,
      },
      // paginavigation:function() {   //페이징 처리
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
      if (this.member_list && this.member_list.length > 0) {
        return true;
      }
      return false;
    }

  },
  mounted() {
    this.fnMemberList(1);
  },
  methods: {
    python_go() {
      apiuser.memtest().then((data) => {
        // console.log(`data.error===${data.error}`)
        console.log(data)
        console.log(data.member_info.length)
      });
    },
    // 회원정보 조회
    fnMemberList(pg) {
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
      let is_used = this.is_used;
      let search_type = this.search_type;
      let keyword = this.keyword;
      //this.$log.debug(`this.page===${this.page}`)
      if(this.cur_page === 'undefined') {
        this.cur_page = 1;
      }

      let cur_page = pg === 'undefined' ? this.cur_page : pg;
      cur_page = cur_page ? cur_page : this.cur_page;
      this.cur_page = cur_page;
      let user_name = '';

      const data = {
        cur_page:this.cur_page
        ,list_count:this.list_count
        ,is_used:this.is_used
        ,search_type:this.search_type
        ,keyword:this.keyword
      };
      // 회원정보조회 API 호출
      apiuser.getUserInfos(data)
        .then((result) => {

          this.$log.debug(result);
          if (result.member_info.length > 0) {
              //this.paging = 10;
              //this.no = 1;
            for (const key in result.member_info) {
              // util 함수로 대체..
              // const reg_date = result.member_info[key].reg_date;
              // if (reg_date) {
              //   result.member_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              // }
              if (result.member_info[key].is_used == 'Y') {
                result.member_info[key].is_used = 'Y';
                result.member_info[key].is_used_str = '사용중';
              } else {
                result.member_info[key].is_used_str = "정지중";
              }
            }
            // this.page_navigation = { cur_page: 4, list_count: 9, total_count: 100, first_page: 11, page_count: 10 };
          }
          this.member_list = result.member_info;
          this.paging = result.paging;
          this.no = this.paging.total_count - ((this.paging.cur_page-1) * this.paging.list_count);
          this.page_navigation = this.paging
          //console.log(this.paging)
        });
      this.showLoading(false);
    },
    onMovePage(page) {
      this.fnPage(page);
    },
    fnPage(n) {
      if(this.cur_page != n) {
        this.cur_page = n;
        this.fnMemberList(n);
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

    onCheckClick(user_id) {
      this.$set(this.checkData, user_id, this.checkData[user_id] !== true);
      // this.$log.debug(this.checkData);
    },
    allCheck(value) {
      if (this.cis_data) {
        Object.keys(this.member_list).forEach((key) => {
          if (this.member_list[key].is_admin !== 'A') {
            const seq = this.member_list[key].seq;
            this.$set(this.checkData, seq, value);
          }
        });
      }
    },

    // 회원 상태 변경
    member_change(itype) {
      const options = {};
      const checkData = this.checkData;
      let confirm_msg = '';
      let close_msg = '';
      let szTitle = '';
      switch(itype) {
        case 'Y' :
          confirm_msg = '선택 회원을 사용중으로 변경 하시겠습니까?';
          close_msg = '사용중으로 변경되었습니다.';
          szTitle = '사용중';
          break;
        case 'N' :
          confirm_msg = '선택 회원을 사용정지 시겠습니까?';
          close_msg = '사용정지 시켰습니다.';
          szTitle = '사용정지';
          break;
        case 'D' :
          confirm_msg = '선택 회원을 삭제 하시겠습니까?';
          close_msg = '삭제했습니다.';
          szTitle = '회원삭제';
          break;
      }
      let selUserCo = 0;
      for (const key of Object.keys(checkData)) {
        if (checkData[key]) {
          selUserCo++;
        }
      }
      if (selUserCo < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 회원이 없습니다.', null);
      } else {
        const sendParam = { itype: itype, szTitle: szTitle, checkData: checkData, close_msg: close_msg };
        if (itype === 'N') { // 사용정지
          this.$refs.used_pop.openPopup(sendParam, this.member_used_change);
        } else if(itype === 'D') { // 삭제
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.member_delete, options);
        } else {
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.member_used_change, options);
        }
      }
    },

    // 회원 상태 정보 실행
    member_used_change(sendParam, setDate) {
      const checkData = sendParam.checkData;
      const arrData = [];
      Object.keys(checkData).forEach((key) => {
        if (checkData[key]) {
          arrData.push(key);
        }
      });
      const params = {};
      params.used = sendParam.itype;
      params.users = arrData;
      if (setDate && setDate.length > 0){
        params.reason = setDate;
      }
      apiuser.setUsersUsed(params).then((data) => {
        console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnMemberList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },

    // 회원 삭제
    member_delete(sendParam, setDate) {
      const checkData = sendParam.checkData;
      const arrData = [];
      Object.keys(checkData).forEach((key) => {
        if (checkData[key]) {
          arrData.push(key);
        }
      });
      const params = {};
      params.used = sendParam.itype;
      params.users = arrData;
      if (setDate && setDate.length > 0){
        params.reason = setDate;
      }
      apiuser.delUsers(params).then((data) => {
        console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnMemberList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },
    // 회원정보 상세보기
    fnMemberDetail(seq) {
      if(seq === '')
      {
        this.modeType = 'c';
        this.$refs.memberpopup.openPopup();
      }else{
        this.modeType = 'e';
        this.$refs.memberpopup.openPopupBySeq(seq);
      }
    },
    checkedAll(checked) {
      //if (this.cis_data) {
        this.allChecked = checked
        for (let i in this.member_list) {
            this.member_list[i].selected = this.allChecked;
        }
      //}
    },
    selected (e) {
        for (let i in this.member_list) {
            if(! this.member_list[i].selected) {
                this.allChecked = false;
                return;
            } else {
                this.allChecked = true;
            }
        }
    },
    getSelected() {
        let user_ids = [];
        for (let i in this.member_list) {
            if(this.member_list[i].selected) {
                user_ids.push(this.member_list[i].seq);
            }
        }
        console.log(user_ids);
    },
    // 통계로 이동
    statisticsGo(member_seq) {
      this.$router.push({ name: 'statisticsworker', params: { search_seq: '1', worker: member_seq }});
    },
    onHisClick(member_seq) {
      let option = {
        member_seq: member_seq,
      }
      this.$refs.viewhis.openHisPopup(option);
      // this.$log.debug(seq);
      // const option = {};
      // option.seq = seq;
      // option.file_type = 'i';
      // option.isResult = 'o';// o 오리지널 r-결과
      // this.$log.debug(option);
      // this.$emit('onHisClick', option);
    },
    getDateToStr(date) {
      return util.getDateToStr(date);
    },
  },
};
</script>

<style scoped>
.grid_m.member {
  /* grid-template-columns: 50px 120px 130px 230px 120px 100px 150px 100px 100px; */
  grid-template-columns: 5% 11% 12% 21% 10% 9% 14% 9% 9%;
}

.grid_m.nodata {
  grid-template-columns: 100%;
}
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
</style>
