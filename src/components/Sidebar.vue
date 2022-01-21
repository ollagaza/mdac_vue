<template>
  <div v-bind:class="{ left_menu : this.menu_show, left_menu_s : !this.menu_show }" style=" height: 100%;">
    <div v-bind:class="{ left_wrapper : this.menu_show, left_wrapper_s : !this.menu_show }" >
      <div class="left_logo">
        <span><img v-show="menu_show" v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show}" src="/img/MDAC/footer_logo.png" style="width:94px;20px;cursor:pointer;" v-on:click="routeMain"></span>
        <span>
        <img v-show="!menu_show" v-bind:class="{ fade_in : !this.menu_show, fade_out : this.menu_show }" src="/img/MDAC/logo_visual.png" style="width:36px;20px;cursor:pointer;" v-on:click="viewMenu"></span>
        <span style="padding: 0 0 0 0;float:right;" class="pointer"><img v-show="menu_show" v-bind:class="{ fade_in_3 : this.menu_show, fade_out : !this.menu_show }" src="/img/MDAC/mene.png" v-on:click="viewMenu"></span>
      </div>
      <div v-bind:class="[{ left_line : this.menu_show, left_line_s : !this.menu_show }, { fade_in_3 : this.menu_show, fade_out : !this.menu_show }]" ></div>
        <div class="left_head mainmenu" v-on:click="Menu1">
          <div v-bind:class="{ select: menu_id === 1 || menu_id === '' }">
            <div>
              <img src="/img/MDAC/Dashboard_icon_normal.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
              <img src="/img/MDAC/Dashboard_icon_hover.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
            </div>
            <div class="left_main txt" style="height: fit-content;display: flex; flex-direction: row;">
                <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }">Dashboard</div>
                <div style="flex: 1"></div>
                <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="pointer">
                  <img v-if="menu_id === ''" src="/img/MDAC/arrow.png" style="v_middle">
                  <img v-if="menu_id === 1 || menu_id === ''" src="/img/MDAC/arrow2.png" style="v_middle">
                </div>              
            </div>
          </div>
      </div>

      <div class="left_head mainmenu" v-on:click="Menu2">
        <div v-bind:class="{ select: menu_id >= 2 && menu_id <= 7 }">
          <div>
            <img src="/img/MDAC/DM_icon_normal.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
            <img src="/img/MDAC/DM_icon_hover.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
          </div>
          <div class="left_main txt" style="height: fit-content;display: flex; flex-direction: row;">
              <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }">Data Management</div>
              <div style="flex: 1"></div>
              <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="pointer">
                <img v-if="menu_id === ''" src="/img/MDAC/arrow.png" style="v_middle">
                <img v-if="menu_id >= 2 && menu_id <= 7" src="/img/MDAC/arrow2.png" style="v_middle">
              </div>
          </div>
        </div>
      </div>

      <div v-show="menu_id >= 2 && menu_id <= 7">
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 2 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu2">Data Status</span>
          </div>
        </div>
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 3 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu3">Project Manager</span>
          </div>
        </div>
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 4 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu4">Code Group Manager</span>
          </div>
        </div>
        <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="submenu" style="margin-bottom:70px;">
          <ul>
          <!-- <template v-for="(item, idx) of codegroup_mnulist">
            <div class="left_slice"></div>
            <div class="left_title sub" v-bind:class="{select: menu_id === 'A' + item.seq}" v-on:click="Menu7(item.seq, item.codegroup_name)">- {{ item.codegroup_name }}</div>
          </template> -->
            <li v-for="(item, idx) of codegroup_mnulist" class="left_subsub" v-bind:class="{select: sub_menu_id === 'A' + item.seq}" v-on:click="Menu_codegroup(item.seq, item.codegroup_name)">{{ item.codegroup_name }}</li>
          </ul>
        </div>
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 5 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu5">Class Manager</span>
          </div>
        </div>
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 6 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu6">라벨링가이드</span>
          </div>
        </div>
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 7 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu7">공지사항</span>
          </div>
        </div>
      </div>

      <div class="left_head mainmenu" v-on:click="Menu8">
        <div v-bind:class="{ select: menu_id === 8 || menu_id === 9 }">
          <div>
            <img src="/img/MDAC/Statistics_icon_normal.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
            <img src="/img/MDAC/Statistics_icon_hover.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
          </div>
          <div class="left_main txt" style="height: fit-content;display: flex; flex-direction: row;">
              <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }">Statistics</div>
              <div style="flex: 1"></div>
              <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="pointer">
                <img v-if="menu_id === ''" src="/img/MDAC/arrow.png" style="v_middle">
                <img v-if="menu_id === 8 || menu_id === 9" src="/img/MDAC/arrow2.png" style="v_middle">
              </div>           
          </div>
        </div>
      </div>

      <div v-show="menu_id === 8 || menu_id === 9">
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 8 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu8">작업자 통계</span>
          </div>
        </div>
        <div class="left_head mainmenu">
          <div v-bind:class="{ select: menu_id === 9 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu9">프로젝트 통계</span>
          </div>
        </div>    
      </div>


      <div class="left_head mainmenu" v-on:click="Menu10">
        <div v-bind:class="{ select: menu_id === 10 }">
          <div>
            <img src="/img/MDAC/Member_icon_normal.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
            <img src="/img/MDAC/Member_icon_hover.png" class="imgs" style="float:left;padding: 12px 0 0 0;">
          </div>
          <div class="left_main txt" style="height: fit-content;display: flex; flex-direction: row;">
              <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }">Member</div>
              <div style="flex: 1"></div>
              <div v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="pointer">
                <img v-if="menu_id === ''" src="/img/MDAC/arrow.png" style="v_middle">
                <img v-if="menu_id === 10" src="/img/MDAC/arrow2.png" style="v_middle">
              </div>           
          </div>
        </div>
      </div>
      
      <div v-show="menu_id === 10">
        <div class="mainmenu">
          <div v-bind:class="{ select: menu_id === 10 }">
            <span v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_sub txt" v-on:click="Menu10">작업자 관리</span>
          </div>
        </div>
      </div>

      <div v-bind:class="{ left_user : this.menu_show, left_user_s : !this.menu_show }" >
        <span><img src="/img/MDAC/profile.png" style="float:left;"></span>
        <!-- big menu -->
        <span v-show="menu_show" v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_name"><span style="color:#9fa4ea">{{c_usrname}}</span>님 환영합니다.</span>
        <span v-show="menu_show" v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }" class="left_logout pointer" v-on:click="logout">로그아웃</span>

        <!-- small menu -->
        <span v-show="!menu_show" v-bind:class="{ fade_in_3 : !this.menu_show, fade_out : this.menu_show }" class="left_name" style="margin-left:-14px;"><span style="color:#9fa4ea">홍길동</span>님</span>
        <span v-show="!menu_show" v-bind:class="{ fade_in_3 : !this.menu_show, fade_out : this.menu_show }" class="left_logout pointer" v-on:click="logout">로그아웃</span>
      </div>
      
      <div v-show="menu_show" v-bind:class="{ fade_in : this.menu_show, fade_out : !this.menu_show }"  class="left_bottom">
          <span>서울특별시 마포구 성암로 330 DMC첨단산업센터 516<br />
          support@mteg.co.kr<br />
          대표전화 : 02-859-3585<br /><br /><br />copyright©2021 MDC . All rights reserved.<br /><br />
          </span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import apiproject from '../api/ApiProject';

