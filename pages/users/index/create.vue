<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Adicionar novo funcionario'"
      size="xl"
      @close="$router.push({ name: 'users' })"
    >
      <ValidationObserver ref="observer">
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
            placeholder="Selecione uma opcao"
            :items="gender"
            v-model="users.gender"
            class=""
            required
          />
          <SelectInput
            label="Estado Civil"
            placeholder="Selecione uma opcao"
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
            placeholder="jdf@fulano.com"
            v-model="users.email"
            class=""
            required
          />
          <TextInput
            label="Endereco"
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
            placeholder="2022-08-28"
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
            placeholder="2022-08-28"
            v-model="users.dateEnd"
            type="date"
            class=""
            required
          />
          <SelectInput
            label="Tipo de utilizador"
            placeholder="Selecione uma opcao"
            :items="userType"
            v-model="users.roles"
            class=""
            required
          />
          <SelectInput
            label="Projecto"
            placeholder="Selecione uma opcao"
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
// import { ValidationObserver } from 'vee-validate'

export default defineComponent({
  components: { Modal, AppButton, TextInput, SelectInput },
  data: () => ({
    userType: [
      { id: 1, value: 'ADMIN', name: 'Administrador' },
      { id: 2, value: 'MANAGER', name: 'Gestor' },
      { id: 3, value: 'NORMAL', name: 'Normal' },
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
      roles: [''],
      username: '',
    },
  }),
//  async fetch({ store }: any) {
//     await store.dispatch('roles/fetchItems')
//   },
//   created(){
//     console.log(this.roles)
//   },
  computed: {
    projects(this: any) {
      return Object.values(this.$store.state.projects.all).map((item: any) => ({
        id: item.id,
        name: item.projectName,
        value: item.id,
      }))
    },
    // roles(this: any){
    //   return Object.values(this.$store.state.roles.all).map((item: any) => ({
    //     id: item.id,
    //     name: item.name,
    //     value: item.description,
    //   }))
    // }
  },
  methods: {
    handleSubmit() {
      this.users.projectId = this.selectedProject.id
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
          this.$router.push({name: 'users'})
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao criar utilizador, por favor tente novamente.',
          })
        })
    },
  },
})
</script>
