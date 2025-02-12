<template>
    <button 
      type="submit" 
      class="rounded px-2 py-1 bg-slate-100 hover:bg-slate-200 text-dark border border-grey-300 flex justify-center items-center dark:text-gray-300 dark:bg-zinc-700 dark:border-gray-900 dark:hover:bg-zinc-600" 
      :class="loading ? 'cursor-not-allowed bg-slate-200 dark:hover:bg-zinc-700 opacity-60' : 'cursor-pointer'"
      @click="handleClick"
    >
      <unicon icon-style="line" class="h-4" name="save" fill="green"></unicon>
      Simpan
      <Spinner v-if="loading" />
    </button> 
  </template>
  
  <script setup>
    import { ref, watch } from 'vue';
    import Spinner from '../ui/Spinner.vue';

    const props = defineProps({
        loading: Boolean,
    });
    const loading = ref(props.loading);
    
    watch(() => props.loading, (newValue) => {
        loading.value = newValue;
    });
    
  </script>
  