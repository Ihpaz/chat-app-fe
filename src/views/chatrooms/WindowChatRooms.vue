<template>
    <div class="home p-8">
        <div class="flex flex-col container mx-auto gap-2 dark:text-white ">
            <div class="flex justify-between items-center p-2 px-4 bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
                <h1 class="text-md font-bold dark:text-white">{{ chatRooms.name }}</h1>
                <div class="flex gap-2 text-lg dark:text-white">
                  <div class="relative rounded-full w-8 h-8 bg-green-600">
                    <h1 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                      {{ chatRooms?.length }}
                    </h1>
                  </div> 
                <p>Rooms</p></div>
            </div>
           
            <div class="grid grid-cols-3 gap-2">
                <div class=" col-span-2 h-[800px]  bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">

                </div>
                <div class=" col-auto h-[800px]  bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
                    <div class="flex gap-2 items-center">
                        <h1 class="p-4 text-md font-semibold">
                           Chat Rooms Member
                        </h1>
                        <div class=" rounded-md  h-6 bg-lime-600 flex items-center px-3">
                          <h1 class="text-center text-white text-xs dark:text-white">
                            30 Users
                          </h1>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted,computed,ref, inject } from 'vue'
import Spinner from '../../components/ui/Spinner.vue';
import {useRoute} from 'vue-router'

  const axios = inject('axios')
  const store = useStore()
  const user = computed(() => store.getters['Auth/user'])
  const chatRooms = ref({})
  const loading = ref([])
  const route = useRoute()

  onMounted(() => {
    getData()
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
