<!--
=======================================
'	파일명 : CodegroupList.vue
'	작성자 : djyu
'	작성일 : 2021.11.16
'	기능   : Codegroup list
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Side_bar v-bind:menu_id="4" v-bind:sub_menu_id=this.$route.params.sub_menu_id></Side_bar>
        <div class="content_layout">
          <div class="main_title">
            Data Management
          </div>
          <div v-if="this.ref_codegroup === 0 || this.ref_codegroup === '0'" class="sub_title">
            Code Group Manager
          </div>
          <div v-else  class="sub_title">
            {{ this.codegroup_name }} 관리
          </div>

          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text" v-model="is_used" style="width: 150px;" @change="fnCodegroupList(1)">
                <option value="" selected=true>상태(전체){{ this.ref_codegroup }}</option>
                <option value="Y" selected=true>사용중</option>
                <option value="N">중지중</option>
              </select>

              <select class="text" v-model="search_type" style="width: 160px;">
                <option v-if="this.ref_codegroup === 0" value="codegroup_name" selected=true>그룹명</option>
                <option v-if="this.ref_codegroup === 0" value="codegroup_id">그룹코드</option>
                <option v-if="this.ref_codegroup !== 0" value="codegroup_name" selected=true>{{ this.codegroup_name }}코드명</option>
                <option v-if="this.ref_codegroup !== 0" value="codegroup_id">{{ this.codegroup_name }}코드</option>
              </select>

              <input type="text" class="search input" v-model="keyword" @keyup.enter="fnCodegroupList(1)" />
              <div class="btn deepgray" style="margin-left:5px;width:80px;" v-on:click="fnCodegroupList(1)">검색</div>
              <div class="btn reg" style="margin-left:5px;width:80px;" v-on:click="fnCodegroupDetail('')">등록</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <div class="check_wrapper" v-on:click="onAllCheckClick">
                <div class="check_box" v-bind:class="{ on: check_click }"></div> <div class="check_text">전체 선택</div>
              </div>

              <div class="btn square navy" style="margin-left:5px;width:80px;" v-on:click="codegroup_change('Y')">사용중</div>
              <div class="btn square" style="margin-left:5px;width:80px;" v-on:click="codegroup_change('N')">사용중지</div>
              <div class="btn square red" style="margin-left:5px;width:80px;" v-on:click="codegroup_change('D')">삭제</div>

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;height: 33px;" @change="fnCodegroupList(1)">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div>
            </div>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div v-if="this.ref_codegroup.toString() === '0'" class="grid_m header codegroup">
              <div></div><!-- v-model="checked_all"  -->
              <div>그룹아이디</div>
              <div>그룹명</div>
              <div>우선순위</div>
              <div>상태</div>
              <div>등록일</div>
            </div>

            <div v-if="this.ref_codegroup.toString() !== '0'" class="grid_m header code">
              <div></div><!-- v-model="checked_all"  -->
              <div>{{ this.codegroup_name }}코드</div>
              <div>{{ this.codegroup_name }}명</div>
              <div>상태</div>
              <div>등록일</div>
            </div>

            <template v-if="codegroup_list.length === 0">
              <div class="grid_m nodata bottom" v-bind:class="{'codegroup': this.ref_codegroup.toString() === '0', 'code': this.ref_codegroup.toString() !== '0'}">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="codegroup_list.length > 0">
              <template v-for="(item, index) in codegroup_list">
                <div class="grid_m body" v-bind:class="{'codegroup': item.ref_codegroup.toString() === '0', 'code': item.ref_codegroup.toString() !== '0', bottom : codegroup_list.length === index+1}">
                  <!-- <div><input type="checkbox" class="check_box" value="member.seq" :id="'check_' + member.seq" v-model="member.selected"  @change="selected($event)" v-bind:class="[{on: checkData[member.seq]}, {admin: member.used_admin === 'A'}]" v-on:click="onCheckClick(member.seq)"></div>v-model="checked_user"  -->
                  <div class="check_box" v-bind:class="[{on: checkData[item.seq]}]" v-on:click="onCheckClick(item.seq)"></div>
                  <div v-on:click="fnCodegroupDetail(item.seq)">{{ item.codegroup_id }}</div>
                  <div v-on:click="fnCodegroupDetail(item.seq)">{{ item.codegroup_name }}</div>
                  <div v-if="item.ref_codegroup.toString() === '0'" v-on:click="fnCodegroupDetail(item.seq)">{{ item.sort_no }}</div>
                  <div v-on:click="fnCodegroupDetail(item.seq)"><div :class="{ 'process_work' : item.is_used === 'Y', 'process_stop' : item.is_used !== 'Y' }" style="margin-left:5px;width:60px;" v-on:click="fnCodegroupList(1)">{{ item.is_used_str }}</div></div>
                  <div v-on:click="fnCodegroupDetail(item.seq)">{{ item.reg_date_dt }}</div>
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

    <CodegroupPopup ref="codegrouppopup"
             v-bind:modeType="modeType"
             v-bind:ref_codegroup="ref_codegroup"
             v-bind:ref_codegroup_name="codegroup_name"
             v-on:callCodegroupList="fnCodegroupList"
    ></CodegroupPopup>
  </div>
