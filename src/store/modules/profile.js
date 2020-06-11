const userKey = 'user';

function getSexListFunction() {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        { id: 0, text: 'М' },
        { id: 1, text: 'Ж' },
      ]);
    }, 1000);
  });
}

function getUserFunction() {
  return new Promise((res) => {
    setTimeout(() => {
      res(JSON.parse(localStorage.getItem(userKey)));
    }, 2000);
  });
}

function setUserFunction(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}


export default {
  state: {
    sexList: [],
    user: null,
  },
  mutations: {
    setItem(state, { item, value }) {
      state[item] = value;
    },
  },
  actions: {
    async getSexList({ commit, state }) {
      if (state.sexList.length > 0) {
        return state.sexList;
      }
      const sexList = await getSexListFunction();
      commit('setItem', { item: 'sexList', value: sexList });
      return sexList;
    },
    async getUser({ commit, state }) {
      if (state.user) {
        return state.user;
      }
      const user = await getUserFunction();
      commit('setItem', { item: 'user', value: user });
      return user;
    },
    saveUser({ commit }, user) {
      commit('setItem', { item: 'user', value: user });
      setUserFunction(user);
    },
  },
};
