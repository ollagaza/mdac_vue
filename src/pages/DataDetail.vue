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
                  <select v-model="work_status" v-on:change="status_change"
                          style="border: 1px solid #ccc; height: 30px; width: 110px;padding-left: 5px;background-position: 90% center;">
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
                    <option v-bind:value="'Z5'">반려전체</option>
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
                <div style="width: 160px;" v-if="file_type==='v' && this.view_type !== 'v'">
                  <select v-model="class_id" style="border: 1px solid #ccc; height: 30px; width: 150px;padding-left: 5px;">
                    <option value="-1">클래스 선택</option>
                    <option v-for="(item, idx) in c_class" v-bind:value="item.seq">{{item.class_name}}</option>
                  </select>
                </div>
                <div style="width: 90px;" v-if="file_type==='v' && this.view_type !== 'v'">
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
<!--                  <div class="btn" style="width: 70px; height: 30px;">전체삭제</div>-->
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
            <DataDetail_img ref="detail_list" v-bind:file_list="file_list" v-on:onViewClick="onViewClick" v-on:onHisClick="onHisClick" v-if="file_type!=='v'" ></DataDetail_img>
            <DataDetail_vid ref="detail_list" v-bind:file_list="file_list" v-on:onViewClick="onViewClick" v-on:onHisClick="onHisClick" v-on:onListClick="onListClick" v-if="file_type==='v' && view_type === 'l'"></DataDetail_vid>
            <DataDetail_vvv ref="detail_list"
                            v-bind:list_file_view="list_file_view"
                            v-bind:file_seq="file_seq"
                            v-on:onHisClick="onHisClick"
                            v-on:onList="onList" v-if="file_type==='v' && view_type === 'v'"></DataDetail_vvv>
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
    <ViewHisPopup ref="viewhis"></ViewHisPopup>
    <ViewPlayerPopup ref="viewplayer"></ViewPlayerPopup>
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
import DataDetail_vvv from '../components/datamanagement/DataDetail_vvv';
import EventBus from '../utils/eventbus';
import ViewPlayerPopup from '../components/popup/ViewPlayerPopup';
import ViewHisPopup from '../components/popup/ViewHisPopup';


