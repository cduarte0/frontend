<template>
  <div>
    <Page class="py-10 px-8" title="Termos de referencia" sub-title="Lista de tdrs">
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput label="" placeholder="Pesquisar" class="w-1/4 px-2" />

          <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'
              || userType === 'ROLE_TECHNICAL'|| userType === 'ROLE_LOGISTIC'
              || userType === 'ROLE_COORDINATOR'">

            <AppButton
              class="flex text-white"
              label="Adicionar"
              variant="green"
              icon
              size="large"
              @click.native="
                $router.push({
                  name: 'requests-termReference-create',
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
            :headers="tdrHeaders"
            counter
            :items="tdrs"
            actions
          >
            <template #actions="{ value: tdr }">
              <div class="flex flex-wrap items-center space-x-2">

                <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'
                    || userType === 'ROLE_TECHNICAL'|| userType === 'ROLE_LOGISTIC'
                    || userType === 'ROLE_COORDINATOR'"

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
                  @click="goToEdit(tdr)"
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
                  @click="tdrDetail(tdr)"
                >
                  <ViewOutline />
                </div>
                <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'
                      || userType === 'ROLE_TECHNICAL'|| userType === 'ROLE_LOGISTIC'
                      || userType === 'ROLE_COORDINATOR'"

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
                  @click="deleteTdr(tdr)"
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
            >Tem certeza que pretende remover a TdR:
              {{ selectedTdr.descriptionTdR }}?</span
            >
        </div>
      </delet-modal>

      <nuxt-child />
    </page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Page from "~/components/common/misc/Page.vue";
import AppButton from "~/components/common/misc/AppButton.vue";
import TextInput from "~/components/common/inputs/TextInput.vue";
import AddUserIcon from "~/assets/icons/add-user.vue";
import Table from "~/components/common/misc/Table.vue";
import EditOutline from "~/assets/icons/edit_outline.vue";
import DeleteOutline from "~/assets/icons/delete_outline.vue";
import DeletModal from "~/components/common/misc/DeletModal.vue";
import ViewOutline from "~/assets/icons/view-outline.vue";

export default defineComponent({
  name: "Index",
  components: {
    DeletModal,
    Page,
    AppButton,
    TextInput,
    AddUserIcon,
    Table,
    EditOutline,
    DeleteOutline,
    ViewOutline,
  },
  data: () => ({
    modules: [],
    hiddenSettings: true,

    showDeleteModal: false,

    data:[],
    selectedTdr: {
      id:'',
      descriptionTdR:'',
      locationAndDateActivity:'',
      status:'',
    },
    tdrHeaders: [
      {
        key: "descriptionTdR",
        title: "Descrição da TdR",
        class: "whitespace-no-wrap",
      },
      {
        key: "locationAndDateActivity",
        title: "Local e Data da Actividade",
        class: "whitespace-no-wrap"
      },
      {
        key: "status",
        title: "Estado",
        class: "whitespace-no-wrap",
      },
    ],
  }),

  async fetch({ store }: any) {
    await store.dispatch('tdrs/fetchItems')
  },

  computed: {

    userType(): any {
    // @ts-ignore
    return this.$store.state.auth.user.userRole
  },

    tdrs(this:any) {
      return Object.values(this.$store.state.tdrs.all).map((item: any) => ({
        id: item.id,
        descriptionTdR: item.descriptionTdR,
        locationAndDateActivity: item.locationAndDateActivity,
        status: item.status,
      }));
    },
  },
  methods: {
    goToEdit(tdr: any) {
      this.$router.push({
        name: "requests-tdr-index-id-edit",
        params: { tdr: tdr },
      });
    },
    tdrDetail(tdr:any){
      this.$router.push({ name: 'requests-termReference-id', params: { id: tdr.id } })
    },
    deleteTdr(tdr: any) {
      this.selectedTdr = tdr || {}
      this.showDeleteModal = !this.showDeleteModal
    },
    remove() {
      this.$store.dispatch('tdrs/deleteItem', {
        config: {
          URL: `/tdrs/${this.selectedTdr.id}`,
        },
      })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'TdR eliminado com sucesso',
          })
          this.$store.dispatch('tdrs/fetchItems')
          this.showDeleteModal = !this.showDeleteModal
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao eliminar a TdR, por favor tente novamente.',
          })
        })
      }
    },
  });
</script>
