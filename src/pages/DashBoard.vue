<!--
=======================================
'	파일명 : DashBoard.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : 대시보드
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Side_bar v-bind:menu_id="1"></Side_bar>
        <div class="content_layout">
          <div style="font-weight: 600; font-size: 15pt; color: #333;">
            <!-- Dashboard -->
          </div>

          <!-- user dashboard -->
          <div v-if="member_count.length > 0" style="flex: 2; margin-top:10px;" class="Rectangle_user">
            <div>
              <div style="height: fit-content;display: flex; flex-direction: row;">
                <div class="user_title">작업자현황</div>
                <div style="flex: 1"></div>
                <div class="btn_more pointer" v-on:click="memberGo()"><img src="/img/MDAC/arrow.png"></div>
              </div>
              <div class="user_line"></div>
              <div style="height: fit-content;display: flex; flex-direction: row;">
                <div class="user_content_title" style="margin: 0 0 19px 19px;">총 작업자</div>
                <div class="user_content" style="float:right;">{{ member_count[0].total }}</div>
                <div class="user_line2"></div>
                <div class="user_content_title">미할당</div>
                <div class="user_content">{{ member_count[0].not_work }}</div>
                <div class="user_line2"></div>
                <div class="user_content_title">라벨러</div>
                <div class="user_content">{{ member_count[0].labeler }}</div>
                <div class="user_line2"></div>
                <div class="user_content_title">검수자</div>
                <div class="user_content" style="float:right;margin: 0 15px 20px 0;" >{{ member_count[0].checker }}</div>
              </div>
              <!-- <div class="grid_m dashboard header">
                <div>총작업자</div>
                <div class="grid_m worker_value">{{ member_count[0].total }}</div>
                <div>미할당</div>
                <div class="grid_m worker_value">{{ member_count[0].not_work }}</div>
              </div>
              <div class="grid_m dashboard header">
                <div>라벨러</div>
                <div class="grid_m worker_value">{{ member_count[0].labeler }}</div>
                <div>검수자</div>
                <div class="grid_m worker_value">{{ member_count[0].checker }}</div>
              </div> -->

            </div>
          </div>
          
          <!-- project dashboard -->
          <div v-if="statistics_list.length > 0" class="dashboard">
          <template v-for="(pStatistics, index) in statistics_list">
            <div v-if="statistics_list.length > 0" style="flex: 2; margin-top:10px;" class="Rectangle_project" v-bind:class="{ right: index % 2 === 1, left: index % 2 === 0, none: index + 1 === statistics_list.length }">
              <div><!--  v-bind:class="{ colorLightgray : this.search_type === 'SUM' || search_type === 'SUMC' } -->
                <div style="height: fit-content;display: flex; flex-direction: row;">
                  <div class="project_title">{{ pStatistics.project_name }}</div>
                  <div style="flex: 1"></div>
                  <div class="btn_more pointer" v-on:click="projectGo(`${pStatistics.project_name}`)"><img src="/img/MDAC/arrow.png"></div>
                </div>
                <div class="project_line"></div>
                <div style="height: fit-content;display: flex; flex-direction: row;"> 
                  <div class="project_content_title"><span style="color:#ffb1c1;font-size:12px;padding-right:5px;">●</span> 전체 라벨링 데이터</div>
                  <div class="project_content" style="margin: 0 0 20px 0;">{{ pStatistics.label_total }}</div>
                  <div class="project_line2"></div>
                  <div class="project_content_title" style="margin: 0 0 19px 0px;"><span style="color:#b71c1c;font-size:12px;padding-right:5px;">●</span> 반려데이터</div>
                  <div class="project_content">{{ pStatistics.label_reject }}</div>
                </div>
                <div class="project_line"></div>
                <div style="height: fit-content;display: flex; flex-direction: row;">
                  <div class="project_content_title"><span style="color:#a3e0e0;font-size:12px;padding-right:5px;">●</span> 라벨링 완료</div>
                  <div class="project_content" style="margin: 0 0 20px 0;">{{ pStatistics.label_complete }}</div>
                  <div class="project_line2"></div>
                  <div class="project_content_title" style="margin: 0 0 19px 0px;"><span style="color:#311b92;font-size:12px;padding-right:5px;">●</span> 검수완료</div>
                  <div class="project_content" >{{ pStatistics.check_complete }}</div>
                </div>
                <div style="float:left;"></div>
                <!-- <div class="grid_m dashboard header">
                  <div>총작업자</div>
                  <div class="grid_m worker_value">{{ member_count[0].total }}</div>
                  <div>미할당</div>
                  <div class="grid_m worker_value">{{ member_count[0].not_work }}</div>
                </div>
                <div class="grid_m dashboard header">
                  <div>라벨러</div>
                  <div class="grid_m worker_value">{{ member_count[0].labeler }}</div>
                  <div>검수자</div>
                  <div class="grid_m worker_value">{{ member_count[0].checker }}</div>
                </div> -->

              </div>
            </div>

            <!-- <div class="dashboard_border" style="width:49%;padding: 5px 0 0 0;margin-top:10px;">
              <div style="font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                <div style="font-weight: 540;padding: 5px 5px 5px 10px;">{{ pStatistics.project_name }}</div>
                <div style="flex: 1"></div>
                <div style="padding: 5px 10px 5px 5px;cursor:pointer;font-weight:300; font-size: 9pt;" v-on:click="projectGo(`${pStatistics.project_name}`)">더보기 ></div>
              </div>
              <div class="grid_m dashboard header">
                <div>전체라벨링데이터</div>
                <div class="grid_m project_value">{{ pStatistics.label_total }}</div>
                <div>반려데이터</div>
                <div class="grid_m project_value">{{ pStatistics.label_reject }}</div>
              </div>
              <div class="grid_m dashboard header">
                <div>라벨링완료</div>
                <div class="grid_m project_value">{{ pStatistics.label_complete }}</div>
                <div>검수완료</div>
                <div class="grid_m project_value">{{ pStatistics.check_complete }}</div>
              </div>
            </div> -->
          </template>
          </div>

          <!-- <div style="flex: 2; margin:20px 0 20px 0;" class="dashboard_border"> -->

          <template>            
            <ChartPage style="background-color: #fff;" class="Rectangle_chart" 
              ref="chartpage" 
              chartData="chartData" 
              v-bind:statistics_list="statistics_list" 
              v-bind:search_seq="search_seq"
              v-bind:project_seq="project_seq"
              v-bind:chart_title="chart_title"
              v-bind:search_type="search_type"
              v-bind:start_date="start_date"
              v-bind:end_date="end_date"
              v-bind:status="status"
              v-if="!chartLoading" 
            ></ChartPage>
          </template>    
          </div>      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ChartPage from '../components/statistics/Chart.vue';
