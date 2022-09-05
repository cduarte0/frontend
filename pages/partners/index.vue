<template>
  <div>
    <Page class="py-10 px-8" title="Parceiros" sub-title="Lista de parceiros">
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
                    bg-red-500
                    text-white
                    cursor-pointer
                  "
                  @click="deleteUser(partner)"
                >
                  <delete-outline />
                </div>
              </div>
            </template>
          </Table>
        </div>
      </div>
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
  },
  data: () => ({
    data:[],
    selectedPartner: {},
    partnersHeaders: [
      {
        key: "companyName",
        title: "Nome Completo",
        class: "whitespace-no-wrap",
      },
      {
        key: "email",
        title: "e-mail",
        class: "whitespace-no-wrap",
      },
      {
        key: "address",
        title: "Endereco",
        class: "whitespace-no-wrap",
      },
      {
        key: "nuit",
        title: "NUIT",
        class: "whitespace-no-wrap",
      },
    ],
  }),

  async fetch({ store }: any) {
    await store.dispatch('partners/fetchItems')
  },

  computed: {
    partners(this:any) {
      return Object.values(this.$store.state.partners.all);
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
    deleteUser(partner: any) {
    },
  },
});
</script>
