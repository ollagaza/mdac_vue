// made by junepark DataClass.vue
<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Datalist_Left v-bind:menu_id="1"></Datalist_Left>
        <div style="flex: 2; padding-top: 40px;">
          <div style="padding: 0 0 0 0 ;">
            <div style="display: flex;  flex-direction: row; width: 100%; height:40px;">
              <div style="flex: 2; display: flex; flex-direction: row;">
                <div style="width: 50px;padding: 5px 0 0 10px;">
                  상태
                </div>
                <div style="width: 70px;">
                  <select v-model="is_used" style="border: 1px solid #ccc; height: 30px; width: 70px;padding-left: 5px;">
                    <option v-bind:value="'A'">전체</option>
                    <option v-bind:value="'Y'">사용</option>
                    <option v-bind:value="'N'">미사용</option>
                  </select>
                </div>
                <div style="width: 60px;padding: 5px 0 0 20px;">
                  분류
                </div>
                <Division_sel
                  ref="division_sel"
                  v-bind:pro_seq ="pro_seq"
                  v-on:onRedata="onRedata"
                  v-on:onSeldata="onSeldata"
                ></Division_sel>
                <div style="width: 50px; padding-left: 10px;">
                  <div class="btn" style="width: 50px; height: 30px;" v-on:click="searchClick">검색</div>
                </div>
              </div>
<!--              <div class="btn navy" style="right: 0; width:100px; height: 36px;">프로젝트 등록</div>-->
            </div>
            <div class="grid_m datalist header" style="align-content: center; justify-content: center;">
              <div>분류</div>
              <div>라벨링<span style="font-size: 10px">[할당](전체/진행/완료)</span></div>
              <div>검수1<span style="font-size: 10px">(전체/진행/완료/반려)</span></div>
              <div>검수2<span style="font-size: 10px">(전체/진행/완료/반려)</span></div>
              <div>검수3<span style="font-size: 10px">(전체/진행/완료/반려)</span></div>
              <div>완료</div>
              <div>최종업로드일</div>
            </div>
            <template v-for="item, index in c_viewList">
              <div class="grid_m datalist body" v-on:click="onListClick(item.seq)">
                <div style="justify-self: left;">{{item.fullname}} / {{item.seq}}</div>
                <div class="item" v-html="getDivSumData(item.seq, 'A')"></div>
                <div class="item" v-html="getDivSumData(item.seq, 'B')"></div>
                <div class="item" v-html="getDivSumData(item.seq, 'C')"></div>
                <div class="item" v-html="getDivSumData(item.seq, 'D')"></div>
                <div>
                  {{getDivSumData(item.seq, 'E')}}
                </div>
                <div>{{getMaxRegdate(item.seq)}}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datalist_Left from '../components/datamanagement/Datalist_Left';
import ApiStatus from '../api/ApiStatus';
import Division_sel from '../components/datamanagement/Division_sel';

