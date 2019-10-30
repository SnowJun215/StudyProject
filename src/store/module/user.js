import {login, authorization} from '@/api/user'
import {setToken} from "@/lib/util";

const state = {
  userName: 'test',
  rules: {}
}

const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1);
  }
};

const mutations = {
  SET_USER_NAME(state, params) {
    state.userName = params;
  },
  SET_RULES (state, rules) {
    state.rules = rules;
  }
}

const actions = {
  updateUserName({commit, state, rootState, dispatch}) {
    // rootState.appName;
  },
  login ({commit}, {userName, password}) {
    return new Promise((resolve, reject) => {
      login({userName, password}).then(res => {
        if (res.code === 200 && res.data.token) {
          setToken(res.data.token);
          resolve(res);
        } else {
          reject(new Error('error'));
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  authorization ({commit}, token) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        if (res.code === 200) {
          setToken(res.data.token);
          resolve(res.data.rules.page);
          commit('SET_RULES', res.data.rules.component);
        }else {
          reject(new Error('token error'));
        }
      }).catch(err=> {
        reject(err);
      })
    })
  },
  logout () {
    setToken('');
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
