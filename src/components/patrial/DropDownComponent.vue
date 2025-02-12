<template>
    <div class="relative" v-click-outside="closeSort">
        <button @click="filterSortOption = !filterSortOption" class="inline-flex items-center text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-900 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-red-400 rounded-lg text-sm px-3 py-2" type="button">
            Risk Score
            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>
        <div v-show="filterSortOption" class="absolute mt-2 shadow-lg z-10 ">
            <div id="sortType" class="z-10 w-48 bg-white dark:bg-zinc-900 divide-y divide-gray-100 bg:divide-gray-500 shadow rounded-lg border">
            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>
                    <div class="flex cursor-pointer items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 " @click="selectedValue = '&filter[]=where,risk_score,>=,9'">
                        <input id="critical" type="radio" value="&filter[]=where,risk_score,>=,9" name="sort" v-model="selectedValue" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 checked:bg-red-600">
                        <label for="critical" class="w-full ms-2 text-sm font-medium rounded dark:text-white">Critical</label>
                    </div>
                    <div class="flex cursor-pointer items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 " @click="selectedValue = '&filter[]=where,risk_score,<,9&filter[]=where,risk_score,>=,6'">
                        <input id="high" type="radio" value="&filter[]=where,risk_score,<,9&filter[]=where,risk_score,>=,6" v-model="selectedValue" name="sort" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 checked:bg-red-600">
                        <label for="high" class="w-full ms-2 text-sm font-medium rounded dark:text-white">High</label>
                    </div>
                    <div class="flex cursor-pointer items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 " @click="selectedValue = '&filter[]=where,risk_score,<,6&filter[]=where,risk_score,>=,3'">
                        <input id="medium" type="radio" value="&filter[]=where,risk_score,<,6&filter[]=where,risk_score,>=,3" v-model="selectedValue"  name="sort" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 checked:bg-red-600">
                        <label for="medium" class="w-full ms-2 text-sm font-medium rounded dark:text-white">Medium</label>
                    </div>
                    <div class="flex cursor-pointer items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 " @click="selectedValue = '&filter[]=where,risk_score,<=,2'">
                        <input id="low" type="radio" value="&filter[]=where,risk_score,<=,2" v-model="selectedValue" name="sort" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 checked:bg-red-600">
                        <label for="low" class="w-full ms-2 text-sm font-medium rounded dark:text-white">Low</label>
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>