<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Adicionar novo funcionario'"
      size="xl"
      @close="$router.push({ name: 'users' })"
    >
      <ValidationObserver ref="observer" tag="form" @submit.prevent="handleSubmit()">
        <div class="grid grid-cols-3 gap-4 space-y-px w-max">
          <TextInput
            label="Username"
            placeholder="Username"
            v-model="users.username"
            class=""
            required
          />
          <TextInput
            label="Nome Completo"
            placeholder="Nome"
            v-model="users.fullName"
            class=""
            required
          />
          <SelectInput
            label="Genero"
            placeholder="Selecione uma opção"
            :items="gender"
            v-model="users.gender"
            class=""
            required
          />
          <SelectInput
            label="Estado Civil"
            placeholder="Selecione uma opção"
            :items="statusM"
            v-model="users.civilStatus"
            class=""
            required
          />
          <TextInput
            label="Telefone"
            placeholder="82/83/84/85/86/87"
            v-model="users.phoneNumber"
            class=""
            required
          />
          <TextInput
            label="E-mail"
            placeholder="jdf@email.com"
            v-model="users.email"
            class=""
            required
          />
          <TextInput
            label="Endereço"
            placeholder="Eduardo Mondlane"
            v-model="users.address"
            class=""
            required
          />
          <TextInput
            label="Proveniencia"
            placeholder="Namuno"
            v-model="users.provenance"
            class=""
            required
          />
          <TextInput
            label="Data de nascimento"
            placeholder="1998-08-28"
            v-model="users.dateBirth"
            type="date"
            class=""
            required
          />
          <TextInput
            label="Inicio de contrato"
            placeholder="2022-08-28"
            v-model="users.dateStart"
            type="date"
            class=""
            required
          />
          <TextInput
            label="Fim de contrato"
            placeholder="2025-08-28"
            v-model="users.dateEnd"
            type="date"
            class=""
            required
          />
          <SelectInput
            label="Tipo de utilizador"
            placeholder="Selecione uma opção"
            :items="roles"
            v-model="users.roles"
            class=""
            required
          />
          <SelectInput
            label="Projecto"
            placeholder="Selecione uma opção"
            :items="projects"
            v-model="selectedProject"
            class=""
            required
          />
          <TextInput
            label="Senha"
            placeholder="Senha"
            type="password"
            v-model="users.password"
            class=""
            required
          />
          <TextInput
            label="Repetir senha"
            placeholder="Repetir senha"
            type="password"
            v-model="users.passwordConfirmation"
            class=""
            required
          />
        </div>
      </ValidationObserver>
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
import SelectInput from '~/components/common/inputs/SelectInput.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
import TextInput from '~/components/common/inputs/TextInput.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { ValidationObserver } from 'vee-validate'

export default defineComponent({
  components: { Modal, AppButton, TextInput, SelectInput, ValidationObserver },
  data: () => ({
    rol: '',
    userType: [
      { id: '', value: 'Admin', name: 'Administrador' },
      { id: '', value: 'Manager', name: 'Gestor' },
      { id: '', value: 'Normal', name: 'Normal' },
    ],
    selectedProject: { id: '', name: '', value: '' },
    gender: ['Masculino', 'Feminino'],
    statusM: ['Casado', 'Solteiro', 'Divorciado'],
    users: {
      projectId: '',
      address: '',
      dateBirth: '',
      dateEnd: '',
      dateStart: '',
      email: '',
      fullName: '',
      gender: '',
      civilStatus: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
      provenance: '',
      roles: {},
      username: '',
    },
  }),

  created(){
    this.fetch()
  },

   async fetch({ store }: any) {
      await store.dispatch('roles/fetchItems')
    },
  computed: {
    projects(this: any) {
      return Object.values(this.$store.state.projects.all).map((item: any) => ({
        id: item.id,
        name: item.projectName,
        value: item.id,
      }))
    },
    roles(this: any){
      return Object.values(this.$store.state.roles.all).map((item: any) => ({
        id: item.id,
        name: item.description,
        value: item.name,
      }))
    }
  },
  methods: {

    fetch() {
      this.$store.dispatch('projects/fetchItems')
    },

    async handleSubmit(this: any) {
      // @ts-ignore
      const isValid = await this.$refs.observer.validate();
      this.users.projectId = this.selectedProject.id
      if(isValid){
        this.$store
        .dispatch('users/createItem', {
          data: this.users,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Utilizador criado com sucesso',
          })
          this.$store.dispatch('users/fetchItems')
          this.$router.push({ name: 'users' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao criar utilizador, por favor tente novamente.',
          })
        })
      }else{

      }

    },
  },
})
</script>
