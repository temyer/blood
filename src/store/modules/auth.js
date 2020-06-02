export default {
  namespaced: true,
  state: {
    token: 123,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
};
