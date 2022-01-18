<!--
=======================================
'	파일명 : ClassList.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : class list
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Side_bar v-bind:menu_id="5"></Side_bar>
        <div class="content_layout">
          <div class="main_title">
            Data Management
          </div>
          <div class="sub_title">
            Class Manager
          </div>

          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text selbox" v-model="project_seq" style="width: 240px;" @change="fnClassList(1)">
                <option value="" selected=true>전체프로젝트</option>
                  <template v-for="(project, seq) in project_list">
                    <option v-bind:value="project.seq">{{project.project_name}}</option>
                  </template>
              </select>

              <select class="text selbox" v-model="is_used" style="width: 130px;" @change="fnClassList(1)">
                <option value="" selected=true>상태(전체)</option>
                <option value="Y" selected=true>사용중</option>
                <option value="N">중지중</option>
              </select>

              <select class="text selbox" v-model="search_type" style="width: 160px;">
                <option value="class_name" selected=true>클래스명</option>
                <option value="class_id">클래스코드</option>
              </select>

              <input type="text" class="search input" v-model="keyword" @keyup.enter="fnClassList(1)" />
              <div class="btn deepgray" style="margin-left:5px;width:80px;" v-on:click="fnClassList(1)">검색</div>
              <div class="btn reg" style="margin-left:5px;width:80px;" v-on:click="fnClassDetail('')">등록</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <!-- <input style="width:3%; height:30px; border-radius:3px; padding:0 10px; border:1px solid #888;" type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"> -->
              <div class="check_wrapper" v-on:click="onAllCheckClick">
                <div class="check_box" v-bind:class="{ on: check_click }"></div> <div class="check_text">전체 선택</div>
              </div>

              <div class="btn square navy" style="margin-left:5px;width:80px;" v-on:click="class_change('Y')">사용중</div>
              <div class="btn square" style="margin-left:5px;width:80px;" v-on:click="class_change('N')">사용중지</div>
              <div class="btn square red" style="margin-left:5px;width:80px;" v-on:click="class_change('D')">삭제</div>

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text selbox" v-model="list_count" style="width: 120px;height: 33px;" @change="fnClassList(1)">
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
              <div>클래스코드</div>
              <div>클래스명</div>
              <div>상태</div>
              <div>등록일</div>
            </div>

            <template v-if="class_list.length === 0">
              <div class="grid_m class nodata bottom">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="class_list.length > 0">
              <template v-for="(pClass, index) in class_list">
                <div class="grid_m class body" v-bind:class="{ bottom : class_list.length === index+1 }">
                  <!-- <div><input type="checkbox" class="check_box" value="member.seq" :id="'check_' + member.seq" v-model="member.selected"  @change="selected($event)" v-bind:class="[{on: checkData[member.seq]}, {admin: member.used_admin === 'A'}]" v-on:click="onCheckClick(member.seq)"></div>v-model="checked_user"  -->
                  <div class="check_box" v-bind:class="[{on: checkData[pClass.seq]}]" v-on:click="onCheckClick(pClass.seq)"></div>
                  <div v-on:click="fnClassDetail(pClass.seq)">{{ pClass.project_name }}</div>
                  <div v-on:click="fnClassDetail(pClass.seq)">{{ pClass.class_id }}</div>
                  <div v-on:click="fnClassDetail(pClass.seq)">{{ pClass.class_name }}</div>
                  <div v-on:click="fnClassDetail(pClass.seq)"><div :class="{ 'process_work' : pClass.is_used === 'Y', 'process_stop' : pClass.is_used !== 'Y' }" style="margin-left:5px;width:60px;" v-on:click="fnClassList(1)">{{ pClass.is_used_str }}</div></div>
                  <div v-on:click="fnClassDetail(pClass.seq)">{{ pClass.reg_date_dt }}</div>
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

    <ClassPopup ref="classpopup"
             v-bind:modeType="modeType"
             v-bind:project_list="project_list"
             v-on:callClassList="fnClassList"
    ></ClassPopup>
  </div>
</template>


<script>
import apiproject from '../../api/ApiProject';
import ClassPopup from '../../components/popup/ClassPopup';
import BaseMixin from '../../components/Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
import Side_bar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';

