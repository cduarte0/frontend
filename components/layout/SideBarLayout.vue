<template>
  <div>
    <nav class="w-full lg:hidden py-6 px-6 bg-red-200">
      <div class="flex items-center justify-between">
        <a class="text-xl text-white font-semibold" href="#">
          <h4 class="text-white uppercase">Caritas</h4>
        </a>
        <button
          class="navbar-burger flex items-center rounded focus:outline-none"
        >
          <burger-menu />
        </button>
      </div>
    </nav>
    <div class="hidden lg:block navbar-menu relative z-50 rounded-r-xl">
      <div
        class="navbar-backdrop fixed lg:hidden inset-0 bg-red-200 opacity-10"
      ></div>
      <nav
        class="
          h-screen
          left-0
          bottom-0
          flex flex-col
          lg:w-60
          pt-6
          pb-8
          bg-red-500
        "
      >
        <div class="px-4 pb-6">
          <h3 class="mb-2 text-xs uppercase text-gray-100 font-medium">
            Principais
          </h3>
          <ul class="mb-8 text-sm font-medium">
            <li >
              <nuxt-link
                class="
                  flex
                  items-center
                  pl-3
                  py-3
                  pr-2
                  text-gray-50
                  hover:bg-red-900
                  rounded
                "
                to="/partners"
              >
                <people-alt-icon
                  class="inline-block mr-3 text-gray-500 fill-current"
                />
                <span>Parceiros</span>
              </nuxt-link>
            </li>
<!--            <li v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'">-->
            <li>
              <nuxt-link
                class="
                  flex
                  items-center
                  pl-3
                  py-3
                  pr-4
                  text-gray-50
                  hover:bg-red-900
                  rounded
                "
                to="/users"
              >
                <person-frame-icon class="inline-block mr-3 text-gray-500" />
                <span>Funcionarios</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="
                  flex
                  items-center
                  pl-3
                  py-3
                  pr-4
                  text-gray-50
                  hover:bg-red-900
                  rounded
                "
                to="/projects"
              >
                <archive-folder class="inline-block mr-3 text-gray-500" />
                <span>Projectos</span>
              </nuxt-link>
            </li>
          </ul>
          <div class="">
            <div class="flex flex-col">
              <div
                class="
                  flex
                  items-center
                  pl-3
                  py-3
                  pr-2
                  text-gray-50
                  hover:bg-red-900
                  rounded
                  cursor-pointer
                "
                @click="hiddenSettings = !hiddenSettings"
              >
                <open-book-icon class="inline-block mr-3 text-gray-500" />
                <span class="select-none">Requisições</span>

                <span class="inline-block ml-auto">
                  <ArrowDownIcon
                    class="w-3 h-3 transform duration-500"
                    :class="{
                      'rotate-0': hiddenSettings,
                      'rotate-180': !hiddenSettings,
                    }"
                  />
                </span>
              </div>
              <ul
                class="pl-3 transition delay-300 duration-500 ease-in-out"
                :hidden="hiddenSettings"
              >
                <li>
                  <nuxt-link
                    class="
                      flex
                      items-center
                      pl-5
                      py-1
                      pr-4
                      text-gray-50
                      hover:bg-red-900
                      rounded
                    "
                    to="/requests/transport"
                  >
                    <car-cluster-icon class="inline-block mr-3 text-gray-500" />
                    <span>Sol. Transporte</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    class="
                      flex
                      items-center
                      pl-5
                      py-1
                      pr-4
                      text-gray-50
                      hover:bg-red-900
                      rounded
                    "
                    to="/requests/carrier"
                  >
                    <car-cluster-icon class="inline-block mr-3 text-gray-500" />
                    <span>Transportadoras</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    class="
                      flex
                      items-center
                      pl-5
                      py-1
                      pr-4
                      text-gray-50
                      hover:bg-red-900
                      rounded
                    "
                    to="/requests/termReference"
                  >
                    <assignment class="inline-block mr-3 text-gray-500" />
                    <span>Termo Referencia</span>
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link
                    class="
                      flex
                      items-center
                      pl-5
                      py-1
                      pr-4
                      text-gray-50
                      hover:bg-red-900
                      rounded
                    "
                    to="/requests/payments"
                  >
                    <!--<archive-folder class="inline-block mr-3" />-->
                    <span>Requisicao Pagamento</span>
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link
                    class="
                      flex
                      items-center
                      pl-5
                      py-1
                      pr-4
                      text-gray-50
                      hover:bg-red-900
                      rounded
                    "
                    to="/requests/purchaseOrders"
                  >
                    <!--<archive-folder class="inline-block mr-3" />-->
                    <span>Ordem de Compra</span>
                  </nuxt-link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BurgerMenu from '~/assets/icons/burger-menu.vue'
import OpenBookIcon from '~/assets/icons/open-book.vue'
import CarClusterIcon from '~/assets/icons/car-cluster.vue'
import PersonFrameIcon from '~/assets/icons/person-frame.vue'
import ArrowDownIcon from '~/assets/icons/arrow-down.vue'
import PeopleAltIcon from '~/assets/icons/people-alt.vue'
import ArchiveFolder from '~/assets/icons/archive-folder.vue'
import Assignment from '~/assets/icons/assignment.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    ArchiveFolder,
    PeopleAltIcon,
    ArrowDownIcon,
    PersonFrameIcon,
    CarClusterIcon,
    OpenBookIcon,
    BurgerMenu,
    Assignment,
  },
  data: () => ({
    modules: [],
    hiddenSettings: true,
  }),
  computed: {
    userType(): any {
      // @ts-ignore
      return this.$store.state.auth.user.userRole
    },
  },
})
</script>
<style scoped>
 a.nuxt-link-active {
  background: rgba(99, 35, 28, 0.932);
}
</style>
