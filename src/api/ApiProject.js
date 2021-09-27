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
