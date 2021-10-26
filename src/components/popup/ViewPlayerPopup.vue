<template>
  <div class="popup_play_dim" ref="vPref"  v-bind:class="{ hide: !is_open }"  v-bind:style="{ left: c_left,  top: c_top, width: c_width, height: c_height }">
    <div class="popup_play_wrap" style="background-color: #1C3048">
      <div style="height: 30px; background-color: #1C3048">
      </div>
      <div style="display: flex; flex-direction: row; justify-content: center;">
        <div style="display: flex; flex-direction: row; justify-content: center;" v-bind:style="{ width: c_content_width, height: c_content_height }">
          <div style="align-self: center;">
            <template v-if="c_file_type === 'i'">
              <img v-bind:src="c_media_url" v-bind:style="{ 'max-width': c_max_width, 'max-height': c_max_height }">
            </template>
            <template v-if="c_file_type === 'v'">
              <video controls v-bind:style="{ 'max-width': c_max_width, 'max-height': c_max_height }">
                <source v-bind:src="c_video_url" type="video/mp4">
              </video>
            </template>
          </div>
        </div>
      </div>
      <div style="height: 50px; width:100%; display: flex; flex-direction: row; justify-content: center; align-content: center;">
        <div class="btn" style="width: 100px; align-self: center;" v-on:click="closePopup">닫기</div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  name: 'ViewPopup',
  components: {},
  mixins: [],
  data() {
    return {
      is_open: false,
      bodyX: 100,
      bodyY: 100,
      bodyW: 500,
      bodyH: 500,
      scrollX: 0,
      scrollY: 0,
      is_mouseout: false,
      is_mousedown: false,
      oldPos: { x: 0, y: 0 },
      minimumSize: { w: 300, h: 300 },
      gap: 10, // 테두리 넓이
      mousedownType: -1,
      file_seq: -1,
      file_type: 'i',
      isResult: 'o', // o 오리지널 r-결과
      media_url: '',
      video_url: '',
    };
  },
  created() {
  },
  beforeDestroy() {
    this.removeEventListener();
    window.removeEventListener('resize', this.onWindowResize);
  },
  computed: {
    ...mapGetters(['logged_info', 'current_domain']),
    c_left() {
      return `${this.bodyX}px`;
    },
    c_top() {
      return `${this.bodyY}px`;
    },
    c_width() {
      return `${this.bodyW}px`;
    },
    c_height() {
      return `${this.bodyH}px`;
    },
    c_content_width() {
      return `${this.bodyW - 10}px`;
    },
    c_content_height() {
      return `${this.bodyH - 80}px`;
    },
    c_max_width() {
      return `${this.bodyW - 20}px`;
    },
    c_max_height() {
      return `${this.bodyH - 100}px`;
    },
    c_file_type() {
      return this.file_type;
    },
    c_media_url() {
      if (this.media_url) {
        return this.media_url;
      }
      return '';
    },
    c_video_url() {
      if (this.video_url) {
        return this.video_url;
      }
      return '';
    },
  },
  watch: {
  },
  mounted() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  },
  methods: {
    getIsRect(e) { // 사각형 안에 있는지.
      let result = false;
      const x = e.clientX;
      const y = e.clientY;
      if (this.$refs.vPref === undefined || this.$refs.vPref.getBoundingClientRect() === undefined) {
        return false;
      }
      const r = this.$refs.vPref.getBoundingClientRect();
      if (x >= r.left && x <= r.left + r.width) {
        if (y >= r.top && y <= r.top + r.height) {
          result = true;
        }
      }
      return result;
    },
    getAreaWhere(iGap, e) {
      // 어디 지역에 있는지 1 -좌상 2-중상 3우상 4좌중 5중중 6우중 7좌하 8중하 9우하 -1 그외
      // 가장자리에서 icap이내 있으면.
      let iDime = -1;
      // 박스안에 있는지 확인
      if (this.getIsRect(e)) {
        const x = e.clientX;
        const y = e.clientY;
        const r = this.$refs.vPref.getBoundingClientRect();
        if (r === undefined) return iDime;
        // 좌측에 있는지 여부.
        if (x >= r.left && x <= r.left + iGap) {
          iDime = 4;
          if (y >= r.top && y <= r.top + iGap) {
            iDime = 1;
          } else if (y >= r.top + r.height - iGap && y <= r.top + r.height) {
            iDime = 7;
          }
        }
        // 중안
        if (x > r.left + iGap && x < r.left + r.width - iGap) {
          iDime = 5;
          if (y >= r.top && y <= r.top + iGap) {
            iDime = 2;
          } else if (y >= r.top + r.height - iGap && y <= r.top + r.height) {
            iDime = 8;
          }
        }
        // 우측
        if (x >= r.left + r.width - iGap && x <= r.left + r.width) {
          iDime = 6;
          if (y >= r.top && y <= r.top + iGap) {
            iDime = 3;
          } else if (y >= r.top + r.height - iGap && y <= r.top + r.height) {
            iDime = 9;
          }
        }
      }
      return iDime;
    },
    onMouseUp(event) {
      // this.$log.debug('mousemove');
      if (!this.is_open) return;
      this.is_mousedown = false;
      this.mousedownType = -1;
      if (this.$refs.vPref !== undefined) {
        this.$refs.vPref.style.cursor = 'default';
      }
    },
    onMouseMove(event) {
      // this.$log.debug('mousemove');
      if (!this.is_open) return;
      this.$nextTick(() => {
        const x = event.clientX;
        const y = event.clientY;
        this.is_mouseout = this.getIsRect(event);
        if (this.is_mousedown) {
          const iDim = this.getAreaWhere(this.gap, event);
          const movex = x - this.oldPos.x;
          const movey = y - this.oldPos.y;
          if (this.mousedownType === 5) {
            this.bodyX = this.bodyX + movex;
            this.bodyY = this.bodyY + movey;
            if (this.$refs.vPref !== undefined) {
              this.$refs.vPref.style.cursor = 'move';
            }
            // this.isMoved = true;
          } else {
            const docHeight = document.documentElement.clientHeight;
            const docWidth = document.documentElement.clientWidth;
            const navigationHeight = 70;
            if (this.mousedownType === 4) { // 좌중
              if (this.bodyX + movex < 0 || this.bodyW - movex < this.minimumSize.w) {
                return;
              }
              this.bodyX = this.bodyX + movex;
              this.bodyW = this.bodyW - movex;
            } else if (this.mousedownType === 6) { // 우중
              if (this.bodyW + movex > docWidth || this.bodyW + movex < this.minimumSize.w) {
                return;
              }
              this.bodyW = this.bodyW + movex;
            } else if (this.mousedownType === 2) { // 상
              if (this.bodyY + movey < navigationHeight || this.bodyH - movey < this.minimumSize.h) {
                return;
              }
              this.bodyY = this.bodyY + movey;
              this.bodyH = this.bodyH - movey;
            } else if (this.mousedownType === 8) { // 하
              if (this.bodyH + movey > docHeight || this.bodyH + movey < this.minimumSize.h) {
                return;
              }
              this.bodyH = this.bodyH + movey;
            } else if (this.mousedownType === 1) { // 좌상
              if (this.bodyX + movex < 0 || this.bodyW - movex < this.minimumSize.w) {
                return;
              }
              if (this.bodyY + movey < navigationHeight || this.bodyH - movey < this.minimumSize.h) {
                return;
              }
              this.bodyX = this.bodyX + movex;
              this.bodyW = this.bodyW - movex;
              this.bodyY = this.bodyY + movey;
              this.bodyH = this.bodyH - movey;
            } else if (this.mousedownType === 3) { // 우상
              if (this.bodyW + movex > docWidth || this.bodyW + movex < this.minimumSize.w) {
                return;
              }
              if (this.bodyY + movey < navigationHeight || this.bodyH - movey < this.minimumSize.h) {
                return;
              }
              this.bodyW = this.bodyW + movex;
              this.bodyY = this.bodyY + movey;
              this.bodyH = this.bodyH - movey;
            } else if (this.mousedownType === 7) { // 좌하
              if (this.bodyX + movex < 0 || this.bodyW - movex < this.minimumSize.w) {
                return;
              }
              if (this.bodyH + movey > docHeight || this.bodyH + movey < this.minimumSize.h) {
                return;
              }
              this.bodyX = this.bodyX + movex;
              this.bodyW = this.bodyW - movex;
              this.bodyH = this.bodyH + movey;
            } else if (this.mousedownType === 9) { // 우하
              if (this.bodyW + movex > docWidth || this.bodyW + movex < this.minimumSize.w) {
                return;
              }
              if (this.bodyH + movey > docHeight || this.bodyH + movey < this.minimumSize.h) {
                return;
              }
              this.bodyW = this.bodyW + movex;
              this.bodyH = this.bodyH + movey;
            }
          }
          this.oldPos.x = x;
          this.oldPos.y = y;
        } else {
          let cursorStyle = 'default';
          const iArea = this.getAreaWhere(this.gap, event);
          switch (iArea) {
            case 1:
              cursorStyle = 'nwse-resize';
              break;
            case 2:
              cursorStyle = 'ns-resize';
              break;
            case 3:
              cursorStyle = 'nesw-resize';
              break;
            case 4:
              cursorStyle = 'ew-resize';
              break;
            case 5:
              cursorStyle = 'default';
              break;
            case 6:
              cursorStyle = 'ew-resize';
              break;
            case 7:
              cursorStyle = 'nesw-resize';
              break;
            case 8:
              cursorStyle = 'ns-resize';
              break;
            case 9:
              cursorStyle = 'nwse-resize';
              break;
            default:
              cursorStyle = 'default';
              break;
          }
          // this.$log.debug('this.$refs.vPref', this.$refs.vPref);
          if (this.$refs.vPref !== undefined && this.$refs.vPref.style !== undefined) {
            this.$refs.vPref.style.cursor = cursorStyle;
          }
        }
      });
    },
    onMouseDown(event) {
      // this.$log.debug('mousedown');
      if (!this.is_open) return;
      this.$nextTick(() => {
        if (this.getIsRect(event)) {
          this.is_mousedown = true;
          this.oldPos.x = event.clientX;
          this.oldPos.y = event.clientY;
          this.mousedownType = this.getAreaWhere(this.gap, event);
          this.$log.debug('mousedown', this.mousedownType);
          if (this.mousedownType === 5) {
            if (this.$refs.vPref !== undefined) {
              this.$refs.vPref.style.cursor = 'move';
            }
          }
        } else {
          this.is_mousedown = false;
        }
      });
    },
    onWindowResize() {
      // this.$log.debug('onWindowResize');
      this.bodyX = this.bodyX - (this.scrollX - window.scrollX);
      this.bodyY = this.bodyY - (this.scrollY - window.scrollY);
      this.scrollX = window.scrollX;
      this.scrollY = window.scrollY;
    },
    addEventListener() {
      // 추가 이벤트.
      // this.$log.debug('addEventListener');
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mousemove', this.onMouseMove);
      // window.addEventListener('resize', this.onWindowResize);
    },
    removeEventListener() {
      // this.$log.debug('removeEventListener');
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousedown', this.onMouseDown);
      document.removeEventListener('mousemove', this.onMouseMove);
      // window.removeEventListener('resize', this.onWindowResize);
      // 등록한 이벤트 제거.
    },
    closePopup() {
      this.removeEventListener();
      this.is_open = false;
    },
    openVPPopup(option, size = null, pos = null) {
      this.$log.debug(option, this.current_domain);
      // const host_name = window.location.hostname;
      // const protocol = (window.location.protocol).replace(/:$/, '');
      if (option.file_type === 'i') {
        this.media_url = `${this.current_domain}/apid1/d1/datastatus/getimg/${option.seq}/o`;
      }
      if (option.file_type === 'v') {
        this.video_url = `${this.current_domain}/apid1/d1/datastatus/getvideo/${option.seq}/o`;
      }
      this.addEventListener();
      this.file_seq = option.seq;
      this.file_type = option.file_type;
      this.isResult = option.isResult; // o 오리지널 r-결과
      let media_url = '';
      if (this.file_type === 'i') {
        media_url = '/';
      }
      this.is_open = true;
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.offsetHeight;
      this.$log.debug(w, h)
      if (!size) {
        this.bodyW = 500;
        this.bodyH = 400;
      } else {
        this.bodyW = size.w;
        this.bodyH = size.h;
      }
      const gap = 20;
      if (!pos) {
        this.bodyX = (w - this.bodyW) / 2;
        this.bodyY = (h - this.bodyH - 60) / 2;
      } else {
        this.bodyX = pos.x;
        this.bodyY = pos.y;
      }

      this.$log.debug(w, h, this.bodyW, this.bodyH, this.bodyX, this.bodyY)
    },
  },
}
</script>

<style scoped>
.popup_play_dim {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup_play_dim.hide { display: none; }
.popup_play_wrap {
  width: 100%;
  hegith: 100%;
  /*position: relative;*/
  /*z-index: 2000;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-grow: 0;*/
  /*flex-shrink: 0;*/
  /*flex-basis: auto;*/
  /*background-color: #ffffff;*/
}
</style>
