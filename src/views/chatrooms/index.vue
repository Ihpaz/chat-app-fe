<template>
    <div class="home p-8">
       <CardChat />
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted,computed,ref, inject } from 'vue'
// import CardRooms from '../../components/ui/CardRooms.vue';
import CardChat from '../../components/ui/CardChat.vue'

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
