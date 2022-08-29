<template>
  <div class="relative inline-block text-left" @click="open = !open">
    <div>
      <button
        id="options-menu"
        :style="userAvatar"
        type="button"
        class="w-10 h-10 rounded-full border border-tertiary bg-cover focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 transition ease-in-out duration-150"
        aria-haspopup="true"
        aria-expanded="true"
      />
    </div>
    <div v-if="open" class="fixed inset-0 z-40"></div>
    <div
      v-if="open"
      class="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-md shadow"
    >
      <div class="rounded-md bg-white shadow">
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            :class="itemClass"
            href="javascript:void(0)"
            role="menuitem"
            @click="logOut"
            >Terminar sessão</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  data: () => ({
    open: false,
  }),
  computed: {
    userAvatar() {
      const user = this.$store.$auth.state.user.username
      return {
        backgroundImage: `url(
          'https://ui-avatars.com/api/?name=${user}&size=42&bold=true&rounded=true'
        )`,
      }
    },
    itemClass() {
      return 'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-primary focus:outline-none focus:bg-gray-100 focus:text-gray-900'
    },
  },
  methods: {
    logOut(e) {
      e.preventDefault()
      this.$auth.logout().then(() => this.$router.push('/auth/login'))
    },
  },
}
</script>
