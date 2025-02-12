<template>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 mb-6 bg-white rounded-2xl overflow-hidden dark:bg-zinc-800" >
      <div class="rounded-l-2xl p-4 cursor-pointer relative overflow-hidden group/item" >
        <div class="flex items-center gap-x-1">
          <unicon name="user-exclamation" class="fill-gray-500 dark:fill-gray-300 h-4"/>
          <h1 class="text-base text-red-500">Total User Registered</h1>
        </div>
        <div class="flex items-end justify-between">
          <h1 class="text-5xl dark:text-white">{{ props.data.user_registered }}<span class="text-sm">Registered</span></h1>
          <unicon icon-style="line" class="h-4 z-20 fill-black dark:fill-gray-300 group-hover/item:invisible" name="exclamation-circle" ></unicon>
          <div class="absolute rounded-full bg-red-700/80 h-[100px] w-[100px] -bottom-[150px] -right-[150px] group-hover/item:w-[300px] group-hover/item:h-[300px] transition-all duration-500">
            <span class="text-white relative top-[100px] left-10 text-base">Selengkapnya</span>
          </div>
        </div>
      </div>
      <div class="border-l border-r  dark:border-black p-4 cursor-pointer relative overflow-hidden group/item" >
        <div class="flex items-center gap-x-1">
          <unicon name="user-square" class="fill-gray-500 dark:fill-gray-300 h-4"/>
          <h1 class="text-base text-green-500">Total User Active</h1>
        </div>
        <div class="flex items-end justify-between">
          <h1 class="text-5xl dark:text-white">{{ props.data.user_active }}<span class="text-sm">User Active</span></h1>
          <unicon icon-style="line" class="h-4 z-20 fill-black dark:fill-gray-300 group-hover/item:invisible" name="exclamation-circle" ></unicon>
          <div class="absolute rounded-full bg-green-700/80 h-[100px] w-[100px] -bottom-[150px] -right-[150px] group-hover/item:w-[300px] group-hover/item:h-[300px] transition-all duration-500">
            <span class="text-white relative top-[100px] left-10 text-base">Selengkapnya</span>
          </div>
        </div>
      </div>
      <div class="rounded-r-2xl p-4 cursor-pointer relative overflow-hidden group/item" @click="goTo('/registration')">
        <div class="flex items-center gap-x-1">
          <unicon name="chat-info" class="fill-gray-500 dark:fill-gray-300 h-4"/>
          <h1 class="text-base text-yellow-500">Total Chat Rooms Active</h1>
        </div>
        <div class="flex items-end justify-between">
          <h1 class="text-5xl dark:text-white">{{ props.data.chat_room_active }}<span class="text-sm">Chat Rooms Active</span></h1>
          <unicon icon-style="line" class="h-4 z-20 fill-black dark:fill-gray-300 group-hover/item:invisible" name="exclamation-circle" ></unicon>
          <div class="absolute rounded-full bg-yellow-700/80 h-[100px] w-[100px] -bottom-[150px] -right-[150px] group-hover/item:w-[300px] group-hover/item:h-[300px] transition-all duration-500">
            <span class="text-white relative top-[100px] left-10 text-base">Selengkapnya</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },

  });
</script>
