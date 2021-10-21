// DataDetail_vi.vue
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
                    <option v-bind:value="'A1'">라벨중</option>
                    <option v-bind:value="'A2'">라벨작업완료</option>
                    <option v-bind:value="'B1'">검수1</option>
                    <option v-bind:value="'B2'">검수1완료</option>
                    <option v-bind:value="'B5'">검수1반려</option>
                    <option v-bind:value="'C1'">검수2</option>
                    <option v-bind:value="'C2'">검수2완료</option>
                    <option v-bind:value="'C5'">검수2반려</option>
                    <option v-bind:value="'D1'">검수3</option>
                    <option v-bind:value="'D2'">검수3완료</option>
                    <option v-bind:value="'D5'">검수3반려</option>
                    <option v-bind:value="'EN'">완료</option>
                  </select>
                </div>
                <div style="width: 60px;">
                  <div class="btn" style="width: 50px; height: 30px;" v-on:click="onSearch">검색</div>
                </div>
              </div>
              <!--              <div class="btn navy" style="right: 0; width:100px; height: 36px;">프로젝트 등록</div>-->
            </div>
            <div style="display: flex;  flex-direction: row; width: 100%; height:40px;">
              <div style="flex: 2; display: flex;  flex-direction: row; width: 100%; height:40px;">
                <div class="check_wrapper" style="padding:0 10px 10px 0;">
                  <div class="check_box" v-bind:class="{ on: check_all_click }" v-on:click="onAllCheckClick"></div>
                </div>
                <div style="width: 120px;">
                  <select v-model="file_type" style="border: 1px solid #ccc; height: 30px; width: 110px;padding-left: 5px;" v-on:change="typechange">
                    <option value="i">이미지파일</option>
                    <option value="v">동영상파일</option>
                  </select>
                </div>
                <div style="width: 120px;margin: 0 0 0 50px;">
                  <select v-model="worker_id" style="border: 1px solid #ccc; height: 30px; width: 110px;padding-left: 5px;">
                    <option value="">작업자 선택</option>
                    <option v-for="(item, idx) in c_list_worker" v-bind:value="item.seq">{{item.user_name}}</option>
                  </select>
                </div>
                <div style="width: 80px;">
                  <select v-model="work_status_send" v-on:change="st_change" style="border: 1px solid #ccc; height: 30px; width: 70px;padding-left: 5px;">
                    <option v-for="item in c_status" v-bind:value="item.value">{{item.name}}</option>
                  </select>
                </div>
                <div style="width: 160px;" v-if="file_type==='v'">
                  <select v-model="class_id" style="border: 1px solid #ccc; height: 30px; width: 150px;padding-left: 5px;">
                    <option value="-1">클래스 선택</option>
                    <option v-for="(item, idx) in c_class" v-bind:value="item.seq">{{item.class_name}}</option>
                  </select>
                </div>
                <div style="width: 90px;" v-if="file_type==='v'">
                  <input type="text" v-model="label_cnt" style="border: 1px solid #ccc;height: 30px; width: 80px;" v-on:keypress="onlyNumber">
                </div>
                <div style="width: 90px;">
                  <div class="btn" style="width: 80px; height: 30px;" v-on:click="onApplyClick()">작업추가</div>
                </div>
              </div>
              <div style="display: flex;  flex-direction: row; height:40px;">
                <div style="width: 80px;">
                  <div class="btn" style="width: 70px; height: 30px;" v-on:click="deleteWork">작업삭제</div>
                </div>
                <div style="width: 80px;">
                  <div class="btn" style="width: 70px; height: 30px;">전체삭제</div>
                </div>
                <div style="width: 100px;">
                  <select v-model="list_count" v-on:change="onPage_change" style="border: 1px solid #ccc; height: 30px; width: 100px;padding-left: 5px;">
                    <option value="1">1개씩 보기</option>
                    <option value="2">2개씩 보기</option>
                    <option value="20">20개씩 보기</option>
                    <option value="30">30개씩 보기</option>
                    <option value="40">40개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                  </select>
                </div>
              </div>
            </div>
            <div style="padding-top: 5px;">
              <Pagination ref="Pagination"
                          :pageNationObj = "page_navigation"
                          v-on:onMovePage = "onMovePage"
              ></Pagination>
            </div>
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
import util from '../utils/util';
import util_name from '../utils/util_name';
import Pagination from '../components/Pagination';
import DataDetail_img from '../components/datamanagement/DataDetail_img';
import DataDetail_vid from '../components/datamanagement/DataDetail_vid';
import EventBus from '../utils/eventbus';