export default {
  name: 'DataStatus',
  components: {
    Datalist_Left,
    Division_sel,
  },
  async created() {
    if (this.$route.query) {
      const query = this.$route.query;
      this.pro_seq = query.seq;
    }
  },
  computed: {
    c_viewList() {
      if (this.list_view && this.list_view.length > 0) {
        return this.list_view;
      }
      return [];
    },
    c_list() {
      if (this.list && this.list.length > 0) {
        return this.list;
      }
      return [];
    },
    c_list_sum() {
      if (this.list_sum && this.list_sum.length > 0) {
        return this.list_sum;
      }
      return [];
    }
  },
  data() {
    return {
      pro_seq: -1,
      list_div: [],
      list_max: [],
      list_view: [],
      list_sum: [],
      list_sum_max: [],
      list: [],
      is_used: 'A',
      sel_div: {},
      division: -1,
    };
  },
  mounted() {
  },
  methods: {
    onRedata(list, maxDepth) {
      // this.$log.debug(list);
      if (!list || list.length < 1) {
        return;
      }
      this.list_div = list;
      this.list_max = this.list_div.filter(item => item.depth === maxDepth);
      this.list_view = this.list_max;
      this.load_data();
    },
    onSeldata(division, sel_div) {
      this.$log.debug(division, sel_div);
      this.division = division;
      this.sel_div = sel_div;
    },
    async searchClick() {
      // await this.getDivision(this.pro_seq);
      this.list_view = this.list_max;
      // this.$log.debug(this.list_view);
      if (this.sel_div.seq && this.sel_div.seq !== -1) {
        this.list_view = this.list_view.filter(item => item.seq === this.sel_div.seq);
      } else if (this.division && parseInt(this.division) !== -1) {
        this.list_view = this.list_view.filter(item => item.first_seq === this.division);
      }
      if (this.is_used !== 'A') {
        this.list_view = this.list_view.filter(item => item.is_used === this.is_used);
      }
      this.load_data();
    },
    getDivSumData(seq, group) {
      let data = '0 / 0 / 0 / 0';
      if (group === 'A') {
        data = '0 / 0 / 0 ';
      }
      if (group === 'E') {
        data = '0';
      }
      if (this.c_list_sum && this.c_list_sum.length > 0) {
        const sumdata = this.c_list_sum.filter(item => item.division_seq === seq);
        if (sumdata && sumdata.length > 0) {
          if (group === 'A') {
            return `[${sumdata[0].label_cnt_sum}] ${sumdata[0].sumdataA}`;
          }
          if (group === 'B') {
            return sumdata[0].sumdataB;
          }
          if (group === 'C') {
            return sumdata[0].sumdataC;
          }
          if (group === 'D') {
            data = sumdata[0].sumdataD;
          }
          if (group === 'E') {
            data = sumdata[0].E2;
          }
        }
      }
      return data;
    },
    getMaxRegdate(seq) {
      if (this.list_sum_max && this.list_sum_max.length > 0) {
        const sumdatamax = this.list_sum_max.filter(item => item.division_seq === seq)
        // this.$log.debug(sumdatamax);
        if (sumdatamax && sumdatamax.length) {
          return sumdatamax[0].job_date.replaceAll('-', '.').substr(0, 10);
        }
      }
      return '';
    },
    onListClick(seq) {
      // alert(this.pro_seq + ' / ' + seq);
      const query = {};
      query.div_seq = seq;
      query.pro_seq = this.pro_seq;
      const params = {};
      this.$router.push({ name: 'datadetail', params, query });
    },
    async load_data() {
      this.$log.debug('load_data');
      const data = { list_view: this.list_view };
      await ApiStatus.getDivSum(data)
        .then((result) => {
          this.$log.debug('result', result);
          const list = [];
          const max = [];
          for (const item of result.list) {
            const sublist = item;
            sublist.A0 = item.A0 ? item.A0 : 0;
            sublist.A1 = item.A1 ? item.A1 : 0;
            sublist.A2 = item.A2 ? item.A2 : 0;
            sublist.A = item.A1 + item.A2;
            sublist.B1 = item.B1 ? item.B1 : 0;
            sublist.B2 = item.B2 ? item.B2 : 0;
            sublist.B5 = item.B5 ? item.B5 : 0;
            sublist.B = item.B1 + item.B2 + item.B5;
            sublist.C1 = item.C1 ? item.C1 : 0;
            sublist.C2 = item.C2 ? item.C2 : 0;
            sublist.C5 = item.C5 ? item.C5 : 0;
            sublist.C = item.C1 + item.C2 + item.C5;
            sublist.D1 = item.D1 ? item.D1 : 0;
            sublist.D2 = item.D2 ? item.D2 : 0;
            sublist.D5 = item.D5 ? item.D5 : 0;
            sublist.D = item.D1 + item.D2 + item.D5;
            sublist.E2 = item.E2 ? item.E2 : 0;
            sublist.labler_co = item.labler_co ? item.labler_co : 0;
            sublist.sumdataA = `${sublist.A} / <span class="ing">${sublist.A1}</span> / ${sublist.A2}`;
            sublist.sumdataB = `${sublist.B} / <span class="ing">${sublist.B1}</span> / ${sublist.B2} / ${sublist.B5}`;
            sublist.sumdataC = `${sublist.C} / <span class="ing">${sublist.C1}</span> / ${sublist.C2} / ${sublist.C5}`;
            sublist.sumdataD = `${sublist.D} / <span class="ing">${sublist.D1}</span> / ${sublist.D2} / ${sublist.D5}`;
            sublist.label_cnt_sum = item.label_cnt_sum;
            list.push(sublist);
          }
          this.list_sum = list;
          this.list_sum_max = result.max;
          this.$log.debug(this.list_sum);
        });
    }
  },
};
</script>

<style scoped>
.grid_m.datalist {
  grid-template-columns: 180px 170px 170px 170px 170px 50px  90px;
}
.item >>> .ing{
  color: #1AABEA;
}
</style>

