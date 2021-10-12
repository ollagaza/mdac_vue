<template>
  <div>
    <template v-if="c_navview === 'print'">
      <div>
      </div>
    </template>
    <template v-else-if="c_navview === 'center'">
      <nav class="navigation">
        <div>
          <div v-on:click="routeMain" style="text-align: center;cursor: pointer; padding-top: 30px;"><img src="/img/datamanager/logo.png"></div>
        </div>
      </nav>
    </template>
    <template v-else>
      <nav class="navigation" >
        <div class="nav_box">
          <div class="logo" v-on:click="routeMain"><img src="/img/datamanager/logo.png"></div>
          <div class="nav_sp">
            <div class="nav_menu">
              <div class="nmenu" v-bind:class="{on: menu_id === '1'}" v-on:click="Menu1">Data Management</div>
              <div class="nmenu" v-bind:class="{on: menu_id === '2'}" v-on:click="Menu2">Statistics</div>
              <div class="nmenu" v-bind:class="{on: menu_id === '3'}" v-on:click="Menu3">Member</div>
            </div>
          </div>
          <div class="nav_login">
            <div style="display:flex; flex-direction: row;padding-top: 40px;justify-content: flex-end">
              <template v-if="is_logged">
                <div class="login_text"><span class="user_text">{{c_usrname}}</span> <span class="user_wel">회원님 환영합니다.</span></div>
                <template v-if="c_isadmin === 'Y'">
                  <div class="login_text" style="padding-left:10px;color:red;cursor: pointer;"  v-on:click="adminMenu">관리자</div>
                </template>
                <!--<div class="login_text pointer" style="margin-left: 20px;" v-on:click="infoMod">정보수정</div>-->
                <div class="login_text pointer" style="margin-left: 20px;" v-on:click="logout">로그아웃</div>
              </template>
              <template v-else>
                <div class="login_text pointer" v-on:click="login">로그인</div>
                <!--<div class="login_text pointer" style="padding-left: 20px;" v-on:click="join('c')">회원가입</div>-->
              </template>
            </div>
          </div>
        </div>
      </nav>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EventBus from '../utils/eventbus';

export default {
  name: 'Navigation',
  props: ['route_name', 'navview', 'menu_id'],
  data() {
    return {
      timer_id: 0,
    };
  },
  computed: {
    ...mapGetters(['logged_info', 'is_logged']),
    c_usrname() {
      //console.log(this.logged_info)
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
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions(['LogOut']),
    Menu1() {
      this.$router.push({ name: 'datastatus' });
    },
    Menu2() {
      this.$router.push({ name: 'statisticsworker', params: { search_seq: 1 } });
    },
    Menu3() {
      this.$router.push({ name: 'member' });
    },
    routeMain() {
      this.$router.push({ name: 'index' });
    },
    logout() {
      this.LogOut()
      // this.$store.dispatch('LogOut')
      // this.$log.debug(`logout`);
      // this.$store.getters['is_logged']
      // this.$log.debug(`logout_Logged_Navigation :: ${this.is_logged}`)
      this.$log.debug(`logout_Logged_Navigation :: ${this.is_logged}`)
      this.$router.push({ name: 'index' });
      // this.$router.go();
    },
    login() {
      EventBus.emit('loginPopupOpen');
    },
    join(isType) {
      const query = {};
      query.isType = isType;
      const params = {};
      this.$router.push({ name: 'join', params, query });
    },
    infoMod() {
      this.join('e');
    },
    adminMenu() {
    }
  },
};
</script>

<style scoped>
.navigation {
  min-height: 70px;
  background-color: #1c3048;
}
.nav_box {
  display:flex;
  flex-direction: row;
}
.nav_sp {
  flex: 2;
}
.nav_login{
  width: 500px;
  padding-right: 30px;
}
.nav_menu{
  display: flex;
  flex-direction: row;
  font-weight: 600;
  font-size: 18px;
  /* color: #030303; */
  color: rgba(255, 255, 255, 1);
  letter-spacing: -0.5px;
  padding-top: 35px;
}
.nav_menu>.nmenu{
  margin-right: 30px;
}
.nav_menu>.nmenu.on{
  color: #336a3c;
}
.nav_menu>.nmenu:hover{
  color: rgba(105, 105, 105, 0.7);
  cursor: pointer;
}
.logo {
  width: 187px;
  padding: 10px 0 0 20px;
  cursor: pointer;
}
.login_text{
  font-weight: 500;
  font-size: 12px;
  color: #ddd;
  letter-spacing: -0.5px;
}
.login_text:hover{
  color: rgba(155, 155, 155, 0.7);
}
</style>
