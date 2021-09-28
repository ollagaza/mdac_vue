<template>
  <div class="webp">
    <div style="padding: 20px 0 0 0 ;">
    page2444 eee
      <div>
        <div class="bg" ></div>
      </div>

    <video controls width="800">
      <source src="http://localhost:3600/apid1/d1/test/stream/7.mp4"
              type="video/mp4">
    </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page2',
  componets: [],
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.webp .bg{
  width: 1000px;
  height: 200px;
  background-image: url("/img/datam/cat2.webp");
}
.no-webp .bg{
  width: 1000px;
  height: 200px;
  background-image: url("/img/datam/cat3.jpg");
}
</style>
