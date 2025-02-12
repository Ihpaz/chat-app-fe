<template>
    <div class="embla relative overflow-hidden h-full ">
      <div class="embla__viewport overflow-hidden w-full h-full" ref="emblaRef">
        <div class="embla__container flex h-full">
          <div class="embla__slide relative min-w-full h-full" @click="clickSlider(slide.parentId)" v-for="(slide, index) in props.data" :key="index">
            <img v-if="slide?.feedImagesSrc" :src="slide?.feedImagesSrc[0]" :alt="'Slide ' + index" class="w-full h-full object-cover">
            <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded z-50">
                {{ slide.title }}
            </div>
          </div>
        </div>
      </div>
      <button class="embla__prev absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 left-2" @click="prev">Prev</button>
      <button class="embla__next absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 right-2" @click="next">Next</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import emblaCarouselVue from 'embla-carousel-vue'

  const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false })

    onMounted(() => {
    if (emblaApi.value) {
        console.log(emblaApi.value.slideNodes()) // Access API
    }
    })

    const props = defineProps({
            data : {
                type: Array
            },
    });

    const prev = () => {
    if (emblaApi.value) emblaApi.value.scrollPrev();
    };

    const next = () => {
        console.log(emblaApi.value)
    if (emblaApi.value) emblaApi.value.scrollNext();
    };

    const emit = defineEmits(['click-slider']);
    const clickSlider = (val) => {
        emit('click-slider', val);
    };

</script>
  
<style scoped>
  .embla__slide {
    min-width: 100%;
  }
</style>
  