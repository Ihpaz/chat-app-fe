<template>
    <div>
        <router-link :to="url">
            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2.5 me-2 " :class="type == 'sm' ? 'px-3' : 'px-5'">
                <div class="flex items-center text-sm">
                    <unicon icon-style="line" class="h-5" :name="type == 'sm' ? 'plus' : 'plus-circle'" fill="white"></unicon>
                    <span :class="type == 'sm' ? 'hidden' : 'block'">Tambah data</span>
                </div>
            </button>
        </router-link>
    </div>
</template>

<script setup>
const props = defineProps({
    url:{
        type:String
    },
    type:{
        type:String
    }
})
</script>