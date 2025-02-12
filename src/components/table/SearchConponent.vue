<template>
    
    <label for="table-search" class="sr-only">Cari</label>
    <div class="relative w-full lg:w-80">
        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-300" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"  id="table-search" class="block p-2 ps-10 text-sm text-gray-500 border border-gray-300 rounded-lg w-full bg-white focus:ring-gray-500 focus:border-gray-500 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-900" placeholder="Search" v-debounce:300="getData">
    </div>
    
</template>

<script setup>
    const props = defineProps({
        modelValue: String,
        // search: {
        //     type:Function,
        //     default: () => ({})
        // },
        search:{
            type:Function,
            default: () => {}
        }
    })

const emit = defineEmits(['update:modelValue'])

const getData = () => {
    props.search()
}
</script>