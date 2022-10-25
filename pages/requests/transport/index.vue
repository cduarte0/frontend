<template>
  <div>
    <page
      class="py-10 px-8"
      title="Transporte"
      sub-title="Lista de requisições"
    >
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput label="" placeholder="Pesquisar" class="w-1/4 px-2" />
          <div>
            <AppButton
              class="flex text-white"
              label="Requisitar"
              variant="green"
              icon
              size="large"
              @click.native="
                $router.push({
                  name: 'requests-transport-index-create',
                })
              "
            >
            </AppButton>
          </div>
        </div>
        <div class="flex w-full">
          <Table
            class="w-full"
            :headers="requestHeaders"
            :items="transportRequests"
            counter
            actions
          >
            <template #name="{ value: transportRequest }">
              <span class="flex font-semibold">{{
                transportRequest.name
              }}</span>
            </template>
            <template #actions="{ value: transportRequest }">
              <div class="flex flex-wrap items-center space-x-2">
                <div
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
                  @click="goToEdit(transportRequest)"
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
                  @click="requestDetail(transportRequest)"
                >
                  <ViewOutline />
                </div>

                <div
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
                  @click="deleteTransportRequest(transportRequest)"
                >
                  <delete-outline />
                </div>
              </div>
            </template>
          </Table>
        </div>
      </div>

      <delet-modal
        v-if="showDeleteModal"
        @close="showDeleteModal = false"
        @remove="remove"
      >
        <div class="flex">
          <span
            >Tem certeza que pretende remover a requisicao de transporte:
            {{ selectedRequest.descriptionRequest }}?</span
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
    DeleteOutline,
  },
  data: () => ({
    showDeleteModal: false,
    filters: {
      page: 0,
      name: '',
    },
    date: new Date(),
    data: [],
    selectedRequest: {
      id: '',
      descriptionRequest: '',
      requestorResponsible: '',
      projectName: '',
    },
    requestHeaders: [
      {
        key: 'descriptionRequest',
        title: 'Descricao da Solicitacao',
        class: 'whitespace-no-wrap',
      },

      {
        key: 'requestorResponsible',
        title: 'Requisitante',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'projectName',
        title: 'Projecto',
        class: 'whitespace-no-wrap',
      },
    ],
  }),
  async fetch({ store }: any) {
    await store.dispatch('transportation/fetchItems')
  },

  computed: {
    transportRequests(this: any) {
      return Object.values(this.$store.state.transportation.all).map(
        (item: any) => ({
          id: item.id,
          descriptionRequest: item.descriptionRequest,
          requestorResponsible: item.requestorResponsible,
          projectName: item.project.projectName,
        })
      )
    },
  },
  methods: {
    fetchTransportRequest() {
      this.$store.dispatch('transportation/fetchItems', {
        params: { ...this.filters },
      })
    },
    goToEdit(request: any) {
      this.$router.push({
        name: 'transport-index-id-edit',
        params: { request: request },
      })
    },

    deleteTransportRequest(transportRequest: any) {
      this.selectedRequest = transportRequest || {}
      this.showDeleteModal = !this.showDeleteModal
    },
    remove() {
      this.$store
        .dispatch('transportation/deleteItem', {
          config: {
            URL: `/transportation/${this.selectedRequest.id}`,
          },
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Solicitacao de transporte eliminado com sucesso',
          })
          this.$store.dispatch('transportation/fetchItems')
          this.showDeleteModal = !this.showDeleteModal
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message:
              'Erro ao eliminar a Solicitacao de transporte, por favor tente novamente.',
          })
        })
    },
    requestDetail(item: any) {
      this.$router.push({ name: 'requests-transport-id', params: { id: item.id } })
    },
  },
})
</script>
