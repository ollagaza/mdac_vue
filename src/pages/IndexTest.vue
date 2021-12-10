<template>
  <div class="layout">
    <div style="position:relative; width: 1200px; height:100%; left: 0px; padding-top: 10px;">
      <div style="height: 100%; background-color:#000;">
          <img src='/img/datamanager/intro.jpg'>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IndexPage',
  componets: [],
  created() {
    this.$log.debug('index ', this.is_logged);
    // this.list_data();
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['is_logged']),

  },
  methods: {
    // list_data() {
    //   if (this.is_logged) {
    //     this.$router.push({ name: 'list' });
    //   }
    // },
  },
  mounted() {
    // if (this.is_logged) {
    //   this.$router.push({ name: 'dashboard' });
    // }
  },
};
</script>

<style scoped>
.layout {
  position: absolute;
  height: 85%;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
