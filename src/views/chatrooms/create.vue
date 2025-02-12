<template>
    <div class="home p-8">
      <div class="flex flex-col gap-4 bg-white dark:bg-zinc-800 p-6 w-full md:w-1/2  justify-between mx-auto">
         
          <div class="relative z-0 w-full col-span-3 row-span-1 group">
            <input
              type="text"
              v-model="name"
              id="integration_url"
              class="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer text-base text-gray-900 border-gray-300 focus:border-gray-500 dark:text-gray-300 dark:border-zinc-700 dark:focus:border-zinc-500"
              placeholder=" "
              required
            />

            <label class="absolute duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-base text-gray-500  peer-focus:text-gray-700 dark:text-gray-300 dark:peer-focus:text-gray-50">Chat Room Name</label>
          </div>
          
          <div class="relative z-0 w-full group col-span-12">
            <label for="invited" class="text-base text-gray-500  peer-focus:text-gray-700 dark:text-gray-300 dark:peer-focus:text-gray-50">Invite user</label>
            <Multiselect
              v-model="invited"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="listuser"
              class="text-gray-500 dark:bg-zinc-700 dark:border-zinc-800 dark:text-gray-300"
            />
          </div>

          <div class="flex justify-end items-end">
            <button type="submit" @click="submit" class="rounded px-2 py-1 bg-slate-100 hover:bg-slate-200 text-dark border border-grey-300 flex justify-center items-center dark:text-gray-300 dark:bg-zinc-700 dark:border-gray-900 dark:hover:bg-zinc-600" :class="loading ? 'cursor-not-allowed bg-slate-200 dark:hover:bg-zinc-700 opacity-60' : 'cursor-pointer'">
                <unicon icon-style="line" class="h-4" name="save" fill="green"></unicon>Simpan
                <Spinner v-show="loading"/>
            </button> 
          </div>
         
      </div>  
    </div>
  </template>
  
  <script setup>
  import Spinner from '../../components/ui/Spinner.vue';
  import { toast } from 'vue3-toastify'
  import { ref, computed, inject } from 'vue'
  import { useStore } from 'vuex'
  import { onMounted } from 'vue'
  import { responseErrorApi } from '../../helpers/response.js'
  import Multiselect from '@vueform/multiselect'
  import { useRouter } from 'vue-router'
  onMounted(() => {
    getData()
  })

  const store = useStore()
  const auth = computed(() => store.getters['Auth/user'])
  const axios = inject('axios')
  const name = ref('')
  const invited = ref(null)
  const loading = ref(false)
  const listuser = ref()
  const router = useRouter()

  const getData = async () => {
    await axios
      .get(`auth/user?filter[]=where,users.id,!=,${auth.value.id}`, store.getters['Auth/config'])
      .then(ress => {
        listuser.value = ress.data.data.map(user => ({
          value: user.id,
          label: user.name
        }))
      })
      .catch(err => {
        let response = responseErrorApi(err)
      })
  }
  

  
  async function submit() {
    let response = ''
  
    if (!loading.value) {
      loading.value = true;
      await axios
        .post('chat/chat_rooms',
          { 
            name: name.value,
            user_ids: invited.value
          },
          store.getters['Auth/config']
        )
        .then(response => {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          }
          router.push({
            path: '/chat-rooms',
          })
        })
        .catch(err => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          })
          response = responseErrorApi(err)
        })
        .finally(() => {
          loading.value = false;
        })
    }
  
    return response
  }
  
  </script>
  