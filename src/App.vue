<template>
  
  <div class="bg-slate-100">
 

    <div v-if="$route.path === '/login' || $route.path === '/register' ||  $route.path === '/404' ||  $route.path === '/403' " class="bg-slate-100">
        <!-- Konten ketika pengguna belum masuk -->
        <router-view class="w-full" />
    </div>
    <div class="bg-slate-100" v-else>
      <!-- <div class="flex flex-row justify-between ">
        <Sidebar class="lg:block z-40 group transition-all lg:w-2/12 " :class="{'lg:w-0' : !status_bar  }"/>

        <div class="absolute right-0 bottom-0 top-0 transition-all lg:w-10/12"  :class="{'lg:w-full' : !status_bar  }">
          <HeaderVue />
          
          <div class="w-full min-h-screen dark:bg-zinc-900 bg-white">
            <router-view />
          </div>
        </div>
      </div> -->
      <div class="app-wrapper bg-slate-100" v-if="user">

        <SidebarComponent/>

        <div class="app-content bg-slate-100 dark:bg-zinc-900 " :class="{'w-full lg:w-[85%]': isStatusBarVisible}">
          <HeaderComponent/>
        
          <main class="">
            <router-view />
          </main>

          <FooterComponent/>
        </div>
      </div>
      <div v-else class="flex items-center justify-center content-center h-screen dark:bg-dark">
          <div class="w-40 h-40 full loader absolute">
          </div>
          <img src="/img/logo.svg" width="100px" class="animation-loading"/>
      </div>
    </div>
  </div>
 
</template>
<style>

/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%; 
  border: 4px solid rgb(192, 192, 192);
  border-right-color: rgb(188, 9, 9);
  animation: l2 2s infinite ease-out;
}
@keyframes l2 {to{transform: rotate(1turn)}}

.animation-loading {
  animation: zoom-in-zoom-out 2s ease-in infinite;;
}


@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s ease-in infinite;
  -moz-animation: rotating 2s ease-in infinite;
  -ms-animation: rotating 2s ease-in infinite;
  -o-animation: rotating 2s ease-in infinite;
  animation: rotating 2s ease-in infinite;
}

*:focus {
  outline: none;
}

/*Buat override css dari theme.min.css*/
input {
  --tw-ring-shadow: 0 0 #000 !important;
}

/*Buat override css dari theme.min.css*/
/* .apexcharts-text {
  fill: #FFFFFF !important;
} */
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect-wrapper {
  min-height: 0 !important;
}
</style>
<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
// import HeaderVue from './components/layouts/Header.vue'
// import Sidebar from './components/layouts/Sidebar.vue'
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import SidebarComponent from './components/layouts/SidebarComponent.vue';
import FooterComponent from './components/layouts/FooterComponent.vue';
// const status_bar = computed(() => store.getters.status_sidebar)
const store = useStore()
const darkMode = ref(
  localStorage.theme === 'dark' || !('theme' in localStorage)
)

// Function to update the class on the root element based on dark mode
document.documentElement.classList.toggle('dark', darkMode.value)

const user = computed(() => store.getters['Auth/user'])
const isStatusBarVisible = computed(() => store.getters['status_sidebar']);

</script>
