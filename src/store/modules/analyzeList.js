const analyzeListKey = 'analyzeList';

function getAnalyzeListFunction() {
  return new Promise((res) => {
    setTimeout(() => {
      res(JSON.parse(localStorage.getItem(analyzeListKey)));
    }, 1000);
  });
}

function setAnalyzeListFunction(list) {
  localStorage.setItem(analyzeListKey, JSON.stringify(list));
}

export default {
  state: {
    analyzeList: [],
  },
  mutations: {
    setAnalyzeList(state, list) {
      state.analyzeList = list;
    },
  },
  actions: {
    async getAnalyzeList({ state, commit }) {
      if (state.analyzeList.length > 0) {
        return state.analyzeList;
      }

      const analyzeList = await getAnalyzeListFunction();
      commit('setAnalyzeList', analyzeList);
      return analyzeList;
    },
    addAnalyze({ state, commit }, item) {
      const itemToAppend = {
        data: item,
        id: +Date.now(),
        createdAt: new Date(),
      };
      const analyzeList = [...state.analyzeList, itemToAppend];

      setAnalyzeListFunction(analyzeList);
      commit('setAnalyzeList', analyzeList);
    },
    editAnalyze({ state, commit }, { item, id }) {
      const analyzeList = JSON.parse(JSON.stringify(state.analyzeList));
      const indexOfItemToEdit = analyzeList.findIndex((analyze) => analyze.id === id);
      analyzeList[indexOfItemToEdit].data = item;
      analyzeList[indexOfItemToEdit].updatedAt = new Date();

      setAnalyzeListFunction(analyzeList);
      commit('setAnalyzeList', analyzeList);
    },
    deleteAnalyze({ state, commit }, id) {
      const analyzeList = state.analyzeList.filter((analyze) => analyze.id !== id);

      setAnalyzeListFunction(analyzeList);
      commit('setAnalyzeList', analyzeList);
    },
  },
  getters: {
    getAnalyzeById: (state) => (id) => state.analyzeList.find((item) => item.id === id),
  },
};
