const analyzeListKey = 'analyzeList';

export default {
  namespaced: true,
  state: {
    analyzeList: JSON.parse(localStorage.getItem(analyzeListKey)) || [],
  },
  mutations: {
    _saveToLocalStorate(state, list) {
      localStorage.setItem(analyzeListKey, JSON.stringify(list));

      state.analyzeList = list;
      console.log(list);
    },
  },
  actions: {
    addAnalyze({ state, commit }, item) {
      const itemToAppend = {
        data: item,
        id: +Date.now(),
        createdAt: new Date(),
      };
      const analyzeList = [...state.analyzeList, itemToAppend];

      commit('_saveToLocalStorate', analyzeList);
    },
    editAnalyze({ state, commit }, { item, id }) {
      const analyzeList = JSON.parse(JSON.stringify(state.analyzeList));
      const indexOfItemToEdit = analyzeList.findIndex((analyze) => analyze.id === id);
      analyzeList[indexOfItemToEdit].data = item;
      analyzeList[indexOfItemToEdit].updatedAt = new Date();

      commit('_saveToLocalStorate', analyzeList);
    },
    deleteAnalyze({ state, commit }, id) {
      const analyzeList = state.analyzeList.filter((analyze) => analyze.id !== id);
      commit('_saveToLocalStorate', analyzeList);
    },
  },
  getters: {
    getAnalyzeById: (state) => (id) => state.analyzeList.find((item) => item.id === id),
  },
};
