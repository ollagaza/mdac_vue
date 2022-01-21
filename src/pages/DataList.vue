<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Side_bar v-bind:menu_id="2" v-bind:menu_show=this.$route.params.menu_show></Side_bar>
        <div class="content_layout">
          <div class="main_title">
            Data Management
          </div>
          <div class="sub_title">
            Data Status
          </div>
          <div style="padding: 0 0 0 0 ;">
            <div style="display: flex;  flex-direction: row; width: 100%; height:20px;">
              <div style="flex: 2">
              </div>
              <div class="guide_title">
                · 반려에서 재할당된 작업 갯수 포함
              </div>
<!--              <div class="btn navy" style="right: 0; width:100px; height: 36px;">프로젝트 등록</div>-->
            </div>
            <div class="grid_m datalist header" style="align-content: center;"><!--  justify-content: center; -->
              <div style="margin-right: auto;margin-left:20px;">프로젝트</div>
              <div>총데이터</div>
              <div>라벨링<span title="할당 - 비디오타입에서 라벨러에게 할당한 갯수 카운트합과 이미지타입에서 할당된 갯수합">(전체/<span class="ing">진행</span>/완료)</span></div>
              <div>라벨러</div>
              <div>검수<span>(전체/<span class="ing">진행</span>/완료/반려)</span></div>
              <!-- <div>검수2<span style="font-size: 10px" class="item">(전체/<span class="ing">진행</span>/완료/반려)</span></div> -->
              <!-- <div>검수3<span style="font-size: 10px" class="item">(전체/<span class="ing">진행</span>/완료/반려)</span></div> -->
              <div>완료</div>
              <div>상태</div>
            </div>
            <template v-for="item, index in c_list">
              <div v-if="item.levels==='0'" class="grid_m datalist body" v-bind:class="{ bottom : c_list.length === index+1 }" v-on:click="onListClick(item.seq, item.levels, item.depth_cnt, item.cnt, item.category_seq)">
                <div style="margin-right: auto;margin-left:20px;" v-html="item.project_name"></div>
                <div>{{item.file_cnt}} 개</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명 </div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataCheck"></div>
                <!-- <div class="item" v-html="item.sumdataC"></div> -->
                <!-- <div class="item" v-html="item.sumdataD"></div> -->
                <div v-html="item.sumdataE"></div>
                <div>
                  <div class="process_work" v-if="item.status === '1'">진행</div>
                  <div class="process_stop" v-if="item.status === '2'">중지</div>
                  <div class="process_end" v-if="item.status === '3'">종료</div>
                </div>
              </div>
              <div v-if="item.levels==='1' && mnuLevels >= 0 && pSeq1===item.seq" class="grid_m datalist body subbody" v-bind:class="{ bottom : c_list.length === index+1 }"  v-on:click="onListClick(item.seq, item.levels, item.depth_cnt, item.cnt, item.category_seq)">
                <div style="margin-right: auto;margin-left:20px;" v-html="item.project_name"></div>
                <div>{{item.file_cnt}} 개</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명 </div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataCheck"></div>
                <!-- <div class="item" v-html="item.sumdataC"></div> -->
                <!-- <div class="item" v-html="item.sumdataD"></div> -->
                <div v-html="item.sumdataE"></div>
                <div>
                  
                </div>
              </div>
              <div v-if="item.levels==='2' && mnuLevels >= 1 && pSeq2===item.seq && item.cnt.indexOf(pItem2) > -1" class="grid_m datalist body subbody" v-bind:class="{ bottom : c_list.length === index+1 }" v-on:click="onListClick(item.seq, item.levels, item.depth_cnt, item.cnt, item.category_seq)"><!--  v-show="level2" -->
                <div style="margin-right: auto;margin-left:30px;" v-html="item.project_name"></div>
                <div>{{item.file_cnt}} 개</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명 </div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataCheck"></div>
                <!-- <div class="item" v-html="item.sumdataC"></div> -->
                <!-- <div class="item" v-html="item.sumdataD"></div> -->
                <div v-html="item.sumdataE"></div>
                <div>
                  
                </div>
              </div>
              <div v-if="item.levels==='3' && mnuLevels >= 2 && pSeq3===item.seq && item.cnt.indexOf(pItem3) > -1" class="grid_m datalist body subbody" v-bind:class="{ bottom : c_list.length === index+1 }" v-on:click="onListClick(item.seq, item.levels, item.depth_cnt, item.cnt, item.category_seq)"><!--  v-show="level3" -->
                <div style="margin-right: auto;margin-left:40px;" v-html="item.project_name"></div>
                <div>{{item.file_cnt}} 개</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명 </div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataCheck"></div>
                <!-- <div class="item" v-html="item.sumdataC"></div> -->
                <!-- <div class="item" v-html="item.sumdataD"></div> -->
                <div v-html="item.sumdataE"></div>
                <div>
                  
                </div>
              </div>
              <div v-if="item.levels==='4' && mnuLevels >= 3 && pSeq4===item.seq && item.cnt.indexOf(pItem4) > -1" class="grid_m datalist body subbody" v-bind:class="{ bottom : c_list.length === index+1 }" v-on:click="onListClick(item.seq, item.levels, item.depth_cnt, item.cnt, item.category_seq)"><!--  v-show="level4" -->
                <div style="margin-right: auto;margin-left:40px;" v-html="item.project_name"></div>
                <div>{{item.file_cnt}} 개</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명 </div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataCheck"></div>
                <!-- <div class="item" v-html="item.sumdataC"></div> -->
                <!-- <div class="item" v-html="item.sumdataD"></div> -->
                <div v-html="item.sumdataE"></div>
                <div>
                  
                </div>
              </div>
              <div v-if="item.levels==='5' && mnuLevels >= 4 && pSeq5===item.seq && item.cnt.indexOf(pItem5) > -1" class="grid_m datalist body subbody" v-bind:class="{ bottom : c_list.length === index+1 }" v-on:click="onListClick(item.seq, item.levels, item.depth_cnt, item.cnt, item.category_seq)"><!--  v-show="level5" -->
                <div style="margin-right: auto;margin-left:40px;" v-html="item.project_name"></div>
                <div>{{item.file_cnt}} 개</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명</div>
                <div style='text-align:center;width:230px;' v-html="item.sumdataCheck"></div>
                <!-- <div class="item" v-html="item.sumdataC"></div> -->
                <!-- <div class="item" v-html="item.sumdataD"></div> -->
                <div v-html="item.sumdataE"></div>
                <div>
                  
                </div>
              </div>

              <!-- <div :id="'subItem' + item.seq"> </div> -->
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side_bar from '../components/Sidebar';
import ApiStatus from '../api/ApiStatus';

