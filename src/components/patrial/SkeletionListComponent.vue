<template>
    <div role="status" class="w-full p-4 space-y-4 border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse">
        <div v-for="n in length" :key="n" class="flex items-center justify-between">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
        
        <span class="sr-only">Loading...</span>
    </div>
</template>
<script setup>
const props = defineProps({
    length: {
        type: Number,
        default: 5
    }
})


</script>