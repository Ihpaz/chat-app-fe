<template>
    
    <router-link :to="url" class="">
        <button type="button" class="text-gray-900 bg-slate-100 border border-slate-400 focus:outline-none hover:bg-slate-200 focus:ring-4 focus:ring-gray-100 font-medium rounded text-xs px-2 py-1 me-2 mb-2 dark:text-gray-300 dark:bg-zinc-700 dark:border-gray-900 dark:hover:bg-zinc-600">
        <div class="flex items-center">
            <unicon icon-style="line" class="h-4" name="pen" fill="green"></unicon>
            <span class="pr-3">Edit</span>
        </div>
    </button>
        
    </router-link>    
</template>

<script setup>
    const porops = defineProps({
        url:{
            type:String
        }
    })
</script>