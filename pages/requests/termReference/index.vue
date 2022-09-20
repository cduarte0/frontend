<template>
  <div>
    <Page class="py-10 px-8" title="Termos de referencia" sub-title="Lista de tdrs">
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
                  name: 'requests-tdr-index-create',
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
    selectedTdr: {},
    tdrHeaders: [
      {
        key: "approvedBy",
        title: "Aprovador",
        class: "whitespace-no-wrap",
      },
      // {
      //   key: "email",
      //   title: "E-mail",
      //   class: "whitespace-no-wrap"
      // },
      // {
      //   key: "address",
      //   title: "Endereco",
      //   class: "whitespace-no-wrap",
      // },
    ],
  }),

  async fetch({ store }: any) {
    await store.dispatch('tdrs/fetchItems')
  },

  computed: {
    tdrs(this:any) {
      return Object.values(this.$store.state.tdrs.all)
    },
  },
  methods: {
    goToEdit(tdr: any) {
      this.$router.push({
        name: "requests-carrier-index-id-edit",
        params: { tdr: tdr },
      });
    },
    deleteTdr(tdr: any) {
    },
  },
});
</script>
