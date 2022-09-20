<template>
  <nav>
    <ul class="flex justify-center items-center">
      <li
        class="border border-gray-300 px-2 py-1 cursor-pointer"
        :class="{ 'hover:text-green-500': !isInFirstPage }"
      >
        <a
          class="fill-green-400"
          href="javascript:void(0)"
          title="Ir a pagina anterior"
          @click="onClickPreviousPage"
        >
          <Back-icon class="w-6 h-6 p-1"></Back-icon>
        </a>
      </li>
      <li
        v-for="page in pages"
        :key="page.name"
        :class="{
          'bg-green-500 text-white hover:text-white border-green-500':
            page.isActive,
          'text-black hover:text-green-500 border-gray-300': !page.isActive,
        }"
        class="border px-3 py-1 font-semibol cursor-pointer"
        @click="onClickPage(page)"
      >
        <a
          :title="`Ir para pagina ${page.name}`"
          class="text-base"
          href="javascript:void(0)"
          >{{ page.name }}</a
        >
      </li>

      <li
        class="border border-gray-300 px-2 py-1 cursor-pointer"
        :class="{ 'hover:text-green-500': !isInLastPage }"
        @click="onClickNextPage"
      >
        <a
          class="fill-green-400"
          href="javascript:void(0)"
          title="Ir para pagina seguinte"
        >
          <NextIcon class="w-6 h-6 p-1"></NextIcon>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import BackIcon from '~/assets/icons/arrow-back-outline.vue'
import NextIcon from '~/assets/icons/arrow-forward-outline.vue'
const DEFAULT_TOTAL_ROWS = 0
const DEFAULT_PER_PAGE = 10
const DEFAULT_MAX_VISIBLE_BUTTONS = 3

const sanitizeTotalRows = (value) => {
  return value < 0 ? DEFAULT_TOTAL_ROWS : value
}

const sanitizePerPage = (value) => {
  return value < 1 ? DEFAULT_TOTAL_ROWS : value
}

export default {
  name: 'Pagination',
  components: { BackIcon, NextIcon },
  props: {
    value: {
      default: 1,
      type: [Number, String],
    },
    totalRows: {
      type: [Number, String],
      default: DEFAULT_TOTAL_ROWS,
    },
    perPage: {
      type: [Number, String],
      default: DEFAULT_PER_PAGE,
    },
    maxVisibleButtons: {
      default: DEFAULT_MAX_VISIBLE_BUTTONS,
      type: Number,
    },
  },
  data: () => ({
    page: [
      { name: 1, isActive: true },
      { name: 2, isActive: false },
      { name: 3, isActive: false },
      { name: 4, isActive: false },
      { name: 5, isActive: false },
    ],
  }),
  computed: {
    currentPage() {
      return this.value
    },
    totalPages() {
      const totalPages = Math.ceil(
        sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage)
      )
      return totalPages < 1 ? 1 : totalPages
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
    startPage() {
      // when on the first page
      if (this.currentPage === 1) {
        return 1
      }

      // when on the last page
      if (this.currentPage === this.totalPages) {
        const startPage = this.totalPages - this.maxVisibleButtons
        return startPage >= 1 ? startPage : 1
      }

      // when in between
      return this.currentPage - 1
    },
    pages() {
      return [...Array(this.totalPages).keys()]
        .map((page) => page + 1)
        .map((page) => ({
          name: page,
          isActive: page === this.currentPage,
        }))
        .slice(
          this.startPage - 1,
          Math.min(this.startPage + this.maxVisibleButtons, this.totalPages)
        )
    },
  },
  methods: {
    onClickFirstpage() {
      this.$emit('pageChanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pageChanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pageChanged', page.name)
    },
    onClickNextPage() {
      this.$emit('pageChanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pageChanged', this.totalPages)
    },
  },
}
</script>