</template>


<script>

import apiproject from '../../api/ApiProject';
import CodegroupPopup from '../../components/popup/CodegroupPopup';
import BaseMixin from '../Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
// import Side_bar from './Datalist_Left';
import Side_bar from '../../components/Sidebar'
import Pagination from '../../components/Pagination';

export default {
  name: 'CodegroupList',
  components: {
    CodegroupPopup,
    Side_bar,
    Pagination,
  },
  mixins: [BaseMixin],
  data() {
    return {
      codegroup_list: '',       // 코드그룹 데이터 리스트
      codegroup_title:this.$route.params.codegroup_title ? this.$route.params.codegroup_title:'',
      ref_codegroup:this.$route.params.ref_codegroup ? this.$route.params.ref_codegroup:0,
      codegroup_name: '', 
      is_used: '',              // 사용여부
      search_type: 'codegroup_name',// 검색조건
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
      sub_menu_id: '',

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
      this.ref_codegroup = this.$route.params.ref_codegroup ? this.$route.params.ref_codegroup: 0;
      this.codegroup_title = this.$route.params.codegroup_title ? this.$route.params.codegroup_title: '';
      this.fnCodegroupList(1);    
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
      if (this.codegroup_list && this.codegroup_list.length > 0) {
        return true;
      }
      return false;
    }

  },
  updated() {
    const data = {
      ref_codegroup: 0
      ,codegroup_seq: this.ref_codegroup
    };
    apiproject.getCodegroup(data)
      .then((result) => {
        if (result.codegroup_info.length > 0) {
          this.codegroup_name = result.codegroup_info[0].codegroup_name;
        }
      });  
  },
  mounted() {
    this.fnCodegroupList(1);
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

    // 코드그룹 리스트 조회
    fnCodegroupList(pg) {
      //body = req.query;
      this.showLoading(true);
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
        ref_codegroup:this.ref_codegroup
        ,cur_page:this.cur_page
        ,list_count:this.list_count
        ,is_used:this.is_used
        ,search_type:this.search_type
        ,keyword:this.keyword
      };
      apiproject.getCodegroupInfo(data) // 코드그룹 API 호출
        .then((result) => {
          this.$log.debug(result)
          if (result.codegroup_info.length > 0) {
            for (const key in result.codegroup_info) {
              const reg_date = result.codegroup_info[key].reg_date;
              if (reg_date) {
                result.codegroup_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              }
              if (result.codegroup_info[key].is_used == 'Y') {
                result.codegroup_info[key].is_used = 'Y';
                result.codegroup_info[key].is_used_str = '사용중';
              } else {
                result.codegroup_info[key].is_used_str = "중지중";
              }
            }
          }
          this.codegroup_list = result.codegroup_info;
          this.paging = result.paging;
          this.no = this.paging.total_count - ((this.paging.cur_page-1) * this.paging.list_count);
          // this.page_navigation = { cur_page: result.paging.total_page, list_count: result.paging.list_count, total_count: result.paging.total_count, first_page: result.paging.first_page, page_count: 10 };
          this.page_navigation = this.paging
        });
      this.showLoading(false);
      // this.$refs.datalist_left.category_menu();
    },
    onMovePage(page) {
      this.fnPage(page);
    },
    fnPage(n) {
      if(this.cur_page != n) {
        this.cur_page = n;
        this.fnCodegroupList(n);
      }
    },
    isUsed: function (state) {
      if(state == 2) return true;
      else false;
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
        Object.keys(this.codegroup_list).forEach((key) => {
          if (this.codegroup_list[key].is_admin !== 'A') {
            const seq = this.codegroup_list[key].seq;
            this.$set(this.checkData, seq, value);
          }
        });
      }
    },

    // 상태 변경
    codegroup_change(itype) {
      const options = {};
      const checkData = this.checkData;
      let confirm_msg = '';
      let close_msg = '';
      let szTitle = '';
      switch(itype) {
        case 'Y' :
          confirm_msg = '선택 코드그룹을 사용중으로 변경하시겠습니까?';
          close_msg = '사용중으로 변경되었습니다.';
          szTitle = '사용중';
          break;
        case 'N' :
          confirm_msg = '선택 코드그룹을 사용중지로 변경하시겠습니까?';
          close_msg = '사용중지 시켰습니다.';
          szTitle = '사용중지';
          break;
        case 'D' :
          confirm_msg = '선택 코드그룹을 삭제하시겠습니까?';
          close_msg = '삭제했습니다.';
          szTitle = '코드그룹삭제';
          break;
      }
      let selUserCo = 0;
      for (const key of Object.keys(checkData)) {
        if (checkData[key]) {
          selUserCo++;
        }
      }
      if (selUserCo < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 코드그룹이 없습니다.', null);
      } else {
        const sendParam = { itype: itype, szTitle: szTitle, checkData: checkData, close_msg: close_msg };
        if (itype === 'D') { // 삭제
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.codegroup_delete, options);
        } else {
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.codegroup_used_change, options);
        }
      }
    },

    // 상태변경 실행
    codegroup_used_change(sendParam, setDate) {
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
      params.codegroups = arrData;
      apiproject.setCodegroupUsed(params).then((data) => {
        console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnCodegroupList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },

    // 삭제 실행
    codegroup_delete(sendParam, setDate) {
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
      params.codegroups = arrData;
      apiproject.delCodegroup(params).then((data) => {
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnCodegroupList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },

    // 코드그룹 상세보기
    fnCodegroupDetail(seq) {
      if(seq === '')
      {
        this.modeType = 'c';
        this.$refs.codegrouppopup.openPopup();
      }else{
        this.modeType = 'e';
        this.$refs.codegrouppopup.openPopupBySeq(seq);
      }
    },
    checkedAll(checked) {
      //if (this.cis_data) {
        this.allChecked = checked
        for (let i in this.codegroup_list) {
            this.codegroup_list[i].selected = this.allChecked;
        }
      //}
    },
    selected (e) {
        for (let i in this.codegroup_list) {
            if(! this.codegroup_list[i].selected) {
                this.allChecked = false;
                return;
            } else {
                this.allChecked = true;
            }
        }
    },
    getSelected(){
        let user_ids = [];
        for (let i in this.codegroup_list) {
            if(this.codegroup_list[i].selected) {
                user_ids.push(this.codegroup_list[i].seq);
            }
        }
        console.log(user_ids)
    },
  },
};
</script>

<style scoped>
.grid_m.codegroup {
  grid-template-columns: 100px 200px 320px 100px 180px 200px;
}
.grid_m.code {
  grid-template-columns: 100px 250px 250px 200px 200px;
}
.grid_m.nodata {
  grid-template-columns: 1100px;
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
