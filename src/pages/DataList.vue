<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Datalist_Left v-bind:menu_id="1"></Datalist_Left>
        <div style="flex: 2; padding-top: 40px;">
          <div style="padding: 0 0 0 0 ;">
            <div style="display: flex;  flex-direction: row; width: 100%; height:40px;">
              <div style="flex: 2">
              </div>
              <div class="btn navy" style="right: 0; width:100px; height: 36px;">프로젝트 등록</div>
            </div>
            <div class="grid_m datalist header" style="align-content: center; justify-content: center;">
              <div>프로젝트</div>
              <div>라벨링<span style="font-size: 10px" title="할당 - 비디오타입에서 라벨러에게 할당한 갯수 카운트합과 이미지타입에서 할당된 갯수합" class="item">[할당](전체/<span class="ing">진행</span>/완료)</span></div>
              <div>라벨러</div>
              <div>검수1<span style="font-size: 10px" class="item">(전체/<span class="ing">진행</span>/완료/반려)</span></div>
              <div>검수2<span style="font-size: 10px" class="item">(전체/<span class="ing">진행</span>/완료/반려)</span></div>
              <div>검수3<span style="font-size: 10px" class="item">(전체/<span class="ing">진행</span>/완료/반려)</span></div>
              <div>상태</div>
            </div>
            <template v-for="item, index in c_list">
              <div class="grid_m datalist body" v-on:click="onListClick(item.seq)">
                <div v-html="item.project_name"></div>
                <div class="item" v-html="item.sumdataA"></div>
                <div>{{item.labler_co}} 명</div>
                <div class="item" v-html="item.sumdataB"></div>
                <div class="item" v-html="item.sumdataC"></div>
                <div class="item" v-html="item.sumdataD"></div>
                <div>
                  <div class="project_work" v-if="item.status === '1'">진행</div>
                  <div class="project_stop" v-if="item.status === '2'">중지</div>
                  <div class="project_end" v-if="item.status === '3'">종료</div>
                </div>
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

export default {
  name: 'DataStatus',
  components: {
    Datalist_Left,
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
      list:[],
    };
  },
  methods: {
    async load_data() {
      await ApiStatus.getStatusList()
        .then((data) => {
          this.$log.debug(data);
          const list = [];
          for(const item of data.list) {
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
            item.label_cnt_sum = item.label_cnt_sum ? item.label_cnt_sum : 0;
            sublist.sumdataA = `[${item.label_cnt_sum}] ${sublist.A} / <span class="ing">${sublist.A1}</span> / ${sublist.A2}`;
            sublist.sumdataB = `${sublist.B} / <span class="ing">${sublist.B1}</span> / ${sublist.B2} / ${sublist.B5}`;
            sublist.sumdataC = `${sublist.C} / <span class="ing">${sublist.C1}</span> / ${sublist.C2} / ${sublist.C5}`;
            sublist.sumdataD = `${sublist.D} / <span class="ing">${sublist.D1}</span> / ${sublist.D2} / ${sublist.D5}`;
            sublist.label_cnt_sum = item.label_cnt_sum;
            list.push(sublist);
            this.$log.debug(list);
          }
          this.list = list;
        }).catch((e) => {

        });
    },
    onListClick(seq) {
      const query = {};
      query.seq = seq;
      const params = {};
      this.$router.push({ name: 'datadivision', params, query });
    }
  },
};
</script>

<style scoped>
.grid_m.datalist {
  grid-template-columns: 100px 200px 50px 200px 200px 200px 50px;
}
.project_work {
  border-radius: 12px;
  border: 1px solid #1aabea;
  width: 50px;
  text-align: center;
  background-color: #1aabea;
  color: white;
  height: 25px;
  padding-top: 2px;
}
.project_stop {
  border-radius: 12px;
  border: 1px solid #f3873f;
  width: 50px;
  text-align: center;
  background-color: #f3873f;
  color: #fff;
  height: 25px;
  padding-top: 2px;
}
.project_end {
  border-radius: 12px;
  border: 1px solid #aaa297;
  width: 50px;
  text-align: center;
  background-color: #aaa297;
  color: #fff;
  height: 25px;
  padding-top: 2px;
}

.item >>> .ing{
  color: #1AABEA;
}

</style>
