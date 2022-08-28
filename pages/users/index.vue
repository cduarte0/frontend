<template>
  <div>
    <page
      class="py-10 px-8"
      title="Funcionarios"
      sub-title="Lista de funcionarios"
    >
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
                  name: 'users-index-create',
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
            :headers="usersHeaders"
            :items="users"
            counter
            actions
          >
            <template #actions="{ value: user }">
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
                  @click="goToEdit(user)"
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
                  @click="deleteUser(user)"
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
    filters: {
      page: 0,
      name: '',
    },
    data:[],
    selectedUser: {},
    usersHeaders: [
      {
        key: "username",
        title: "USER",
        class: "whitespace-no-wrap",
      },
      {
        key: "project",
        title: "PROJECTO",
        class: "whitespace-no-wrap",
      },
      {
        key: "phoneNumber",
        title: "Celular",
        class: "whitespace-no-wrap",
      },
    ],
  }),
  async fetch({ store }: any) {
    await store.dispatch('users/fetchItems')
  },

  computed: {
    users(this: any) {
      return Object.values(
        this.$store.state.users.all
      )
    },
  },

  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetchItems', {
        params: { ...this.filters },
      })
    },

    goToEdit(user:any) {
      this.$router.push({
        name: "users-index-id-edit",
        params: { user: user },
      });
      console.log(user);
    },
    deleteUser(user:any) {
    },
  },
});
</script>
