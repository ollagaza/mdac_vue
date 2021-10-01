import request from '../utils/request';

export default {
  // 작업자 통계
  getStatisticsPerson: data => request({
    url: '/statistics/person',
    method: 'post',
    data,
  }),
  // 프로젝트 통계
  getStatisticsProject: data => request({
    url: '/statistics/project',
    method: 'post',
    data,
  }),
  // PROJECT
  getProjectInfo: data => request({
    url: '/project/projectinfo',
    method: 'post',
    data,
  }),

  // CLASS
  getClassInfo: data => request({
    url: '/project/classinfo',
    method: 'post',
    data,
  }),

  setClassUsed: params => request({
    url: '/project/setclassdata',
    method: 'post',
    data: {
      params,
    },
  }),
  delClass: params => request({
    url: '/project/delclass',
    method: 'post',
    data: {
      params,
    },
  }),
}