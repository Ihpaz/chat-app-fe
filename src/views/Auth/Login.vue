<style type="text/tailwindcss">
#toggle-desktop:checked ~ label div.toggle-circle {
  @apply translate-x-3;
}
</style>
<style scoped></style>
<template>
  <div class="dark:bg-zinc-800 lg:bg-base min-h-screen">
    <div class="flex flex-col lg:flex-row min-h-screen mx-auto bg-auth-primary lg:bg-base dark:bg-zinc-800">
      <div class="w-full lg:w-7/12 pt-10 pb-4 lg:pt-24 text-left px-8 lg:px-10 z-40 hidden lg:block">
        <div class="lg:w-4/5 flex flex-col justify-center mx-auto">
          <img src="/img/logo.svg" class="mt-4 mx-auto lg:block hidden h-80" alt="Ilustrasi Gambar Halaman Login"
            style="opacity: 0.8" />
          <h1 class="text-3xl lg:text-3xl font-medium mt-2 text-tertiary dark:text-gray-100 text-center tracking-wider"  :class="{'glow-in-the-dark': darkMode }">
            Chat Rooms Apps
          </h1>
          <p
            class="my-5 text-sm font-medium text-gray-500 hidden lg:block dark:text-slate-300 text-center w-3/5 mx-auto">
          
          </p>
        </div>
      </div>
      <div class="pt-16 lg:pt-10 w-full lg:w-5/12 px-8 lg:px-20 bg-auth-primary dark:bg-zinc-800 lg:dark:bg-auth-primary">
        <div class="mb-8">
          <div class="flex flex-row justify-end">
            <div class="flex justify-center items-center cursor-pointer">
              <unicon name="brightness" width="20px" icon-style="line" height="20px" class="mr-2"
              fill="white"></unicon>

              <input type="checkbox" id="toggle-desktop" class="hidden" />

              <label for="toggle-desktop" class="cursor-pointer" @click="toggleDarkMode()">
                <div class="w-9 h-5 bg-slate-500 rounded-full flex items-center p-1">
                  <div class="w-4 h-4 bg-white rounded-full toggle-circle"></div>
                </div>
              </label>
              <unicon name="moon" width="18px" icon-style="line" height="18px" class="ml-2"
                fill="white"></unicon>
            </div>
          </div>
        </div>

        <h1 class="text-2xl font-medium lg:mt-12 text-white text-center mb-16">
          Chat Rooms Apps
        </h1>

        <div id="tooltip-password" role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
          <p>{{ show ? 'Tampilkan' : 'Sembunyikan' }}</p>
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>

        <form>
          <div class="mt-6">
            <input type="text" id="email"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 drop-shadow-xl"
              placeholder="Email atau username" v-model="form.email" />
          </div>
          <div class="mt-6" x-data="{ show: true }">
            <div class="relative">
              <input :type="show ? 'password' : 'text'" id="password"
                class="bg-gray-200 border pr-8 border-gray-300 text-gray-900 text-sm rounded focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 drop-shadow-xl"
                placeholder="Password" v-model="form.password" />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button data-tooltip-target="tooltip-password" type="button"
                  class="absolute top-0 right-0 bottom-0 w-10" @click="show = !show">
                  <unicon :name="show ? 'eye-slash' : 'eye'" width="20px" icon-style="line" height="20px" class="mr-2"
                    :fill="darkMode ? 'white' : 'black'"></unicon>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-6 mb-10 lg:mb-20">
            <button :type="loading ? 'button':'submit'"
              class="text-white bg-gray-800  shadow-lg focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 w-full transition-all duration-400" :class="loading ? 'cursor-not-allowed bg-zinc-700 hover:bg-zinc-700 opacity-60 text-gray-500' : 'cursor-pointer hover:bg-gray-900 dark:bg-auth-primary hover:dark:bg-tertiary lg:hover:dark:bg-gray-900 lg:dark:bg-gray-800 lg:hover:bg-gray-900'"
              @click="login">


              <span v-if="!loading">Login</span>

              <div v-else class="flex flex-row justify-between items-center">
                <p class="mr-3">Loading...</p>
                <div role="status" class="">
                  <svg aria-hidden="true"
                    class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-500 dark:fill-white"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                  <span class="sr-only p-4">Loading...</span>
                </div>
              </div>
            </button>

            <p class="text-center text-white m-2">Or Login Via Google</p>

            <button type="button" @click="signInWithGoogle" class=" bg-base  shadow-lg focus:ring-4
             focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 
             me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 w-full transition-all duration-400
             hover:bg-gray-400 hover:text-white
             "
             >
              <div class="flex gap-2 items-center justify-center">
                <unicon
                  icon-style="line"
                  width="20"
                  height="20"
                  name="google"
                ></unicon> 
                <p>Sign in with Google</p>
              </div>
               
            </button>
          </div>
          <p class="text-gray-200 text-center text-xs font-medium">
            Copyright &copy; 2024
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.glow-in-the-dark {
  text-shadow:.5px .5px 2px #C3073F, .5px .5px 7px #C3073F;
}
</style>
<script setup>
  import { useStore } from 'vuex'
  import { ref, inject, onMounted,onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { initFlowbite } from 'flowbite'
  import {responseErrorApi} from '../../helpers/response.js'
  import { googleAuthCodeLogin,googleTokenLogin } from "vue3-google-login"
  import { requestPermission, onMessageListener } from "../../firebase";

  const loading = ref(false)


  const darkMode = ref(
    localStorage.theme === 'dark' || !('theme' in localStorage)
  )

  const show = ref(true)


  // Function to toggle dark mode
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.theme = darkMode.value ? 'dark' : 'light'
    updateThemeClass()
  }

  // Function to update the class on the root element based on dark mode
  const updateThemeClass = () => {
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  // Set up the initial dark mode class
  onMounted(() => {
    updateThemeClass()
    initFlowbite()
  })


  const store = useStore()
  const axios = inject('axios')
  const router = useRouter()
  // const errorMessage = ref('')
  const form = ref({
    email: '',
    password: '',
  })
  const login = async e => {
    loading.value = true;
        
    
        await axios
          .post('auth/login', form.value)
          .then(response => {
            store.dispatch('Auth/setUser', response.data.user)
            store.dispatch('Auth/setToken', response.data.authorisation?.token)
            localStorage.setItem('token', response.data.authorisation?.token)
            router.push({
              name: 'dashboard',
            })
          })
          .catch(err => {
            // errorMessage.value = 'Email or Password is Incorret'
            let pesanError='❌ Email atau Password salah';
    
            if (err?.response?.status == 400){
              pesanError = '❌ ' + err.response?.data?.message;
            }
    
            toast.error(pesanError, {
              theme: 'auto',
              type: 'default',
              hideProgressBar: true,
              transition: 'zoom',
              dangerouslyHTMLString: true,
            })
            loading.value = false

          })
  }

  const signInWithGoogle = () => {
    googleTokenLogin().then((response) => {
     
          axios
          .post('auth/google_login', {access_token:response.access_token})
          .then(response => {
           
            if(response.data.needs_nickname){
              localStorage.setItem('name', response.data?.name)
              localStorage.setItem('email', response.data?.email)
              localStorage.setItem('google_id', response.data?.google_id)
              localStorage.setItem('avatar', response.data?.avatar)
              router.push({
                name: 'register',
              })
             
            }else{
              requestPermission().then((ress)=>{
                
                store.dispatch('Auth/setUser', response.data.user)
                store.dispatch('Auth/setToken', response.data.authorisation?.token)
                localStorage.setItem('token', response.data.authorisation?.token)

                console.log(ress,'ress')
                axios
                    .put(`auth/user/${response.data?.user?.id}`, {fcm_token:ress},store.getters['Auth/config'])
                    .then(response => {
                      router.push({
                        name: 'dashboard',
                      })
                    })

              
              });
             
             
            }

          
          })
          .catch(err => {

          })
      console.log("Handle the response", response)
    })
  }

</script>
