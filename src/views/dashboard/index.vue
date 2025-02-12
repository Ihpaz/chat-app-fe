<template>
  <div class="home p-8">
      <CardDashboard :data='dashboard'/>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted,computed,ref, inject } from 'vue'
import CardDashboard from '../../components/ui/CardDashboard.vue';
  const axios = inject('axios')
  const store = useStore()
  const user = computed(() => store.getters['Auth/user'])
  const dashboard = ref([])

  onMounted(() => {
    getData()
  })

  const getData = async () => {
    dashboard.value = false;
    await axios
      .get(`/dashboard`, store.getters['Auth/config'])
      .then(ress => {
        dashboard.value = ress.data.data;
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }
</script>


