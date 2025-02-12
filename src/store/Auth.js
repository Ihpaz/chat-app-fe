export default {
    namespaced: true,
    state: {
      user:false,
      menu:[],
      token:'',
      config: {
        headers: {
          Authorization: ``
        } 
      }
    },
    getters: { 
      user: (state) => state.user,
      menu: (state) => state.menu,
      token: (state) => state.token,
      config: (state) => state.config,
    },
    mutations: {
      setUser : (state,payload) => {
        state.user = payload
      },
      setMenu : (state,payload) => {
        state.menu = payload
      },
      setToken : (state,payload) => {
        state.token = payload,
        state.config.headers.Authorization = 'Bearer ' + payload
      }
    },
    actions: {
      setUser : ({commit},payload) => {
        commit('setUser',payload)
      },
      setToken : ({commit},payload) => {
        commit('setToken',payload)
      },
      setMenu : ({commit},payload) => {
        commit('setMenu',payload)
      }
    },
    modules: {
    }
  }
  