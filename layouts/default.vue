<template>
  <div class="flex flex-wrap lg:flex-row min-h-screen antialised">
    <top-bar-layout class="w-full fixed top-0 left-0 z-30" />
    <div class="flex w-full lg:pt-16">
      <side-bar-layout class="w-full lg:w-60 min-h-screen fixed" />
      <nuxt class="flex-1 max-w-full lg:pl-60 bg-gray-100" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SideBarLayout from '~/components/layout/SideBarLayout.vue'
import TopBarLayout from '~/components/layout/TopBarLayout.vue'
export default defineComponent({
  name: 'Default',
  components: {
    SideBarLayout,
    TopBarLayout,
  },
})
</script>