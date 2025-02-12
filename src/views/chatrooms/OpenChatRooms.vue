<template>
    <div class="home p-8">
        <div class="flex flex-col container mx-auto gap-2 ">
            <div class="flex justify-between items-center p-2 px-4 bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
                <h1 class="text-md font-bold dark:text-white">Chat Rooms Active</h1>
                <div class="flex gap-2 text-lg">
                  <div class="relative rounded-full w-8 h-8 bg-green-600">
                    <h1 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                      {{ chatRooms?.length }}
                    </h1>
                  </div> 
                  <p class="dark:text-white">Rooms</p>
                </div>
            </div>
            <div class="flex justify-between 
              items-center p-8 text-lg text-red-500 bg-white dark:bg-zinc-800
               dark:border-zinc-700 rounded-md cursor-pointer" v-for="item,index in chatRooms" :key="index">
              <div class="flex gap-2">
                <h1 class="text-xl font-semibold dark:text-white">{{item.name}}</h1>
                <div class=" rounded-md p-2 bg-lime-600 items-center">
                  <h1 class="text-center text-white text-xs dark:text-white">
                    {{ item.user_chat_rooms?.length }} Users
                  </h1>
                </div>
              </div>
              <div class="flex gap-2">
                <router-link :to="{ name: 'window', params: { id: item.uuid } }" target="_blank">
                  <button type="button" class=" bg-sky-700 text-white p-2 text-sm rounded-md" >
                    Open Chat Room
                  </button>
                </router-link>
              
              </div>
               

            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted,computed,ref, inject } from 'vue'
// import CardRooms from '../../components/ui/CardRooms.vue';
import ButtonPrimary from '../../components/ui/ButtonPrimary.vue'

  const axios = inject('axios')
  const store = useStore()
  const user = computed(() => store.getters['Auth/user'])
  const chatRooms = ref([])

  onMounted(() => {
    getData()
  })

  const getData = async () => {
    chatRooms.value = false;
    await axios
      .get(`/chat/chat_rooms_active`, store.getters['Auth/config'])
      .then(ress => {
        chatRooms.value = ress.data.data;
        console.log( chatRooms.value)
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }

  const open = () => {

  }
</script>
