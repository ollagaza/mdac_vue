<template>
<html lang="en">
 
  <body>
	 <div class="wrapper">
	<header class="main_header">
		<div class="">
			<h1>
			<div style="margin:16px 0 0 320px">
				<img src="/img/MDAC/main_logo.png" alt="LOGO IMAGE">
			</div>
			</h1>
			<h2>대메뉴</h2>
			<h2>로그인</h2>
			<div style="cursor:pointer;box-sizing: content-box;"  v-on:click="login" class="MDC_login MDC_box MDC_btnLogin">LOGIN</div>
			<div class="logo"><img src="/img/MDAC/logo_visual.png"></div>
			<div class="MTEG-DATA-CENTER">MTEG DATA CENTER</div>
			<div class="deep">딥러닝 데이터 가공 센터</div>
		</div>
	</header>
	<div id="wrap" class="wrap">
	<div class="content_layer p_t_60">
		<div class="content_wrapper">
			<div class="content">
				<div class="float_content left align_center fixed_width">
					<div class="center-1-imagex">
						<img src="/img/MDAC/visual_01.png" alt="">
					</div>
				</div>
				<div class="float_content right">
					<div class="center-1-text1 text">
						Video & image-based<br /> data labeling
					</div>
					<div class="center-1-text2 text">
						동영상 / 이미지 기반의 데이터 라벨링
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<div class="content_layer p_t_60">
		<div class="content_wrapper">
			<div class="content">
				<div class="float_content left">
					<div class="text center-2-text1">
					Cloud-based<br />
					online collaboration environment<br />
					with Data Streaming
					</div>
					<div class="text center-2-text2">
						데이터 스트리밍 및 클라우드 기반 온라인 협업환경
					</div>
				</div>

				<div class="float_content right align_center fixed_width">
					<div class="center-2-imagex">
						<img src="/img/MDAC/visual_02.png" alt="">
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>

	<div class="content_layer p_v_90">
		<div class="content_wrapper">
			<div class="content">
				<div class="float_content left align_center fixed_width ">
					<div class="p_b_20 center-3-image">
						<img src="/img/MDAC/visual_03.png" alt="">
					</div>
				</div>
				<div class="float_content right">
					<div class="text center-3-text1 text">
						Intuitive and<br />easy interface
					</div>
					<div class="center-3-text2">
						보기쉬운 데이터 통계 서버 환경
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>

	<div class="content_layer v_full" style="min-height: 620px !important;width:100%;height:620px;background-image:url('/img/MDAC/main_center_bg.jpg');">
		<div class="content_wrapper" style="vertical-align: middle;text-align: center;">
			<div class="content" style="float: left; width: 33%;">
				<div class="float_content align_center">
					<div class="p_b_20  center-4">
						직관적이고 쉬운 인터페이스
					</div>
				</div>
				<div class="float_content align_center fixed_width ">
					<div class="p_b_20">
						<img src="/img/MDAC/sub_img01.png" alt="">
					</div>
				</div>
				<div class="float_content align_center ">
					<div class="p_b_20 center-4-sub">
						Intuitive and<br />easy interface
					</div>
				</div>
			</div>
			<div class="content" style="float: left; width: 33%;">
				<div class="float_content align_center">
					<div class="p_b_20  center-4">
						다양한 AI 모델을 위한 입/출력 포맷 지원
					</div>
				</div>
				<div class="float_content align_center fixed_width ">
					<div class="p_b_20">
						<img src="/img/MDAC/sub_img02.png" alt="">
					</div>
				</div>
				<div class="float_content align_center ">
					<div class="p_b_20 center-4-sub">
						Supports input-output<br />formats for<br />various AI models

					</div>
				</div>
			</div>
			<div class="content" style="float: left; width: 33%;">
				<div class="float_content align_center">
					<div class="p_b_20  center-4">
						ANNOVIE 다양한 Tool로 제공합니다
					</div>
				</div>
				<div class="float_content align_center fixed_width ">
					<div class="p_b_20">
						<img src="/img/MDAC/sub_img03.png" alt="">
					</div>
				</div>
				<div class="float_content align_center ">
					<div class="p_b_20 center-4-sub">
						It comes with various<br />tools of ANNOVIE

					</div>
				</div>
			</div>

		</div>
	</div>	

	<div class="content_layer ">
		<div class="content_wrapper">
			<div class="content">
				<div class="float_content left align_center fixed_width p_t_55">
					<div class="p_b_20">
						<img src="/img/MDAC/medical_img.png" alt="">
					</div>
				</div>
				<div class="float_content right">
					<div class="text lh_140 w_700 center-1-text1">
						Labeling for medical<br />video&image analysis

					</div>
					<div class="center-1-text2">
						의료 영상 분석용 라벨링
					</div>
					<div class="center-1-text3">
						Radical Prostate Surgery<br />Laryngoscope<br />cervical cancer
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<div class="content_layer p_v_90">
		<div class="content_wrapper">
			<div class="content">
				<div class="float_content left">
					<div class="text center-1-text1">
					Labeling for crop<br />
					pest analysis
						
					</div>
					<div class="text center-1-text2">
						작물 병충해 분석용 라벨링
					</div>
					<div class="text center-1-text3">
						Genome data analysis<br />Crop analysis site
					</div>
				</div>

				<div class="float_content right align_center fixed_width">
					<img src="/img/MDAC/crop_img.png" alt="">
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</div>
	<footer style="box-sizing: content-box;">
		<div class="content_layer ">
			<div class="content_wrapper">
				<div class="content">
					<div class="float_content left">
						<div class="text footer-logo ">
							<img src="/img/MDAC/footer_logo.png" alt="">
						</div>
						<div class="left MDIC-AI">
							MDIC의 데이터 라벨링은 인공지능이 데이터를 판단하고 학습할 수 있도록<br />
							정확한 AI 모델을 위한 쉽고 빠른 데이터 확보, AI 전문가와 상담하세요.
						</div>
						<div class=" left footer-addr">
							서울특별시 마포구 성암로 330 DMC첨단산업센터 516<br />
							support@mteg.co.kr | 대표전화 : 02-859-3585
						</div>
						<div class="left footer-copyright">
							copyright©2021 MDC . All rights reserved.
				
						</div>
					</div>

					<div class="float_content right footer-right">
						<div class="site-liner"></div>

						<div class="site-guide">
							<div class="mteg" style='cursor:pointer;' onclick="window.open('http://www.mteg.co.kr');"></div>
							<div style="cursor:pointer;float:right;" onclick="window.open('http://www.mteg.co.kr');"><img src="/img/MDAC/arrow.png" style="vertical-align: middle;width:5px;height:9px;"></div>
						</div>
						<div class="site-liner"></div>
												
						<div class="site-guide">
							<div class="surgstory" style='cursor:pointer;' onclick="window.open('https://www.surgstory.com');"></div>
							<div style="cursor:pointer;float:right;" onclick="window.open('https://www.surgstory.com');"><img src="/img/MDAC/arrow.png" style="vertical-align: middle;width:5px;height:9px;"></div>
						</div>
						<div class="site-liner"></div>
						
						<div class="site-guide">
							<div class="cancerrop" style='cursor:pointer;' onclick="window.open('https://cancerrop.surgstory.com');"></div>
							<div style="cursor:pointer;float:right;margin-top:7px;" onclick="window.open('https://cancerrop.surgstory.com');"><img src="/img/MDAC/arrow.png" style="vertical-align: middle;width:5px;height:9px;"></div>
						</div>
						<div class="site-liner"></div>
						
						<div class="site-guide">
							<div class="geein" style='cursor:pointer;' onclick="window.open('https://geein.surgstory.com');"></div>
							<div style="cursor:pointer;float:right;" onclick="window.open('https://geein.surgstory.com');"><img src="/img/MDAC/arrow.png" style="vertical-align: middle;width:5px;height:9px;"></div>
						</div>
						<div class="site-liner"></div>
				</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	

	</footer>
</div>
 </body>
</html>

</template>

<style > 
    @import '../assets/css/app/default.css';
    @import '../assets/css/app/main.css';
</style>
<script>
import { mapActions, mapGetters } from 'vuex';
import EventBus from '../utils/eventbus';

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
	login() {
		EventBus.emit('loginPopupOpen');
	},
  },
  mounted() {
    // this.$log.debug(`Logged_Index :: ${this.is_logged}`);
    if (this.is_logged) {
      this.$router.push({ name: 'dashboard', params: { menu_id: 1} }).catch(() => {});
    }
  },
};
</script>
