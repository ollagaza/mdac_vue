<template>
  <div class="left_menu">
    <div class="left_wrapper">
      <div class="left_head">Statistics</div>
      <div class="left_head_slice"></div>
      <div class="left_title" v-bind:class="{select: menu_id===1}" v-on:click="Menu1">작업자 통계</div>
      <div class="left_slice"></div>
      <div class="left_title" v-bind:class="{select: menu_id===2}" v-on:click="Menu2">프로젝트 통계</div>
    </div>
  </div>
</template>

<script>
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
      if (this.menu_id === 2){
        return true;
      }
      return false;
    },
  },
  watch: {
  },
  created() {
  },
  methods: {
    Menu1() {
      this.$router.push({ name: 'statisticsworker', params: { search_seq: 1 } });
    },
    Menu2() {
      this.$router.push({ name: 'statisticsproject', params: { search_seq: 3 } });
    },
  },
};
</script>

<style scoped>

</style>
