<!--
=======================================
'	파일명 : StatisticsProject.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : 프로젝트통계
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Statistics_Left v-bind:menu_id="2"></Statistics_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            프로젝트 통계
          </div>


          <div class="searchWrap">
            <div style="display: flex; flex-direction: row; justify-content: center;">
              <select class="text" v-model="project_seq" style="width: 240px;height: 36px;" @change="fnStatisticsList()">
                <option value="" selected=true>전체프로젝트</option>
                  <template v-for="(project, seq) in project_list">
                    <option v-bind:value="project.seq">{{project.project_name}}</option>
                  </template>
              </select>

              <select class="text" v-model="search_type" style="width: 130px;height: 36px;" @change="fnStatisticsList()">
                <option value="" selected=true>조회기준(전체)</option>
                <option value="LABEL">라벨링</option>
                <option value="CHECK">검수</option>
              </select>

              <div class="datepicker_icon" style="border: 1px solid #ccc;">
                <datepicker v-model="start_date" :language="date_locale_ko" :format="dateFormatter" style="width: 140px;padding: 8px 0 0 10px;height: 34px;"></datepicker>
              </div>
              <div> ~ </div>
              <div class="datepicker_icon" style="border: 1px solid #ccc;">
                <datepicker v-model="end_date" :language="date_locale_ko" :format="dateFormatter" style="width: 140px;padding: 8px 0 0 10px;height: 34px;"></datepicker>
              </div>
              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnStatisticsList()">조회</div>
            </div>
          </div>

          <!-- <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="class_change('Y')">사용중</div>
              <div class="btn" style="margin-left:5px;width:80px; height: 36px;" v-on:click="class_change('N')">사용정지</div>
              <div class="btn red" style="margin-left:5px;width:80px; height: 36px;" v-on:click="class_change('D')">삭제</div>

              <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;" @change="fnStatisticsList()">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div>
            </div>
          </div> -->

          <div style="padding: 10px 0 0 0 ;">
            <div class="grid_m class header">
              <div>프로젝트</div>
              <div>총작업량</div>
              <div>라벨링진행</div>
              <div>라벨링완료</div>
              <div>라벨링반려</div>
              <div>반려율</div>
              <div>라벨링진행율</div>
              <div>검수진행</div>
              <div>검수완료</div>
              <div>검수진행율</div>
            </div>

            <template v-if="statistics_list.length === 0">
              <div class="grid_m class nodata">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="statistics_list.length > 0">
              <template v-for="(pStatistics, seq) in statistics_list">
                <div class="grid_m class body">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.total }}</div>
                  <div>{{ pStatistics.label_ing }}</div>
                  <div>{{ pStatistics.label_complete }}</div>
                  <div>{{ pStatistics.label_reject }}</div>
                  <div>{{ pStatistics.label_avgReject }}%</div>
                  <div>{{ pStatistics.label_avgComplete }}%</div>
                  <div>{{ pStatistics.check_ing }}</div>
                  <div>{{ pStatistics.check_complete }}</div>
                  <div>{{ pStatistics.check_avgComplete }}%</div>
                </div>
              </template>
            </template>
            <template>  
              <div style="height:20px;"></div>            
              <ChartPage 
                ref="chartpage" 
                chartData="chartData" 
                v-bind:project_list="project_list" 
                v-bind:statistics_list="statistics_list" 
                v-bind:search_seq="3"
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

  </div>
</template>


<script>
import apiproject from '../../api/ApiProject';
import apistatistics from '../../api/ApiStatistics';
import BaseMixin from '../../components/Mixins/BaseMixin';
import EventBus from '../../utils/eventbus';
import Statistics_Left from './Statistics_Left';
import { ko } from 'vuejs-datepicker/dist/locale';
import moment from 'moment/moment';
import Datepicker from 'vuejs-datepicker';
import {Bar} from 'vue-chartjs'
import ChartPage from './Chart.vue';
export default {
  name: 'StatisticsProject',
  components: {
    Statistics_Left,
    Datepicker,
    ChartPage,
  },
  mixins: [BaseMixin],
  data() {
    return {
      project_list: [],         // 프로젝트 리스트
      statistics_list: '',      // 통계 데이터 리스트
      chart_title: '',          // 챠트 제목
      search_seq: '3',          // 프로젝트
      project_seq: '',          // 프로젝트
      search_type: '',          // 조회기준
      no:'',                    // 게시판 숫자
      modeType: 'e',            // 수정/등록모드
      date_locale_ko: ko,
      start_date: moment().subtract(7, 'd').format('YYYY-MM-DD'),  // 시작일
      end_date: moment().format('YYYY-MM-DD'),    // 종료일
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
    };
  },
  computed: {
    cis_data() {
      if (this.class_list && this.class_list.length > 0) {
        return true;
      }
      return false;
    }

  },
  beforeMount() {
    
    const data = {
        status:''
    }
    apiproject.getProjectInfo(data)
      .then((result) => {
        this.project_list = result.project_info;
      });
  },
  mounted() {
    this.fnStatisticsList();    
  },
  methods: {
    // 클래스 리스트 조회
    fnStatisticsList() {
      this.chart_title = `프로젝트 통계 ( ${this.start_date} ~ ${this.end_date} )`

      this.$log.debug('statistics_list_before',this.statistics_list)
      //body = req.query;
      this.showLoading(true);
      let project_seq = this.project_seq;
      const data = {
        search_seq: 3,
        project_seq: this.project_seq,
        search_type: this.search_type,
        start_date: moment(this.start_date).format('YYYY-MM-DD'),
        end_date: moment(this.end_date).format('YYYY-MM-DD')
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
    isUsed: function (state) {
      if(state == 2) return true;
      else false;
    },

    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },

    init() { 
      // console.log('initaaa')
      this.$log.debug('statistics_list_after',this.statistics_list)
      EventBus.emit('statistics_list', null, this.statistics_list, null);
      this.chartData = []
      this.$refs.chartpage.init()
    }    
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
.grid_m.class {
  grid-template-columns: 280px 80px 80px 80px 80px 80px 80px 80px 80px 80px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
</style>
