<template>
    <div class="home p-8">
       <CardChat :activechat="chatRoomsActive" />
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
  const chatRoomsActive = ref(0)

  onMounted(() => {
    getData()
  })

  const getData = async () => {
    chatRoomsActive.value = false;
    await axios
      .get(`/chat/chat_rooms_active_count`, store.getters['Auth/config'])
      .then(ress => {
        chatRoomsActive.value = ress.data.data;
        console.log( chatRoomsActive.value)
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }
</script>
