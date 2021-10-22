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

              <select class="text" v-model="search_type" style="width: 220px;height: 36px;" @change="fnStatisticsList()">
                <option value="NOW" selected=true>조회기준(기간:라벨링)</option>
                <option value="NOWC" selected=true>조회기준(기간:라벨링+반려)</option>
                <option value="SUM" selected=true>조회기준(누적:라벨링)</option>
                <option value="SUMC" selected=true>조회기준(누적:라벨링+반려)</option>
              </select>

              <div class="datepicker_icon" style="border: 1px solid #ccc;">
                <datepicker v-model="start_date" :language="date_locale_ko" :format="dateFormatter" style="width: 140px;padding: 8px 0 0 10px;height: 34px;"></datepicker>
              </div>
              <div style="line-height: 34px;">&nbsp;~&nbsp;</div>
              <div class="datepicker_icon" style="border: 1px solid #ccc;">
                <datepicker v-model="end_date" :language="date_locale_ko" :format="dateFormatter" style="width: 140px;padding: 8px 0 0 10px;height: 34px;"></datepicker>
              </div>
              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnStatisticsList()">조회</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <div class="btn" v-bind:class="{ deepgreen: search_seq === '3' }" style="margin-left:5px;width:80px; height: 36px;" v-on:click="statisticsGo('3')">통합검수</div>
              <div class="btn" v-bind:class="{ deepgreen: search_seq === '4' }" style="margin-left:5px;width:80px; height: 36px;" v-on:click="statisticsGo('4')">별도검수</div>
              <div style="flex: 2"></div>
              <div class="btn" style="margin-left:5px;width:120px; height: 36px;" v-on:click="viewTooltips()">{{tooltips_title}}</div>
              <div class="btn blue" style="margin-left:5px;width:120px; height: 36px;" v-on:click="export_file()">Export to excel</div>
            </div>
          </div>

          <div style="padding: 10px 0 0 0 ;">
            <div v-if="search_seq === '3'" class="grid_m class_check3 header">
              <div>프로젝트</div>
              <div>총작업량</div>
              <div>라벨링진행</div>
              <div>라벨링완료</div>
              <div>라벨링완료율</div>
              <div>반려</div>
              <div>반려율</div>
              <div>총검수량</div>
              <div>검수진행</div>
              <div>검수완료</div>
              <div>검수완료율</div>
            </div>
            <div style="font-size: 10px" v-if="search_seq === '4'" class="grid_m class_check4 header">
              <div>프로젝트</div>
              <div>총작업량</div>
              <div>라벨링진행</div>
              <div>라벨링완료</div>
              <div>라벨링완료율</div>
              <div>반려</div>
              <div>반려율</div>
              <div>검수1(전체/진행/완료)</div>
              <div>검수1완료율</div>
              <div>검수2(전체/진행/완료)</div>
              <div>검수2완료율</div>
              <div>검수3(전체/진행/완료)</div>
              <div>검수3완료율</div>
            </div>

            <template v-if="statistics_list.length === 0">
              <div class="grid_m nodata" v-bind:class="{class_check3: search_seq === '3', class_check4: search_seq === '4'}">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="statistics_list.length > 0">
              <template v-for="(pStatistics, index) in statistics_list">
                <div class="grid_m class_check3 body" v-if="search_seq === '3'" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.label_total }}</div>
                  <div>{{ pStatistics.label_ing }}</div>
                  <div>{{ pStatistics.label_complete }}</div>
                  <div>{{ pStatistics.label_avgComplete }}</div>
                  <div>{{ pStatistics.label_reject }}</div>
                  <div>{{ pStatistics.label_avgReject }}</div>
                  <div>{{ pStatistics.check_total }}</div>
                  <div>{{ pStatistics.check_ing }}</div>
                  <div>{{ pStatistics.check_complete }}</div>
                  <div>{{ pStatistics.check_avgComplete }}</div>
                </div>
                
                <div class="grid_m class_check4 body" v-if="search_seq === '4'" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.label_total }}</div>
                  <div>{{ pStatistics.label_ing }}</div>
                  <div>{{ pStatistics.label_complete }}</div>
                  <div>{{ pStatistics.label_avgComplete }}</div>
                  <div>{{ pStatistics.label_reject }}</div>
                  <div>{{ pStatistics.label_avgReject }}</div>
                  <div>{{ pStatistics.check1_total }} / {{ pStatistics.check1_ing }} / {{ pStatistics.check1_complete }}</div>
                  <div>{{ pStatistics.check1_avgComplete }}</div>
                  <div>{{ pStatistics.check2_total }} / {{ pStatistics.check2_ing }} / {{ pStatistics.check2_complete }}</div>
                  <div>{{ pStatistics.check2_avgComplete }}</div>
                  <div>{{ pStatistics.check3_total }} / {{ pStatistics.check3_ing }} / {{ pStatistics.check3_complete }}</div>
                  <div>{{ pStatistics.check3_avgComplete }}</div>
                </div>
              </template>
            </template>
            <template>  
              <div style="height:20px;"></div>            
              <ChartPage 
                ref="chartpage" 
                chartData="chartData" 
                v-bind:tooltips_flag="tooltips_flag"
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

  </div>
