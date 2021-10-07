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
                <div style="width: 200px;">
                  <select v-model="pro_seq" style="border: 1px solid #ccc; height: 30px; width: 190px;padding:0 20px 0 5px;">
                    <option v-for="(item, key) in list_project" v-bind:value="item.seq">{{item.project_name}}</option>
                  </select>
                </div>
                <Division_sel
                  ref="division_sel"
                  v-bind:pro_seq ="pro_seq"
                  v-bind:div_seq ="div_seq"
                  v-on:onRedata="onRedata"
                  v-on:onSeldata="onSeldata"
                ></Division_sel>
                <div style="width: 120px;">
                  <select v-model="work_status" style="border: 1px solid #ccc; height: 30px; width: 110px;padding-left: 5px;background-position: 90% center;">
                    <option v-bind:value="'-1'">상태</option>
                    <option v-bind:value="'A0'">작업대기</option>
                    <option v-bind:value="'A1'">라벨작업중</option>
                    <option v-bind:value="'A2'">라벨작업완료</option>
                    <option v-bind:value="'B1'">검수1작업중</option>
                    <option v-bind:value="'B2'">검수1완료</option>
                    <option v-bind:value="'B5'">검수1반려</option>
                    <option v-bind:value="'C1'">검수2작업중</option>
                    <option v-bind:value="'C2'">검수2완료</option>
                    <option v-bind:value="'C5'">검수2반려</option>
                    <option v-bind:value="'D1'">검수3작업중</option>
                    <option v-bind:value="'D2'">검수3완료</option>
                    <option v-bind:value="'D5'">검수3반려</option>
                    <option v-bind:value="'EN'">완료</option>
                  </select>
                </div>
                <div style="width: 60px;">
                  <div class="btn" style="width: 50px; height: 30px;">검색</div>
                </div>
              </div>
              <!--              <div class="btn navy" style="right: 0; width:100px; height: 36px;">프로젝트 등록</div>-->
            </div>
            <div style="display: flex;  flex-direction: row; width: 100%; height:40px;">
              <div style="flex: 2; display: flex;  flex-direction: row; width: 100%; height:40px;">
                <div class="check_wrapper" style="padding:0 10px 10px 0;">
                  <div class="check_box"></div>
                </div>
                <div style="width: 120px;">
                  <select style="border: 1px solid #ccc; height: 30px; width: 110px;padding-left: 5px;">
                    <option value="">이미지파일</option>
                    <option value="">동영상파일</option>
                  </select>
                </div>
                <div style="width: 120px;">
                  <select style="border: 1px solid #ccc; height: 30px; width: 110px;padding-left: 5px;">
                    <option value="">작업자 선택</option>
                    <option v-for="(item, idx) in c_list_worker" v-bind:value="item.user_id">{{item.user_name}}</option>
                  </select>
                </div>
                <div style="width: 80px;">
                  <select v-model="work_status_send" v-on:change="st_change" style="border: 1px solid #ccc; height: 30px; width: 70px;padding-left: 5px;">
                    <option value="A1">라벨링</option>
                    <option value="B1">검수1</option>
                    <option value="C1">검수2</option>
                    <option value="D1">검수3</option>
                    <option value="EN">완료</option>
                  </select>
                </div>
                <div style="width: 60px;">
                  <div class="btn" style="width: 50px; height: 30px;">적용</div>
                </div>
              </div>
              <div style="display: flex;  flex-direction: row; height:40px;">
                <div style="width: 80px;">
                  <div class="btn" style="width: 70px; height: 30px;">선택삭제</div>
                </div>
                <div style="width: 80px;">
                  <div class="btn" style="width: 70px; height: 30px;">전체삭제</div>
                </div>
                <div style="width: 100px;">
                  <select style="border: 1px solid #ccc; height: 30px; width: 100px;padding-left: 5px;">
                    <option>20개씩 보기</option>
                    <option>30개씩 보기</option>
                    <option>40개씩 보기</option>
                    <option>50개씩 보기</option>
                    <option>100개씩 보기</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid_m datalist header" style="align-content: center; justify-content: center;">
              <div></div>
              <div>파일</div>
              <div>업로드일자</div>
              <div>상태</div>
              <div>라벨러</div>
              <div>검수1</div>
              <div>검수2</div>
              <div>검수3</div>
              <div>이력조회</div>
            </div>
            <template v-for="(item, idx) of c_job">
              <div class="grid_m datalist body" style="align-content: center; justify-content: center;">
                <div>
                  <div class="check_wrapper" style="padding:0 10px 0 0;">
                    <div class="check_box"></div>
                  </div>
                </div>
                <div><img src="/img/datamanager/aa.jpg" style="vertical-align: middle;padding: 3px 5px 3px 0;max-width: 50px;max-height: 50px;"> data_list_2021.jpg</div>
                <div>2021.10.10</div>
                <div>라벨링작업</div>
                <div>홍길동</div>
                <div></div>
                <div></div>
                <div></div>
                <div><div class="btn" style="width: 80px; height: 25px;">이력조회</div></div>
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
import Division_sel from '../components/datamanagement/Division_sel';
import ApiStatus from '../api/ApiStatus';

