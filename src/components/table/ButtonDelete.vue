<template>
    <button type="button" class="text-gray-900 bg-slate-100 border border-slate-400 focus:outline-none hover:bg-slate-200 focus:ring-4 focus:ring-gray-100 font-medium rounded text-xs px-2 py-1 me-2 mb-2 dark:text-gray-300 dark:bg-zinc-700 dark:border-gray-900 dark:hover:bg-zinc-600">
        <div class="flex items-center">
            <unicon icon-style="line" class="h-4" name="trash-alt" fill="red"></unicon>
            <span class="pr-3">Hapus</span>
            <Spinner v-show="loading"/>
        </div>
    </button>
</template>


<script setup>
    import Spinner from '../ui/Spinner.vue';
    const props = defineProps({
        loading:{
            type:Boolean
        }
    })
</script>