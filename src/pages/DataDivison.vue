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
              <div>라벨링<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>검수1<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>검수2<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>검수3<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>완료</div>
              <div>최종업로드일</div>
            </div>
            <template v-for="item, index in c_viewList">
              <div class="grid_m datalist body" v-on:click="onListClick(item.seq)">
                <div>{{item.fullname}}</div>
                <div>10/20/30/40/50</div>
                <div>10/20/30/40/50</div>
                <div>10/20/30/40/50</div>
                <div>10/20/30/40/50</div>
                <div>
                  100
                </div>
                <div>10 명</div>
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
  },
  data() {
    return {
      pro_seq: -1,
      list_div: [],
      list_max: [],
      list_view: [],
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
    },
    onSeldata(division, sel_div) {
      this.$log.debug(division, sel_div);
      this.division = division;
      this.sel_div = sel_div;
    },
    async searchClick() {
      // await this.getDivision(this.pro_seq);
      this.list_view = this.list_max;
      this.$log.debug(this.list_view);
      if (this.sel_div.seq && this.sel_div.seq !== -1) {
        this.list_view = this.list_view.filter(item => item.seq === this.sel_div.seq);
      } else if (this.division && parseInt(this.division) !== -1) {
        this.list_view = this.list_view.filter(item => item.first_seq === this.division);
      }
      if (this.is_used !== 'A') {
        this.list_view = this.list_view.filter(item => item.is_used === this.is_used);
      }
    },
    onListClick(seq) {
      // alert(this.pro_seq + ' / ' + seq);
      const query = {};
      query.div_seq = seq;
      query.pro_seq = this.pro_seq;
      const params = {};
      this.$router.push({ name: 'datadetail', params, query });
    }
  },
};
</script>

<style scoped>
.grid_m.datalist {
  grid-template-columns: 100px 190px 190px 190px 190px 50px  90px;
}
</style>

