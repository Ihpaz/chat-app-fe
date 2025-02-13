<template>
  <header class="app-header flex items-center px-5 gap-4 justify-between bg-white dark:bg-zinc-900 dark:border-zinc-700">
    <div class="flex items-center gap-x-4">
        <button id="button-toggle-menu " class=" p-2" @click="changeStatusSidebar()">
          <span class="sr-only">Menu Toggle Button</span>
          <span class="flex items-center justify-center h-6 w-6">
            <i class="uil uil-bars dark:text-gray-300 text-2xl"></i>
          </span>
        </button>
        <BreadcrumbComponent/>
    </div>

   
    <div class="flex flex-row gap-x-3 items-center">
        <button @click="toggleDarkMode()" class="w-10 lg:w-8 h-10 lg:h-8 rounded flex items-center justify-center bg-base dark:bg-zinc-800">
            <unicon :name="darkMode ? 'moon':'brightness'" width="20px" icon-style="line" height="20px" class="cursor-pointer" :fill="darkMode? 'white':'black'"></unicon>
        </button>
    
        <div class="flex gap-x-2 items-center justify-center cursor-pointer" @click="status = !status" v-click-outside="closeProfileAction">
            <div class="flex items-center w-10 lg:w-8 h-10 lg:h-8" >
                <img v-if="user.avatar" :src="user.avatar" alt="" class="object-cover w-8 h-8 rounded-full" srcset="">
                <div v-else class="w-8 h-8 rounded-full bg-gray-500 mx-auto"></div>
            </div>
            <div class="hidden lg:block">
                <div class="flex flex-col">
                    <h3 class="text-sm font-medium dark:text-gray-300">{{ user.name.toUpperCase() }}</h3>
                    <p class="text-xs text-disabled dark:text-gray-500">{{ user.role ? user.role.name : '' }}</p>
                </div>
            </div>
            <div v-show="status" class="text-disabled absolute top-20 right-8 bg-white dark:bg-zinc-800 shadow w-60 rounded border dark:border-gray-700">
                <div class="w-full h-40 flex flex-col items-center justify-center bg-profile relative" >
                    <div class="bg-black w-full h-full opacity-30 ">
                    </div>
                    <div class="absolute flex flex-col">
                        <img v-if="user.avatar" :src="user.avatar?.url" alt="" class="object-cover w-16 h-16 rounded-full" srcset="">
                        <div v-else class="object-cover w-16 h-16 rounded-full bg-white mx-auto"></div>
                        <h1 class="mt-2 text-center text-white text-base">{{ user.name.toUpperCase() }}</h1>
                        <p class="text-sm text-center text-white font-semibold">{{ user.role ? user.role.name : '' }}</p>
                    </div>
                </div>
                
          
                <hr class="w-full dark:border-zinc-700">
                <button @click="logout" class="p-4 text-center hover:bg-gray-50 dark:hover:bg-zinc-700 w-full text-xs flex justify-left items-center dark:text-gray-300">
                    <p class="text-sm font-medium">Keluar</p>
                </button>
                <hr class="w-full dark:border-zinc-700">
              
            </div>
        </div>
    </div>
  </header>
  

<dialog-component title="Logout" v-model="statusDialog">
    <div class="">
        <p class="font-medium text-gray-500 dark:text-gray-300 text-xl">
            Apakah anda yakin ingin logout akun Anda ? 
        </p>
    </div>

    <template v-slot:footer>
    <div class="flex justify-end space-x-2">
        <button
        @click="statusDialog = false"
        class="rounded pr-4 pl-2 py-1 bg-slate-100 hover:bg-slate-200 text-dark border border-grey-300 flex items-center dark:text-gray-300 dark:bg-zinc-700 dark:border-gray-900 dark:hover:bg-zinc-600 text-sm cursor-pointer"
        >
        <unicon
            icon-style="line"
            class="h-4 fill-gray-500 dark:fill-gray-300"
            name="times"
        ></unicon>
        Batal
        </button>

        <button
        class="rounded px-2 py-1 bg-slate-100 hover:bg-slate-200 text-dark border border-grey-300 flex justify-center items-center dark:text-gray-300 dark:bg-zinc-700 dark:border-gray-900 dark:hover:bg-zinc-600 text-sm cursor-pointer"
        @click="logout()"
        >
        <unicon
            icon-style="line"
            class="h-4"
            name="signout"
            fill="red"
        ></unicon>
        <span>Keluar</span>
        </button>
    </div>
    </template>
</dialog-component>

</template>

<style scoped>
.bg-profile {
    background-image: url('/img/bg/voronoi.svg');
    background-size: cover;
    
}
</style>
<script setup>
    import {useStore} from 'vuex'
    import { useRouter } from 'vue-router';
    import {ref,computed,inject} from 'vue'
    import BreadcrumbComponent from './Breadcrumb.vue';
    import DialogComponent from '../../components/patrial/DialogComponent.vue'

    const statusDialog = ref(false)
    const router = useRouter();
    const status = ref(false)
    const store = useStore()
    const axios = inject('axios')
    const status_bar = computed(() => store.getters.status_sidebar)
    const user = computed(() => store.getters['Auth/user'])
    // const isDarkMode = computed(() => store.getters['dark_mode']);

    const darkMode = ref(localStorage.theme === 'dark' || (!('theme' in localStorage)));
    
    // Function to toggle dark mode
    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
        localStorage.theme = darkMode.value ? 'dark' : 'light';
        let payload = !darkMode.value;
        store.dispatch('setDarkMode',payload)
        updateThemeClass();
    };

    // Function to update the class on the root element based on dark mode
    const updateThemeClass = () => {
        document.documentElement.classList.toggle('dark', darkMode.value);
    };


    const closeProfileAction = ()  => status.value = false;

     const logout = async () => {
       
        
        await axios.post('auth/logout',{},{
            headers:{
                Authorization: `Bearer ${store.getters['Auth/token']}`
            }
        }).then(async () => {
            await localStorage.removeItem('token')
            await store.dispatch('Auth/setUser',false)
            await store.dispatch('Auth/setToken','')
            await router.push({
                path:'/login'
            })
            
        })
       

    }
    function changeStatusSidebar() {
        let payload = !status_bar.value
        store.dispatch('setStatusBar',payload)
    }
</script>
