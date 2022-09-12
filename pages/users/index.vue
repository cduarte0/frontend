<template>
  <div>
    <page
      class="py-10 px-8"
      title="Funcionarios"
      sub-title="Lista de funcionarios"
    >
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row space-x-2 justify-end">
          <TextInput
            label=""
            v-model="filters.name"
            @input="fetchUsers"
            placeholder="Pesquisar"
            class="w-1/4 px-2"
          />
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
                    bg-green-500
                    text-white
                    cursor-pointer
                  "
                  @click="userDetail(user)"
                >
                  <ViewOutline/>
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
      <delet-modal
        v-if="showDeleteModal"
        @close="showDeleteModal = false"
        @remove="remove"
      >
        <div class="flex">
          <span
            >Tem certeza que pretende remover o utilizador:
            {{ selectedUser.username }}?</span
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
import DeletModal from '~/components/common/misc/DeletModal.vue'
import ViewOutline from "~/assets/icons/view-outline.vue";

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
    projectUser:{
      id:'',
      name:'',
      value:'',
    },
    data: [],
    selectedUser: {
      id:'',
      address: '',
      projectId: '',
      dateBirth: '',
      civilStatus: '',
      dateEnd: '',
      dateStart: '',
      email: '',
      fullName: '',
      gender: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
      provenance: '',
      roles: [''],
      username: '',
    },
    usersHeaders: [
      {
        key: 'username',
        title: 'USER',
        class: 'whitespace-no-wrap',
      },
      // {
      //   key: 'project',
      //   title: 'PROJECTO',
      //   class: 'whitespace-no-wrap',
      // },
       {
        key: 'fullName',
        title: 'Nome',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'email',
        title: 'E-mail',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'phoneNumber',
        title: 'Celular',
        class: 'whitespace-no-wrap',
      },
    ],
  }),
  async fetch({ store }: any) {
    await store.dispatch('users/fetchItems')
  },

  computed: {
    users(this: any) {
      return Object.values(this.$store.state.users.all)
    },
  },

  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetchItems', {
        params: { ...this.filters },
      })
      console.log(this.filters)
    },

    goToEdit(user: any) {
      this.$router.push({
        name: 'users-index-id-edit',
        params: { user: user },
      })
    },
    userDetail(user: any){
      user.map((item: any) => ({
        id: item.id,
        fullName: item.fullName,
        projectName: item.project.projectName,
        email: item.email
      }));
    },
    deleteUser(user: any) {
      this.selectedUser = user || {}
      this.showDeleteModal = !this.showDeleteModal
    },
    remove(){
      this.$store.dispatch('users/deleteItem', {
        config: {
              URL: `/users/${this.selectedUser.id}`,
            },
      })
      .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Utilizador eliminado com sucesso',
          })
          this.$store.dispatch('users/fetchItems')
          this.showDeleteModal = !this.showDeleteModal
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao eliminar utilizador, por favor tente novamente.',
          })
        })
      
    }
  },
})
</script>