export default {
  name: 'DataDetail',
  components: {
    Datalist_Left,
    Division_sel,
    Pagination,
    DataDetail_img,
    DataDetail_vid,
    DataDetail_vvv,
    ViewPlayerPopup,
    ViewHisPopup,
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
      if (this.file_type === 'v' && this.view_type === 'v') {
        await this.getJobView();
      } else {
        await this.getJobList();
      }
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
      // if(this.file_type === 'i') {
      //   return this.status_img;
      // }
      // if (this.file_type === 'v' && this.view_type === 'v') {
      //   this.work_status_send = 'B1';
      //   return this.status_view;
      // }
      // return this.status_vi;
      return this.status_img;
    }
  },
  watch: {
    async $route(to, from) {
      if (this.$route.query) {
        const query = this.$route.query;
        this.setQuery(query);
        // this.pro_seq = query.pro_seq;
        // this.div_seq = query.div_seq;
        // this.file_type = query.file_type ? query.file_type : 'i';
        if (this.file_type && this.file_type === 'v') {
          await this.getClass();
        }
        if (this.file_type === 'v' && this.view_type === 'v') {
          await this.getJobView();
        } else {
          await this.getJobList();
        }
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
      list_file_view: [],
      sel_div: {},
      division: -1,
      list_project: [],
      worker_id: '',
      pro_seq: -1,
      div_seq: -1,
      file_seq: -1,
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
      view_type: 'l',
      list_count: 20,
      page_navigation: {
        cur_page: 1,
        list_count: 10,
        page_count: 10,
        total_count: 0,
        no_paging: 'n',
      },
      status_img: [{ name: '라벨', value: 'A1' }, { name: '검수1', value: 'B1' }, { name: '검수2', value: 'C1' }, { name: '검수3', value: 'D1' }, { name: '반려', value: 'Z5' }, { name: '완료', value: 'E2' }],
      status_view: [{ name: '검수1', value: 'B1' }, { name: '검수2', value: 'C1' }, { name: '검수3', value: 'D1' }, { name: '완료', value: 'E2' }],
      status_vi: [{ name: '라벨', value: 'A1' }],
    };
  },
  mounted() {
  },
  methods: {
    status_change() {
    },
    setQuery(query) {
      this.division = query.division;
      this.worker_id = query.worker_id ? query.worker_id : '';
      this.pro_seq = query.pro_seq ? query.pro_seq : -1;
      this.div_seq = query.div_seq ? query.div_seq : -1;
      this.file_seq = query.file_seq ? query.file_seq : -1;
      this.label_cnt = query.label_cnt ? query.label_cnt : 100;
      this.class_id = query.class_id ? query.class_id : -1;
      this.work_status = query.work_status ? query.work_status : '-1';
      this.work_status_send = query.work_status_send ? query.work_status_send : 'A1';
      this.file_type = query.file_type ? query.file_type : 'i';
      this.view_type = query.view_type ? query.view_type : 'l';
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
      query.file_seq = this.file_seq;
      query.label_cnt = this.label_cnt;
      query.class_id = this.class_id;
      query.work_status = this.work_status;
      query.work_status_send = this.work_status_send;
      query.file_type = this.file_type;
      query.view_type = this.view_type;
      query.list_count = this.list_count;
      query.cur_page = this.page_navigation.cur_page;
      return query;
    },
    onHisClick(option) {
      this.$refs.viewhis.openHisPopup(option);
    },
    onViewClick(option) {
      this.$refs.viewplayer.openVPPopup(option);
    },
    onList() {
      const query = this.getQuery();
      query.view_type = 'l';
      const params = {};
      this.$router.push({ name: 'datadetail', params, query });
    },
    onListClick(seq) {
      if (this.file_type === 'i') {
        this.onViewClick(seq);
        return;
      }
      const query = this.getQuery();
      query.view_type = 'v';
      query.file_seq = seq;
      const params = {};
      this.$router.push({ name: 'datadetail', params, query });
    },
    async onSearch() {
      if (this.file_type === 'v' && this.view_type === 'v') {
        await this.getJobView();
        return;
      }
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
    nextStep(work_status_send) {
      const result = {};
      if (work_status_send === 'A1') {
        result.perv_id = 'A0';
        result.next_id_string = '라벨링';
      }
      if (work_status_send === 'B1') {
        result.perv_id = 'A2';
        result.next_id_string = '검수1';
      }
      if (work_status_send === 'C1') {
        result.perv_id = 'B2';
        result.next_id_string = '검수2';
      }
      if (work_status_send === 'D1') {
        result.perv_id = 'C2';
        result.next_id_string = '검수3';
      }
      if (work_status_send === 'E2') {
        result.perv_id = 'D2';
        result.next_id_string = '작업완료';
      }
      if (work_status_send === 'Z5') {
        result.perv_id = 'Z5';
        result.next_id_string = '반려';
      }
      return result;
    },
    a1_Pass(work_status_send, status) {
      let pass = true;
      if (!status){
        status = 'A0';
      }
      if (work_status_send === 'A1') {
        const swork = status.substr(1, 1);
        if (parseInt(swork, 10) === 5) {
          pass = false;
        } else {
          pass = true;
        }
      }
      return pass;
    },
    e2_Pass(work_status_send, status) {
      this.$log.debug(work_status_send, status);
      if (!status) {
        status = 'A0';
      }
      if (work_status_send === 'E2' && status.substr(1, 1) === '2') {
        return true;
      }
      return false;
    },
    async onApplyClick() {
      this.$log.debug('onApplyClick');
      const reject_per = ['B1', 'C1', 'D1'];
      const check_filelist = [];
      // 작업 선택.
      const ch = this.$refs.detail_list.getCheckList();
      const check_list = ch.checkData;
      for (const item in check_list) {
        if (check_list[item]) {
          check_filelist.push(item);
        }
      }
      if (check_filelist.length < 1) {
        EventBus.emit('alertPopupOpen', null, '선택한 작업이 없습니다. 리스트에서 작업을 선택하세요.', null);
        return;
      }
      if (this.worker_id.length < 1 && this.work_status_send !== 'E2') {
        EventBus.emit('alertPopupOpen', null, '선택한 작업자가 없습니다.', null);
        return;
      }
      this.$log.debug('v', this.view_type);
      if (this.file_type === 'v' && this.view_type !== 'v') {
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
      data.view_type = this.view_type;
      data.worker_id = this.worker_id;
      data.work_status_send = this.work_status_send;
      data.class_id = this.class_id;
      data.label_cnt = this.label_cnt;
      const obStep = this.nextStep(data.work_status_send);
      const check_filejoblist = [];
      if (this.file_type === 'i') {
        // 단계...
        this.$log.debug('in');
        for(let i = 0; i < check_filelist.length; i++) {
          const iseq = parseInt(check_filelist[i], 10);
          const job_item = this.file_list.filter((item) => {
            if (item.seq === iseq) {
              const result = item;
              if (item.sublist.length > 1) {
                const sub_item = item.sublist.filter(subitem => subitem.reject_act === 'A');
                result.sublist = [];
                result.sublist = sub_item;
              }
              return result;
            }
          });
          let oblist = {};
          if (job_item && job_item.length > 0 && job_item[0].sublist && job_item[0].sublist.length > 0) {
            // 반려시...
            if (this.work_status_send === 'Z5') {
              const iStatus = reject_per.indexOf(job_item[0].sublist[0].status);
              if (iStatus > -1) {
                obStep.perv_id = job_item[0].sublist[0].status;
              }
              this.$log.debug('perv_id', iStatus, job_item[0].sublist[0].status, obStep.perv_id);
            }
            if (obStep.perv_id !== job_item[0].sublist[0].status) {
              if (!this.e2_Pass(data.work_status_send, job_item[0].sublist[0].status)) {
                if (this.a1_Pass(data.work_status_send, job_item[0].sublist[0].status)) {
                  const str = this.StatusToStr(job_item[0].sublist[0].status);
                  EventBus.emit('alertPopupOpen', null, `선택된 작업중 '${str}' 단계는  '${obStep.next_id_string}' 작업을 입력 할수 없습니다. `, null);
                  return;
                }
              }
            }
            oblist = { seq: check_filelist[i], job_seq: job_item[0].sublist[0].job_seq, status: job_item[0].sublist[0].status };
          } else {
            // 신규로 입력.
            oblist = { seq: check_filelist[i], job_seq: 0, status: job_item[0].sublist[0].status };
          }
          check_filejoblist.push(oblist);
        }
        // 비디오 파일..
      } else {
        for (let i = 0; i < check_filelist.length; i++) {
          let oblist = {};
          if (this.view_type === 'v') {
            const a_seq = check_filelist[i].split('_');
            const ijobseq = parseInt(a_seq[0], 10);
            const irfseq = parseInt(a_seq[2], 10);
            const irf_pair_key = parseInt(a_seq[1], 10);
            const view_item = this.list_file_view.filter(item => item.job_seq === ijobseq);
            const rf_item = view_item[0].sublist.filter(item => item.rf_seq === irfseq);
            // this.$log.debug('rf_item', rf_item);
            if (rf_item[0].reject_act === 'R') {
              EventBus.emit('alertPopupOpen', null, `이미 재할당 받은 작업에 입력 할수 없습니다. `, null);
              return;
            }
            // 반려시...
            if (this.work_status_send === 'Z5') {
              const iStatus = reject_per.indexOf(rf_item[0].rf_status);
              if (iStatus > -1) {
                obStep.perv_id = rf_item[0].rf_status;
              }
              this.$log.debug('perv_id', iStatus, rf_item[0].rf_status, obStep.perv_id);
            }
            if (obStep.perv_id !== rf_item[0].rf_status) {
              const str = this.StatusToStr(rf_item[0].rf_status);
              if (this.a1_Pass(data.work_status_send, rf_item[0].rf_status)) {
                if (!this.e2_Pass(data.work_status_send, rf_item[0].rf_status)) {
                  EventBus.emit('alertPopupOpen', null, `선택된 작업중 '${str}' 단계는  '${obStep.next_id_string}' 작업을 입력 할수 없습니다. `, null);
                  return;
                }
              }
            }
            oblist = { seq: ijobseq, rf_seq: irfseq, rf_pair_key: irf_pair_key, status: rf_item[0].rf_status };
          } else {
            // 신규로 입력.
            oblist = { seq: check_filelist[i], job_seq: 0, status: 'A0' };
          }
          check_filejoblist.push(oblist);
        }
      }
      data.check_filelist = check_filelist;
      data.check_filejoblist = check_filejoblist;
      await ApiStatus.setWorkIn(this.pro_seq, this.div_seq, data)
        .then((result) => {
          this.onSearch();
        })
        .catch((e) => {
          this.$log.error(e);
        });
    },
    onAllCheckClick() {
      this.check_all_click = !this.check_all_click;
      this.$refs.detail_list.allCheck(this.check_all_click);
    },
    async onMovePage(page) {
      this.page_navigation.cur_page = page;
      if (this.file_type === 'v' && this.view_type === 'v') {
        await this.getJobView();
      } else {
        await this.getJobList();
      }
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
      if (this.file_type === 'v' && this.view_type === 'v') {
        await this.getJobView();
      } else {
        await this.getJobList();
      }
    },
    async getClass() {
      this.list_class = [];
      await ApiStatus.getClassList(this.pro_seq)
        .then((result) => {
          // this.$log.debug(result);
          this.list_class = result.list;
        });
    },
    getClassName(seq) {
      const classA = this.list_class.filter(item => item.seq === seq);
      if (classA && classA.length > 0) {
        return classA[0].class_name;
      }
      return '';
    },
    async getJobView() {
      this.check_all_click = false;
      this.$refs.detail_list.InitCh();
      this.page_navigation.list_count = this.list_count;
      this.page_navigation.page_count = this.CON_PAGE_COUNT;
      this.page_navigation.no_paging = 'n';
      const data = { file_seq: this.file_seq, work_status: this.work_status, file_type: this.file_type, paging: this.page_navigation };
      this.$log.debug('getJobView', data);
      await ApiStatus.getViewList(this.pro_seq, this.div_seq, data)
        .then((result) => {
          this.$log.debug(result);
          this.list_file_view = [];
          if (result.data && result.data.length > 0) {
            let idx = 0;
            let jlist = {};
            let old_rf_file_name = '';
            for (const item of result.data) {
              if(!item.rf_seq) {
                item.rf_seq = 0;
              }
              const view_seq = `${item.job_seq}_${item.rf_pair_key}_${item.rf_seq}`;
              if (jlist.job_seq !== item.job_seq) {
                if (jlist.sublist && jlist.sublist.length > 0) {
                  this.list_file_view.push(jlist);
                }
                jlist = {};
                jlist.sublist = [];
                jlist.job_seq = item.job_seq;
                jlist.user_name = item.user_name;
                jlist.label_cnt = item.label_cnt;
                jlist.class_seq = item.class_seq;
                jlist.class_name = this.getClassName(item.class_seq);
              }
              old_rf_file_name = item.rf_file_name;
              item.view_seq = view_seq;
              item.rf_file = 0; // 등록된 파일여부 확인..
              if (!item.status) {
                item.status = 'A0';
              }
              if (item.rf_file_name) {
                jlist.rf_file = 1;
              }
              jlist.sublist.push(item);
              idx += 1;
            }
            if (idx > 0) {
              this.list_file_view.push(jlist);
            }
            this.page_navigation = result.page_navigation;
          }
          // this.$log.debug(this.list_file_view);
        });
    },
    async getJobList() {
      this.check_all_click = false;
      this.$refs.detail_list.InitCh();
      this.page_navigation.list_count = this.list_count;
      this.page_navigation.page_count = this.CON_PAGE_COUNT;
      this.page_navigation.no_paging = 'n';
      const data = { work_status: this.work_status, file_type: this.file_type, paging: this.page_navigation };
      // this.$log.debug('getJobList', this.page_navigation, data);
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
            sublist.class_seq = item.class_seq;
            sublist.class_name = this.getClassName(item.class_seq);
            if (!item.status) {
              item.status = 'A0';
            }
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
            sublist.A0 = item.A0 ? item.A0 : 0;
            sublist.A1 = item.A1 ? item.A1 : 0;
            sublist.A2 = item.A2 ? item.A2 : 0;
            sublist.B1 = item.B1 ? item.B1 : 0;
            sublist.B2 = item.B2 ? item.B2 : 0;
            sublist.B5 = item.B5 ? item.B5 : 0;
            sublist.C1 = item.C1 ? item.C1 : 0;
            sublist.C2 = item.C2 ? item.C2 : 0;
            sublist.C5 = item.C5 ? item.C5 : 0;
            sublist.D1 = item.D1 ? item.D1 : 0;
            sublist.D2 = item.D2 ? item.D2 : 0;
            sublist.D5 = item.D5 ? item.D5 : 0;
            sublist.E2 = item.E2 ? item.E2 : 0;
            sublist.sumdata = `${sublist.A1}/${sublist.A2} ${sublist.B1}/${sublist.B2}/${sublist.B5}  ${sublist.C1}/${sublist.C2}/${sublist.C5}  ${sublist.D1}/${sublist.D2}/${sublist.D5} ${sublist.E2}`;
            sublist.reject_act = item.reject_act;
            sublist.reject_seq = item.reject_seq;
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
        this.$log.debug(this.file_list);
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

