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
              <div>라벨링<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>라벨러</div>
              <div>검수1<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>검수2<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>검수3<span style="font-size: 10px">(전체/대기/진행/완료/반려)</span></div>
              <div>상태</div>
            </div>
            <template v-for="item, index in c_list">
              <div class="grid_m datalist body" v-on:click="onListClick(item.seq)">
                <div>{{item.project_name}}</div>
                <div>10/20/30/40/50</div>
                <div>10 명</div>
                <div>10/20/30/40/50</div>
                <div>10/20/30/40/50</div>
                <div>10/20/30/40/50</div>
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
          this.list = data.list;
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

</style>
