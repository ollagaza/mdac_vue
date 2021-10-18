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
          <template v-if="statistics_list.length > 0">
            <template v-for="(pStatistics, index) in statistics_list">
              <div class="test testc" style="height: fit-content;display: flex; flex-direction: row;">
                <div style="width:48%;padding: 10px 0 0 0 ;">
                  <div style="font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                    <div>{{ pStatistics.project_name }}</div>
                    <div style="flex: 1"></div>
                    <div style="cursor:pointer;" v-on:click="go_project(`${pStatistics.project_name}`)">더보기 ></div>
                  </div>
                  <div class="grid_m dashboard header">
                    <div>전체데이터{{ index%2 }}</div>
                    <div class="grid_m project_value">{{ pStatistics.total }}</div>
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
                <div v-if="index%2 === 0" style="flex: 1"></div>
                <!-- <div style="width:48%;padding: 10px 0 0 0 ;">
                  <div style="font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                    <div>ICT</div>
                    <div style="flex: 1"></div>
                    <div style="cursor:pointer;" v-on:click="go_project()">더보기 ></div>
                  </div>
                  <div class="grid_m dashboard header">
                    <div class="item">전체데이터</div>
                    <div class="grid_m project_value">2500</div>
                    <div>반려데이터</div>
                    <div class="grid_m project_value">2500</div>
                  </div>
                  <div class="grid_m dashboard header">
                    <div>라벨링완료</div>
                    <div class="grid_m project_value">2500</div>
                    <div>검수완료</div>
                    <div class="grid_m project_value">2500</div>
                  </div>
                </div> -->
              </div>
            </template>
            <!-- <div style="height: fit-content;display: flex; flex-direction: row;">
              <div style="width:48%;padding: 10px 0 0 0 ;">
                <div style="font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                  <div>후두내시경</div>
                  <div style="flex: 1"></div>
                  <div style="cursor:pointer;" v-on:click="go_project()">더보기 ></div>
                </div>
                <div class="grid_m dashboard header">
                  <div>전체데이터</div>
                  <div class="grid_m project_value">2500</div>
                  <div>반려데이터</div>
                  <div class="grid_m project_value">2500</div>
                </div>
                <div class="grid_m dashboard header">
                  <div>라벨링완료</div>
                  <div class="grid_m project_value">2500</div>
                  <div>검수완료</div>
                  <div class="grid_m project_value">2500</div>
                </div>
              </div>

              <div style="flex: 1"></div>
              <div style="width:48%;padding: 10px 0 0 0 ;">
                <div style="font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                  <div>xxxxx</div>
                  <div style="flex: 1"></div>
                  <div style="cursor:pointer;" v-on:click="go_project()">더보기 ></div>
                </div>
                <div class="grid_m dashboard header">
                  <div class="item">전체데이터</div>
                  <div class="grid_m project_value">2500</div>
                  <div>반려데이터</div>
                  <div class="grid_m project_value">2500</div>
                </div>
                <div class="grid_m dashboard header">
                  <div>라벨링완료</div>
                  <div class="grid_m project_value">2500</div>
                  <div>검수완료</div>
                  <div class="grid_m project_value">2500</div>
                </div>
              </div>
            </div> -->
          </template>

          <div style="flex: 2; padding-top: 20px;">
            <div style="padding: 20px 0 0 0 ;">
              <div style="font-weight: 600; font-size: 11pt; color: #333; height: fit-content;display: flex; flex-direction: row;">
                <div>작업자현황</div>
                <div style="flex: 1"></div>
                <div style="cursor:pointer;" v-on:click="go_member()">더보기 ></div>
              </div>
              <div class="grid_m dashboard header">
                <div>총작업자</div>
                <div class="grid_m worker_value">2500</div>
                <div>미할당</div>
                <div class="grid_m worker_value">2500</div>
              </div>
              <div class="grid_m dashboard header">
                <div>라벨러</div>
                <div class="grid_m worker_value">2500</div>
                <div>검수자</div>
                <div class="grid_m worker_value">2500</div>
              </div>
            </div>
          </div>

          <template>  
            <div style="height:20px;"></div>            
            <ChartPage 
              ref="chartpage" 
              chartData="chartData" 
              v-bind:class="chart_size" 
              v-bind:project_list="project_list" 
              v-bind:statistics_list="statistics_list" 
              v-bind:search_seq="search_seq"
              v-bind:project_seq="project_seq"
              v-bind:chart_title="chart_title"
              v-bind:search_type="search_type"
              v-bind:start_date="start_date"
              v-bind:end_date="end_date"
              v-if="!chartLoading" 
            ></ChartPage>
          </template>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ChartPage from '../components/statistics/Chart.vue';
import apistatistics from '../api/ApiStatistics';
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
      project_list: [],         // 프로젝트 리스트
      statistics_list: '',      // 통계 데이터 리스트
      chart_title: '',          // 챠트 제목
      search_seq: '3',          // 조회종류(1:라벨러/2:검수자/3:프로젝트)
      project_seq: '',          // 프로젝트
      search_type: '',          // 조회기준
      date_locale_ko: ko,
      start_date: moment().day(1).format('YYYY-MM-DD'),  // 시작일
      end_date: moment().day(5).format('YYYY-MM-DD'),    // 종료일
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
      chart_size: 'chartClass',
};
  },
  computed: {
    ...mapGetters(['is_logged']),

  },
  methods: {
// 통계 조회
    fnStatisticsList() {
      this.chart_title = `Weekly 통계 ( ${moment(this.start_date).format('YYYY-MM-DD')} ~ ${moment(this.end_date).format('YYYY-MM-DD')} )`

      // this.$log.debug('statistics_list_before',this.statistics_list)
      //body = req.query;
      this.showLoading(true);
      let project_seq = this.project_seq;
      const data = {
        search_seq: 3,
      };
      apistatistics.getStatistics(data) // 클래스 API 호출
        .then((result) => {

          // this.$log.debug(result);
          // this.$log.debug(`aaaaaaaaaaa===${result[0].length}`);
          if (result.statistics_info.length > 0) {
            for (const key in result.statistics_info) {
            }
          }
          this.statistics_list = result.statistics_info;
          this.init()
        });
      this.showLoading(false);
    },
    init() { 
      this.chartData = []
      this.$refs.chartpage.init()
    },
    go_project(project_name) {
      this.$router.push({ name: 'project', params: { keyword: project_name } });
    },
    go_member() {
      this.$router.push({ name: 'member' });
    },
},
  beforeCreate() { 
    // const isLoggedIn = this.$store.getters['is_logged'];
    // if(!isLoggedIn) {
    //  this.$router.push({ name: 'index' });
    // }        
    // console.log(`Logged1 :: ${isLoggedIn}`);
  },
  mounted() {

    this.$log.debug(`Logged_Dashboard :: ${this.is_logged}`);
    if (!this.is_logged) {
      this.$router.push({ name: 'index' });
    }
    
    this.fnStatisticsList();   
  },
  destroyed() {

    // const isLoggedIn = this.$store.getters['is_logged'];
    // console.log(`Logged2 :: ${isLoggedIn}`);
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


.test {
  display: grid;
  
}

.test.testc {
  grid-template-columns: 600px 600px;
}

.grid_m.project_value {
  background-color: #fff;
  grid-auto-columns: minmax(140px, auto);
}
.grid_m.worker_value {
  background-color: #fff;
  grid-auto-columns: minmax(300px, auto);
}
</style>