import apistatistics from '../api/ApiStatistics';
import apiuser from '../api/ApiUser';
import { ko } from 'vuejs-datepicker/dist/locale';
import BaseMixin from '../components/Mixins/BaseMixin';
import moment from 'moment/moment';
import Side_bar from '../components/Sidebar';

export default {
  name: 'Dashboard',
  components: {
    ChartPage,
    Side_bar,
  },
  mixins: [BaseMixin],
  data() {
    return {
      statistics_list: '',      // 통계 데이터 리스트
      member_count: '',         // 멤버 카운팅 정보
      chart_title: '',          // 챠트 제목
      search_seq: '3',          // 조회종류(1:라벨러/2:검수자/3:프로젝트(통합검수)/4:프로젝트(별도검수))
      project_seq: '',          // 프로젝트
      search_type: 'NOW',          // 조회기준
      date_locale_ko: ko,
      start_date: moment().day(1).format('YYYY-MM-DD'),  // 시작일
      end_date: moment().day(5).format('YYYY-MM-DD'),    // 종료일
      status: '1',              // 프로젝트 진행상태(1:진행/2:중지/3:완료)
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
      menu_show: false,
    };
  },
  computed: {
    ...mapGetters(['is_logged']),
  },
  methods: {
    // Dashboard 내용 가져오기
    dashboard_search() {
      this.chart_title = `Weekly 통계 ( ${moment(this.start_date).format('YYYY-MM-DD')} ~ ${moment(this.end_date).format('YYYY-MM-DD')} )`

      //body = req.query;
      this.showLoading(true);
      
      // 프로젝트
      let project_seq = this.project_seq;
      let data = {
        search_seq: 3,
        search_type: 'NOW',
        status: '1'
      };
      apistatistics.getStatistics(data) // 통계 API 호출
        .then((result) => {

          if (result.statistics_info.length > 0) {
            for (const key in result.statistics_info) {
            }
          }
          this.statistics_list = result.statistics_info; // 프로젝트 현황
          this.init() // 챠트 호출
        });

      // 작업자 현황
      data = {
        project_seq: ''
      };
      apiuser.getUserCount(data)
        .then((result) => {

          if (result.member_count.length > 0) {
            for (const key in result.member_count) {
            }
          }
          this.member_count = result.member_count;
        });

        this.showLoading(false);
    },
    init() { 
      this.chartData = []
      this.$refs.chartpage.init()
    },
    // 프로젝트관리로 이동
    projectGo(project_name) {
      this.$router.push({ name: 'project', params: { keyword: project_name } });
    },
    // 멤버관리로 이동
    memberGo() {
      this.$router.push({ name: 'member' });
    },
  },
  mounted() {
    // this.$log.debug(`Logged_Dashboard :: ${this.is_logged}`);
    // 로그인 되어 있지 않으면 index로 이동
    if (!this.is_logged) {
      this.$router.push({ name: 'index' });
    }
    
    // Dashboard 내용 가져오기
    this.dashboard_search();   
  },
};
</script>

