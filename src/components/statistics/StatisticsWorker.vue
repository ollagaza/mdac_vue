<!--
=======================================
'	파일명 : StatisticsWorker.vue
'	작성자 : djyu
'	작성일 : 2021.09.30
'	기능   : 작업자통계
'	=====================================
-->
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Statistics_Left v-bind:menu_id="1"></Statistics_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            작업자 통계
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
                <option value="NOW" selected=true>조회기준(현재)</option>
                <option value="SUM">조회기준(누적)</option>
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

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <div class="btn" v-bind:class="{ deepgreen: search_seq === '1' }" style="margin-left:5px;width:80px; height: 36px;" v-on:click="workerGo('1')">라벨러</div>
              <div class="btn" v-bind:class="{ deepgreen: search_seq === '2' }" style="margin-left:5px;width:80px; height: 36px;" v-on:click="workerGo('2')">검수자</div>
              <div class="btn" style="margin-left:5px;width:120px; height: 36px;" v-on:click="viewTooltips()">{{btn_data_title}}</div>
              <div class="btn blue" style="margin-left:5px;width:120px; height: 36px;" v-on:click="filexls()">Export to excel</div>

              <!-- <div style="flex: 2"></div>
              <div style="height: fit-content;display: flex; flex-direction: row; justify-content: right;">
                <select class="text" v-model="list_count" style="width: 120px;" @change="fnStatisticsList()">
                  <option value="20" selected=true>20개씩 보기</option>
                  <option value="30">30개씩 보기</option>
                  <option value="50">50개씩 보기</option>
                  <option value="100">100개씩 보기</option>
                </select>
              </div> -->
            </div>
          </div>
        
          <div v-model="datalist" style="padding: 10px 0 0 0 ;">
            <div class="grid_m header" v-bind:class="{ class_label: search_seq === '1', class_check: search_seq === '2' }">
              <div>프로젝트</div>
              <div>작업자</div>
              <div>총작업량</div>
              <div>{{ worker_title }}진행</div>
              <div>{{ worker_title }}완료</div>
              <div>{{ worker_title }}완료율</div>
              <div v-if="search_seq === '1'">반려</div>
              <div v-if="search_seq === '1'">반려율</div>
            </div>

            <template v-if="statistics_list.length === 0">
              <div class="grid_m class nodata">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="statistics_list.length > 0">
              <template v-for="(pStatistics, seq) in statistics_list">
                <div v-if="search_seq === '1'" class="grid_m class_label body" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.user_name }}</div>
                  <div>{{ pStatistics.total }}</div>
                  <div>{{ pStatistics.label_ing }}</div>
                  <div>{{ pStatistics.label_complete }}</div>
                  <div>{{ pStatistics.label_avgComplete }}</div>
                  <div>{{ pStatistics.label_reject }}</div>
                  <div>{{ pStatistics.label_avgReject }}</div>
                </div>
                <div v-if="search_seq === '2'" class="grid_m class_check body" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.user_name }}</div>
                  <div>{{ pStatistics.total }}</div>
                  <div>{{ pStatistics.check_ing }}</div>
                  <div>{{ pStatistics.check_complete }}</div>
                  <div>{{ pStatistics.check_avgComplete }}</div>
                </div>
              </template>
            </template>
            
            <div v-if="search_seq === '1' && statistics_list.length > 0"  class="grid_m header" v-bind:class="{ class_label: search_seq === '1', class_check: search_seq === '2' }">
              <div>합계</div>
              <div></div>
              <div>{{sum_total}}</div>
              <div>{{sum_label_ing}}</div>
              <div>{{sum_label_complete}}</div>
              <div></div>
              <div>{{sum_label_reject}}</div>
              <div></div>
            </div>
            
            <div v-if="search_seq === '2' && statistics_list.length > 0"  class="grid_m header" v-bind:class="{ class_label: search_seq === '1', class_check: search_seq === '2' }">
              <div>합계</div>
              <div></div>
              <div>{{sum_total}}</div>
              <div>{{sum_check_ing}}</div>
              <div>{{sum_check_complete}}</div>
              <div></div>
            </div>

            <template>  
              <div style="height:20px;"></div>            
              <ChartPage 
                ref="chartpage" 
                chartData="chartData" 
                v-if="!chartLoading" 
                v-bind:class="chart_size" 
                v-bind:project_list="project_list" 
                v-bind:statistics_list="statistics_list" 
                v-bind:chart_title="chart_title" 
                v-bind:search_seq="search_seq"
                v-bind:project_seq="project_seq"
                v-bind:search_type="search_type"
                v-bind:start_date="start_date"
                v-bind:end_date="end_date"
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
import BaseMixin from '../Mixins/BaseMixin';
import Statistics_Left from './Statistics_Left';
import { ko } from 'vuejs-datepicker/dist/locale';
import moment from 'moment/moment';
import Datepicker from 'vuejs-datepicker';
import ChartPage from './Chart.vue';
  import ExcelJS from 'exceljs';
  import * as FileSaver from 'file-saver';
