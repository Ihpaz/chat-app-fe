<template>
    <div class="home p-8">
        <div class="flex flex-col container mx-auto bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-md">
            <div class="flex justify-between items-center p-2">
                <h1 class="text-md font-bold">Chat Rooms</h1>
                <button-primary  type="link" target="_blank">
                    Create Room
                </button-primary>
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
      .get(`/chat/chat_rooms`, store.getters['Auth/config'])
      .then(ress => {
        chatRooms.value = ress.data.data;
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }
</script>
