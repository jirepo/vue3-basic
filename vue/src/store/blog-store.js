export default { 
  namespaced:true, 
  state: {
    selectedPostId: '222'
  },
  getters: {
    getPostId : state => {
       return state.selectedPostId + "///"
    },
    getPostId2(state, getters, rootState, rootGetters) {
      let retVal = getters.getPostId;
      retVal = retVal + "<>" + rootGetters.multiCount;
      return retVal;
    }
  },
  actions: {
  },
  mutations: {
    setSelectedPostId(state, value) {
      state.selectedPostId = value;
    },
  }
}