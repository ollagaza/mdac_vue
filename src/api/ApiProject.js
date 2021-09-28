import request from '../utils/request';

export default {
  // PROJECT
  getProjectInfo: data => request({
    url: '/project/projectinfo',
    method: 'post',
    data,
  }),

  createProject: project_info => request({
    url: '/project/createproject',
    method: 'post',
    data: project_info,
  }),

  updateProject: (project_seq, project_info) => request({
    url: `/project/${project_seq}/updateproject`,
    method: 'post',
    data: project_info,
  }),

  // DIVISION
  getDivisionInfo: data => request({
    url: '/project/divisioninfo',
    method: 'post',
    data,
  }),

  createDivision: division_info => request({
    url: '/project/createdivision',
    method: 'post',
    data: division_info,
  }),

  updateDivision: (division_seq, division_info) => request({
    url: `/project/${division_seq}/updatedivision`,
    method: 'post',
    data: division_info,
  }),

  setDivisionUsed: params => request({
    url: '/project/setdivisiondata',
    method: 'post',
    data: {
      params,
    },
  }),  
  delDivision: params => request({
    url: '/project/deldivision',
    method: 'post',
    data: {
      params,
    },
  }),

  // CLASS
  getClassInfo: data => request({
    url: '/project/classinfo',
    method: 'post',
    data,
  }),

  createClass: class_info => request({
    url: '/project/createclass',
    method: 'post',
    data: class_info,
  }),

  updateClass: (class_seq, class_info) => request({
    url: `/project/${class_seq}/updateclass`,
    method: 'post',
    data: class_info,
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
