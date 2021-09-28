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
      if (this.menu_id === 2 || this.menu_id === 3 || this.menu_id === 4){
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
  },
};
</script>

<style scoped>

</style>
