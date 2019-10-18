const state = {
  userName: 'test'
}

const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1);
  }
};

const mutations = {
  SET_USER_NAME(state, params) {
    state.userName = params;
  }
}

const actions = {
  updateUserName({commit, state, rootState, dispatch}) {
    // rootState.appName;
  }
}

export default {
  // namespaced: true, // 开启命名空间
  state,
  getters,
  mutations,
  actions,
  module: {
    //
  }
}
