<template>
  <div>
    <page
      class="py-10 px-8"
      title="Projectos"
      sub-title="Lista de projectos existentes"
    >
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput
            label=""
            @input="fetchProjects"
            placeholder="Pesquisar"
            class="w-1/4 px-2"
          />
          <!--<div>
            <AppButton
              class="flex text-black"
              label="Imprimir"
              variant="white"
              icon
              size="large"
            >
              <template #icon>
                <print />
              </template>
            </AppButton>
          </div>
          <div>
            <AppButton
              class="flex text-white"
              label="Importar"
              variant="blue-400"
              icon
              size="large"
            >
              <template #icon>
                <AddUserIcon />
              </template>
            </AppButton>
          </div>-->
          <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'">
            <AppButton
              class="flex text-white"
              label="Adicionar"
              variant="green"
              icon
              size="large"
              @click.native="
                $router.push({
                  name: 'projects-index-create',
                })
              "
            >
              <template #icon>
                <AddUserIcon />
              </template>
            </AppButton>
          </div>
        </div>
        <div class="flex w-full">
          <Table
            class="w-full"
            :headers="projectHeaders"
            :items="projects"
            counter
            actions
          >
            <template #name="{ value: project }">
              <span class="flex font-semibold">{{ project.name }}</span>
            </template>
            <template #actions="{ value: project }">
              <div class="flex flex-wrap items-center space-x-2">
                <div
                  v-if="
                    userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'
                  "
                  class="
                    flex
                    w-8
                    h-8
                    justify-items-center
                    p-2
                    rounded-sm
                    bg-yellow-500
                    text-white
                    cursor-pointer
                  "
                  @click="goToEdit(project)"
                >
                  <edit-outline />
                </div>
                <div
                  class="
                    flex
                    w-8
                    h-8
                    justify-items-center
                    p-2
                    rounded-sm
                    bg-green-500
                    text-white
                    cursor-pointer
                  "
                  @click="projectDetail(project)"
                >
                  <view-outline />
                </div>

                <div
                  v-if="
                    userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'
                  "
                  class="
                    flex
                    w-8
                    h-8
                    justify-items-center
                    p-2
                    rounded-sm
                    bg-red-500
                    text-white
                    cursor-pointer
                  "
                  @click="deleteProject(project)"
                >
                  <delete-outline />
                </div>
              </div>
            </template>
          </Table>
        </div>
        <div class="flex">
          <pagination
            :value="meta.currentPage + 1"
            :total-rows="meta.totalRows"
            :per-page="meta.perPage"
          />
        </div>
      </div>

      <delet-modal
        v-if="showDeleteModal"
        @close="showDeleteModal = false"
        @remove="remove"
      >
        <div class="flex">
          <span
            >Tem certeza que pretende remover o projecto:
            {{ selectedProject.projectName }}?</span
          >
        </div>
      </delet-modal>
      <nuxt-child />
    </page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Page from '~/components/common/misc/Page.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
import TextInput from '~/components/common/inputs/TextInput.vue'
import AddUserIcon from '~/assets/icons/add-user.vue'
import Table from '~/components/common/misc/Table.vue'
import EditOutline from '~/assets/icons/edit_outline.vue'
import DeleteOutline from '~/assets/icons/delete_outline.vue'
import ViewOutline from '~/assets/icons/view-outline.vue'
import Pagination from '~/components/common/misc/Pagination.vue'
import DeletModal from '~/components/common/misc/DeletModal.vue'

export default defineComponent({
  name: 'Index',
  components: {
    DeletModal,
    ViewOutline,
    Page,
    AppButton,
    TextInput,
    AddUserIcon,
    Table,
    EditOutline,
    Pagination,
    DeleteOutline,
  },
  data: () => ({
    modules: [],
    hiddenSettings: true,

    showDeleteModal: false,
    filters: {
      page: 0,
      projectName: '',
    },
    date: new Date(),
    data: [],
    selectedProject: {
      id: '',
      projectName: '',
      localImplementation: '',
      status: '',
    },
    projectHeaders: [
      {
        key: 'projectName',
        title: 'Nome do Projecto',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'localImplementation',
        title: 'Implementação',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'status',
        title: 'Estado',
        class: 'whitespace-no-wrap',
      },
    ],
  }),
  async fetch({ store }: any) {
    await store.dispatch('projects/fetchItems')
  },

  computed: {
    userType(): any {
      // @ts-ignore
      return this.$store.state.auth.user.userRole
    },

    meta(this: any) {
      return this.$store.state.projects.pagination
    },

    projects(this: any) {
      return Object.values(this.$store.state.projects.all).map((item: any) => ({
        id: item.id,
        projectName: item.projectName,
        localImplementation: item.localImplementation,
        status: item.status,
      }))
    },
  },

  methods: {
    fetchProjects() {
      this.$store.dispatch('projects/fetchItems', {
        params: { ...this.filters },
      })
    },

    goToEdit(project: any) {
      // project.dateStart = project.dateStart[0]+'/'+project.dateStart[1]+'/'+project.dateStart[2]
      // console.log(project.dateStart)
      // const d = Date.parse(project.dateStart)
      this.$router.push({
        name: 'projects-index-id-edit',
        params: { project: project },
      })
    },
    projectDetail(project: any) {
      this.$router.push({
        name: 'projects-details',
        params: { project: project},
      })
    },

    deleteProject(project: any) {
      this.selectedProject = project || {}
      this.showDeleteModal = !this.showDeleteModal
    },
    remove() {
      this.$store
        .dispatch('projects/deleteItem', {
          config: {
            URL: `/projects/${this.selectedProject.id}`,
          },
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Projecto eliminado com sucesso',
          })
          this.$store.dispatch('projects/fetchItems')
          this.showDeleteModal = !this.showDeleteModal
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao eliminar o projecto, por favor tente novamente.',
          })
        })
    },
  },
})
</script>
