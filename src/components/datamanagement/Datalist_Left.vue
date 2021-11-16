<template>
  <div class="left_menu">
    <div class="left_wrapper">
      <div class="left_head">Data Management</div>
      <div class="left_head_slice"></div>
      <div class="left_title" v-bind:class="{select: menu_id===1}" v-on:click="Menu1">Data Status</div>
      <div class="left_slice"></div>
      <div class="left_title" v-bind:class="{select: menu_id===2}" v-on:click="Menu2">Project Manager</div>
      <template v-if="c_menu_show">
        <div class="left_slice"></div>
        <div class="left_title sub" v-bind:class="{select: menu_id===3}" v-on:click="Menu3">- 분류관리</div>
        <div class="left_slice"></div>
        <div class="left_title sub" v-bind:class="{select: menu_id===4}" v-on:click="Menu4">- 클래스관리</div>
      </template>

      <div class="left_title" v-bind:class="{select: menu_id===5}" v-on:click="Menu5">라벨링 가이드</div>
    </div>
  </div>
</template>

<script>
import apiproject from '../../api/ApiProject';

export default {
  name: 'Datalist_Left',
  components: { },
  props: ['menu_id'],
  data() {
    return {
    };
  },
  computed: {
    c_menu_show() {
      return true;
      // if (this.menu_id === 2 || this.menu_id === 3 || this.menu_id === 4){
      //   return true;
      // }
      // return false;
    },
  },
  watch: {
  },
  created() {
  },
  methods: {
    Menu1() {
      this.$router.push({ name: 'datastatus' });
    },
    Menu2() {
      this.$router.push({ name: 'project' });
    },
    Menu3() {
      this.$router.push({ name: 'division' });
    },
    Menu4() {
      this.$router.push({ name: 'class' });
    },
    Menu5() {
      this.$router.push({ name: 'board', params: { board_code: 1 } });
    },
    category_menu() {
      // Category Menu API 호출
      apiproject.getCategory(data)
        .then((result) => {

          if (result.category_info.length > 0) {
            for (const key in result.category_info) {
            }
          }
          this.member_list = result.member_info;
          this.paging = result.paging;
          this.no = this.paging.total_count - ((this.paging.cur_page-1) * this.paging.list_count);
          this.page_navigation = this.paging
          //console.log(this.paging)
        });
    }
  },
};
</script>

<style scoped>

</style>
