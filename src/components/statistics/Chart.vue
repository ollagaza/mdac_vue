<script>
   //Importing Line class from the vue-chartjs wrapper
  import {Bar} from 'vue-chartjs'
  import apistatistics from '../../api/ApiStatistics';
  import moment from "moment/moment";
  import BaseMixin from "../Mixins/BaseMixin";
  import ExcelJS from 'exceljs';
  import * as FileSaver from 'file-saver';
  import util from '../../utils/util';
 
  Chart.pluginService.register({
    beforeRender: function(chart) {
      if (chart.config.options.showAllTooltips) {
      chart.pluginTooltips = [];
      chart.config.data.datasets.forEach(function(dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function(sector, j) {
        chart.pluginTooltips.push(new Chart.Tooltip({
          _chart: chart.chart,
          _chartInstance: chart,
          _data: chart.data,
          _options: chart.options.tooltips,
          _active: [sector]
        }, chart));
        });
      }); // turn off normal tooltips 
      chart.options.tooltips.enabled = false;
      }
    },
    afterDraw: function(chart, easing) {
      if (chart.config.options.showAllTooltips) { // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once 
      if (!chart.allTooltipsOnce) {
        if (easing !== 1) return;
        chart.allTooltipsOnce = true;
      }
      chart.options.tooltips.enabled = true;
      Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
        tooltip.initialize();
        tooltip.update(); // we don't actually need this since we are not animating tooltips 
        tooltip.pivot();
        tooltip.transition(easing).draw();
      });
      chart.options.tooltips.enabled = false;
      }
    }
  }); 
 
 //Exporting this so it can be used in other components
  export default { 
    name: 'BarChart',
    extends: Bar, // 세로: HorizontalBar
    props: ['chartData','statistics_list','project_list', 'chart_title', 'tooltips_flag', 'search_seq', 'search_type', 'project_seq','start_date','end_date','worker','status'],
    mixins: [BaseMixin],
    
    data () {
      return {   
        statistcs_info: [],
        labels: [],
        label_total_all_count: [],
        label_total_count: [],
        complete_count: [],
        ing_count: [],
        reject_count: [],
        colorSets: [ // 여러 그래프 사용을 위해서 색상표 예약 
            {fore: '#FF6384', back: '#FFB1C1'},     
            {fore: '#FF9F40', back: '#FFCF9F'},     
            {fore: '#FFD66F', back: '#FFE6AA'},     
            {fore: '#4BBFBF', back: '#A3E0E0'},     
            {fore: '#EF9A9A', back: '#B71C1C'},     
            {fore: '#F48FB1', back: '#880E4F'}, 
            {fore: '#CE93D8', back: '#4A148C'}, 
            {fore: '#B39DDB', back: '#311B92'}, 
            {fore: '#9FA8DA', back: '#1A237E'}, 
            {fore: '#64B5F6', back: '#0D47A1'}, 
            {fore: '#4FC3F7', back: '#01579B'}, 
            {fore: '#0097A7', back: '#006064'}, 
            {fore: '#00897B', back: '#004D40'}, 
            {fore: '#81C784', back: '#1B5E20'}, 
        ],
        datacollection: {
          //Data to be represented on x-axis
          labels: ['지인', '후두내시경'], 
          datasets: [
            {
              label: '총할당량',
              backgroundColor: '#FFB1C1',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#FF6384',
              //Data to be represented on y-axis
              data: [10, 20],
              barPercentage: 0.7
            },
            {
              label: '진행',
              backgroundColor: '#FFCF9F',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#FF9F40',
              //Data to be represented on y-axis
              data: [30, 40],
              barPercentage: 0.5
            },
            {
              label: '완료',
              backgroundColor: '#FFE6AA',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#FFD66F',
              //Data to be represented on y-axis
              data: [{x: '1', y: '2', r: '3'}, {x: '1', y: '2', r: '3'}, {x: '20', y: '30', r: '32'}],
              parsing: {
                xAxisKey: 'seq',
                yAxisKey: 'complete_cnt'
              },
              barPercentage: 0.5
              
            },
            {
              label: '반려',
              backgroundColor: '#A3E0E0',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#4BBFBF',
              //Data to be represented on y-axis
              data: [70,80],
              barPercentage: 0.5
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          layout: {
            padding: {
              left: 5,
              right: 5,
              bottom: 5
            }
          },
          showAllTooltips: true,
          tooltips: {
            enabled: true,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            },
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 5,    // y축 간격 
                // suggestedMin: 0, // y축 최소 값 
                // suggestedMax: 20,// y축 최대값
                // min: 0,
                // max: 100,
                // stepSize: 20,
              },
              gridLines: {
                display: true,
                // borderDash: [3, 3], 
                // borderDashOffset: 0.2,
                // color: "black"

              }
            }],
            xAxes: [ {
              gridLines: {
                display: true
              },
              ticks: { 
                // fontColor : 'rgba(12, 13, 13, 1)', 
                fontSize : 10, // 가로축 글자 사이즈
              },
            }],
            
          },
          title: {
                display: true,
                text: '통계',
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false,

          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
            
          // 툴팁 대신 데이터 보이기 시작
          // hover: {
          //   animationDuration: 0
          // },
          // responsiveAnimationDuration: 0
          // ,
          // animation: {
          //   duration: 1,
          //   onComplete: function () {
          //     var chartInstance = this.chart,
          //     ctx = chartInstance.ctx;
          //     ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          //     ctx.fillStyle = 'black';
          //     ctx.textAlign = 'center';
          //     ctx.textBaseline = 'hanging';

          //     this.data.datasets.forEach(function (dataset, i) {
          //       var meta = chartInstance.controller.getDatasetMeta(i);
          //       meta.data.forEach(function (bar, index) {
          //         var data = `${dataset.label}: ${dataset.data[index]}`;	// ${dataset.label} : 						
          //         ctx.fillText(data, bar._model.x, bar._model.y + 10);
          //       });
          //     });
          //   }
          // }
          // 툴팁 대신 데이터 보이기 종료
        },
        
      }
      
    },
    computed: {
      c_statistics_list() {
        if (this.statistics_list) {
          return this.statistics_list;
        } else {
          return "[]";
        }
      },               
    },
    watch: {
    },  
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      // this.renderChart(this.datacollection, this.options)
      // this.init()
    },
    methods: {
        init(statistics_info) {
            this.$log.debug(`statistics_start`)
            this.$log.debug(this.c_statistics_list)
            this.$log.debug(`statistics_end`)
            this.labels = []
            this.color_back = []
            this.color_fore = []
            this.label_total_all_count = []
            this.label_total_count = []
            this.label_complete_count = []
            this.label_ing_count = []
            this.label_reject_count = []
            this.check_total_all_count = []
            this.check_total_count = []
            this.check_ing_count = []
            this.check_complete_count = []
            this.check_reject_count = []
            this.check1_total_all_count = []
            this.check1_total_count = []
            this.check1_ing_count = []
            this.check1_complete_count = []
            this.check2_total_all_count = []
            this.check2_total_count = []
            this.check2_ing_count = []
            this.check2_complete_count = []
            this.check3_total_all_count = []
            this.check3_total_count = []
            this.check3_ing_count = []
            this.check3_complete_count = []
            // console.log(`project_seq===${this.project_seq}`)
            //let data = this.chartData.chartData 
            let datasets = [] 

            this.datacollection = { 
              labels: this.labels, 
              datasets: datasets,
            }
            this.options.title = {
                display: true,
                text: this.chart_title,
                fontSize: 14,
            }
            this.options.responsive = true,
            this.options.legend = { // Label 타이틀 안내
              display: true,
              fullSize: true,
              labels: {
                // This more specific font property overrides the global property
                fontSize: 10
                }
              // onClick: function(event, legendItem, legend) {
              //   console.log(legend)
              // }
            }
            // this.options.scales.yAxes[0].ticks.fontSize = 40 ; // y축 Label 사이즈
            this.options.scaleShowLabelBackdrop = true,
            this.options.showAllTooltips = false
            this.options.tooltips = {
              titleFontSize: 10,
              bodyFontSize: 8,

              xAlign: 'center',
              yAlign: 'bottom',
              enabled: true,
              displayColors: false,
              callbacks: {
                title: function(tooltipItem, data) {
                  return;
                },
                label: function(tooltipItem, data) {
                  const indice = tooltipItem.index;   
                  
                  // return data['labels'][tooltipItem['index']];
                  // return data.datasets[tooltipItem.datasetIndex].data[indice];
                  // return data.datasets[tooltipItem.datasetIndex].label;
                  // return data.datasets[tooltipItem.datasetIndex].data[indice];
                  return `${data.datasets[tooltipItem.datasetIndex].label}: ${data.datasets[tooltipItem.datasetIndex].data[indice]}`;
                }
              }
            }             

            if(this.tooltips_flag === 'Y') {
              this.options.showAllTooltips = true
            } else {
              this.options.showAllTooltips = false
            }           
                          
            if(statistics_info)
            {
              if(this.search_seq === '3' || this.search_seq === '4') {
                this.labels.push(statistics_info.project_name)
              } else {
                this.labels.push(`${statistics_info.project_name} / ${statistics_info.user_name}`)
              }
              this.label_total_all_count.push(this.getZeroToUndefined(statistics_info.label_total_all))
              this.label_total_count.push(this.getZeroToUndefined(statistics_info.label_total))
              this.label_complete_count.push(this.getZeroToUndefined(statistics_info.label_complete))
              this.label_ing_count.push(this.getZeroToUndefined(statistics_info.label_ing))
              // this.label_ing_count.push(statistics_info.total - statistics_info.label_complete - statistics_info.check_ing - statistics_info.check_complete)
              this.label_reject_count.push(this.getZeroToUndefined(statistics_info.label_reject))

              if(this.search_seq === '4') {
                this.check1_total_all_count.push(this.getZeroToUndefined(statistics_info.check1_total_all))
                this.check1_total_count.push(this.getZeroToUndefined(statistics_info.check1_total))
                this.check1_ing_count.push(this.getZeroToUndefined(statistics_info.check1_ing))
                this.check1_complete_count.push(this.getZeroToUndefined(statistics_info.check1_complete))
                this.check2_total_all_count.push(this.getZeroToUndefined(statistics_info.check2_total_all))
                this.check2_total_count.push(this.getZeroToUndefined(statistics_info.check2_total))
                this.check2_ing_count.push(this.getZeroToUndefined(statistics_info.check2_ing))
                this.check2_complete_count.push(this.getZeroToUndefined(statistics_info.check2_complete))
                this.check3_total_all_count.push(this.getZeroToUndefined(statistics_info.check3_total_all))
                this.check3_total_count.push(this.getZeroToUndefined(statistics_info.check3_total))
                this.check3_ing_count.push(this.getZeroToUndefined(statistics_info.check3_ing))
                this.check3_complete_count.push(this.getZeroToUndefined(statistics_info.check3_complete))
              }else {
                this.check_ing_count.push(this.getZeroToUndefined(statistics_info.check_ing))
                this.check_complete_count.push(this.getZeroToUndefined(statistics_info.check_complete))
                this.check_total_count.push(this.getZeroToUndefined(statistics_info.check_total))
              }
            } else {
              const data = {
                search_seq: this.search_seq,
                project_seq: this.project_seq,
                search_type: this.search_type,
                start_date: this.start_date ? moment(this.start_date).format('YYYY-MM-DD') : '',
                end_date: this.end_date ? moment(this.end_date).format('YYYY-MM-DD') : '',
                worker: this.worker,
                status: this.status,
              };                       
              apistatistics.getStatistics(data)
              .then((result) => {
                // this.statistics_list = result.statistics_info
                for (const key in result.statistics_info) {
                    if(this.search_seq === '3' || this.search_seq === '4') {
                      this.labels.push(result.statistics_info[key].project_name)
                    } else {
                      this.labels.push(`${result.statistics_info[key].project_name} / ${result.statistics_info[key].user_name}`)
                    }
                    this.label_total_all_count.push(this.getZeroToUndefined(result.statistics_info[key].label_total_all))
                    this.label_total_count.push(this.getZeroToUndefined(result.statistics_info[key].label_total))
                    this.label_complete_count.push(this.getZeroToUndefined(result.statistics_info[key].label_complete))
                    this.label_ing_count.push(this.getZeroToUndefined(result.statistics_info[key].label_ing))
                    // this.label_ing_count.push(result.statistics_info[key].total - result.statistics_info[key].label_complete - result.statistics_info[key].check_ing - result.statistics_info[key].check_complete)
                    this.label_reject_count.push(this.getZeroToUndefined(result.statistics_info[key].label_reject))
                    if(this.search_seq === '4') {
                      this.check1_total_all_count.push(this.getZeroToUndefined(result.statistics_info[key].check1_total_all))
                      this.check1_total_count.push(this.getZeroToUndefined(result.statistics_info[key].check1_total))
                      this.check1_ing_count.push(this.getZeroToUndefined(result.statistics_info[key].check1_ing))
                      this.check1_complete_count.push(this.getZeroToUndefined(result.statistics_info[key].check1_complete))
                      this.check2_total_all_count.push(this.getZeroToUndefined(result.statistics_info[key].check2_total_all))
                      this.check2_total_count.push(this.getZeroToUndefined(result.statistics_info[key].check2_total))
                      this.check2_ing_count.push(this.getZeroToUndefined(result.statistics_info[key].check2_ing))
                      this.check2_complete_count.push(this.getZeroToUndefined(result.statistics_info[key].check2_complete))
                      this.check3_total_all_count.push(this.getZeroToUndefined(result.statistics_info[key].check3_total_all))
                      this.check3_total_count.push(this.getZeroToUndefined(result.statistics_info[key].check3_total))
                      this.check3_ing_count.push(this.getZeroToUndefined(result.statistics_info[key].check3_ing))
                      this.check3_complete_count.push(this.getZeroToUndefined(result.statistics_info[key].check3_complete))
                    }else {
                      this.check_total_count.push(this.getZeroToUndefined(result.statistics_info[key].check_total))
                      this.check_ing_count.push(this.getZeroToUndefined(result.statistics_info[key].check_ing))
                      this.check_complete_count.push(this.getZeroToUndefined(result.statistics_info[key].check_complete))
                      this.check_total_all_count.push(this.getZeroToUndefined(result.statistics_info[key].check_total_all))
                      this.check_reject_count.push(this.getZeroToUndefined(result.statistics_info[key].check_reject))
                    }
                    
                    // datasets.push({ 
                    //     label: result[0][key].project_name, 
                    //     borderWidth: 2, 
                    //     borderColor: colors.back, 
                    //     backgroundColor: colors.back, 
                    //     pointBorderColor: colors.fore, 
                    //     pointBackgroundColor: colors.fore, 
                    //     fill: false, 
                    //     data: [result[0][key].total,result[0][key].total,result[0][key].total ]
                    // }) ;
                } 
                this.render() 
              })  
          
            }

            for(let i = 0 ; i < 14 ; i++) {
      
              let colors = this.colorSets[i] 
              this.color_back.push(colors.back)
              this.color_fore.push(colors.fore)
            }
            if(this.search_seq === '1' && (this.search_type === 'NOW' || this.search_type === 'NOWW')) {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_all_count,
                barPercentage: 0.8
              },
              {
                label: '기간할당량',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.label_total_count,
                barPercentage: 0.8
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8
                
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8
                
              })          
            } else if(this.search_seq === '1' && (this.search_type === 'SUM' || this.search_type === 'SUMC')) {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_all_count,
                barPercentage: 0.8
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8
                
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8
                
              },
              {
                label: '반려',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_reject_count,
                barPercentage: 0.8
                
              })
            } else if(this.search_seq === '2' && (this.search_type === 'NOW' || this.search_type === 'NOWW')) {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.check_total_all_count,
                barPercentage: 0.8
              },
              {
                label: '기간할당량',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.check_total_count,
                barPercentage: 0.8
              },
              {
                label: '검수진행',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.check_ing_count,
                barPercentage: 0.8
              },
              {
                label: '검수완료',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.check_complete_count,
                barPercentage: 0.8
              },
              {
                label: '반려',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.check_reject_count,
                barPercentage: 0.8
              })
            } else if(this.search_seq === '2' && (this.search_type === 'SUM' || this.search_type === 'SUMC')) {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.check_total_all_count,
                barPercentage: 0.8
              },
              {
                label: '검수진행',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.check_ing_count,
                barPercentage: 0.8
              },
              {
                label: '검수완료',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.check_complete_count,
                barPercentage: 0.8
              },
              {
                label: '반려',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.check_reject_count,
                barPercentage: 0.8
              })
            } else if(this.search_seq === '3' && this.search_type === 'NOW') {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_all_count,
                barPercentage: 0.8
              },
              {
                label: '기간할당량',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.label_total_count,
                barPercentage: 0.8
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8
                
              },
              {
                label: '반려',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.label_reject_count,
                barPercentage: 0.8
              },
              {
                label: '전체검수량',
                backgroundColor: this.color_back[5],
                pointBackgroundColor: this.color_back[5],
                borderWidth: 1,
                pointBorderColor: this.color_fore[5],
                //Data to be represented on y-axis
                data: this.check_total_count,
                barPercentage: 0.8
              },
              {
                label: '검수진행',
                backgroundColor: this.color_back[6],
                pointBackgroundColor: this.color_back[6],
                borderWidth: 1,
                pointBorderColor: this.color_fore[6],
                //Data to be represented on y-axis
                data: this.check_ing_count,
                barPercentage: 0.8
              },
              {
                label: '검수완료',
                backgroundColor: this.color_back[7],
                pointBackgroundColor: this.color_back[7],
                borderWidth: 1,
                pointBorderColor: this.color_fore[7],
                //Data to be represented on y-axis
                data: this.check_complete_count,
                barPercentage: 0.8
              })
            } else if(this.search_seq === '3' && this.search_type !== 'NOW') {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_all_count,
                barPercentage: 0.8
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8
                
              },
              {
                label: '반려',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_reject_count,
                barPercentage: 0.8
              },
              {
                label: '전체검수량',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.check_total_count,
                barPercentage: 0.8
              },
              {
                label: '검수진행',
                backgroundColor: this.color_back[5],
                pointBackgroundColor: this.color_back[5],
                borderWidth: 1,
                pointBorderColor: this.color_fore[5],
                //Data to be represented on y-axis
                data: this.check_ing_count,
                barPercentage: 0.8
              },
              {
                label: '검수완료',
                backgroundColor: this.color_back[6],
                pointBackgroundColor: this.color_back[6],
                borderWidth: 1,
                pointBorderColor: this.color_fore[6],
                //Data to be represented on y-axis
                data: this.check_complete_count,
                barPercentage: 0.8
              })
            } else if(this.search_seq === '4' && this.search_type === 'NOW') {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_all_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '기간할당량',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.label_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
                
              },
              {
                label: '반려',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.label_reject_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1전체',
                backgroundColor: this.color_back[5],
                pointBackgroundColor: this.color_back[5],
                borderWidth: 1,
                pointBorderColor: this.color_fore[5],
                //Data to be represented on y-axis
                data: this.check1_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1진행',
                backgroundColor: this.color_back[6],
                pointBackgroundColor: this.color_back[6],
                borderWidth: 1,
                pointBorderColor: this.color_fore[6],
                //Data to be represented on y-axis
                data: this.check1_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1완료',
                backgroundColor: this.color_back[7],
                pointBackgroundColor: this.color_back[7],
                borderWidth: 1,
                pointBorderColor: this.color_fore[7],
                //Data to be represented on y-axis
                data: this.check1_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2전체',
                backgroundColor: this.color_back[8],
                pointBackgroundColor: this.color_back[8],
                borderWidth: 1,
                pointBorderColor: this.color_fore[8],
                //Data to be represented on y-axis
                data: this.check2_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2진행',
                backgroundColor: this.color_back[9],
                pointBackgroundColor: this.color_back[9],
                borderWidth: 1,
                pointBorderColor: this.color_fore[9],
                //Data to be represented on y-axis
                data: this.check2_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2완료',
                backgroundColor: this.color_back[10],
                pointBackgroundColor: this.color_back[10],
                borderWidth: 1,
                pointBorderColor: this.color_fore[10],
                //Data to be represented on y-axis
                data: this.check2_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3전체',
                backgroundColor: this.color_back[11],
                pointBackgroundColor: this.color_back[11],
                borderWidth: 1,
                pointBorderColor: this.color_fore[11],
                //Data to be represented on y-axis
                data: this.check3_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3진행',
                backgroundColor: this.color_back[12],
                pointBackgroundColor: this.color_back[12],
                borderWidth: 1,
                pointBorderColor: this.color_fore[12],
                //Data to be represented on y-axis
                data: this.check3_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3완료',
                backgroundColor: this.color_back[13],
                pointBackgroundColor: this.color_back[13],
                borderWidth: 1,
                pointBorderColor: this.color_fore[13],
                //Data to be represented on y-axis
                data: this.check3_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              })
            } else if(this.search_seq === '4' && this.search_type !== 'NOW') {
              datasets.push( 
              {
                label: '전체할당량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_all_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
                
              },
              {
                label: '반려',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.label_reject_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1전체',
                backgroundColor: this.color_back[5],
                pointBackgroundColor: this.color_back[5],
                borderWidth: 1,
                pointBorderColor: this.color_fore[5],
                //Data to be represented on y-axis
                data: this.check1_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1진행',
                backgroundColor: this.color_back[6],
                pointBackgroundColor: this.color_back[6],
                borderWidth: 1,
                pointBorderColor: this.color_fore[6],
                //Data to be represented on y-axis
                data: this.check1_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1완료',
                backgroundColor: this.color_back[7],
                pointBackgroundColor: this.color_back[7],
                borderWidth: 1,
                pointBorderColor: this.color_fore[7],
                //Data to be represented on y-axis
                data: this.check1_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2전체',
                backgroundColor: this.color_back[8],
                pointBackgroundColor: this.color_back[8],
                borderWidth: 1,
                pointBorderColor: this.color_fore[8],
                //Data to be represented on y-axis
                data: this.check2_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2진행',
                backgroundColor: this.color_back[9],
                pointBackgroundColor: this.color_back[9],
                borderWidth: 1,
                pointBorderColor: this.color_fore[9],
                //Data to be represented on y-axis
                data: this.check2_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2완료',
                backgroundColor: this.color_back[10],
                pointBackgroundColor: this.color_back[10],
                borderWidth: 1,
                pointBorderColor: this.color_fore[10],
                //Data to be represented on y-axis
                data: this.check2_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3전체',
                backgroundColor: this.color_back[11],
                pointBackgroundColor: this.color_back[11],
                borderWidth: 1,
                pointBorderColor: this.color_fore[11],
                //Data to be represented on y-axis
                data: this.check3_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3진행',
                backgroundColor: this.color_back[12],
                pointBackgroundColor: this.color_back[12],
                borderWidth: 1,
                pointBorderColor: this.color_fore[12],
                //Data to be represented on y-axis
                data: this.check3_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3완료',
                backgroundColor: this.color_back[13],
                pointBackgroundColor: this.color_back[13],
                borderWidth: 1,
                pointBorderColor: this.color_fore[13],
                //Data to be represented on y-axis
                data: this.check3_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              })
            } else {
              datasets.push( 
              {
                label: '총작업량',
                backgroundColor: this.color_back[0],
                pointBackgroundColor: this.color_back[0],
                borderWidth: 1,
                pointBorderColor: this.color_fore[0],
                //Data to be represented on y-axis
                data: this.label_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '라벨링진행',
                backgroundColor: this.color_back[1],
                pointBackgroundColor: this.color_back[1],
                borderWidth: 1,
                pointBorderColor: this.color_fore[1],
                //Data to be represented on y-axis
                data: this.label_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '라벨링완료',
                backgroundColor: this.color_back[2],
                pointBackgroundColor: this.color_back[2],
                borderWidth: 1,
                pointBorderColor: this.color_fore[2],
                //Data to be represented on y-axis
                data: this.label_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
                
              },
              {
                label: '반려',
                backgroundColor: this.color_back[3],
                pointBackgroundColor: this.color_back[3],
                borderWidth: 1,
                pointBorderColor: this.color_fore[3],
                //Data to be represented on y-axis
                data: this.label_reject_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1전체',
                backgroundColor: this.color_back[4],
                pointBackgroundColor: this.color_back[4],
                borderWidth: 1,
                pointBorderColor: this.color_fore[4],
                //Data to be represented on y-axis
                data: this.check1_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1진행',
                backgroundColor: this.color_back[5],
                pointBackgroundColor: this.color_back[5],
                borderWidth: 1,
                pointBorderColor: this.color_fore[5],
                //Data to be represented on y-axis
                data: this.check1_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수1완료',
                backgroundColor: this.color_back[6],
                pointBackgroundColor: this.color_back[6],
                borderWidth: 1,
                pointBorderColor: this.color_fore[6],
                //Data to be represented on y-axis
                data: this.check1_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2전체',
                backgroundColor: this.color_back[7],
                pointBackgroundColor: this.color_back[7],
                borderWidth: 1,
                pointBorderColor: this.color_fore[7],
                //Data to be represented on y-axis
                data: this.check2_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2진행',
                backgroundColor: this.color_back[8],
                pointBackgroundColor: this.color_back[8],
                borderWidth: 1,
                pointBorderColor: this.color_fore[8],
                //Data to be represented on y-axis
                data: this.check2_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수2완료',
                backgroundColor: this.color_back[9],
                pointBackgroundColor: this.color_back[9],
                borderWidth: 1,
                pointBorderColor: this.color_fore[9],
                //Data to be represented on y-axis
                data: this.check2_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3전체',
                backgroundColor: this.color_back[10],
                pointBackgroundColor: this.color_back[10],
                borderWidth: 1,
                pointBorderColor: this.color_fore[10],
                //Data to be represented on y-axis
                data: this.check3_total_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3진행',
                backgroundColor: this.color_back[11],
                pointBackgroundColor: this.color_back[11],
                borderWidth: 1,
                pointBorderColor: this.color_fore[11],
                //Data to be represented on y-axis
                data: this.check3_ing_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              },
              {
                label: '검수3완료',
                backgroundColor: this.color_back[12],
                pointBackgroundColor: this.color_back[12],
                borderWidth: 1,
                pointBorderColor: this.color_fore[12],
                //Data to be represented on y-axis
                data: this.check3_complete_count,
                barPercentage: 0.8,
                categoryPercentage: 1
              })
            }

            // 1건 지정해서 조회할때는 여기에서 랜더링..
            if(statistics_info) {  
              this.render() 
            }
            
        }, 
        //챠트 그리기..
        render() { 
            this.renderChart(this.datacollection, this.options) 
        },
        // Data 툴팁 보이기/안보이기 처리
        viewTooltips() {
          if(this.options.showAllTooltips) {
            this.options.showAllTooltips = false;
          } else {
            this.options.showAllTooltips = true;
          }
          this.render()
        },
        // 엑셀파일 export
        filexls() {
          // let base64Image = document.getElementById("datalist").toDataURL(1.0);
          let file_name = 'statistics_label'
          let base64Image = document.getElementById("bar-chart").toDataURL(1.0);  // Chart img convert
          // excel js 객체 생성
          let workbook = new ExcelJS.Workbook();

          // 워크시트 생성
          let worksheet =  workbook.addWorksheet('Data List');    // Data List
          let worksheet2 =  workbook.addWorksheet('Data Chart');  // Chart

          // Header 셋팅
          if(this.search_seq === '1' && (this.search_type === 'NOW' || this.search_type === 'NOWW')) {
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '작업자', key: 'user_name', width: 20 },
              { header: '전체할당량', key: 'label_total_all', width: 15 },
              { header: '기간할당량', key: 'label_total', width: 15 },
              { header: '라벨링진행', key: 'label_ing', width: 15 },
              { header: '라벨링완료', key: 'label_complete', width: 15 },
            ];
          } else if(this.search_seq === '1' && (this.search_type === 'SUM' || this.search_type === 'SUMC')) {
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '작업자', key: 'user_name', width: 20 },
              { header: '전체할당량', key: 'label_total_all', width: 15 },
              { header: '라벨링진행', key: 'label_ing', width: 15 },
              { header: '라벨링완료', key: 'label_complete', width: 15 },
              { header: '라벨링완료율', key: 'label_avgComplete', width: 15 },
              { header: '반려', key: 'label_reject', width: 15 },
              { header: '반려율', key: 'label_avgReject', width: 15 },
            ];
          } else if(this.search_seq === '2' && (this.search_type === 'NOW' || this.search_type === 'NOWW')) { 
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '작업자', key: 'user_name', width: 20 },
              { header: '전체할당량', key: 'check_total_all', width: 15 },
              { header: '기간할당량', key: 'check_total', width: 15 },
              { header: '검수진행', key: 'check_ing', width: 15 },
              { header: '검수완료', key: 'check_complete', width: 15 },
              { header: '반려', key: 'check_reject', width: 15 },
            ];
            file_name = 'statistics_check'
          } else if(this.search_seq === '2' && (this.search_type === 'SUM' || this.search_type === 'SUMC')) { 
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '작업자', key: 'user_name', width: 20 },
              { header: '전체할당량', key: 'check_total_all', width: 15 },
              { header: '검수진행', key: 'check_ing', width: 15 },
              { header: '검수완료', key: 'check_complete', width: 15 },
              { header: '검수완료율', key: 'check_avgComplete', width: 15 },
              { header: '반려', key: 'check_reject', width: 15 },
            ];
            file_name = 'statistics_check'
          } else if(this.search_seq === '3' && this.search_type === 'NOW') {
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '전체할당량', key: 'label_total_all', width: 20 },
              { header: '기간할당량', key: 'label_total', width: 20 },
              { header: '라벨링진행', key: 'label_ing', width: 15 },
              { header: '라벨링완료', key: 'label_complete', width: 15 },
              { header: '반려', key: 'label_reject', width: 15 },
              { header: '총검수량', key: 'check_total', width: 15 },
              { header: '검수진행', key: 'check_ing', width: 15 },
              { header: '검수완료', key: 'check_complete', width: 15 },
            ];
            file_name = 'statistics_project'
          } else if(this.search_seq === '3' && this.search_type !== 'NOW') {
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '전체할당량', key: 'label_total_all', width: 20 },
              { header: '라벨링진행', key: 'label_ing', width: 15 },
              { header: '라벨링완료', key: 'label_complete', width: 15 },
              { header: '라벨링완료률', key: 'label_avgComplete', width: 15 },
              { header: '반려', key: 'label_reject', width: 15 },
              { header: '반려율', key: 'label_avgReject', width: 15 },
              { header: '총검수량', key: 'check_total_all', width: 15 },
              { header: '검수진행', key: 'check_ing', width: 15 },
              { header: '검수완료', key: 'check_complete', width: 15 },
              { header: '검수완료율', key: 'check_avgComplete', width: 15 },
            ];
            file_name = 'statistics_project'
          } else {
            worksheet.columns = [ 
              { header: '프로젝트', key: 'project_name', width: 25  },
              { header: '총작업량', key: 'label_total', width: 20 },
              { header: '라벨링진행', key: 'label_ing', width: 15 },
              { header: '라벨링완료', key: 'label_complete', width: 15 },
              { header: '라벨링완료률', key: 'label_avgComplete', width: 15 },
              { header: '반려', key: 'label_reject', width: 15 },
              { header: '반려율', key: 'label_avgReject', width: 15 },
              { header: '검수진행1', key: 'check1_ing', width: 15 },
              { header: '검수완료1', key: 'check1_complete', width: 15 },
              { header: '검수완료율1', key: 'check1_avgComplete', width: 15 },
              { header: '검수진행2', key: 'check2_ing', width: 15 },
              { header: '검수완료2', key: 'check2_complete', width: 15 },
              { header: '검수완료율2', key: 'check2_avgComplete', width: 15 },
              { header: '검수진행3', key: 'check3_ing', width: 15 },
              { header: '검수완료3', key: 'check3_complete', width: 15 },
              { header: '검수완료율3', key: 'check3_avgComplete', width: 15 },
            ];
            file_name = 'statistics_project'
          }
          
          // Header 정렬
          worksheet.columns.forEach(function(key,index){
            worksheet.getCell(1,index+1).alignment = { vertical: 'top', horizontal: 'center' }
            
            worksheet.getCell(1,index+1).fill = {
              type: 'pattern',
              pattern:'gray125',
              fgColor:{argb:'EEEEEEEE'},
              bgColor:{argb:'EEEEEEEE'}
            };
            worksheet.getCell(1,index+1).border = { // thin, thick, double
              top: {style:'thin', color: {argb:'black'}},
              left: {style:'thin', color: {argb:'black'}},
              bottom: {style:'thin', color: {argb:'black'}},
              right: {style:'thin', color: {argb:'black'}}
            };
            worksheet.getRow(1).font = { bold: true };
          })

          // Set Data
          const rows = this.statistics_list;
          worksheet.addRows(rows);   
        
          // Data 정렬
          this.statistics_list.forEach(function(key,index){
            worksheet.columns.forEach(function(key,index2){
              worksheet.getCell(index+2,index2+1).alignment = { vertical: 'top', horizontal: 'center' }
              worksheet.getCell(index+2,index2+1).border = { // thin, thick, double
                top: {style:'thin', color: {argb:'black'}},
                left: {style:'thin', color: {argb:'black'}},
                bottom: {style:'thin', color: {argb:'black'}},
                right: {style:'thin', color: {argb:'black'}}
              };
            })
          })

          // 흰 배경을 만들기 위해 셀 병합
          worksheet2.mergeCells('A1:R25');

          // 이미지 등록
          let imageId = workbook.addImage({
              base64: base64Image,
              extension: 'png',
          });

          // 병합했던 셀에 이미지 추가 (엑셀 파일 열면 위치 이동가능)
          worksheet2.addImage(imageId, 'A1:R25');        
         
          // 가상의 파일 읽기
          workbook.xlsx.readFile(`${file_name}_${moment().format('YYYYMMDDHHmmss')}.xlsx`);
          
          // 파일 다운로드
          workbook.xlsx.writeBuffer().then(function (data) {
              let blob = new Blob([data], {type: "application/vnd.ms-excel;charset=utf-8"});
              saveAs(blob, `${file_name}_${moment().format('YYYYMMDDHHmmss')}.xlsx`);
          });
        },  
        // 0일 경우 undefined 셋팅 - tooltip 안나오게
        getZeroToUndefined(data) {
          return util.getZeroToUndefined(data);
        },      
    }
  }
</script>
