import { createStore } from 'vuex'
import Auth from './Auth'
export default createStore({
  state: {
    status_sidebar:true,
    sidebar_is_hover:false,
    dark_mode: localStorage.theme == 'light',
    is_detail_cyfirma_expand:false,
    show_cyfirma_recommendation:false,
  },
  getters: { 
    status_sidebar: (state) => state.status_sidebar,
    sidebar_is_hover: (state) => state.sidebar_is_hover,
    dark_mode: (state) => state.dark_mode,
    is_detail_cyfirma_expand: (state) => state.is_detail_cyfirma_expand,
    show_cyfirma_recommendation: (state) => state.show_cyfirma_recommendation,
  },
  mutations: {
    setStatusBar : (state,payload) => {
      state.status_sidebar = payload
    },
    setSidebarIsHover : (state,payload) => {
      state.sidebar_is_hover = payload
    },
    setDarkMode : (state,payload) => {
      state.dark_mode = payload
    },
    setIsDetailCyfirmaExpand : (state,payload) => {
      state.is_detail_cyfirma_expand = payload
    },
    setShowCyfirmaRecommendation : (state,payload) => {
      state.show_cyfirma_recommendation = payload
    },
  },
  actions: {
    setStatusBar : ({commit},payload) => {
      console.log(payload)
      commit('setStatusBar',payload)
    },
    setSidebarIsHover : ({commit},payload) => {
      console.log(payload)
      commit('setSidebarIsHover',payload)
    },
    setDarkMode: ({commit},payload) => {
      console.log("dark mode store", payload)
      commit('setDarkMode',payload)
    },
    setIsDetailCyfirmaExpand: ({commit},payload) => {
      commit('setIsDetailCyfirmaExpand',payload)
    },
    setShowCyfirmaRecommendation : ({commit},payload) => {
      commit('setShowCyfirmaRecommendation',payload)
    },
  },
  modules: {
    Auth
  }
})
