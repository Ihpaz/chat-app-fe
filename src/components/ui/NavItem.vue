<template>
  <li class="me-2">
    <a href="#" 
        class="inline-block p-4 rounded-t-lg "
        :class="isActive ? 'border-b-2 text-red-600 border-red-600 hover:text-red-600 hover:border-red-600' : 'text-gray-500 dark:text-gray-300'"
        @click.prevent="selectTab">
      {{ label }}
    </a>
  </li>
</template>
  
<script setup>
import { computed } from 'vue';
  
const props = defineProps({
  label: String,
  tab: Number,
  activeTab: Number
});
  
const emit = defineEmits(['update-tab']);
  
const isActive = computed(() => {
  return props.tab === props.activeTab;
});

const selectTab = () => {
  emit('update-tab', props.tab);
};

</script>
  
