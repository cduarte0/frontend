<template>
  <div>
    <Page class="py-10 px-8" title="Parceiros" sub-title="Lista de parceiros">
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput label="" placeholder="Pesquisar" class="w-1/4 px-2" />

          <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'">
            <AppButton
              class="flex text-white"
              label="Adicionar"
              variant="green"
              icon
              size="large"
              @click.native="
                $router.push({
                  name: 'partners-index-create',
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
            :headers="partnersHeaders"
            counter
            :items="partners"
            actions
          >
            <template #actions="{ value: partner }">
              <div class="flex flex-wrap items-center space-x-2">
                <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'"
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
                  @click="goToEdit(partner)"
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
                  @click="userDetail(user)"
                >
                  <ViewOutline/>
                </div>

                <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_MANAGER'"
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
                  @click="deletePartner(partner)"
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
            >Tem certeza que pretende remover o parceiro:
              {{ selectedPartner.companyName }}?</span
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
import Pagination from '~/components/common/misc/Pagination.vue'
import DeletModal from '~/components/common/misc/DeletModal.vue'
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
    Pagination,
    ViewOutline,
  },
  data: () => ({
    modules: [],
    hiddenSettings: true,

    showDeleteModal: false,
    data:[],

    selectedPartner: {
      id:'',
      companyName:'',
      projectName:'',
      email:'',
    },
    partnersHeaders: [
      {
        key: "companyName",
        title: "Nome Completo",
        class: "whitespace-no-wrap",
      },
      {
        key: "projectName",
        title: "Nome do Projecto",
        class: "whitespace-no-wrap"
      },
      {
        key: "email",
        title: "e-mail",
        class: "whitespace-no-wrap",
      },
    ],
  }),

  async fetch({ store }: any) {
    await store.dispatch('partners/fetchItems')
  },

  computed: {
    userType(): any {
      // @ts-ignore
      return this.$store.state.auth.user.userRole
    },

    meta(this:any) {
     return this.$store.state.partners.pagination
    },
    partners(this:any) {
      return Object.values(this.$store.state.partners.all).map((item: any) => ({
        id: item.id,
        companyName: item.companyName,
        projectName: item.projects[0].projectName,
        email: item.email
      }));
    },
  },
  methods: {
    goToEdit(partner: any) {
      this.$router.push({
        name: "partners-index-id-edit",
        params: { partner: partner },
      });
      console.log(partner);
    },

    deletePartner(partner: any) {
      this.selectedPartner = partner || {}
      this.showDeleteModal = !this.showDeleteModal
    },
    remove(){
      this.$store.dispatch('partners/deleteItem', {
        config: {
          URL: `/partners/${this.selectedPartner.id}`,
        },
      })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Parceiro eliminado com sucesso',
          })
          this.$store.dispatch('partners/fetchItems')
          this.showDeleteModal = !this.showDeleteModal
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao eliminar o parceiro, por favor tente novamente.',
          })
        })
      }
    },
  });
</script>
