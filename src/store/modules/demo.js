/**
 * @author  sparkHou
 * @date 2021-03-14 14:47
 * @Description:
 */
const state = {
  loading: false,
};

const mutations = {
  CHANGE_LOADING: (sta, loading) => {
    sta.loading = loading;
  },
};

const actions = {
  changeLoading({ commit }, loading) {
    commit('CHANGE_LOADING', loading);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
