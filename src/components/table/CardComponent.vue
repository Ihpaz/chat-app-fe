<template>
    <div class="bg-white dark:bg-zinc-800 w-full border dark:border-zinc-700 rounded">
        <div v-if="$slots['header']" class="px-4 pt-4">
            <slot name="header"></slot>
        </div>
        <!-- <hr v-if="$slots['header']" class="w-full"> -->
        <div class="p-4">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script setup>
    import {useSlots} from 'vue'
    const slots = useSlots()
</script>