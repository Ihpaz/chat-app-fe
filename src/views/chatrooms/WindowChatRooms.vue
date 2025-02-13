<template>
    <div class="home p-8">
        <div class="flex flex-col container mx-auto gap-2 dark:text-white ">
            <div class="flex justify-between items-center p-2 px-4 bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
                <h1 class="text-md font-bold dark:text-white">{{ chatRooms.name }}</h1>
                <div class="flex gap-2 text-lg dark:text-white">
                  <button
                      @click="exit"
                      class=" bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center"
                      :class="loadinglogout ? 'cursor-not-allowed disabled':'cursor-ponter'"
                    >
                      <p class="text-sm">Exit</p>
                      <unicon icon-style="line" class="h-4" name="sign-out-alt" fill="white"></unicon>
                      <Spinner v-show="loadinglogout"/>
                    </button>
                </div>
            </div>
           
            <div class="grid md:grid-cols-3 grid-cols-1  gap-2">
                <div class="relative col-span-2 h-[600px]  bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md ">
                  <div ref="chatContainer" class="mb-4 max-h-[550px] flex flex-col gap-2 overflow-scroll">
                    <template v-if="chatRooms.chat_rooms_history?.length > 0">
                      <div
                        v-for="(msg, index) in chatRooms.chat_rooms_history"
                        :key="index"
                        class="flex w-full p-2  gap-2"
                        :class="msg.user_id === user.id ? 'justify-end' :'justify-start'"
                      >
                          <div class="flex flex-col " v-if="msg.user_id !== user.id">
                            <h1 class="text-black dark:text-white">{{ msg.user?.nickname }}</h1>
                            <img v-if="msg.user.avatar" :src="msg.user.avatar" alt="" class="object-cover w-8 h-8 rounded-full" srcset="">
                            <div v-else class="w-8 h-8 rounded-full bg-gray-500 mx-auto"></div>
                          </div>
                          <div
                            class="p-2 rounded-lg min-h-[60px] w-3/4 flex"
                            :class="msg.user_id === user.id ? 'bg-blue-500 text-white ' : 'bg-gray-300 text-black '"
                          >
                            <div class="flex gap-2 justify-between w-full relative">
                              <p class="text-sm w-[80%] ">{{ msg.message }}</p>
                              <p class="text-xs w-24 text-wrap">{{ msg.created_at }}</p>
                              <span
                                class="absolute bottom-5 w-0 h-0 border-solid"
                                :class="msg.user_id === user.id
                                  ? 'right-[-16px] border-t-8 border-l-8 border-transparent border-l-blue-500'
                                  : 'left-[-16px] border-t-8 border-r-8 border-transparent border-r-gray-300'"
                              ></span>
                            </div>
                          </div>
                          <div class="flex flex-col" v-if="msg.user_id === user.id">
                            <h1 class="text-black dark:text-white">{{ msg.user?.nickname }}</h1>
                            <img v-if="msg.user.avatar" :src="msg.user.avatar" alt="" class="object-cover w-8 h-8 rounded-full" srcset="">
                            <div v-else class="w-8 h-8 rounded-full bg-gray-500 mx-auto"></div>
                          
                          </div>
                      </div>
                    </template>
                    <div class="text-center text-lg m-auto" v-else>
                          No Chat History..
                    </div>
                    
                  </div>

                  <div class="flex items-center gap-1 absolute min-w-full bottom-0">
                    <input
                      v-model="message"
                      @keyup.enter="send"
                      type="text"
                      placeholder="Type a message..."
                      class="flex-1 p-2  text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      @click="send"
                      class=" bg-lime-500 text-white px-4 py-3 rounded-lg hover:bg-lime-600 transition flex items-center"
                      :class="loading ? 'cursor-not-allowed disabled':'cursor-ponter'"
                    >
                      <unicon icon-style="line" class="h-4" name="message" fill="white"></unicon>
                      <Spinner v-show="loading"/>
                    </button>
                  </div>
                </div>
                <div class=" col-auto h-[600px]  bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
                    <div class="flex gap-2 items-center">
                        <h1 class="p-4 text-md font-semibold dark:text-white">
                           Chat Rooms Member
                        </h1>
                        <div class=" rounded-md  h-6 bg-lime-600 flex items-center px-3">
                          <h1 class="text-center text-white text-xs dark:text-white">
                            {{ chatRooms.user_chat_rooms?.length }} Users
                          </h1>
                        </div>
                    </div>
                    <hr/>
                    <div class="grid grid-cols-1 gap-2">
                      <template v-for="item,index in  chatRooms.user_chat_rooms" :key="index">
                        <template  v-if="item.is_active">
                          <div class="flex gap-2 p-2 text-md justify-between dark:text-white">
                            <div>
                              <img v-if="item.user.avatar" :src="item.user.avatar" alt="" class="object-cover w-8 h-8 rounded-full" srcset="">
                              <div v-else class="w-8 h-8 rounded-full bg-gray-500 mx-auto"></div>
                              <h1 class="dark:text-white">{{ item.user?.nickname }}</h1>
                            </div>
                            <h1 class="dark:text-white">{{ item.user?.email }}</h1>
                          </div>
                          <hr/>
                        </template>
                       
                      </template>
                    
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted,computed,ref, inject, watch, nextTick  } from 'vue'
import Spinner from '../../components/ui/Spinner.vue';
import {useRoute} from 'vue-router'
import { toast } from 'vue3-toastify'

  const axios = inject('axios')
  const store = useStore()
  const user = computed(() => store.getters['Auth/user'])
  const chatRooms = ref({})
  const loading = ref(false)
  const route = useRoute()
  const message = ref('')
  const chatContainer = ref(null);
  const loadinglogout = ref(false)


  watch(() => chatRooms.value.chat_rooms_history, async () => {
    await nextTick(); // Ensure DOM updates before scrolling
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }, { deep: true })

  onMounted(() => {
    getData()
    console.log(user.value.id)
  })

  const getData = async () => {
   
    await axios
      .get(`/chat/chat_rooms/${route.params.id}?relations=chat_rooms_user,chat_user_history`, store.getters['Auth/config'])
      .then(ress => {
        chatRooms.value = ress.data.data;
        console.log( chatRooms.value.name,'name')
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }

  async function send() {
    let response = ''
  
    if (!loading.value) {
      loading.value = true;
      await axios
        .post('chat/chat_rooms_history',
          { 
            chat_room_id:chatRooms.value.id,
            message:message.value
          },
          store.getters['Auth/config']
        )
        .then(response => {
          getData()
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          }
        
        })
        .catch(err => {
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
          })
          // response = responseErrorApi(err)
        })
        .finally(() => {
          loading.value=false
        })
    }
  
    return response
  }

  async function exit() {
    let response = ''
  
    if (!loadinglogout.value) {
      loadinglogout.value = true;
      await axios
        .post('chat/logout',
          { 
            chat_room_id:chatRooms.value.id
          },
          store.getters['Auth/config']
        )
        .then(response => {
          getData()
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          }
        
        })
        .catch(err => {
          toast.error(err, {
            position: toast.POSITION.TOP_CENTER,
          })
          // response = responseErrorApi(err)
        })
        .finally(() => {
          loadinglogout.value=false
        })
    }
  
    return response
  }
</script>
