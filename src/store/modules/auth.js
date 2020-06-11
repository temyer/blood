const validateLogin = (login, password) => new Promise((res, rej) => {
  setTimeout(() => {
    if (login === 'admin' && password === 'password') {
      const token = 'token';
      res(token);
    }
    rej(Error('Неправильные данные'));
  }, 1000);
});

const validateToken = (token) => new Promise((res, rej) => {
  setTimeout(() => {
    if (token === 'token') {
      const user = {
        login: 'admin',
      };
      res(user);
    }
    rej(Error('Неправильный токен'));
  }, 1000);
});

const tokenKey = 'token';

export default {
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(tokenKey, JSON.stringify(token));
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem(tokenKey);
    },
  },
  actions: {
    async authLogin({ commit }, { login, password }) {
      const token = await validateLogin(login, password);
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('removeToken');
    },
    async autoLogin({ commit }) {
      try {
        const token = JSON.parse(localStorage.getItem(tokenKey));
        if (token) {
          await validateToken(token);
          commit('setToken', token);
        }
      } catch (err) {
        commit('removeToken');
        throw Error(err);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
};