export default {
  name: 'DataDetail_vi_view',
  components: {
    Datalist_Left,
    Division_sel,
    Pagination,
  },
  async created() {
    if (this.$route.query) {
      const query = this.$route.query;
      this.setQuery(query);
      await this.load_data();
      await this.load_worker();
      if (this.file_type && this.file_type === 'v' && this.list_class.length < 1){
        await this.getClass();
      }
      // await this.getJobList();
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
      if (this.file_list && this.file_list.length > 0) {
        return this.file_list;
      }
      return [];
    },
    c_class() {
      if (this.list_class &&  this.list_class.length > 0){
        return  this.list_class;
      }
      return [];
    },
    c_status() {
      if(this.file_type === 'i') {
        return this.status_img;
      }
      return this.status_vi;
    }
  },
  watch: {
    async $route(to, from) {
      if (this.$route.query) {
        const query = this.$route.query;
        this.setQuery(query);
        if (this.file_type && this.file_type === 'v') {
          await this.getClass();
        }
        // await this.getJobList();
      }
    },
  },
  data() {
    return {
      CON_PAGE_COUNT: 10,
      check_all_click: false,
      list_div: [],
      list_max: [],
      list_view: [],
      list_class: [],
      sel_div: {},
      division: -1,
      list_project: [],
      worker_id: '',
      pro_seq: -1,
      div_seq: -1,
      label_cnt: 100,
      class_id: -1,
      maxdepth: 0,
      selDiv: { seq: '', fullname: '분류를 선택하세요.' },
      list_worker: [],
      view_worker: [],
      work_status: '-1', // A0- 라벨할당전 라벨작업중A1 라벨작업완료A2 검수1할당B1 검수1완료B2 검수1반려B8
      work_status_send: 'A1',
      file_list: [],
      file_type: 'i', // 파일타입 i- img v-video
      list_count: 20,
      page_navigation: {
        cur_page: 1,
        list_count: 10,
        page_count: 10,
        total_count: 0,
        no_paging: 'n',
      },
      status_img: [{ name: '라벨', value: 'A1' }, { name: '검수1', value: 'B1' }, { name: '검수2', value: 'C1' }, { name: '검수3', value: 'D1' }, { name: '완료', value: 'E2' }],
      status_vi: [{ name: '라벨', value: 'A1' }],
    };
  },
  mounted() {
  },
  methods: {
    setQuery(query) {
      this.division = query.division;
      this.worker_id = query.worker_id ? query.worker_id : '';
      this.pro_seq = query.pro_seq ? query.pro_seq : -1;
      this.div_seq = query.div_seq ? query.div_seq : -1;
      this.label_cnt = query.label_cnt ? query.label_cnt : 100;
      this.class_id = query.class_id ? query.class_id : -1;
      this.work_status = query.work_status ? query.work_status : '-1';
      this.work_status_send = query.work_status_send ? query.work_status_send : 'A1';
      this.file_type = query.file_type ? query.file_type : 'i';
      this.list_count = query.list_count ? query.list_count : 20;
      this.page_navigation.cur_page = query.cur_page ? query.cur_page : 1;
      this.page_navigation.list_count = this.list_count;
    },
    getQuery() {
      const query = {};
      query.division = this.division;
      query.worker_id = this.worker_id;
      query.pro_seq = this.pro_seq;
      query.div_seq = this.div_seq;
      query.label_cnt = this.label_cnt;
      query.class_id = this.class_id;
      query.work_status = this.work_status;
      query.work_status_send = this.work_status_send;
      query.file_type = this.file_type;
      query.list_count = this.list_count;
      query.cur_page = this.page_navigation.cur_page;
      return query;
    },
    async onSearch() {
      await this.getJobList();
    },
    deleteWork() {
      const check_filelist = [];
      const ch = this.$refs.detail_list.getCheckList();
      let item_co = 0;
      let check_list = [];
      if (this.file_type === 'i') {
        check_list = ch.checkData;
      } else {
        check_list = ch.checkSubData;
      }
      for (const item in check_list) {
        if (check_list[item]) {
          item_co += 1;
        }
      }
      if (item_co < 1) {
        EventBus.emit('alertPopupOpen', null, '선택된 작업이 없습니다. ', null);
        return;
      }
      const confirm_msg = `작업 ${item_co}건을 삭제하시겠습니까?`;
      const options = {};
      const sendParam = {};
      EventBus.emit('confirmPopupOpen', sendParam, confirm_msg, this.DelWork, options);
    },
    async DelWork() {
      const check_filelist = [];
      let check_list = [];
      const ch = this.$refs.detail_list.getCheckList();
      if (this.file_type === 'i') {
        check_list = ch.checkData;
      } else {
        check_list = ch.checkSubData;
      }
      for (const item in check_list) {
        if (check_list[item]) {
          check_filelist.push(item);
        }
      }
      // this.$log.debug(check_filelist, this.file_type, this.worker_id, this.work_status_send, this.class_id, this.label_cnt);
      if (check_filelist.length < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 작업이 없습니다. 리스트에서 삭제할 작업을 선택하세요.', null);
        return;
      }
      const check_filejoblist = [];
      if (this.file_type === 'i') {
        // 단계...
        for(let i = 0; i < check_filelist.length; i++) {
          const iseq = parseInt(check_filelist[i], 10);
          const job_item = this.file_list.filter(item => item.seq === iseq);
          if (job_item && job_item.length > 0 && job_item[0].sublist && job_item[0].sublist.length > 0) {
            for (const sublist_item of job_item[0].sublist) {
              check_filejoblist.push(`${check_filelist[i]}_${sublist_item.job_seq}`);
            }

          } else {
            check_filejoblist.push(`${check_filelist[i]}_0`);
          }
        }
      } else {
        for(let i = 0; i < check_filelist.length; i++) {
          check_filejoblist.push(`${check_filelist[i]}_0`);
        }
      }
      const data = {};
      data.check_filelist = check_filelist;
      data.check_filejoblist = check_filejoblist;
      data.file_type = this.file_type;
      // this.$log.debug('send ', data);
      EventBus.emit('confirmPopupClose', true);
      ApiStatus.delWork(this.pro_seq, this.div_seq, data)
        .then((result) => {
          // this.$log.debug(result);
          // this.list_project = data.list;
          EventBus.emit('alertPopupOpen', null, '작업을 삭제 하였습니다. ', null);
          this.onSearch();
        })
        .catch((e) => {

        });
    },
    onlyNumber($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },
    async onApplyClick() {
      const check_filelist = [];
      // 작업 선택.
      const ch = this.$refs.detail_list.getCheckList();
      const check_list = ch.checkData;
      this.$log.debug(ch, check_list);
      for (const item in check_list) {
        if (check_list[item]) {
          check_filelist.push(item);
        }
      }
      // this.$log.debug(check_filelist, this.file_type, this.worker_id, this.work_status_send, this.class_id, this.label_cnt);
      if (check_filelist.length < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 작업이 없습니다. 리스트에서 작업을 선택하세요.', null);
        return;
      }
      // this.$log.debug(this.worker_id);
      if (this.worker_id.length < 1 && this.work_status_send !== 'E2') {
        EventBus.emit('alertPopupOpen', null, '선택한 작업자가 없습니다.', null);
        return;
      }
      if (this.file_type === 'v') {
        if (this.class_id < 0) {
          EventBus.emit('alertPopupOpen', null, '선택한 클래스가 없습니다.', null);
          return;
        }
        if (isNaN(this.label_cnt)) {
          EventBus.emit('alertPopupOpen', null, '작업 갯수는 숫자로만 입력해주세요.', null);
          return;
        }
      }
      const data = {};
      data.pro_seq = this.pro_seq;
      data.div_seq = this.div_seq;
      data.check_filelist = check_filelist;
      data.file_type = this.file_type;
      data.worker_id = this.worker_id;
      data.work_status_send = this.work_status_send;
      data.class_id = this.class_id;
      data.label_cnt = this.label_cnt;
      const status_degree = data.work_status_send.charCodeAt(0);
      const status_id = data.work_status_send.charCodeAt(1);
      // this.$log.debug(data.work_status_send.charCodeAt(0));
      // this.$log.debug(data.work_status_send.charCodeAt(1));
      let perv_id = '';
      let next_id_string = '';
      if (data.work_status_send === 'A1') {
        // this.$log.debug('data : ', data.work_status_send);
        perv_id = 'A0';
        next_id_string = '라벨링';
      }
      if (data.work_status_send === 'B1') {
        perv_id = 'A2';
        next_id_string = '검수1';
      }
      if (data.work_status_send === 'C1') {
        perv_id = 'B2';
        next_id_string = '검수2';
      }
      if (data.work_status_send === 'D1') {
        perv_id = 'C2';
        next_id_string = '검수3';
      }
      if (data.work_status_send === 'E2') {
        perv_id = 'D2';
        next_id_string = '작업완료';
      }
      const check_filejoblist = [];
      if (this.file_type === 'i') {
        // 단계...
        for(let i = 0; i < check_filelist.length; i++) {
          const iseq = parseInt(check_filelist[i], 10);
          const job_item = this.file_list.filter(item => item.seq === iseq);
          if (job_item && job_item.length > 0 && job_item[0].sublist && job_item[0].sublist.length > 0) {
            if (perv_id !== job_item[0].sublist[0].status) {
              const str = this.StatusToStr(job_item[0].sublist[0].status);
              EventBus.emit('alertPopupOpen', null, `선택된 작업중 '${str}' 단계는  '${next_id_string}' 작업을 입력 할수 없습니다. `, null);
              return;
            }
            check_filejoblist.push(`${check_filelist[i]}_${job_item[0].sublist[0].job_seq}`);
            // this.$log.debug(check_filelist[i], job_item[0].sublist[0].status);
          } else {
            check_filejoblist.push(`${check_filelist[i]}_0`);
          }
        }
      } else {
        for(let i = 0; i < check_filelist.length; i++) {
          check_filejoblist.push(`${check_filelist[i]}_0`);
        }
      }
      data.check_filelist = check_filelist;
      data.check_filejoblist = check_filejoblist;
      // this.$log.debug('send ',data);
      await ApiStatus.setWorkIn(this.pro_seq, this.div_seq, data)
        .then((result) => {
          // this.$log.debug(result);
          // this.list_project = data.list;
          this.onSearch();
        })
        .catch((e) => {

        });
    },
    onAllCheckClick() {
      this.check_all_click = !this.check_all_click;
      this.$refs.detail_list.allCheck(this.check_all_click);
    },
    async onMovePage(page) {
      this.page_navigation.cur_page = page;
      await this.getJobList();
    },
    StatusToStr(code) {
      return util_name.StatusToStr(code);
    },
    getDateToStr(date) {
      return util.getDateToStr(date);
    },
    typechange() {
      const query = {};
      query.pro_seq = this.pro_seq;
      query.div_seq = this.div_seq;
      query.file_type = this.file_type;
      const params = {};
      this.$router.push({ name: 'datadetail', params, query });
    },
    st_change() {
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
    async load_data() {
      // 프로젝트 리스트
      await ApiStatus.getProjectList()
        .then((data) => {
          // this.$log.debug(data);
          this.list_project = data.list;
        })
        .catch((e) => {

        });
    },
    onSeldata(division, sel_div) {
      // this.$log.debug(division, sel_div);
      this.division = division;
      this.div_seq = sel_div.seq;
      this.sel_div = sel_div;
    },
    async load_worker() {
      this.view_worker = [];
      await ApiStatus.getWokerList()
        .then((data) => {
          // this.$log.debug(data);
          this.list_worker = data.list;
          for(const item of this.list_worker) {
            const datalist = {};
            datalist.seq = item.seq;
            datalist.user_id = item.user_id;
            datalist.user_name = item.user_name + this.getStatusCount(item);
            this.view_worker.push(datalist);
          }
        })
        .catch((e) => {

        });
    },
    async onPage_change() {
      this.page_navigation.cur_page = 1;
      await this.getJobList();
    },
    async getClass() {
      this.list_class = [];
      await ApiStatus.getClassList(this.pro_seq)
        .then((result) => {
          // this.$log.debug(result);
          this.list_class = result.list;
        });
    },
    async getJobList() {
      this.$log.debug('getJobList');
      this.check_all_click = false;
      this.$refs.detail_list.InitCh();
      this.page_navigation.list_count = this.list_count;
      this.page_navigation.page_count = this.CON_PAGE_COUNT;
      this.page_navigation.no_paging = 'n';
      const data = { work_status: this.work_status, file_type: this.file_type, paging: this.page_navigation };
      this.$log.debug('getJobList', this.page_navigation, data);
      await ApiStatus.getFileList(this.pro_seq, this.div_seq, data)
        .then((result) => {
          this.$log.debug(result);
          this.file_list = [];
          let jlist = {};
          jlist.sublist = [];
          if (result.list && result.list.length > 0) {
            let idx = 0;
            for (const item of result.list) {
              if (jlist.seq !== item.seq) {
                if (idx > 0) {
                  this.file_list.push(jlist);
                }
                jlist = {};
                jlist.sublist = [];
                jlist.rowcount = 1;
                jlist.class_seq = item.class_seq;
                jlist.division_seq = item.division_seq;
                jlist.file_name = item.file_name;
                jlist.file_path = item.file_path;
                jlist.file_size = item.file_size;
                jlist.file_type = item.file_type;
                jlist.org_file_name = item.org_file_name;
                jlist.play_time = item.play_time;
                jlist.project_seq = item.project_seq;
                jlist.reg_date = item.reg_date;
                jlist.seq = item.seq;
              }
              const sublist = {};
              sublist.job_seq = item.job_seq;
              sublist.status = item.status;
              sublist.user_name = item.user_name;
              sublist.label_cnt = item.label_cnt;
              sublist.labeler_jobdate = item.labeler_jobdate;
              sublist.labeler_member_seq = item.labeler_member_seq;
              sublist.labeler_method = item.labeler_method;
              sublist.labeler_regdate = item.labeler_regdate;
              sublist.mb_name = item.mb_name;
              sublist.mc_name = item.mc_name;
              sublist.md_name = item.md_name;
              jlist.rowcount += 1;
              jlist.sublist.push(sublist);
              idx += 1;
            }
            if (idx > 0) {
              // this.$log.debug('1', this.file_list);
              this.file_list.push(jlist);
              // this.$log.debug('2',this.file_list);
            }
          }
          // this.$log.debug(this.file_list);
          this.page_navigation = result.page_navigation;
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
  },
};
</script>

<style scoped>
.grid_m.datalist {
  grid-template-columns: 50px 250px 100px 100px 100px 100px 100px 100px 100px;
}
</style>


