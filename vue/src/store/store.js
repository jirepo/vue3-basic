
import { createStore } from 'vuex'
import blog from './blog-store.js'

export default createStore({
  state: {
    counter: 10,
    loginUser: {  // state에 object 정의 가능
      userId: 'default@domain.com', 
      empCode: '100'
    }
  },
  getters: {
    multiCount: state => {
      return state.counter * 10 
    }
  },
  mutations: {
    setCounter(state, value) {
      state.counter = value;
    },
  },
  actions: { 
  },
  modules: {
    blog: blog
  }
})  