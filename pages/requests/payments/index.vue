<template>
  <div>
    <Page class="py-10 px-8" title="Pagamentos" sub-title="Lista de requisicoes">
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput label="" placeholder="Pesquisar" class="w-1/4 px-2" />

          <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_LOGISTIC'">
            <AppButton
              class="flex text-white"
              label="Requisitar"
              variant="green"
              icon
              size="large"
              @click.native="
                $router.push({
                  name: 'requests-payments-index-create',
                })
              "
            />
          </div>
        </div>
        <div class="flex w-full">
          <Table
            class="w-full"
            :headers="paymentHeaders"
            counter
            :items="payments"
            actions
          >
            <template #actions="{ value: payment }">
              <div class="flex flex-wrap items-center space-x-2">
                <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_LOGISTIC'
                    || userType === 'ROLE_MANAGER'"
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
                  @click="goToEdit(payment)"
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

                <div v-if="userType === 'ROLE_ADMIN' || userType === 'ROLE_LOGISTIC'
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
                  @click="deleteTdr(payment)"
                >
                  <delete-outline />
                </div>
              </div>
            </template>
          </Table>
        </div>
      </div>
      <nuxt-child />
    </Page>
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
import ViewOutline from "~/assets/icons/view-outline.vue";

export default defineComponent({
  name: "Index",
  components: {
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

    data:[],
    selectedTdr: {},
    paymentHeaders: [
      {
        key: "name",
        title: "Termo de referencia",
        class: "whitespace-no-wrap",
      },
      {
        key: "createdAt",
        title: "Data de requisição",
        class: "whitespace-no-wrap"
      },
      {
        key: "totalValue",
        title: "Valor",
        class: "whitespace-no-wrap",
      },
    ],
  }),

  async fetch({ store }: any) {
    await store.dispatch('payments/fetchItems')
  },

  computed: {
    userType(): any {
      // @ts-ignore
      return this.$store.state.auth.user.userRole
    },

    payments(this:any) {
      return Object.values(this.$store.state.payments.all).map((item: any) => ({
        createdAt: item.createdAt,
        name: item.referenceTerm.descriptionTdR,
        totalValue: item.totalValue
      }))
    },
  },
  methods: {
    goToEdit(payment: any) {
      this.$router.push({
        name: "requests-payments-index-id-edit",
        params: { tdr: payment },
      });
    },
    deleteTdr(payment: any) {
    },
  },
});
</script>
