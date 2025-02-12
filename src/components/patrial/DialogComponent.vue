<template>
    <div v-if="modelValue" @keydown.esc="$emit('update:modelValue',false)" class="fixed top-0 left-0 z-50 h-full w-full flex flex-warp items-center justify-center">
          <div @click="$emit('update:modelValue',false)" :class="`fixed top-0 left-0 h-full w-full opacity-40 ${background ? ' bg-black' : ''}`">

          </div>
          <div :class="`bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-md block text-xs w-11/12 ${type == 'large' ? 'lg:w-8/12' : 'lg:w-auto'}  min-w-1/3 z-30 shadow-xl`" >

            <div class="w-full flex items-center justify-between p-2 dark:bg-zinc-900 border-b dark:border-zinc-700 dark:text-gray-300 bg-gray-100 rounded-t-md">
                <span class="text-base text-gray-500 dark:text-gray-300 font-medium pl-2">{{ title }}</span>
                <button @click="$emit('update:modelValue',false)">
                    <unicon icon-style="line" class="h-6 fill-black dark:fill-white" name="times" ></unicon>
                </button>
            </div>
            
            <div class="pt-4 max-h-5/6 p-4 ">
                <slot></slot>
            </div>

            <div v-if="$slots['footer']" class="pb-8 p-4">
                <slot name="footer" />
            </div>
          </div>
    </div>
</template>
<script setup>
    import {useSlots} from 'vue'
    const slots = useSlots()
     const props = defineProps({
        modelValue:Boolean,
        title:{
            type:String,
            default:'Dialog'
        },
        background:{
            type:Boolean,
            default:true
        },
        type:{
            type:String,
            default:'normal'
        }
    })
    const emit = defineEmits(['update:modelValue'])
</script>