export default {
  name: 'DataStatus',
  components: {
    Datalist_Left,
    Division_sel,
  },
  async created() {
    if (this.$route.query) {
      const query = this.$route.query;
      this.pro_seq = query.pro_seq;
      this.div_seq = query.div_seq;
      this.$log.debug('created', this.pro_seq, this.div_seq);
      await this.load_data();
      await this.load_worker();
      await this.getJobList();
    }
  },
  computed: {
    c_list_worker() {
      if (this.view_worker && this.view_worker.length > 0) {
        return this.view_worker;
      }
      return [];
    },
    c_job() {
      if (this.job_list && this.job_list.length > 0) {
        return this.job_list;
      }
      return [];
    }
  },
  data() {
    return {
      list_div: [],
      list_max: [],
      list_view: [],
      sel_div: {},
      division: -1,
      list_project: [],
      pro_seq: -1,
      div_seq: -1,
      maxdepth: 0,
      selDiv: { seq: '', fullname: '분류를 선택하세요.' },
      list_worker: [],
      view_worker: [],
      work_status: '-1', // A0- 라벨할당전 라벨작업중A1 라벨작업완료A2 검수1할당B1 검수1완료B2 검수1반려B8
      work_status_send: 'A1',
      job_list: [],
    };
  },
  mounted() {
  },
  methods: {
    st_change() {
      if (this.list_worker && this.list_worker.length) {
        this.view_worker = [];
        for (const item of this.list_worker) {
          const datalist = {};
          datalist.user_id = item.user_id;
          datalist.user_name = item.user_name + this.getStatusCount(item);

          this.view_worker.push(datalist);
        }
      }
    },
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
      this.div_seq = sel_div.seq;
      this.sel_div = sel_div;
    },
    async load_data() {
      // 프로젝트 리스트
      await ApiStatus.getProjectList()
        .then((data) => {
          this.$log.debug(data);
          this.list_project = data.list;
        })
        .catch((e) => {

        });
    },
    async load_worker() {
      this.view_worker = [];
      await ApiStatus.getWokerList()
        .then((data) => {
          this.$log.debug(data);
          this.list_worker = data.list;
          for(const item of this.list_worker) {
            const datalist = {};
            datalist.user_id = item.user_id;
            datalist.user_name = item.user_name + this.getStatusCount(item);
            this.view_worker.push(datalist);
          }
        })
        .catch((e) => {

        });
    },
    async getJobList() {
      this.$log.debug(this.pro_seq, this.div_seq, this.work_status);
      const data = { work_status: this.work_status };
      await ApiStatus.getJobList(this.pro_seq, this.div_seq, data)
      .then((data) => {
        this.$log.debug(data);
        this.job_list = data.list;
      });
    },
    getStatusCount(item) {
      let reStr = '';
      if (this.work_status === 'A1') {
        reStr = `(${item.wcount})`;
      }
      if (this.work_status === 'B1') {
        if (item.bcount) {
          reStr = `(${item.bcount})`;
        }
      }
      if (this.work_status === 'C1') {
        if (item.ccount) {
          reStr = `(${item.ccount})`;
        }
      }
      if (this.work_status === 'D1') {
        if (item.dcount) {
          reStr = `(${item.dcount})`;
        }
      }
      return reStr;
    },
    onListClick(seq) {
      // alert(this.pro_seq + ' / ' + seq);
    },
  },
};
</script>

<style scoped>
.grid_m.datalist {
  grid-template-columns: 50px 250px 100px 100px 100px 100px 100px 100px 100px;
}
</style>

