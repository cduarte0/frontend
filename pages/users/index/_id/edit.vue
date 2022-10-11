<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Editar funcionario'"
      size="xl"
      :loading="$wait.waiting('users.update.index')"
      @close="$router.push({ name: 'users' })"
    >
      <div class="grid grid-cols-3 gap-4 space-y-px w-max">
        <TextInput
          v-model="user.username"
          label="Username"
          placeholder="Username"
          class=""
          required
        />
        <TextInput
          v-model="user.fullName"
          label="Nome"
          placeholder="Nome"
          class=""
          required
        />
        <TextInput
          v-model="user.email"
          label="Email"
          placeholder="Email"
          class=""
          required
        />
        <TextInput
          v-model="user.phoneNumber"
          label="Telefone"
          placeholder="849420224"
          class=""
          required
        />
        <TextInput
          v-model="user.address"
          label="Endereco"
          placeholder="Eduardo Mondlane"
          class=""
          required
        />
        <SelectInput
          v-model="user.roles"
          label="Tipo de utilizador"
          placeholder=""
          :items="roles"
          class=""
          required
        />
        <SelectInput
          v-model="user.civilStatus"
          label="Estado Civil"
          placeholder=""
          :items="statusM"
          class=""
          required
        />
        <TextInput
          v-model="user.dataEnd"
          type="date"
          label="Fim do contrato"
          placeholder=""
          class=""
          required
        />
        <SelectInput
          v-model="project"
          label="Projecto"
          placeholder=""
          :items="projects"
          class=""
          required
        />
      </div>
      <template #actions>
        <div class="flex items-center space-x-4">
          <AppButton
            class="flex text-white w-full h-10"
            label="Salvar"
            variant="green"
            @click.native="handleSubmit"
          />
          <AppButton
            class="flex text-black"
            label="Cancelar"
            variant="white"
            size="large"
            @click.native="$router.push({ name: 'users' })"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from '~/components/common/misc/Modal.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
import TextInput from '~/components/common/inputs/TextInput.vue'
import SelectInput from '~/components/common/inputs/SelectInput.vue'

export default {
  components: { Modal, AppButton, TextInput, SelectInput },
  // @ts-ignore
  asyncData({ params, redirect }) {
    if (!params.user) {
      redirect('/users')
    }
    const user = params.user
    return {
      user,
    }
  },
  data: () => ({
    role: ['Administrador', 'Gestor', 'Normal'],
    statusM: ['Casado', 'Solteiro', 'Divorciado'],
    project: {
      id: '',
      name: '',
      value: '',
    },
  }),
  created(){
    this.fetch()
  },
  computed: {
    projects(this: any) {
      return Object.values(this.$store.state.projects.all).map((item: any) => ({
        id: item.id,
        name: item.projectName,
        value: item.id,
      }))
    },
    roles(this: any) {
      return Object.values(this.$store.state.roles.all).map((item: any) => ({
        id: item.id,
        name: item.description,
        value: item.name,
      }))
    },
  },

  methods: {
    fetch() {
      this.$store.dispatch('roles/fetchItems')
      this.$store.dispatch('projects/fetchItems')
    },
    handleSubmit(this: any) {
      this.user.projectId = this.project.id
      this.$store
        .dispatch('users/updateItem', {
          config: {
            // @ts-ignore
            URL: `/users/${this.user.id}`,
          },
          data: { ...(this as any).user },
          noStoreUpdate: true,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Os dados do utilizador foram atuaizados',
          })
          this.$store.dispatch('users/fetchItems')
          this.$router.push({ name: 'users' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro, problemas ao atualizar dados do utilizador.',
          })
        })
    },
  },
}
</script>
