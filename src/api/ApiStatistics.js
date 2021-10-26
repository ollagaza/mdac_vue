import request from '../utils/request';

export default {
  // 작업자 통계
  getStatisticsPerson: data => request({
    url: '/statistics/person',
    method: 'post',
    data,
  }),
  // 프로젝트 통계
  getStatistics: data => request({
    url: '/statistics',
    method: 'post',
    data,
  }),
}