export default {
  name: 'ClassList',
  components: {
    ClassPopup,
    Side_bar,
    Pagination,
  },
  mixins: [BaseMixin],
  data() {
    return {
      project_list: '',         // 프로젝트 리스트
      class_list: '',           // 클래스 데이터 리스트
      project_seq: '',          // 프로젝트
      is_used: '',              // 사용여부
      search_type: 'class_name',// 검색조건
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
  computed: {
    cpage_navigation() {
      const null_navigation = {};
      if (this.page_navigation) {
        return this.page_navigation;
      }
      return null_navigation;
    },
    cis_data() {
      if (this.class_list && this.class_list.length > 0) {
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
    this.fnClassList(1);
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
    fnClassList(pg) {
      //body = req.query;
      this.showLoading(true);
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
      apiproject.getClassInfo(data) // 클래스 API 호출
        .then((result) => {

          if (result.class_info.length > 0) {
            for (const key in result.class_info) {
              const reg_date = result.class_info[key].reg_date;
              if (reg_date) {
                result.class_info[key].reg_date_dt = reg_date.substr(0, 10).replaceAll('-', '.');
              }
              if (result.class_info[key].is_used == 'Y') {
                result.class_info[key].is_used = 'Y';
                result.class_info[key].is_used_str = '사용중';
              } else {
                result.class_info[key].is_used_str = "중지중";
              }
            }
          }
          this.class_list = result.class_info;
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
        this.fnClassList(n);
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
        Object.keys(this.class_list).forEach((key) => {
          if (this.class_list[key].is_admin !== 'A') {
            const seq = this.class_list[key].seq;
            this.$set(this.checkData, seq, value);
          }
        });
      }
    },

    // 상태 변경
    class_change(itype) {
      const options = {};
      const checkData = this.checkData;
      let confirm_msg = '';
      let close_msg = '';
      let szTitle = '';
      switch(itype) {
        case 'Y' :
          confirm_msg = '선택 클래스를 사용중으로 변경하시겠습니까?';
          close_msg = '사용중으로 변경되었습니다.';
          szTitle = '사용중';
          break;
        case 'N' :
          confirm_msg = '선택 클래스를 사용중지로 변경하시겠습니까?';
          close_msg = '사용중지 시켰습니다.';
          szTitle = '사용중지';
          break;
        case 'D' :
          confirm_msg = '선택 클래스를 삭제하시겠습니까?';
          close_msg = '삭제했습니다.';
          szTitle = '클래스삭제';
          break;
      }
      let selUserCo = 0;
      for (const key of Object.keys(checkData)) {
        if (checkData[key]) {
          selUserCo++;
        }
      }
      if (selUserCo < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 클래스가 없습니다.', null);
      } else {
        const sendParam = { itype: itype, szTitle: szTitle, checkData: checkData, close_msg: close_msg };
        if (itype === 'D') { // 삭제
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.class_delete, options);
        } else {
          EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.class_used_change, options);
        }
      }
    },

    // 상태변경 실행
    class_used_change(sendParam, setDate) {
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
      params.classes = arrData;
      apiproject.setClassUsed(params).then((data) => {
        console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnClassList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },

    // 삭제 실행
    class_delete(sendParam, setDate) {
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
      params.classes = arrData;
      apiproject.delClass(params).then((data) => {
        // console.log(`data.error===${data.error}`)
        if (data.error === 0) {
          EventBus.emit('alertPopupOpen', null, sendParam.close_msg, null);
          this.fnClassList(1);
        } else {
          this.onError(data.message);
        }
        EventBus.emit('confirmPopupClose', true);
      });
    },

    // 클래스 상세보기
    fnClassDetail(seq) {
      if(seq === '')
      {
        this.modeType = 'c';
        this.$refs.classpopup.openPopup();
      }else{
        this.modeType = 'e';
        this.$refs.classpopup.openPopupBySeq(seq);
      }
    },
    checkedAll(checked) {
      //if (this.cis_data) {
        this.allChecked = checked
        for (let i in this.class_list) {
            this.class_list[i].selected = this.allChecked;
        }
      //}
    },
    selected (e) {
        for (let i in this.class_list) {
            if(! this.class_list[i].selected) {
                this.allChecked = false;
                return;
            } else {
                this.allChecked = true;
            }
        }
    },
    getSelected(){
        let user_ids = [];
        for (let i in this.class_list) {
            if(this.class_list[i].selected) {
                user_ids.push(this.class_list[i].seq);
            }
        }
        console.log(user_ids)
    },
  },
};
</script>

<style scoped>
.searchWrap {
  border: 0px solid #888;
  border-radius: 5px;
  text-align: center;
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.searchWrap input {
  /* width: 60%;
  height: 36px;
  border-radius: 3px;
  padding: 0 10px;
  border: 1px solid #888; */
  /* width: 529px; */
  width: 60%;
  height: 45px;
  border-radius: 6px;
  box-shadow: 0px 2px 0 0 #e8e8e8;
  border: solid 1px #ddd;
  background-color: #fff;
}

.search.input{
  background-image: url('/img/MDAC/search.png');
  background-repeat: no-repeat;
  background-position: 10px center;
  outline: none;
  padding-left: 40px
}

.selbox {
  /* width: 140px; */
  height: 45px;
  /* margin: 39px 10px 30px 20px; */
  /* padding: 15px 10px 15px 11px; */
  border-radius: 6px;
  box-shadow: 0px 2px 0 0 #e8e8e8;
  border: solid 1px #ddd;
  background-color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #888;
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

.grid_m.class {
  grid-template-columns: 50px 300px 150px 300px 150px 150px;
}
.grid_m.nodata {
  grid-template-columns: 1100px;
}
</style>
