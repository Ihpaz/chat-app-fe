<template>
    <div class="home p-8">
        <div class="flex flex-col container mx-auto gap-2 dark:text-white ">
            <div class="flex justify-between items-center p-2 px-4 bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
                <h1 class="text-md font-bold dark:text-white">Join Chat Rooms</h1>
                <div class="flex gap-2 text-lg dark:text-white">
                  <div class="relative rounded-full w-8 h-8 bg-green-600">
                    <h1 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                      {{ chatRooms?.length }}
                    </h1>
                  </div> 
                <p>Rooms</p></div>
            </div>
            <div class="flex justify-between 
              items-center p-8 text-lg text-red-500 bg-white dark:bg-zinc-800
               dark:border-zinc-700 rounded-md cursor-pointer" v-for="item,index in chatRooms" :key="index">
              <div class="flex gap-2">
                <h1 class="text-xl font-semibold dark:text-white">{{item.name}}</h1>
                <div class=" rounded-md p-2 bg-lime-600 items-center">
                  <h1 class="text-center text-white text-xs">
                    {{ item.user_chat_rooms?.length }} Users
                  </h1>
                </div>
              </div>
              <div class="flex gap-2">
               <button type="button" @click="join(item.id)" class=" bg-sky-700 text-white p-2 text-sm rounded-md flex justify-center items-center dark:text-gray-300  dark:border-gray-900 " :class="loading.includes(item.id) ? 'cursor-not-allowed bg-slate-200 dark:hover:bg-zinc-700 opacity-60' : 'cursor-pointer'" >
                  Join Chat Room
                  <Spinner v-show="loading.includes(item.id)"/>
               </button>
             
              </div>
               

            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted,computed,ref, inject } from 'vue'
import Spinner from '../../components/ui/Spinner.vue';

  const axios = inject('axios')
  const store = useStore()
  const user = computed(() => store.getters['Auth/user'])
  const chatRooms = ref([])
  const loading = ref([])

  onMounted(() => {
    getData()
  })

  const getData = async () => {
    chatRooms.value = false;
    await axios
      .get(`/chat/chat_rooms_join`, store.getters['Auth/config'])
      .then(ress => {
        chatRooms.value = ress.data.data;
        console.log( chatRooms.value)
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }

  async function join(room_id) {
    let response = ''
  
    if (!loading.value.includes(room_id)) {
      loading.value.push(room_id);
      await axios
        .post('chat/join',
          { 
            chat_room_id:room_id,
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
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          })
          response = responseErrorApi(err)
        })
        .finally(() => {
          let index = loading.value.indexOf(room_id);

          if (index > -1) {
            loading.value.splice(index, 1); 
          }
        })
    }
  
    return response
  }
</script>
