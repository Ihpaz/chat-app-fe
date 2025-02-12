<template>
    <button v-if="type == 'action'" type="submit" class="bg-gem inline-block px-5 py-2 text-white font-medium tracking-tight bg-red-700 rounded focus:ring-4 focus:ring-red-400 transition duration-200 border dark:border-zinc-700" :class="{'opacity-50 cursor-not-allowed':loading}">
        <slot></slot>
    </button>
    <a v-else :href="url" target="_blank" class="bg-gem inline-block px-5 py-2 text-white font-medium tracking-tight bg-red-700 rounded focus:ring-4 focus:ring-red-400 transition duration-200 border dark:border-zinc-700">
        <div class="flex items-center gap-x-2">
            <slot></slot>
        </div>
    </a>
</template>
<style scoped>
.bg-gem {
    background-image: url('/img/gembox.png');
    background-size: cover;
    background-position-x: -39px;
    background-repeat: no-repeat;
}
.bg-gem:hover {
  filter: brightness(110%);
}
</style>

<script setup>
    import { ref, watch } from 'vue';
    
    const props = defineProps({
        type : {
            type: String // link | action
        },
        url : {
            type: String, 
            default: '#',
        },
        target:{
            type: String,
            default: '_self',
        },
        loading:{
            type: Boolean,
            default: false,
        }
    });

    const loading = ref(props.loading);
    
    watch(() => props.loading, (newValue) => {
        loading.value = newValue;
    });

</script>