export default {
  name: 'Sidebar',
  props: ['route_name', 'navview', 'menu_id'],
  components: { },
  data() {
    return {
      // menu_id: this.$route.params.menu_id === '' || this.$route.params.menu_id === undefined ? 1 : this.$route.params.menu_id,    
      sub_menu_id: this.$route.params.sub_menu_id === '' || this.$route.params.sub_menu_id === undefined ? 1 : this.$route.params.sub_menu_id,    
      menu_show: this.$route.params.menu_show === undefined ? true : this.$route.params.menu_show,    
      board_code: this.$route.params.board_code === '' || this.$route.params.board_code === undefined ? '1' : this.$route.params.board_code,      
      codegroup_mnulist: '',  
       
    };
  },
  computed: {
  ...mapGetters(['logged_info', 'is_logged']),
    c_usrname() {
      if(this.logged_info) {
        //this.$log.debug(this.logged_info);
        return this.logged_info.user_name;
      }
      return '';
    },
    c_isadmin() {
      if (this.logged_info) {
        return this.logged_info.is_admin;
      }
      return '';
    },
    c_navview() {
      if (this.navview) {
        return this.navview;
      }
      return '';
    },
  },
  mounted() {
    if (!this.is_logged) {
      this.$router.push({ name: 'index' }).catch(() => {});
    }
    this.category_menu();
    // this.menu_id = this.menu_id === undefined ? 1 : this.$route.params.menu_id
    // this.sub_menu_id = this.$route.params.sub_menu_id === undefined ? true : this.$route.params.sub_menu_id 
    // this.menu_show = this.$route.params.menu_show === undefined ? true : this.$route.params.menu_show
    // this.board_code = this.$route.params.board_code === '' || this.$route.params.board_code === undefined ? '1' : this.$route.params.board_code  

  },
  watch: {
  },  
  created() {
    window.addEventListener('keypress', this.onKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.onKeyPress);
  },
  methods: {
    ...mapActions(['LogOut']),

    onKeyPress(e) {
            // console.log('KEYPRESS EVENT', e)
            // console.log(e.ctrlKey)
            if(e.key === '\u0011')
            {
              this.viewMenu();
            }
            //... your code
        },

    viewMenu() {
      this.menu_show = !this.menu_show;
      this.$emit('viewMenu', this.menu_show)
    },

    Menu1() {
      this.$router.push({ name: 'dashboard', params: { menu_id: 1, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu2() {
      this.$router.push({ name: 'datastatus', params: { menu_id: 2, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu3() {
      this.$router.push({ name: 'project', params: { menu_id: 3, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu4() {
      this.$router.push({ name: 'codegroup', params: { ref_codegroup: 0, menu_id: 4, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu5() {
      this.$router.push({ name: 'class', params: { menu_id: 5, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu6() {
      this.$router.push({ name: 'board', params: { board_code: '1', menu_id: 6, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu7() {
      this.$router.push({ name: 'board', params: { board_code: '2', menu_id: 7, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu8() {
      this.$router.push({ name: 'statisticsworker', params: { search_seq: 1, menu_id: 8, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu9() {
      this.$router.push({ name: 'statisticsproject', params: { search_seq: 3 , menu_id: 9, menu_show: this.menu_show } }).catch(() => {});
    },
    Menu10() {
      this.$router.push({ name: 'member', params: { menu_id: 10, menu_show: this.menu_show } }).catch(() => {});
    },
    routeMain() {
      this.$router.push({ name: 'index', params: { menu_id: 1, menu_show: this.menu_show } }).catch(() => {});
    },    
    Menu_codegroup(seq, codegroup_title) {
      // console.log(seq)
      this.$router.push({ name: 'codegroup', params: { ref_codegroup: seq, codegroup_title: codegroup_title, menu_id: 4, sub_menu_id: 'A' + seq, menu_show: this.menu_show } }).catch(() => {});
    },
    category_menu() {
      // code group Menu API 호출
      const data = {
        ref_codegroup:'0'
        ,codegroup_seq: ''
      };
      apiproject.getCodegroup(data)
        .then((result) => {
          if (result.codegroup_info.length > 0) {
            this.codegroup_mnulist = result.codegroup_info;
          }
        });
    },
    logout() {
      this.LogOut()
       .then(() => {
          this.$router.push({ name: 'index', params: { menu_id: 1 } }).catch(() => {});
        })
        .catch((error) => {
          this.$router.push({ name: 'index', params: { menu_id: 1 } }).catch(() => {});
          this.$log.error(error);
        })

      // this.$store.getters['is_logged']
      // this.$log.debug(`logout_Logged_Navigation :: ${this.is_logged}`)
      this.$log.debug(`logout_Logged_Navigation :: ${this.is_logged}`)
      // this.$router.go();
    },
    login() {
      EventBus.emit('loginPopupOpen');
    },
  },
};

</script>

<style scoped>

</style>
