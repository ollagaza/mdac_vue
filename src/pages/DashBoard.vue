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
      <div style="" >
        <!-- <div class="left_menu">
          <div class="left_wrapper">
            <div class="left_title">Data Status</div>
            <div class="left_slice"></div>
            <div class="left_title">Project Manager</div>
          </div>
        </div> -->
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            Dashboard
          </div>
          
          <div v-if="statistics_list.length > 0" class="dashboard" style="height: fit-content;display: flex; flex-direction: row;justify-content:space-between;">
          <template v-for="(pStatistics, index) in statistics_list">
            <div class="dashboard_border" style="width:49%;padding: 5px 0 0 0;margin-top:10px;">
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
            </div>
          </template>
          </div>

          <div v-if="member_count.length > 0" style="flex: 2; margin-top:10px;" class="dashboard_border">
            <div>
              <div style="padding: 5px 0 0 0 ;font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                <div style="font-weight: 540;padding: 5px 5px 5px 10px;">작업자현황</div>
                <div style="flex: 1"></div>
                <div style="padding: 5px 10px 5px 5px;cursor:pointer;font-weight:300; font-size: 9pt;" v-on:click="memberGo()">더보기 ></div>
              </div>
              <div class="grid_m dashboard header">
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
              </div>
            </div>
          </div>

          <div style="flex: 2; margin:20px 0 20px 0;" class="dashboard_border">

          <template>  
            <div style="height:20px;"></div>            
            <ChartPage 
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

export default {
  name: 'Dashboard',
  components: {
    ChartPage,
  },
  mixins: [BaseMixin],
  data() {
    return {
      statistics_list: '',      // 통계 데이터 리스트
      member_count: '',         // 멤버 카운팅 정보
      chart_title: '',          // 챠트 제목
      search_seq: '3',          // 조회종류(1:라벨러/2:검수자/3:프로젝트)
      project_seq: '',          // 프로젝트
      search_type: '',          // 조회기준
      date_locale_ko: ko,
      start_date: moment().day(1).format('YYYY-MM-DD'),  // 시작일
      end_date: moment().day(5).format('YYYY-MM-DD'),    // 종료일
      status: '1',              // 프로젝트 진행상태(1:진행/2:중지/3:완료)
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
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
        search_type: 'SUMC',
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

.grid_m.body {
  cursor: pointer;
}
.grid_m.body:hover {
  background-color: #dddddd;
}

.grid_m.dashboard {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.dashboard {
  display: grid;
  flex-wrap: wrap;
  
}

/* .test.testc {
  grid-template-columns: 600px 600px;
} */

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
</style>
