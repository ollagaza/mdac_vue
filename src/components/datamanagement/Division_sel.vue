<template>
  <div style="width: 370px; display: flex; flex-direction: row;">
    <div style="width: 160px;">
      <select v-model="division" v-on:change="onDiv_change" style="border: 1px solid #ccc; height: 30px; width: 150px;padding-left: 5px;">
        <option value="-1">전체</option>
        <template v-for="(item, idx) in c_first_list_div">
          <option v-bind:value="item.seq">{{item.division_name}}</option>
        </template>
      </select>
    </div>
    <div style="width: 210px;">
      <div style="border: 1px solid #ccc; width: 200px; height: 30px;cursor: pointer; padding: 4px 0 0 3px;" v-on:click="onDivClick">{{selDiv.fullname}}</div>
    </div>
    <DataDivPopup ref="dataDivPopup"
                  v-bind:pro_seq ="pro_seq"
                  v-bind:maxdepth ="maxdepth"
                  v-bind:division="division"
                  v-bind:list_div="list_div"
                  v-on:onDiv="onDiv"></DataDivPopup>
  </div>
</template>

<script>
import ApiStatus from '../../api/ApiStatus';
import DataDivPopup from '../popup/DataDivPopup';

export default {
  name: 'Division_sel',
  props: ['pro_seq', 'div_seq'],
  components: {
    DataDivPopup,
  },
  data() {
    return {
      division: -1,
      list_div: [],
      first_div: [],
      maxdepth: 0,
      selDiv: { seq: -1, fullname: '분류를 선택하세요.' },
    };
  },
  async created() {
    // this.$log.debug('create ', this.div_seq);
    await this.load_div(this.pro_seq);
  },
  computed: {
    c_list_div() {
      if (this.list_div && this.list_div.length > 0) {
        return this.list_div;
      }
      return [];
    },
    c_first_list_div() {
      if (this.list_div && this.list_div.length > 0) {
        return this.list_div.filter(item => item.parent_division_seq === null || item.parent_division_seq === 0);
      }
      return [];
    },
  },
  watch: {
  },
  methods: {
    onDiv_change() {
      this.$emit('onSeldata', this.division, this.selDiv);
    },
    onDiv(div_seq, div_list) {
      if (!div_list) {
        return;
      }
      this.division = div_seq;
      this.selDiv = div_list;
      // this.$log.debug(this.division, this.selDiv);
      this.$emit('onSeldata', this.division, this.selDiv);
    },
    onDivClick() {
      const dev_seq = this.division;
      this.$refs.dataDivPopup.openPopup(dev_seq, this.selDiv.seq);
    },
    async make_divlist() {
      // this.$log.debug(this.div_seq);
      this.first_div = [];
      for (const idx in this.c_list_div) {
        const items = this.list_div[idx];
        if (!items.parent_division_seq || this.list_div[idx].parent_division_seq === 0) {
          this.list_div[idx].parent_division_seq = 0;
          this.list_div[idx].depth = 0;
          this.list_div[idx].first_seq = this.list_div[idx].seq;
          this.list_div[idx].fullname = this.list_div[idx].division_name;
          this.first_div.push(this.list_div[idx]);
        } else {
          const parname = this.getParName(this.list_div[idx].parent_division_seq);
          if (!parname || parname.length < 1) {
            continue;
          }
          this.list_div[idx].first_seq = parname[0].first_seq;
          this.list_div[idx].depth = parname[0].depth + 1;
          this.list_div[idx].fullname = parname[0].fullname + '>' + this.list_div[idx].division_name;
          
          // maxdepth 무조건 변경 by djyu 2021.11.03
          // if (this.list_div[idx].depth > this.maxdepth){
            this.maxdepth = this.list_div[idx].depth;
          // }
        }
        if (parseInt(this.div_seq, 10) === this.list_div[idx].seq) {
          this.division = this.list_div[idx].first_seq;
          this.selDiv = this.list_div[idx];
        }
      }
      // console.log(this.div_seq)
      // 프로젝트 변경시 division 초기화 by djyu 2021.11.03
      if(this.div_seq === -1) {
          this.division = -1
          this.selDiv = { seq: -1, fullname: '분류를 선택하세요.' }
      }
      this.$emit('onRedata', this.list_div, this.maxdepth);
    },
    getParName(seq) {
      const par_item = this.list_div.filter(item => item.seq === seq);
      return par_item;
    },
    async load_div(seq) {
      await ApiStatus.getDivision(seq)
        .then(async (data) => {
          // this.$log.debug(data);
          this.list_div = data.list;
          await this.make_divlist();
        }).catch((e) => {

        });
    },
  },
};
</script>

<style scoped>

</style>
