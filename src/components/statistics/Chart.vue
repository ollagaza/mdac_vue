<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Bar} from 'vue-chartjs'
  import apistatistics from '../../api/ApiStatistics';
  import moment from "moment/moment";
  import BaseMixin from "../Mixins/BaseMixin";
  //Exporting this so it can be used in other components
  export default { 
    name: 'BarChart',
    extends: Bar,
    props: ['chartData','statistics_list','project_list', 'chart_title', 'search_seq', 'search_type', 'project_seq','start_date','end_date'],
    mixins: [BaseMixin],
    data () {
      return {   
        labels: [],
        total_count: [],
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
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            },
            // yAxes: [{
            //   ticks: {
            //     beginAtZero: true,
            //     // stepSize: 10,    // y축 간격 
            //     // suggestedMin: 0, // y축 최소 값 
            //     // suggestedMax: 20,// y축 최대값
            //   },
            //   gridLines: {
            //     display: true,
            //     // borderDash: [2, 2], 
            //     // borderDashOffset: 0.2
            //   }
            // }],
            // xAxes: [ {
            //   gridLines: {
            //     display: false
            //   }
            // }],
            
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
        
          // tooltips: {
				  //   enabled: false
			    // },
          hover: {
            animationDuration: 0
          },
          responsiveAnimationDuration: 0
          ,
          // animation: {
          //   duration: 1,
          //   onComplete: function () {
          //     var chartInstance = this.chart,
          //       ctx = chartInstance.ctx;
          //     ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          //     ctx.fillStyle = 'purple';
          //     ctx.textAlign = 'center';
          //     ctx.textBaseline = 'bottom';

          //     this.data.datasets.forEach(function (dataset, i) {
          //       var meta = chartInstance.controller.getDatasetMeta(i);
          //       meta.data.forEach(function (bar, index) {
          //         var data = `${dataset.data[index]}`;	// ${dataset.label} : 						
          //         ctx.fillText(data, bar._model.x, bar._model.y - 5);
          //       });
          //     });
          //   }
          // }
        }
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
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      // this.renderChart(this.datacollection, this.options)
      // this.init()
    },
    methods: {
        init() {
            console.log(`statistics_start`)
            console.log(this.statistics_list)
            console.log(this.search_seq)
            console.log(`statistics_end`)
            this.labels = []
            this.color_back = []
            this.color_fore = []
            this.total_count = []
            this.label_complete_count = []
            this.label_ing_count = []
            this.label_reject_count = []
            this.check_ing_count = []
            this.check_complete_count = []
            console.log(`project_seq===${this.project_seq}`)
            //let data = this.chartData.chartData 
            let datasets = [] 
            const data = {
              search_seq: this.search_seq,
              project_seq: this.project_seq,
              search_type: this.search_type,
              start_date: moment(this.start_date).format('YYYY-MM-DD'),
              end_date: moment(this.end_date).format('YYYY-MM-DD')
            };            
            apistatistics.getStatistics(data)
            .then((result) => {
                // console.log(result.statistics_info)
                for (const key in result.statistics_info) {
                    // console.log(`key===${key}`)
                    // console.log(`project_name===${result[0][key].project_name}`)
                    if(this.search_seq === 3) {
                      this.labels.push(result.statistics_info[key].project_name)
                    } else {
                      this.labels.push(`${result.statistics_info[key].project_name} / ${result.statistics_info[key].user_name}`)
                    }
                    this.total_count.push(result.statistics_info[key].total)
                    this.label_complete_count.push(result.statistics_info[key].label_complete)
                    this.label_ing_count.push(result.statistics_info[key].label_ing)
                    this.label_reject_count.push(result.statistics_info[key].label_reject)
                    this.check_ing_count.push(result.statistics_info[key].check_ing)
                    this.check_complete_count.push(result.statistics_info[key].check_complete)

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

                this.datacollection = { 
                  labels: this.labels, 
                  datasets: datasets,
                }
                this.options.title = {
                    display: true,
                    text: this.chart_title,
                }

                this.render() 

            })  
        
            for(let i = 0 ; i < 6 ; i++) {
      
              let colors = this.colorSets[i] 
              this.color_back.push(colors.back)
              this.color_fore.push(colors.fore)
            }
            datasets.push( 
            {
              label: '총작업량',
              backgroundColor: this.color_back[0],
              pointBackgroundColor: this.color_back[0],
              borderWidth: 1,
              pointBorderColor: this.color_fore[0],
              //Data to be represented on y-axis
              data: this.total_count,
              barPercentage: 0.7
            },
            {
              label: '라벨링진행',
              backgroundColor: this.color_back[1],
              pointBackgroundColor: this.color_back[1],
              borderWidth: 1,
              pointBorderColor: this.color_fore[1],
              //Data to be represented on y-axis
              data: this.label_ing_count,
              barPercentage: 0.5
            },
            {
              label: '라벨링완료',
              backgroundColor: this.color_back[2],
              pointBackgroundColor: this.color_back[2],
              borderWidth: 1,
              pointBorderColor: this.color_fore[2],
              //Data to be represented on y-axis
              data: this.label_complete_count,
              barPercentage: 0.5
              
            },
            {
              label: '반려',
              backgroundColor: this.color_back[3],
              pointBackgroundColor: this.color_back[3],
              borderWidth: 1,
              pointBorderColor: this.color_fore[3],
              //Data to be represented on y-axis
              data: this.label_reject_count,
              barPercentage: 0.5
            },
            {
              label: '검수진행',
              backgroundColor: this.color_back[4],
              pointBackgroundColor: this.color_back[4],
              borderWidth: 1,
              pointBorderColor: this.color_fore[4],
              //Data to be represented on y-axis
              data: this.check_ing_count,
              barPercentage: 0.5
            },
            {
              label: '검수완료',
              backgroundColor: this.color_back[5],
              pointBackgroundColor: this.color_back[5],
              borderWidth: 1,
              pointBorderColor: this.color_fore[5],
              //Data to be represented on y-axis
              data: this.check_complete_count,
              barPercentage: 0.5
            })
          
            
        }, 
        render() { 
            this.renderChart(this.datacollection, this.options) 
        }
    }
  }
</script>