export default {
  name: 'StatisticsWorker',
  components: {
    Statistics_Left,
    Datepicker,
    ChartPage,    
  },
  mixins: [BaseMixin],
  data() {
    return {
      datalist: '',
      project_list: [],         // 프로젝트 리스트
      statistics_list: '',      // 통계 데이터 리스트
      chart_title: '',          // 챠트 제목
      worker_title: '라벨링',         // 테이블 제목
      btn_data_title: '차트데이터보이기', // 버튼:차트데이터보이기
      search_seq: this.$route.params.search_seq ? this.$route.params.search_seq: '1',            // 조회종류(1:라벨러/2:검수자/3:프로젝트)
      project_seq: '',          // 프로젝트
      search_type: 'NOW',          // 조회기준
      date_locale_ko: ko,
      start_date: moment().subtract(7, 'd').format('YYYY-MM-DD'),  // 시작일
      end_date: moment().format('YYYY-MM-DD'),    // 종료일
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
      chart_size: 'chartClass',
      sum_total: 0,
      sum_label_ing: 0,
      sum_label_complete: 0,
      sum_label_reject: 0,
      sum_check_ing: 0,
      sum_check_complete: 0,
    };
  },
  watch: {
    '$route': function(){
      this.search_seq = this.$route.params.search_seq ? this.$route.params.search_seq: '1';
      this.btn_data_title = "차트데이터보이기"
      this.fnStatisticsList();    
    }
  },  
  computed: {
    param: function () {
                return this.$route.params;
    },
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
    this.search_seq = this.$route.params.search_seq ? this.$route.params.search_seq: 1;
    // this.$log.debug('moment===',moment().format('YYYYMMDDHHmmss'))
    this.fnStatisticsList();  

  },
  methods: {
    // 통계 조회
    fnStatisticsList() {
      this.search_seq = String(this.$route.params.search_seq) ? String(this.$route.params.search_seq): '1';
      // this.$log.debug(`search_seq`,this.search_seq)
      if(this.search_seq === '2') {
        this.chart_title = `검수자 통계 ( ${moment(this.start_date).format('YYYY-MM-DD')} ~ ${moment(this.end_date).format('YYYY-MM-DD')} )`
        this.worker_title = "검수"
      }else{
        this.chart_title = `라벨러 통계 ( ${moment(this.start_date).format('YYYY-MM-DD')} ~ ${moment(this.end_date).format('YYYY-MM-DD')} )`
        this.worker_title = "라벨링"
      }
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

          // this.$log.debug(result);
          // this.$log.debug(`aaaaaaaaaaa===${result[0].length}`);
          this.sum_total = 0
          this.sum_label_ing = 0
          this.sum_label_complete = 0
          this.sum_label_reject = 0
          this.sum_check_ing = 0
          this.sum_check_complete = 0
          if (result.statistics_info.length > 0) {
            for (const key in result.statistics_info) {

              this.sum_total = this.sum_total + result.statistics_info[key].total
              this.sum_label_ing = this.sum_label_ing + result.statistics_info[key].label_ing
              this.sum_label_complete = this.sum_label_complete + result.statistics_info[key].label_complete
              this.sum_label_reject = this.sum_label_reject + result.statistics_info[key].label_reject
              this.sum_check_ing = this.sum_check_ing + result.statistics_info[key].check_ing
              this.sum_check_complete = this.sum_check_complete + result.statistics_info[key].check_complete
              result.statistics_info[key].label_avgComplete = result.statistics_info[key].label_avgComplete + '%'
              result.statistics_info[key].label_avgReject = result.statistics_info[key].label_avgReject + '%'
            }
            // this.sum_label_ing = this.sum_total - this.sum_label_complete - this.sum_check_ing - this.sum_check_complete
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

    workerGo(search_seq) {
      // this.$router.push({ name: 'statisticsworker' });
      this.$router.push({ name: 'statisticsworker', params: { search_seq: search_seq }});
    },
    viewTooltips() {
      this.$refs.chartpage.viewTooltips()
      // this.$log.debug('aaaaaaaaa',this.$refs.chartpage.options.showAllTooltips)
      if(!this.$refs.chartpage.options.showAllTooltips) {
        this.btn_data_title = "차트데이터보이기"
      } else {
        this.btn_data_title = "차트데이터숨기기"
      }
    },
    filexls() {
      this.$refs.chartpage.filexls()
      return;
        
      // // let base64Image = document.getElementById("datalist").toDataURL(1.0);
      // let file_name = 'statistics_label'
      // let base64Image = document.getElementById("bar-chart").toDataURL(1.0);  // Chart img convert
      // // excel js 객체 생성
      // let workbook = new ExcelJS.Workbook();

      // // 워크시트 생성
      // let worksheet =  workbook.addWorksheet('Data List');    // Data List
      // let worksheet2 =  workbook.addWorksheet('Data Chart');  // Chart

      // // Header 셋팅
      // // 260px 140px 100px 100px 100px 100px 100px 100px;
      // if(this.search_seq === '1') {
      //   worksheet.columns = [ 
      //     { header: '프로젝트', key: 'project_name', width: 25, style: { align: 'center', bgColor: '#000' }  },
      //     { header: '작업자', key: 'user_name', width: 20 },
      //     { header: '라벨링진행', key: 'label_ing', width: 15 },
      //     { header: '라벨링완료', key: 'label_complete', width: 15 },
      //     { header: '반려', key: 'label_reject', width: 15 },
      //     { header: '반려율', key: 'label_avgReject', width: 15 },
      //     { header: '진행률', key: 'label_avgComplete', width: 15 },
      //   ];
      // } else { 
      //   worksheet.columns = [ 
      //     { header: '프로젝트', key: 'project_name', width: 25, style: { align: 'center', bgColor: '#000' }  },
      //     { header: '작업자', key: 'user_name', width: 20 },
      //     { header: '검수진행', key: 'check_ing', width: 15 },
      //     { header: '검수완료', key: 'check_complete', width: 15 },
      //     { header: '진행률', key: 'check_avgComplete', width: 15 },
      //   ];
      //  file_name = 'statistics_check'
      // }
      
      // // Header 정렬
      // worksheet.columns.forEach(function(key,index){
      //   worksheet.getCell(1,index+1).alignment = { vertical: 'top', horizontal: 'center' }
        
      //   worksheet.getCell(1,index+1).fill = {
      //     type: 'pattern',
      //     pattern:'gray125',
      //     fgColor:{argb:'EEEEEEEE'},
      //     bgColor:{argb:'EEEEEEEE'}
      //   };
      // })

      // // Set Data
      // const rows = this.statistics_list;
      // worksheet.addRows(rows);   
    
      // // Data 정렬
      // this.statistics_list.forEach(function(key,index){
      //   worksheet.columns.forEach(function(key,index2){
      //     worksheet.getCell(index+2,index2+1).alignment = { vertical: 'top', horizontal: 'center' }
      //   })
      // })

      // // 흰 배경을 만들기 위해 셀 병합
      // worksheet2.mergeCells('A1:R25');

      // // 이미지 등록
      // let imageId = workbook.addImage({
      //     base64: base64Image,
      //     extension: 'png',
      // });

      // // 병합했던 셀에 이미지 추가 (엑셀 파일 열면 위치 이동가능)
      // worksheet2.addImage(imageId, 'A1:R25');        
      
      // // 가상의 파일 읽기
      // workbook.xlsx.readFile(`${file_name}.xlsx`);
      
      // // 파일 다운로드
      // workbook.xlsx.writeBuffer().then(function (data) {
      //     let blob = new Blob([data], {type: "application/vnd.ms-excel;charset=utf-8"});
      //     saveAs(blob, `${file_name}.xlsx`);
      // });
    },
    one_chart(chart_data) {
      this.$refs.chartpage.init(chart_data)
    },
    init() { 
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
.grid_m.class_label {
  grid-template-columns: 260px 140px 100px 100px 100px 100px 100px 100px;
}
.grid_m.class_check {
  grid-template-columns: 300px 200px 130px 120px 120px 130px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
.chartClass{
  /* padding-top: 30px;
  height: 1500px;
  width: 700px; */
}
</style>