<style scoped>
/* .grid_m.body {
  cursor: pointer;
}
.grid_m.body:hover {
  background-color: #dddddd;
}

.grid_m.dashboard {
  grid-template-columns: 1fr 1fr 1fr 1fr;
} */

.dashboard {
  width: 100%;
  /* min-width: 1100px; */
  display: flex;
  flex-wrap: wrap; /*줄 바꿈*/  
}

.grid_m.project_value {
  background-color: #fff;
  grid-auto-columns: minmax(140px, auto);
}
.grid_m.worker_value {
  background-color: #fff;
  grid-auto-columns: minmax(300px, auto);
}
.dashboard_border {
  /* border: 1px dotted lightgray; */
  border-radius: 2px;
  box-shadow: 3px 3px 3px 3px lightgray;
}
.Rectangle_user {
  width: 100%;
  height: 100px;
  margin: 0px 0 20px 0;
  padding: 19px 0 19px 0;
  border-radius: 10px;
  box-shadow: 0px 2px 0 0 #e8e8e8;
  background-color: #5f5f74;
}
.Rectangle_project {
  /* width: 530px;
  max-width: 530px; */
  height: 149px;
  padding: 19px 0 0;
  border-radius: 10px;
  box-shadow: 0px 2px 0 0 #e8e8e8;
  background-color: #fff;
}
.Rectangle_project.left {
  margin: 20px 20px 20px 0;
  float: left;
}
.Rectangle_project.right {
  margin: 20px 0px 20px 20px;
  float: right;
}
.Rectangle_project.none {
  margin: 20px 0px 20px 0px !important;
}

.user_line {
  width: 100%;
  height: 1px;
  margin: 0 0 0;
  background-color: #77778f;
}

.user_line2 {
  width: 1px;
  height: 49px;
  margin: 0 19px 0;
  background-color: #77778f;
}  

.project_line {
  width: 100%;
  height: 1px;
  /* margin: 9px 0 0; */
  background-color: #bbb;
}

.project_line2 {
  width: 1px;
  height: 49px;
  margin: 0px 19px 0;
  background-color: #ddd;
}
.user_title {
  width: 100px;
  height: 14px;
  margin: 0 153px 17px 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}

.project_title {
  width: 350px;
  height: 14px;
  margin: 0 100px 17px 20px;
  /* padding: 0 0 0 20px; */
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #444;
}

.user_content_title {
  /* width: 250px; */
  width: 25%;
  height: 14px;
  margin: 0 0 19px 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.69;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}  

.project_content_title {
  /* width: 250px; */
  width: 50%;
  height: 30px;
  margin: 0 0 19px 19px;
  padding: 12px 0 0 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.0;
  letter-spacing: normal;
  text-align: left;
  color: #888;
}

.user_content {
  height: 14px;
  margin: 0 0 20px 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.69;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}
.project_content {
  height: 14px;
  margin: 0 15px 20px 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.69;
  letter-spacing: normal;
  text-align: left;
  color: #888;
}
.btn_more {
  padding: 0 10px 5px 5px;
  font-weight:600; 
  font-size: 11pt;
  line-height: 1;
  color: #888;
}

</style>

