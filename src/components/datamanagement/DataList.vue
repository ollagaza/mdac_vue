<template>
  <div class="layout">
    <div class="layout2" style="width: 100%;">
      <div style="display:flex; flex-direction: row;" >
        <Datalist_Left v-bind:menu_id="1"></Datalist_Left>
        <div style="flex: 2; padding-top: 14px;">
          <div style="font-weight: 600; font-size: 15pt; color: #333">
            Data Status - Project List
          </div>
          <div style="padding: 20px 0 0 0 ;">
            <div class="grid_m datalist header">
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
            <div class="grid_m datalist body">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="grid_m datalist body">
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
import Datalist_Left from './Datalist_Left';

export default {
  name: 'DataStatus',
  components: {
    Datalist_Left,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.grid_m.datalist {
  grid-template-columns: 50px 200px 150px 100px 100px 100px 100px 100px 100px;
}
.grid_m.nodata {
  grid-template-columns: 1000px;
}
</style>
