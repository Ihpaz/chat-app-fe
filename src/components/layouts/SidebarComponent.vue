<template>
  <div class="app-menu dark:bg-zinc-900 dark:border-zinc-700" :class="{'hidden': !status_bar}">
    <div class="logo-box text-xl">  <img src="/img/logo.svg" class="h-8 block mr-2" alt="Logo" style=" opacity: .8;"> 
      <p class="text-base block dark:text-gray-300">
      <!-- CYSECLMS -->
     Chat Rooms Apps
    </p> 
    </div>
    <div data-simplebar>
      <ul class="menu">
        <li class=" dark:text-gray-500 border-b mx-4 text-left px-4 py-1 mb-2 dark:border-zinc-700">overview</li>
        <template v-for="(item, index) in menu">
          <li @click="goTo(item.key)"
            :key="item.key"
            v-if="!item.child_status" 
            
            class="menu-item cursor-pointer dark:fill-gray-400 ">
            <span class="dark:hover:bg-gray-500 menu-link rounded text-gray-500 dark:text-gray-300 fill-gray-500 dark:fill-gray-300" :class="{ 'dark:bg-red-600/60 dark:hover:bg-red-600/60 text-secondary dark:text-white bg-red-200 fill-red-800 dark:fill-white': '/' + active_menu.split('/')[1] == item.key }">
              <span class="menu-icon"><unicon
              icon-style="line"
              width="35"
              height="35"
              :name="item.icon"
            ></unicon></span>
              <span class="menu-text whitespace-normal"> {{ item.name }} </span>
            </span>
          </li>
          
          <li 
            v-else
            :key="index"
            @click="openChild(item.key)"
            class="menu-item cursor-pointer fill-gray-300 hover:fill-gray-500 dark:hover:fill-gray-300" >
            <a
              href="javascript:void(0)"
              :data-hs-collapse="'#'+item.key.slice(1)"
              class="dark:hover:bg-gray-500 menu-link rounded text-gray-500 dark:text-gray-300 fill-gray-500 dark:fill-gray-300"
              :class="{
              'fill-red-800 dark:fill-white text-secondary dark:text-white bg-red-200 dark:bg-red-600/60': item.child.find(menu => menu.key == '/' + active_menu.split('/')[1])
              }">
              
              <span class="menu-icon"><unicon
                  icon-style="line"
                  width="35"
                  height="35"
                  :name="item.icon"
                ></unicon></span>
              <span class="menu-text whitespace-normal"> {{ item.name }} </span>
              <span class="menu-arrow"></span>
            </a>
            <ul :id=item.key.slice(1) class="sub-menu hidden">
            <li class="hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer w-full content-start rounded" @click="goTo(child_menu.url)"
              v-for="child_menu in item.child"
              :key="child_menu.key">
              <div class="menu-link dark:text-gray-300 float-start" 
              :class="'/' + active_menu.split('/')[1] == child_menu.key ? 'text-secondary dark:text-red-600' : 'text-gray-600'"
              >
                <span class="menu-dot"></span>
                <span class="menu-text whitespace-normal">{{ child_menu.name }}</span>
              </div>
            </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const status_bar = computed(() => store.getters.status_sidebar)
const route = useRoute()

const router = useRouter()
const axios = inject('axios')
const menu = ref([
  {
      name:'Dashboard',
      url:'/dashboard',
      key:'/dashboard',
      icon:'estate',
      child_status:false
  },
  {
      name:'Chat Rooms',
      url:'/chat-rooms',
      key:'/chat-rooms',
      icon:'chat-info',
      child_status:false
  },
])

let active_menu = computed(() => route.path)

const goTo = async url => {
  await router.push({
    path: url,
  })
}

const openChild = key => {
  let index_menu = menu.value.findIndex(x => x.key == key)
  let new_data = menu.value.find(x => x.key == key)
  let new_menu = menu.value
  new_data.open_child = !new_data.open_child
  new_menu.splice(index_menu, 1, new_data)
  menu.value = new_menu
  
}

const collapseSidebar = () => store.dispatch('setStatusBar', false)    

</script>