export default {
  name: 'DataStatus',
  components: {
    Side_bar,
  },
  created() {
    this.load_data();
  },
  computed: {
    c_list() {
      if (this.list && this.list.length > 0 ){
        return this.list;
      }
      return [];
    },    
  },
  data() {
    return {
      list: [],
      show: false,
      list2: [],
      mnuLevels: 1,
      pSeq1: '',
      pSeq2: '',
      pSeq3: '',
      pSeq4: '',
      pSeq5: '',
      pItem1: '',
      pItem2: '',
      pItem3: '',
      pItem4: '',
      pItem5: '',
    };
  },
  methods: {
    async load_data() {
      await ApiStatus.getStatusList()
        .then((data) => {
          this.$log.debug(data.list);
      
          const list = [];
          let ingAvg = 0;
          let ingAvg_Nm = 0;
          for(const item of data.list) {
            const sublist = item;
            sublist.A0 = item.A0 ? item.A0 : 0;
            sublist.A1 = item.A1 ? item.A1 : 0;
            sublist.A2 = item.A2 ? item.A2 : 0;
            sublist.A = parseInt(item.A1,10) + parseInt(item.A2,10);
            sublist.B1 = item.B1 ? item.B1 : 0;
            sublist.B2 = item.B2 ? item.B2 : 0;
            sublist.B5 = item.B5 ? item.B5 : 0;
            sublist.B = parseInt(item.B1,10) + parseInt(item.B2,10) + parseInt(item.B5,10);
            sublist.C1 = item.C1 ? item.C1 : 0;
            sublist.C2 = item.C2 ? item.C2 : 0;
            sublist.C5 = item.C5 ? item.C5 : 0;
            sublist.C = parseInt(item.C1,10) + parseInt(item.C2,10) + parseInt(item.C5,10);
            sublist.D1 = item.D1 ? item.D1 : 0;
            sublist.D2 = item.D2 ? item.D2 : 0;
            sublist.D5 = item.D5 ? item.D5 : 0;
            sublist.D = parseInt(item.D1,10) + parseInt(item.D2,10) + parseInt(item.D5,10);
            sublist.E2 = item.E2 ? item.E2 : 0;
            sublist.file_cnt = item.file_cnt ? item.file_cnt : 0;
            sublist.labler_co = item.labler_co ? item.labler_co : 0;
            sublist.reject_A_co = item.reject_A_co ? item.reject_A_co : 0;
            item.label_cnt_sum = item.label_cnt_sum ? item.label_cnt_sum : 0;
            // item.label_cnt_sum = item.label_cnt_sum + sublist.reject_A_co;
            const A1 = item.label_cnt_sum - sublist.A2;
            let reject_A_str = '';
            // if (sublist.reject_A_co > 0) {
            //   reject_A_str = `(${sublist.reject_A_co})`;
            // }
            sublist.sumdataA = `${item.label_cnt_sum}${reject_A_str} / <span class="ing">${A1}</span> / ${sublist.A2}`
            if(sublist.A2 > 0) {
              ingAvg_Nm = parseInt(sublist.A2 / item.label_cnt_sum * 100,10);
              ingAvg = ingAvg_Nm / 3;
            } else {
              ingAvg_Nm = 0;
              ingAvg = 0;
            }
            sublist.sumdataA += ` <span style='width:10%;'>[ <img src='/img/MDAC/bar_blue.png' style='width:${ingAvg}%;height:6px; vertical-align:middle;'> ${ingAvg_Nm}% ]</span>`;
            // sublist.sumdataB = `${sublist.B} / <span class="ing">${sublist.B1}</span> / ${sublist.B2} / ${sublist.B5}`;
            // sublist.sumdataC = `${sublist.C} / <span class="ing">${sublist.C1}</span> / ${sublist.C2} / ${sublist.C5}`;
            // sublist.sumdataD = `${sublist.D} / <span class="ing">${sublist.D1}</span> / ${sublist.D2} / ${sublist.D5}`;
            sublist.sumdataCheck = `${sublist.B} / <span class="ing">${sublist.B1}</span> / ${sublist.B2} / ${sublist.B5}`
            
            if(sublist.B2 > 0) {
              ingAvg_Nm = parseInt(sublist.B2 / sublist.B * 100,10);
              ingAvg = ingAvg_Nm / 3;
            } else {
              ingAvg_Nm = 0;
              ingAvg = 0;
            }
            sublist.sumdataCheck += ` [ <img src='/img/MDAC/bar_blue.png' style='width:${ingAvg}%;height:6px; vertical-align:middle;'> ${ingAvg_Nm}% ]`;
            sublist.sumdataCheck += `<br />${sublist.C} / <span class="ing">${sublist.C1}</span> / ${sublist.C2} / ${sublist.C5}`;
            if(sublist.C2 > 0) {
              ingAvg_Nm = parseInt(sublist.C2 / sublist.C * 100,10);
              ingAvg = ingAvg_Nm / 3;
            } else {
              ingAvg_Nm = 0;
              ingAvg = 0;
            }
            sublist.sumdataCheck += ` [ <img src='/img/MDAC/bar_blue.png' style='width:${ingAvg}%;height:6px;  vertical-align:middle;'> ${ingAvg_Nm}% ]`;
            sublist.sumdataC = `${sublist.C} / <span class="ing">${sublist.C1}</span> / ${sublist.C2} / ${sublist.C5}`;
            sublist.sumdataD = `${sublist.D} / <span class="ing">${sublist.D1}</span> / ${sublist.D2} / ${sublist.D5}`;
            sublist.sumdataE = `${sublist.E2}`;
            sublist.label_cnt_sum = item.label_cnt_sum;
            list.push(sublist);
            // this.$log.debug(list);
          }
          this.list = list;
        }).catch((e) => {

        });
    },
    onListClick(seq, levels, depth_cnt, itemNm, category_seq) {
      const query = {};
      query.seq = seq;
      const params = {};
      // console.log(`==================`)
      // console.log(`seq=${seq}`)
      // console.log(`levels=${levels}`)
      // console.log(`depth_cnt=${depth_cnt}`)
      // console.log(`itemNm=${itemNm}`)
      // console.log(`category_seq=${category_seq}`)
      // console.log(`this.mnuLevels=${this.mnuLevels}`)
      this.mnuLevels = levels

      // if(levels.toString() === '0' && depth_cnt.toString() === '0')
      // {
      //   this.$router.push({ name: 'datadivision', params, query });
      // }
      if(levels.toString() === '0') { //  && seq.toString() !== '3'
        // console.log('level1')
        // this.level1 = ! this.level1
        // document.getElementsByName('aaa')[idx].style.display = ''
        if(this.pSeq1 === seq && this.pItem1 === itemNm) {
          this.pSeq1 = '';
          this.pItem1 = '';
          this.pSeq2 = '';
          this.pItem2 = '';
          this.pSeq3 = '';
          this.pItem3 = '';
          this.pSeq4 = '';
          this.pItem4 = '';
          this.pSeq5 = '';
          this.pItem5 = '';
        } else {
          this.pSeq1 = seq;
          this.pItem1 = itemNm;
        }
        // console.log(`pSeq1=${this.pSeq1}`)
        return;
      } else if(levels.toString() === '1' && depth_cnt.toString() !== levels.toString()) {
        // console.log(`pItem2===${this.pItem2}`)
        // console.log(`itemNm===${itemNm}`)
        if(this.pSeq2 === seq && this.pItem2 === itemNm) {
          this.pSeq2 = '';
          this.pItem2 = '';
          this.pSeq3 = '';
          this.pItem3 = '';
          this.pSeq4 = '';
          this.pItem4 = '';
          this.pSeq5 = '';
          this.pItem5 = '';
        } else {
          this.pSeq2 = seq;
          this.pItem2 = itemNm;
        }
        return;
      } else if(levels.toString() === '2' && depth_cnt.toString() !== levels.toString()) {
        // console.log(`pSeq3===${this.pSeq3}`)
        // console.log(`seq===${seq}`)
        if(this.pSeq3 === seq && this.pItem3 === itemNm) {
          this.pSeq3 = '';
          this.pItem3 = '';
          this.pSeq4 = '';
          this.pItem4 = '';
          this.pSeq5 = '';
          this.pItem5 = '';
        } else {
          this.pSeq3 = seq;
          this.pItem3 = itemNm;
        }
        return;
      } else if(levels.toString() === '3' && depth_cnt.toString() !== levels.toString()) {
        if(this.pSeq4 === seq && this.pItem4 === itemNm) {
          this.pSeq4 = '';
          this.pItem4 = '';
          this.pSeq5 = '';
          this.pItem5 = '';
        } else {
          this.pSeq4 = seq;
          this.pItem4 = itemNm;
        }
        return;
      } else if(levels.toString() === '4' && depth_cnt.toString() !== levels.toString()) {
        if(this.pSeq5 === seq && this.pItem5 === itemNm) {
          this.pSeq5 = '';
          this.pItem5 = '';
        } else {
          this.pSeq5 = seq;
          this.pItem5 = itemNm;
        }
        return;
      }
      // this.$router.push({ name: 'datadivision', params, query });

      query.div_seq = category_seq;
      query.pro_seq = seq;
      this.$router.push({ name: 'datadetail', params, query }).catch(() => {});
    },
    
  },
};
</script>

<style>
.grid_m.datalist {
  /* grid-template-columns: 290px 90px 240px 90px 240px 70px 80px; */
  grid-template-columns: 27% 8% 22% 8% 22% 6% 7%;
}
.ing{
  color: #6b70d6;
}
</style>