</template>


<script>
import apiproject from '../../api/ApiProject';
import apistatistics from '../../api/ApiStatistics';
import BaseMixin from '../../components/Mixins/BaseMixin';
import Statistics_Left from './Statistics_Left';
import { ko } from 'vuejs-datepicker/dist/locale';
import moment from 'moment/moment';
import Datepicker from 'vuejs-datepicker';
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
      tooltips_title: '차트데이터보이기', // 버튼:차트데이터보이기
      tooltips_flag: 'N',               // 버튼:차트데이터보이기
      search_seq: this.$route.params.search_seq ? this.$route.params.search_seq: '3',            // 조회종류(1:라벨러/2:검수자/3:프로젝트)
      project_seq: this.$route.params.project_seq ? this.$route.params.project_seq: '',          // 프로젝트
      search_type: 'NOW',          // 조회기준
      date_locale_ko: ko,
      start_date: moment().subtract(7, 'd').format('YYYY-MM-DD'),  // 시작일
      end_date: moment().format('YYYY-MM-DD'),    // 종료일
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
    };
  },
  watch: {
    '$route': function(){
      this.search_seq = this.$route.params.search_seq ? this.$route.params.search_seq: '3';
      this.tooltips_title = '차트데이터보이기'
      this.tooltips_flag = 'N'
      this.fnStatisticsList();    
    }
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
    // 프로젝트정보 셋팅
    apiproject.getProjectInfo(data)
      .then((result) => {
        this.project_list = result.project_info;
      });
  },
  mounted() {
    this.fnStatisticsList();    
  },
  methods: {
    // 통계 조회
    fnStatisticsList() {
      this.chart_title = `프로젝트 통계 ( ${moment(this.start_date).format('YYYY-MM-DD')} ~ ${moment(this.end_date).format('YYYY-MM-DD')} )`

      this.search_seq = String(this.$route.params.search_seq) ? String(this.$route.params.search_seq): '3';

      // this.$log.debug('statistics_list_before',this.statistics_list)
      //body = req.query;
      this.showLoading(true);
      let project_seq = this.project_seq;
      const data = {
        search_seq: this.search_seq,
        project_seq: this.project_seq,
        search_type: this.search_type,
        start_date: moment(this.start_date).format('YYYY-MM-DD'),
        end_date: moment(this.end_date).format('YYYY-MM-DD')
      };
      apistatistics.getStatistics(data) // 클래스 API 호출
        .then((result) => {

          if (result.statistics_info.length > 0) {
            for (const key in result.statistics_info) {
              result.statistics_info[key].label_avgComplete = result.statistics_info[key].label_avgComplete + '%'   // 라벨링완료율
              result.statistics_info[key].label_avgReject = result.statistics_info[key].label_avgReject + '%'       // 반려율
              result.statistics_info[key].check_avgComplete = result.statistics_info[key].check_avgComplete + '%'   // 검수완료율
              result.statistics_info[key].check1_avgComplete = result.statistics_info[key].check1_avgComplete + '%' // 검수1완료율
              result.statistics_info[key].check2_avgComplete = result.statistics_info[key].check2_avgComplete + '%' // 검수2완료율
              result.statistics_info[key].check3_avgComplete = result.statistics_info[key].check3_avgComplete + '%' // 검수3완료율
            }
            // this.sum_label_ing = this.sum_total - this.sum_label_complete - this.sum_check_ing - this.sum_check_complete
          }          
          this.statistics_list = result.statistics_info;
          this.init()
        });
      this.showLoading(false);

    },
    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },

    statisticsGo(search_seq) {
      // this.$router.push({ name: 'statisticsworker' });
      this.$router.push({ name: 'statisticsproject', params: { search_seq: search_seq }});
    },
    // Data 툴팁 보이기/안보이기
    viewTooltips() {
      this.$refs.chartpage.viewTooltips()
      if(!this.$refs.chartpage.options.showAllTooltips) {
        this.tooltips_title = '차트데이터보이기'
        this.tooltips_flag = 'N'
      } else {
        this.tooltips_title = '차트데이터숨기기'
        this.tooltips_flag = 'Y'
      }
    },
    // 엑셀파일 export
    export_file() {
      this.$refs.chartpage.filexls()
      return;
    },
    // 1개 데이터 선택시 chart 호출
    one_chart(chart_data) {
      this.$refs.chartpage.init(chart_data)
    },
    // 전체 데이터 chart 호출
    init() { 
      // this.$log.debug('statistics_list_after',this.statistics_list)
      // EventBus.emit('statistics_list', null, this.statistics_list, null);
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
.grid_m.class_check3 {
  grid-template-columns: 200px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px;
}
.grid_m.class_check4 {
  grid-template-columns: 100px 60px 60px 60px 60px 60px 60px 120px 60px 120px 60px 120px 60px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
</style>
