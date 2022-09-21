<template>
  <div>
    <Page class="py-10 px-8" title="Transportadoras" sub-title="Lista de trasportadoras">
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput label="" placeholder="Pesquisar" class="w-1/4 px-2" />
          <div>
            <AppButton
              class="flex text-white"
              label="Adicionar"
              variant="green"
              icon
              size="large"
              @click.native="
                $router.push({
                  name: 'requests-carrier-index-create',
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
            :headers="carriersHeaders"
            counter
            :items="carriers"
            actions
          >
            <template #actions="{ value: carrier }">
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
                  @click="goToEdit(carrier)"
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
                    bg-red-500
                    text-white
                    cursor-pointer
                  "
                  @click="deleteCarrier(carrier)"
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
            >Tem certeza que pretende remover a transportadora:
              {{ selectedCarrier.companyName }}?</span
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
  },
  data: () => ({
    showDeleteModal: false,
    data:[],
    selectedCarrier: {
      id:'',
      companyName:'',
      email:'',
      address:'',
    },
    carriersHeaders: [
      {
        key: "companyName",
        title: "Nome Completo",
        class: "whitespace-no-wrap",
      },
      {
        key: "email",
        title: "E-mail",
        class: "whitespace-no-wrap"
      },
      {
        key: "address",
        title: "Endereco",
        class: "whitespace-no-wrap",
      },
    ],
  }),

  async fetch({ store }: any) {
    await store.dispatch('carriers/fetchItems')
  },

  computed: {
    // carriers(this:any) {
    //   return Object.values(this.$store.state.carriers.all)
    // },
    //
    carriers(this: any) {
      return Object.values(this.$store.state.carriers.all).map((item: any) => ({
        id: item.id,
        companyName: item.companyName,
        email: item.email,
        address: item.address,
      }));
    },
  },

  methods: {
    goToEdit(carrier: any) {
      this.$router.push({
        name: "requests-carrier-index-id-edit",
        params: { carrier: carrier },
      });
      console.log(carrier);
    },

    deleteCarrier(carrier: any) {
      this.selectedCarrier = carrier || {}
      this.showDeleteModal = !this.showDeleteModal
    },
    remove() {
      this.$store.dispatch('carriers/deleteItem', {
        config: {
          URL: `/carriers/${this.selectedCarrier.id}`,
        },
      })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'transportadora eliminado com sucesso',
          })
          this.$store.dispatch('carriers/fetchItems')
          this.showDeleteModal = !this.showDeleteModal
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao eliminar a transportadora, por favor tente novamente.',
          })
        })
      }
    },
  });
</script>
