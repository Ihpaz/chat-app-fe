<template>
    <label :for="name" class="absolute duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-base text-gray-500  peer-focus:text-gray-700 dark:text-gray-300 dark:peer-focus:text-gray-50">
      <slot></slot>
    </label>
</template>
  
<script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },

  });
</script>
  