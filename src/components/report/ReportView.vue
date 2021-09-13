<template>
  <div class="layout">
    <div style="width: 1180px; height:100%; ">
      <div class="report_wrapper">
        <div class="item_title" style="display: grid; grid-template-columns: 200px 2fr; justify-items: flex-end;">
          <div style="justify-self: flex-start;">분석 리포트</div>
          <div class="btn newgreen" style="width:150px; justify-self: flex-end;" v-on:click="onPdfClicked">PDF Download</div>
        </div>
        <div style="margin-top: 30px;">
          <div style="display: flex; flex-direction: row;">
            <div class="item_sub_title">
              {{c_result_text}} 의심
            </div>
            <div class="item_sub_title_tail">
              {{c_group_name}} / {{c_plant_status}} / {{c_plant_day}}
            </div>
          </div>
          <div style="display: flex; flex-direction: row; margin-top: 20px; ">
            <div style="position: relative; width:540px; height:405px; border: 1px solid #ccc; margin-right: 20px; text-align: center;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <img v-bind:src="`${c_img_url}`" style="max-width:540px; max-height:405px;">
              </div>
            </div>
            <div style="width: 490px;">
              <div style="display: flex; flex-direction: row;">
                <div class="checkmain">{{c_check_main}} 확률</div>
                <div class="checkpercent">{{c_check_percent}}%</div>
              </div>
              <div style="margin-top: 10px;font-weight: 400; font-size: 14px; color: #aaa297;letter-spacing: -0.5px">
                아래의 발생원인과 조치사항을 참고 하세요.
              </div>
              <div style="margin-top: 25px;">
                <template v-for="(item, idx) in c_check">
                <div class="chart" v-bind:class="{on: item.select_data === 1}" v-on:click="onChartClick(item.seq)">
                  <div style="" class="chart_img"></div>
                  <div class="chart_text">{{item.result_text}} {{item.percent}}%</div>
                  <div class="chart_line">
                    <div class="chart_line_wrap">
                      <div class="chart_line_back"></div>
                      <div class="chart_line_graph" v-bind:style="{width: `${item.percent}%`}"></div>
                    </div>
                  </div>
                </div>
                </template>
                <div style="margin-top: 30px; text-align: right;display: flex; flex-direction: row-reverse">
                  <div class="btn_change" v-on:click="onResultChange">판정변경</div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="c_case">
            <div class="div_sp">
              <div class="div_sp_title">마르병 발생원인</div>
              <div class="div_sp_text" v-html="c_case">
              </div>
            </div>
          </template>
          <template v-if="c_act">
            <div class="div_sp">
              <div class="div_sp_title">처방사항</div>
              <div class="div_sp_text" v-html="c_act">
              </div>
            </div>
          </template>
          <template v-if="c_recom">
            <div class="div_sp_one">
              <div class="div_sp_title">약제추천</div>
              <div class="div_sp_img" v-html="c_recom">
              </div>
            </div>
          </template>
          <template v-else>
            <div class="div_sp_one">
              <div class="div_sp_title">약제추천</div>
              <div class="div_sp_img">
                <div>
                  <div style="flat:left; width:250px;">
                    <img src="/img/jiin/sample1.jpg" style="max-width: 1000px;">
                  </div>
                </div>
              </div>
            </div>
            <div class="div_sp_one">
              <div class="div_sp_title">혼용약제</div>
              <div class="div_sp_img">
                <div>
                  <div style="flat:left; width:250px;">
                    <img src="/img/jiin/sample1.jpg" style="max-width: 1000px;">
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div style="width: 1178px; height: 50px; margin-top: 20px;">
        <div class="btn newgreen list" style="margin: 0 auto; width: 200px;" v-on:click="onListClick">목록</div>
      </div>
    </div>
    <ReportPdf ref="reportPdf" v-bind:updata="updata" ></ReportPdf>
  </div>
</template>

<script>
import util from '../../utils/util';
import BaseMixin from '../../components/Mixins/BaseMixin';

export default {
  name: 'Page1',
  components: { },
  props: [],
  mixins: [BaseMixin],
  created() {
  },
  computed: {
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
.layout {
  min-height: 850px;
  height: 100%;
}


</style>
