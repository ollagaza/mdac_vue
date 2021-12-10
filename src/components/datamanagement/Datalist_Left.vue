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
        <!-- <div class="left_title sub" v-bind:class="{select: menu_id===3}" v-on:click="Menu3">- 분류관리</div>
        <div class="left_slice"></div> -->
        <div class="left_title sub" v-bind:class="{select: menu_id==='A0'}" v-on:click="Menu0">- 코드그룹관리</div>
        <template v-for="(item, idx) of codegroup_mnulist">
        <div class="left_slice"></div>
        <div class="left_title subsub" v-bind:class="{select: menu_id === 'A' + item.seq}" v-on:click="Menu7(item.seq, item.codegroup_name)">- {{ item.codegroup_name }}</div>
        </template>
        <div class="left_slice"></div>
        <div class="left_title sub" v-bind:class="{select: menu_id===4}" v-on:click="Menu4">- 클래스관리</div>
      </template>
 
      <div class="left_title" v-bind:class="{select: menu_id===5}" v-on:click="Menu5">라벨링 가이드</div>
      <div class="left_title" v-bind:class="{select: menu_id===6}" v-on:click="Menu6">공지사항</div>
    </div>
  </div>
</template>

<script>
import apiproject from '../../api/ApiProject';

export default {
  name: 'Datalist_Left',
  components: { },
  props: ['menu_id', 'ref_codegroup'],
  data() {
    return {
      codegroup_mnulist: '',            
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
  mounted() {
    this.category_menu();
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
    Menu0() {
      this.$router.push({ name: 'codegroup', params: { ref_codegroup: 0 } });
    },
    Menu4() {
      this.$router.push({ name: 'class' });
    },
    Menu5() {
      this.$router.push({ name: 'board', params: { board_code: '1' } });
    },
    Menu6() {
      this.$router.push({ name: 'board', params: { board_code: '2' } });
    },
    Menu7(seq, codegroup_title) {
      // console.log(seq)
      this.$router.push({ name: 'codegroup', params: { ref_codegroup: seq, codegroup_title: codegroup_title } });
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
    }
  },
};
</script>

<style scoped>

</style>
