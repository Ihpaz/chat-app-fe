<template>

<div class="relative w-full overflow-x-auto sm:rounded-lg whitespace-nowrap" :class="{
    'max-w-[80vw] ':isStatusBarVisible,
    [`h-[${maxHTable}]`]: maxHTable,
    'max-h-[550px]': !maxHTable
 }"
    :style="{ height: maxHTable ? maxHTable : '' }"
 >
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300 ">
        <thead class="text-sm text-gray-700 bg-gray-50 dark:text-gray-300 dark:bg-zinc-900 sticky top-0">
            <tr>

                <th scope="col" class="px-6 py-2 "
                    v-for="h in header" :key="h.key" @click="h.sortable ? changeSorting(h.key,sortType.type) : ''">
                    <div class="flex flex-warp justify-start items-center cursor-pointer">
                        <span class="font-medium">
                            {{ !$slots['header_' + h.name] ? h.name : '' }}
                            <slot :name="'header_' + h.name" v-if="$slots['header_' + h.name]"></slot>
                        </span> 
                        <span class="flex flex-col justify-center" v-if="h.sortable">
                            <unicon icon-style="line" name="angle-up" class="h-4 relative -bottom-1" 
                            :fill="sortType.name == h.key && sortType.type == 'asc' ? 'black' : 'rgb(148 163 184)'"></unicon>
                            <unicon icon-style="line" name="angle-down" class="h-4 relative -top-1" 
                            :fill="sortType.name == h.key && sortType.type == 'desc' ? 'black' : 'rgb(148 163 184)'"></unicon>
                        </span>
                        <span v-else>
                        </span>   
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class=" max-h-56 overflow-scroll w-full">
            <tr v-if="dataTable.length == 0">
                <td :colspan="header.length" >
                    <EmptyStateComponent/>
                </td>
            </tr>
            
            <tr v-if="dataTable.length > 0" v-for="i in dataTable.length" :key="i" class="  border-b border-gray-300 cursor-pointer  dark:border-gray-700" @click="handleRowClick(i-1,dataTable[i - 1])" :class="{ 'text-gray-500 dark:text-gray-300 bg-gray-300 dark:bg-gray-500 rounded-md': selectedRow === i-1 && isClickable, 'hover:bg-gray-200 dark:hover:bg-zinc-700': selectedRow !== i-1 }">
                <td class="px-4 py-2 text-sm" :class="item.price ? ' text-right' : ''" v-for="item in header" :key="item.key + i">
                     <span v-if="!$slots[`${item.key}`] && !item.price">{{dataTable[i - 1][`${item.key}`] }}</span> 
                     <span  v-else-if="item.price" class="text-right">
                       {{numberFormat(dataTable[i - 1][`${item.key}`])}}
                     </span>
                    <slot :name="`${item.key}`" v-bind:data="dataTable[i - 1]" v-else>
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>


<script setup>
    import numeral from 'numeral';
    import { useSlots, useAttrs,defineEmits,computed,ref } from 'vue'
    import { useStore } from 'vuex'
    import EmptyStateComponent from '../patrial/EmptyStateComponent.vue'

    const slots = useSlots()
    const attrs = useAttrs()
    const emits = defineEmits(['rowClicked'])
    const store = useStore()
    const selectedRow  = ref(0)
    const isStatusBarVisible = computed(() => store.getters['status_sidebar']);

    const props = defineProps({
        header:Object,
        sortType:Object,
        dataTable:{
            type:Array,
            default:[]
        },
        changeSort:{
            type:Function,
            default: () => {}
        },
        maxHTable:String,
        isClickable:{
            type:Boolean,
            default:false
        }
    })
    const changeSorting = (name,type) => {
        props.changeSort({
            name:name,
            type:type == 'asc' ? 'desc' : 'asc'
        })
    }

    const numberFormat = (price) => {
        return numeral(price).format('0,0');
    }

    const handleRowClick = (index,data) => {
        selectedRow.value =index;
        emits('rowClicked', data)
    }
</script>