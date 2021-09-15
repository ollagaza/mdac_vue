import Vue from 'vue';

const state = {
  logged_info: {},
  token: null,
};

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  SET_LOGGED_INFO(state, logged_info) {
    state.logged_info = logged_info;
  },
  SET_LOGGED_UPDATE(state, data) {
    // Vue.$log.debug('SET_LOGGED_UPDATE', data, state.logged_info);
    //state.logged_info.birth_day = data.birth_day;
    state.logged_info.phone = data.phone;
    state.logged_info.email = data.email;
    // Vue.$log.debug('SET_LOGGED_UPDATE', state.logged_info);
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
};

export default {
  state,
  mutations,
};
