<template>
    <nav class="flex justify-end " aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <div v-for="item, index in path" :key="index">
            <div v-if="index == 0">
                <li class="inline-flex items-center cursor-pointer" >
                    <router-link :to="getPath(index)" class="inline-flex items-center text-lg font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
                    <!-- <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg> -->
                    {{ capitalizeFirstLetter(item).replaceAll('-',' ') }}
                    </router-link>
                </li>
            </div>
            <div v-else-if="index == (path.length - 1)">
                <li aria-current="page cursor-pointer">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-2 h-2 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="ms-1 text-lg font-medium text-gray-500 md:ms-2 dark:text-gray-300">{{ capitalizeFirstLetter(item).replaceAll('-',' ') }}</span>
                    </div>
                </li>
            </div>
            <div v-else>
                <li class="cursor-pointer">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-2 h-2 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <router-link :to="getPath(index)" class="ms-1 text-lg font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-gray-300 dark:hover:text-white">{{ capitalizeFirstLetter(item).replaceAll('-',' ') }}</router-link>
                    </div>
                </li>
            </div>
        </div>
    </ol>
    </nav>
</template>
<script setup>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    const route = useRoute()
    const path = computed(() => {
        let pisah = route.meta?.path?.split('.')
        return pisah
    })

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getPath(index) {
        let url = ''
        for (let i = 0; i <= index; i++) {
            url = url + '/' + path.value[i]
        }

        return url
    }

</script>