<template>
    <div class="flex flex-warp justify-end items-center text-sm mt-6">
        <nav aria-label="Pagination">
        <ul class="inline-flex -space-x-px text-sm">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300" @click="currentPage > 1 ? prev() : ''">Previous</a>
            </li>
            <li  :class="currentPage == page(n) ? ' text-red-600 border border-gray-300 bg-red-50 hover:bg-red-100 hover:text-red-700' : ' text-gray-500 dark:text-gray-300 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'" v-for="n in (totalPage > 5 ? 5 : totalPage)" :key="n"
            @click="currentPage != page(n) ? changeNumber(page(n)) : ''" class="flex items-center justify-center px-3 h-8 leading-tight dark:bg-zinc-900 dark:border-zinc-700 cursor-pointer">
                <a href="#">{{ totalPage > 5 ? page(n) : n }}</a>
            </li>
            <li>
                <a href="#" @click="(currentPage < totalPage) && totalPage > 1 ? next() : ''" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300">Next</a>
            </li>
        </ul>
        </nav>
    </div>

</template>

<script setup>
    import {ref,watch,onMounted} from 'vue'
    const props = defineProps({
        total:{
            type:Number,
            default:1
        },
        row:{
            type:Number,
            default:10
        },
        changePage:{
            type:Function,
            default:()=> {}
        },
        currentpage:{
            type:Number,
            default:1
        },
    })
    const currentPage = ref(1)
    const totalPage = ref(1)
    const startNumber = ref(1)
    const endNumber = ref(1)
    watch(
        () => props.total,
        (newValue, oldValue) => {
            firstSetting()
        }
    );
    watch(
        () => props.currentpage,
        (newValue, oldValue) => {
            currentPage.value = newValue;
        }
    );
    onMounted(() => {
        firstSetting()

    })
    function page(n) {
        if (totalPage.value < 5) {
            return n
        } else {
            return n + startNumber.value - 1
        }
    }

    function firstSetting () {
        if (props.total > 10) {
            totalPage.value = parseInt(props.total/props.row)
            totalPage.value = totalPage.value + (props.total/props.row % 1 > 0 ? 1 : 0 )
            if (currentPage.value > 5) {
                startNumber.value = currentPage.value - 2
            }

            else if(currentPage.value < 5) {
                startNumber.value = 1
            }
            if (totalPage.value <= currentPage.value) {
                endNumber.value = currentPage.value
            } else {
                if (currentPage.value >= 5 && (totalPage.value - currentPage.value >= 2)) {
                    endNumber.value = currentPage.value + 2
                } else if(currentPage.value <= 5) {
                    endNumber.value = 5

                } else {
                    endNumber.value = currentPage.value + 1
                }
            }

            if (endNumber.value == totalPage.value) {
                startNumber.value = endNumber.value - 4
            }
        } else {
            totalPage.value = 1
            startNumber.value = 1
        }
      
    }
   

    const changeNumber = (number) => {
        console.log(number)
        currentPage.value = number
        props.changePage(currentPage.value)
        firstSetting()
    }

    const next = () => {
        currentPage.value  = currentPage.value + 1
        props.changePage(currentPage.value)
        firstSetting()
    }

    const prev = () => {
        currentPage.value  = currentPage.value - 1
        props.changePage(currentPage.value)
        firstSetting()
    }


</script>