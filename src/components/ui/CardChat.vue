<template>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 mb-6 bg-white rounded-2xl overflow-hidden dark:bg-zinc-800 " >
      <div class="rounded-l-2xl p-6 cursor-pointer relative overflow-hidden group/item" @click="goTo('chat-rooms/create')" >
        <div class="flex items-center gap-x-1">
          <unicon name="plus" class="fill-gray-500 dark:fill-gray-300 h-8"/>
          <h1 class=" text-lg text-red-500">Create Chat Room</h1>
       
            <div class="absolute rounded-full bg-red-700/80 h-[100px] w-[100px] -bottom-[150px] -right-[150px] group-hover/item:w-[300px] group-hover/item:h-[300px] transition-all duration-500">
              <span class="text-white relative top-[100px] left-10 text-base">Create</span>
            </div>
        </div>
      </div>
      <div class="border-l border-r  dark:border-black p-6 cursor-pointer relative overflow-hidden group/item" @click="goTo('chat-rooms/list')">
        <div class="flex items-center gap-x-1">
          <unicon name="user-square" class="fill-gray-500 dark:fill-gray-300 h-8"/>
          <h1 class="text-lg text-green-500">Join Chat Room</h1>
        </div>
        <div class="flex items-end justify-between">
          <div class="absolute rounded-full bg-green-700/80 h-[100px] w-[100px] -bottom-[150px] -right-[150px] group-hover/item:w-[300px] group-hover/item:h-[300px] transition-all duration-500">
            <span class="text-white relative top-[100px] left-10 text-base">Join</span>
          </div>
        </div>
      </div>
      <div class="rounded-r-2xl p-6 cursor-pointer relative overflow-hidden group/item" @click="goTo('chat-rooms/active')">
        <div class="flex items-center gap-x-1">
          <unicon name="chat-info" class="fill-gray-500 dark:fill-gray-300 h-8"/>
          <h1 class="text-lg text-yellow-500">Chat Rooms Active</h1>
          <h1 class="text-sm dark:text-white ml-1">{{ props.activechat }}</h1>
        </div>
        <div class="flex items-end justify-between">
          <div class="absolute rounded-full bg-yellow-700/80 h-[100px] w-[100px] -bottom-[150px] -right-[150px] group-hover/item:w-[300px] group-hover/item:h-[300px] transition-all duration-500">
            <span class="text-white relative top-[100px] left-10 text-base">Open</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router'
 

  const route = useRouter()
  const props = defineProps({
    activechat: {
      type: Number,
      required: true,
    },
  });

  const goTo = async url => {
  await route.push({
    path: url,
  })


}

</script>
