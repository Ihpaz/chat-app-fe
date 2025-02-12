import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import axios from 'axios'
import chatrooms from './chatrooms'

const base_url = import.meta.env.VITE_API_BASE_URL || import.meta.env.apiUrl
const routes = [
  {
    path: '/',
    meta:{
      auth:true,
      key:'dashboard',
      path:'dashboard'
    },
    redirect: () => {
      return { path: '/dashboard' }
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta:{
      auth:true,
      key:'dashboard',
      path:'dashboard'
    },

    component: function () {
      return import('../views/dashboard/index.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import( '../views/Auth/Login.vue')
    },
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import('../views/Auth/Register.vue')
    },
  },
  {
    path: '/403',
    name: 'Denied',
    meta:{
      auth:true,
      key:'denied',
      path:'denied'
    },

    component: function () {
      return import('../views/errors/403.vue')
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: function () {
      return import('../views/errors/404.vue')
    },
  },
  chatrooms

]

 async function isAuth() {
  let token = localStorage.getItem('token')
    if (token) {
      await axios.get(`${base_url}/auth/me`,{
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        cek_user = res.data
        localStorage.setItem('token', res.data.authorisation?.token)
      }).catch(() => {
        localStorage.removeItem('token')
        cek_user = false
      })
    } else {
      cek_user = false
    }
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

let cek_user = false
let before = ''
router.beforeEach(async (to, from, next) => {
  if (to.path != '/login') {
    before = to.path
  } 

  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters['Auth/user']) {
      next()
    } else {
      next('/login')
    }
  } else if (to.name === 'login') {
    if (!store.getters['Auth/user']) {
      await isAuth()
      if (cek_user) {
        await store.dispatch('Auth/setUser',cek_user.user)
        await store.dispatch('Auth/setToken',cek_user.authorisation?.token)
        if (before != '' || to.name !== 'login') {
          next(before)
        } else {
        next('/')

        }
      } else {
        next()
      }
    } else {
        if (before != '' || to.name !== 'login') {
          next(to.path)
        } else {
        next('/')

        }
    }
  } else {
    next()
  }
})

export default router
