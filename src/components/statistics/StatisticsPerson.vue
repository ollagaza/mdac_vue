<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Statistics_Left v-bind:menu_id="1"></Statistics_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            작업자 통계
          </div>
          <div style="padding: 20px 0 0 0 ;">
            <div class="grid_m header">
              <div>선택</div>
              <div>파일</div>
              <div>업로드일자</div>
              <div>상태</div>
              <div>라벨러</div>
              <div>검수(1)</div>
              <div>검수(2)</div>
              <div>검수(3)</div>
              <div>이력</div>
            </div>
            <div class="grid_m body">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="grid_m body">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Statistics_Left from './Statistics_Left';

export default {
  name: 'StatisticsPerson',
  components: {
    Statistics_Left,
    //Pagination,
  },
  data() {
    return {
      testid: '',
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  flex: 1;
  height: fit-content;
}
.layout2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 0px;
}

.left_menu{
  width:180px;
}
.left_wrapper{
  padding: 40px 0 0 14px;
}
.left_title {
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  color: #333;
  cursor: pointer;
}
.left_title:hover {
  background-color: #dddddd;
}
.left_title:hover {
  color: #009DE0;
}
.left_slice{
  margin-top: 6px;
}
.grid_m {
  display: grid;
  grid-template-columns: 50px 200px 150px 100px 100px 100px 100px 100px 100px;
  padding: 0px 0 0px 0;
  align-items: center;
  justify-items: center;
  grid-auto-rows: minmax(30px, auto);
  border-bottom: 1px solid #ccc;
}
.grid_m.body {
  cursor: pointer;
}
.grid_m.body:hover {
  background-color: #dddddd;
}

</style>
