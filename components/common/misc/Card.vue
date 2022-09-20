<template>
  <div style="filter: drop-shadow(0 0 0.6rem rgba(159, 181, 226, 0.3))">
    <div class="card bg-white relative z-10 rounded-lg shadow">
      <transition name="fade">
        <div v-if="loading" class="absolute z-10 w-full h-full flex flex-wrap">
          <div
            class="w-full h-full bg-white opacity-75 pointer-events-none absolute"
          ></div>
          <div
            class="absolute w-full h-full flex flex-wrap justify-center content-center"
          >
            <loading class="text-center"></loading>
            <span
              class="w-full text-center mt-5 select-none text-primary font-bold"
              >{{ loadingMessage }}</span
            >
          </div>
        </div>
      </transition>
      <div
        v-if="actionButtons"
        :style="computeTab"
        style="top: -3.7rem"
        class="card__action bg-white absolute rounded-tr-lg text-right h-16 pr-5 py-3 right-0 z-10 -inset-y-60"
      >
        <div
          v-if="loading"
          class="absolute w-full h-full bg-white opacity-75"
        ></div>
        <slot name="action"></slot>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/loaders/Loading'
export default {
  components: {
    Loading,
  },
  props: {
    actionButtons: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingMessage: {
      type: String,
      default: 'Carregando',
    },
  },
  data: () => ({
    width: 0,
  }),
  computed: {
    computeTab() {
      const style = {}
      const size = (this.width / 64) * 0.2 + 8
      const paddingLeft = this.width * 0.045
      style.clipPath = `polygon(${size}% 0, 100% 0%, 100% 100%, 0% 100%)`
      style.paddingLeft = `${paddingLeft}px`
      return window.innerWidth > 600 ? style : null
    },
  },
  mounted() {
    this.width = this.$el.clientWidth
  },
}
</script>
