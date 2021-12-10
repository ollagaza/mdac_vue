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
        <Statistics_Left v-bind:menu_id="11"></Statistics_Left>
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

              <select class="text" v-model="worker" style="width: 140px;height: 36px;" @change="fnStatisticsList()">
                <option value="" selected=true>작업자(전체)</option>
                  <template v-for="(member) in member_list">
                    <option v-bind:value="member.seq" v-bind:class="{ colorRed: member.is_used !== 'Y' }">{{member.user_name}}({{ member.is_used_str }})</option>
                  </template>
              </select>

              <select class="text" v-model="search_type" style="width: 200px;height: 36px;" @change="fnStatisticsList()">
                <option value="NOW" selected=true>기간조회(완료)</option>
                <option value="NOWW" selected=true>기간조회(진행)</option>
                <option v-if="search_seq == '11'" value="SUM" selected=true>전체조회(반려제외)</option>
                <option v-if="search_seq == '11'" value="SUMC" selected=true>전체조회(반려포함)</option>
                <option v-if="search_seq == '22'" value="SUM" selected=true>전체조회</option>
              </select>

              <div class="datepicker_icon" style="border: 1px solid #ccc;">
                <datepicker v-model="start_date" :language="date_locale_ko" :format="dateFormatter" style="width: 120px;padding: 8px 0 0 10px;height: 34px;" :disabled="this.search_type === 'SUM' || search_type === 'SUMC'" v-bind:class="{ colorLightgray : this.search_type === 'SUM' || search_type === 'SUMC' }"></datepicker>
              </div>
              <div style="line-height: 34px;">&nbsp;~&nbsp;</div>
              <div class="datepicker_icon" style="border: 1px solid #ccc;">
                <datepicker v-model="end_date" :language="date_locale_ko" :format="dateFormatter" style="width: 120px;padding: 8px 0 0 10px;height: 34px;" :disabled="this.search_type === 'SUM' || search_type === 'SUMC'" v-bind:class="{ colorLightgray : this.search_type === 'SUM' || search_type === 'SUMC' }"></datepicker>
              </div>

              <div class="btn deepgreen" style="margin-left:5px;width:80px; height: 36px;" v-on:click="fnStatisticsList()">조회</div>
            </div>
          </div>

          <div class=" ">
            <div style="height: fit-content;display: flex; flex-direction: row;">
              <div class="btn" v-bind:class="{ deepgreen: search_seq === '11' }" style="margin-left:5px;width:80px; height: 36px;" v-on:click="statisticsGo('11')">라벨러</div>
              <div class="btn" v-bind:class="{ deepgreen: search_seq === '22' }" style="margin-left:5px;width:80px; height: 36px;" v-on:click="statisticsGo('22')">검수자</div>
              <div style="flex: 2"></div>
              <div class="btn" style="margin-left:5px;width:120px; height: 36px;" v-on:click="viewTooltips()">{{tooltips_title}}</div>
              <div class="btn blue" style="margin-left:5px;width:120px; height: 36px;" v-on:click="export_file()">Export to excel</div>
            </div>
          </div>
        
          <div v-model="datalist" style="padding: 10px 0 0 0 ;">
            <div v-if="search_seq == '11' && (search_type === 'NOW' || search_type === 'NOWW')" class="grid_m header class_label">
              <div>프로젝트</div>
              <div>작업자</div>
              <div>전체할당량</div>
              <div>기간할당량</div>
              <div>{{ worker_title }}진행</div>
              <div>{{ worker_title }}완료</div>
            </div>

            <div v-if="search_seq == '11' && (search_type === 'SUM' || search_type === 'SUMC')" class="grid_m header class_label_all">
              <div>프로젝트</div>
              <div>작업자</div>
              <div>전체할당량</div>
              <div>{{ worker_title }}진행</div>
              <div>{{ worker_title }}완료</div>
              <div>{{ worker_title }}완료율</div>
              <div v-if="search_seq === '11'">반려</div>
              <div v-if="search_seq === '11'">반려율</div>
            </div>

            <div v-if="search_seq == '22' && (search_type === 'NOW' || search_type === 'NOWW')" class="grid_m header class_check">
              <div>프로젝트</div>
              <div>작업자</div>
              <div>전체할당량</div>
              <div>기간할당량</div>
              <div>{{ worker_title }}진행</div>
              <div>{{ worker_title }}완료</div>
              <div>반려</div>
            </div>

            <div v-if="search_seq == '22' && (search_type === 'SUM' || search_type === 'SUMC')" class="grid_m header class_check">
              <div>프로젝트</div>
              <div>작업자</div>
              <div>전체할당량</div>
              <div>{{ worker_title }}진행</div>
              <div>{{ worker_title }}완료</div>
              <div>{{ worker_title }}완료율</div>
              <div>반려</div>
            </div>

            <template v-if="statistics_list.length === 0">
              <div class="grid_m class nodata">
                <div style='align-items: center;'>등록된 데이터가 없습니다</div>
              </div>
            </template>

            <template v-if="statistics_list.length > 0">
              <template v-for="(pStatistics, seq) in statistics_list">
                <div v-if="search_seq === '11' && (search_type === 'NOW' || search_type === 'NOWW')" class="grid_m class_label body" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.user_name }}</div>
                  <div>{{ pStatistics.label_total_all }}</div>
                  <div>{{ pStatistics.label_total }}</div>
                  <div>{{ pStatistics.label_ing }}</div>
                  <div>{{ pStatistics.label_complete }}</div>
                </div>
                <div v-if="search_seq === '11' && (search_type === 'SUM' || search_type === 'SUMC')" class="grid_m class_label_all body" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.user_name }}</div>
                  <div>{{ pStatistics.label_total_all }}</div>
                  <div>{{ pStatistics.label_ing }}</div>
                  <div>{{ pStatistics.label_complete }}</div>
                  <div>{{ pStatistics.label_avgComplete }}</div>
                  <div>{{ pStatistics.label_reject }}</div>
                  <div>{{ pStatistics.label_avgReject }}</div>
                </div>
                <div v-if="search_seq === '22' && (search_type === 'NOW' || search_type === 'NOWW')" class="grid_m class_check body" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.user_name }}</div>
                  <div>{{ pStatistics.check_total_all }}</div>
                  <div>{{ pStatistics.check_total }}</div>
                  <div>{{ pStatistics.check_ing }}</div>
                  <div>{{ pStatistics.check_complete }}</div>
                  <div>{{ pStatistics.check_reject }}</div>
                </div>
                <div v-if="search_seq === '22' && (search_type === 'SUM' || search_type === 'SUMC')" class="grid_m class_check body" v-on:click="one_chart(pStatistics)">
                  <div>{{ pStatistics.project_name }}</div>
                  <div>{{ pStatistics.user_name }}</div>
                  <div>{{ pStatistics.check_total_all }}</div>
                  <div>{{ pStatistics.check_ing }}</div>
                  <div>{{ pStatistics.check_complete }}</div>
                  <div>{{ pStatistics.check_avgComplete }}</div>
                  <div>{{ pStatistics.check_reject }}</div>
                </div>
              </template>
            </template>
            
            <div v-if="search_seq === '11' && (search_type === 'NOW' || search_type === 'NOWW') && statistics_list.length > 0"  class="grid_m header class_label">
              <div>합계1</div>
              <div>{{ sum_worker_total }} 명</div>
              <div>{{ sum_label_total_all }}</div>
              <div>{{ sum_label_total }}</div>
              <div>{{ sum_label_ing }}</div>
              <div>{{ sum_label_complete }}</div>
            </div>
            
            <div v-if="search_seq === '11' && (search_type === 'SUM' || search_type === 'SUMC') && statistics_list.length > 0"  class="grid_m header class_label_all">
              <div>합계2</div>
              <div>{{ sum_worker_total }} 명</div>
              <div>{{ sum_label_total_all }}</div>
              <div>{{ sum_label_ing }}</div>
              <div>{{ sum_label_complete }}</div>
              <div></div>
              <div>{{ sum_label_reject }}</div>
              <div></div>
            </div>
            
            <div v-if="search_seq === '22' && (search_type === 'NOW' || search_type === 'NOWW') && statistics_list.length > 0"  class="grid_m header class_check">
              <div>합계3</div>
              <div>{{ sum_worker_total }} 명</div>
              <div>{{ sum_check_total_all }}</div>
              <div>{{ sum_check_total }}</div>
              <div>{{ sum_check_ing }}</div>
              <div>{{ sum_check_complete }}</div>
              <div>{{ sum_check_reject }}</div>
            </div>

            <div v-if="search_seq === '22' && (search_type === 'SUM' || search_type === 'SUMC') && statistics_list.length > 0"  class="grid_m header class_check">
              <div>합계4</div>
              <div>{{ sum_worker_total }} 명</div>
              <div>{{ sum_check_total_all }}</div>
              <div>{{ sum_check_ing }}</div>
              <div>{{ sum_check_complete }}</div>
              <div></div>
              <div>{{ sum_check_reject }}</div>
            </div>

            <template>  
              <div style="height:20px;"></div>            
              <ChartPage 
                ref="chartpage" 
                chartData="chartData" 
                v-if="!chartLoading" 
                v-bind:tooltips_flag="tooltips_flag"
                v-bind:project_list="project_list" 
                v-bind:statistics_list="statistics_list" 
                v-bind:chart_title="chart_title" 
                v-bind:search_seq="search_seq"
                v-bind:project_seq="project_seq"
                v-bind:search_type="search_type"
                v-bind:start_date="start_date"
                v-bind:end_date="end_date"
                v-bind:worker="worker"
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
import apiuser from '../../api/ApiUser';
import BaseMixin from '../Mixins/BaseMixin';
import Statistics_Left from './Statistics_Left';
import { ko } from 'vuejs-datepicker/dist/locale';
import moment from 'moment/moment';
import Datepicker from 'vuejs-datepicker';
import ChartPage from './Chart.vue';

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
      member_list: [],          // 멤버 리스트
      statistics_list: '',      // 통계 데이터 리스트
      chart_title: '',          // 챠트 제목
      worker_title: '라벨링',    // 통계 제목
      tooltips_title: '차트데이터보이기', // 버튼:차트데이터보이기
      tooltips_flag: 'N',               // 버튼:차트데이터보이기
      search_seq: this.$route.params.search_seq ? this.$route.params.search_seq: '11',   // 조회종류(1:라벨러/2:검수자/3:프로젝트)
      project_seq: '',          // 프로젝트
      search_type: 'NOW',       // 조회기준
      worker: this.$route.params.worker ? this.$route.params.worker: '',               // 작업자
      date_locale_ko: ko,
      start_date: moment().subtract(7, 'd').format('YYYY-MM-DD'),  // 시작일
      end_date: moment().format('YYYY-MM-DD'),    // 종료일
      chartLoading: false,      // 데이터를 불러오기 전까지는 progress circle을 사용
      chartData: [],
      sum_label_total_all: 0,
      sum_label_total: 0,
      sum_label_ing: 0,
      sum_label_complete: 0,
      sum_label_reject: 0,
      sum_check_total_all: 0,
      sum_check_total: 0,
      sum_check_ing: 0,
      sum_check_complete: 0,
      sum_check_reject: 0,
    };
  },
  watch: {
    '$route': function(){
      this.search_seq = this.$route.params.search_seq ? this.$route.params.search_seq: '11';
      this.tooltips_title = '차트데이터보이기'
      this.tooltips_flag = 'N'
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

    let data = {
        status:''
    }
    // 프로젝트정보 셋팅
    apiproject.getProjectInfo(data)
      .then((result) => {
        this.project_list = result.project_info;
      });
    
      // 작업자정보 셋팅
      data = {
        list_count:'',
        // is_used: 'Y' // 사용중인 멤버만
      };
      apiuser.getUserInfos(data)
        .then((result) => {
          if (result.member_info.length > 0) {
              //this.paging = 10;
              //this.no = 1;
            for (const key in result.member_info) {
              if (result.member_info[key].is_used == 'Y') {
                result.member_info[key].is_used_str = '사용중';
              } else {
                result.member_info[key].is_used_str = "정지중";
              }
            }
            // this.page_navigation = { cur_page: 4, list_count: 9, total_count: 100, first_page: 11, page_count: 10 };
          }          
          this.member_list = result.member_info;
        });

  },
  mounted() {
    this.search_seq = this.$route.params.search_seq ? this.$route.params.search_seq: 11;
    this.fnStatisticsList();  

  },
  methods: {
    // 통계 조회
    fnStatisticsList() {
      this.search_seq = String(this.$route.params.search_seq) ? String(this.$route.params.search_seq): '11';
      if(this.search_seq === '22') {
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
        end_date: moment(this.end_date).format('YYYY-MM-DD'),
        worker: this.worker,
      };
      apistatistics.getStatistics(data) // 클래스 API 호출
        .then((result) => {
          // 합계 변수 Start
          this.sum_worker_total = 0
          this.sum_label_total_all = 0
          this.sum_label_total = 0
          this.sum_label_ing = 0
          this.sum_label_complete = 0
          this.sum_label_reject = 0
          this.sum_check_total_all = 0
          this.sum_check_total = 0
          this.sum_check_ing = 0
          this.sum_check_complete = 0
          this.sum_check_reject = 0
          // 합계 변수 End

          // 합계 계산
          if (result.statistics_info.length > 0) {
            for (const key in result.statistics_info) {

              this.sum_label_total_all = this.sum_label_total_all + result.statistics_info[key].label_total_all   // 전체할당량
              this.sum_label_total = this.sum_label_total + result.statistics_info[key].label_total               // 조회기간할당량
              this.sum_label_ing = this.sum_label_ing + result.statistics_info[key].label_ing                     // 라벨링진행중
              this.sum_label_complete = this.sum_label_complete + result.statistics_info[key].label_complete      // 라벨링완료
              this.sum_label_reject = this.sum_label_reject + result.statistics_info[key].label_reject            // 반려
              this.sum_check_total_all = this.sum_check_total_all + result.statistics_info[key].check_total_all   // 전체검수량
              this.sum_check_total = this.sum_check_total + result.statistics_info[key].check_total               // 조회기간검수량
              this.sum_check_ing = this.sum_check_ing + result.statistics_info[key].check_ing                     // 검수진행중
              this.sum_check_complete = this.sum_check_complete + result.statistics_info[key].check_complete      // 검수완료
              this.sum_check_reject = this.sum_check_reject + result.statistics_info[key].check_reject            // 검수반려
              result.statistics_info[key].label_avgComplete = result.statistics_info[key].label_avgComplete + '%' // 라벨링완료율
              result.statistics_info[key].label_avgReject = result.statistics_info[key].label_avgReject + '%'     // 반려율
              result.statistics_info[key].check_avgComplete = result.statistics_info[key].check_avgComplete + '%' // 검수율
            }
            // this.sum_label_ing = this.sum_total - this.sum_label_complete - this.sum_check_ing - this.sum_check_complete
          }
          this.sum_worker_total = result.statistics_info.length
          this.statistics_list = result.statistics_info
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

    statisticsGo(search_seq) {
      // this.$router.push({ name: 'statisticsworker' });
      this.search_type = "NOW"
      this.$router.push({ name: 'statisticsworker2', params: { search_seq: search_seq }});
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
    // 1개 데이터 선택시 chart 호출
    one_chart(chart_data) {
      this.$refs.chartpage.init(chart_data)
    },
    // 전체 데이터 chart 호출
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
  grid-template-columns: 320px 130px 130px 140px 140px 140px;
}
.grid_m.class_label_all {
  grid-template-columns: 260px 140px 100px 100px 100px 100px 100px 100px;
}
.grid_m.class_check {
  grid-template-columns: 250px 150px 130px 120px 120px 130px 100px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
.colorRed {
  color: red;
}
.colorLightgray {
  background-color: lightgray;
}
</style>
