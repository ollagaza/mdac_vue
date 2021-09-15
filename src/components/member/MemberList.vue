<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <div class="left_menu">
          <div class="left_wrapper">
            <div class="left_title">Member</div>
          </div>
        </div>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            작업자 리스트
          </div>

          <div class="searchWrap">
            <select class="text" v-model="is_used" style="width: 120px;" @change="fnMemberList">
              <option value="" selected=true>상태(전체)</option>
              <option value="Y" selected=true>사용중</option>
              <option value="N">정지중</option>
            </select>
            
            <select class="text" v-model="search_type" style="width: 120px;">
              <option value="user_name" selected=true>이름</option>
              <option value="user_id">아이디</option>
            </select>
            
            <input type="text" v-model="keyword" @keyup.enter="fnMemberList" /><a href="javascript:;" @click="fnMemberList" class="btnSearch btnRightWrap">검색</a>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div class="grid_m header">
              <div><input type="checkbox" value="A"></div><!-- v-model="checked_all"  -->
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
              <div class=" body">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="member_list.length > 0">
              <template v-for="(member, seq) in member_list">
                <div class="grid_m body" v-on:click="fnMemberDetail(member.seq)">
                  <div><input type="checkbox" value=""></div><!-- v-model="checked_user"  -->
                  <div>{{ member.user_name }}</div>
                  <div>{{ member.user_id }}</div>
                  <div>{{ member.email }}</div>
                  <div>{{ member.phone }}</div>
                  <div>{{ member.is_used_str }}</div>
                  <div>{{ member.reg_date_dt }}</div>
                  <div>통계</div>
                  <div>이력</div>
                </div>
              </template>
            </template>            
          </div>
        </div>
      </div>
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

    <MemberPopup ref="memberpopup"
             v-bind:modeType="modeType"
             v-on:onDataChange="onDataChange"
    ></MemberPopup>    
  </div>
</template>


<script>
import apiuser from '../../api/ApiUser';
//import LoginPopup from '../../components/popup/LoginPopup';
import MemberPopup from '../../components/popup/MemberPopup';

export default {
  name: 'MemberList',
  components: {
    MemberPopup
  },
  data() {
    return {
      member_list: '',
      is_used: '',
      search_type: 'user_name',
      keyword: '',
      no:'', //게시판 숫자처리
      paging:'', //페이징 데이터
      start_page:'', //시작페이지
      page:this.$route.query.page ? this.$route.query.page:1,
      paginavigation:function() { //페이징 처리 for문 커스텀
        var pageNumber = [];
        var start_page = this.paging.start_page;
        var end_page = this.paging.end_page;
        for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      },
      modeType: 'e',
    };
  },
  mounted() {
    this.fnMemberList();
  },
  methods: {
    fnMemberList() {
      //body = req.query;
      // this.$log.debug('loadData');
      //this.showLoading(true);
      // this.page_navigation = { cur_page: 1, list_count: 9, total_count: 100, first_page: 11, page_count: 10 };
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
      let page = this.$route.query.page ? this.$route.query.page:1;
      let user_name = '';
      this.body = { // 데이터 전송
        page:this.page
        ,is_used:this.is_used
        ,search_type:this.search_type
        ,keyword:this.keyword          
      }        

      apiuser.getUserList(page, is_used, search_type, keyword, '')
        .then((result) => {
          
          // this.$log.debug(result);
          if (result.member_info.length > 0) {
              this.paging = 10;
              this.no = 1;            
            for (const key in result.member_info) {
              const reg_date = result.member_info[key].reg_date;
              if (reg_date) {
                result.member_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              }
              if (result.member_info[key].is_used == 'Y') {
                result.member_info[key].is_used = 'Y';
                result.member_info[key].is_used_str = '사용중';
              } else {
                result.member_info[key].is_used_str = "정지중";
              }
              //result.data[key].result_str = result.data[key].result_text;
              //if (result.data[key].result_itemname) {
              //  result.data[key].result_str = result.data[key].result_itemname;
              //}
              //result.data[key].error_title = '';
              //if (result.data[key].status === Constants.FileError) {
              //   result.data[key].error_title = result.data[key].result_text;
              //   result.data[key].result_text = '';
              //}
            }
            // this.page_navigation = { cur_page: 4, list_count: 9, total_count: 100, first_page: 11, page_count: 10 };
          }
          this.member_list = result.member_info;
          console.log(this.member_list)
          //this.page_navigation = result.page_navigation;
        });
      //this.showLoading(false);
    },
    fnSearch() {

    },
    
    //fnMemberDetail() {
    //  EventBus.emit('MPPopup');
    //},
    fnMemberDetail(seq) {
      this.modeType = 'e';
      this.$refs.memberpopup.openPopupBySeq(seq);
    },
    fnMemberRegister() {
      this.modeType = 'c';
      // this.$log.debug('result : ', this.modeType);
      this.$refs.memberpopup.openPopup();
    },
    onDataChange() {
      //alert('e');
      this.list_data();
    },
  },
};
</script>

<style scoped>
.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
.searchWrap input{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
.btnRightWrap{text-align:right; margin:10px 0 0 0;}

.pagination{margin:20px 0 0 0; text-align:center;}
.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
.pagination span{display:inline-block; padding:0 5px; color:#333;}
.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}

.layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  flex: 1;
  height: fit-content;
}
.layout2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 0px;
}

.left_menu{
  width:180px;
}
.left_wrapper{
  padding: 40px 0 0 14px;
}
.left_title {
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  color: #333;
  cursor: pointer;
}
.left_title:hover {
  background-color: #dddddd;
}
.left_title:hover {
  color: #009DE0;
}
.left_slice{
  margin-top: 6px;
}
.grid_m {
  display: grid;
  grid-template-columns: 50px 100px 100px 200px 100px 100px 150px 100px 100px;
  padding: 0px 0 0px 0;
  align-items: center;
  justify-items: center;
  grid-auto-rows: minmax(30px, auto);
  border-bottom: 1px solid #ccc;
}
.grid_m.body {
  cursor: pointer;
}
.grid_m.body:hover {
  background-color: #dddddd;
}
</style>
