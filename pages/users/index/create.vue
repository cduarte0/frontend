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
            class="col-span-3"
            required
          />
          <TextInput
            label="Nome Completo"
            placeholder="Nome"
            v-model="users.fullName"
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
            label="Endereco"
            placeholder="Eduardo Mondlane"
            v-model="users.address"
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
            label="Senha"
            placeholder="Senha"
            v-model="users.password"
            class=""
            required
          />
          <TextInput
            label="Repetir senha"
            placeholder="Repetir senha"
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
            @close="$router.push({ name: 'users' })"
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
    categoriesDescription: [''],
    projectDescription: [''],
    gender: ['Masculino', 'Feminino'],
    statusM: ['Casado', 'Solteiro', 'Divorciado'],
    users: {
      address: '',
      dateBirth: '2022-08-28',
      dateEnd: '2022-08-28',
      dateStart: '2022-08-28',
      email: 'cduartemz@caritas',
      fullName: '',
      gender: '',
      civilStatus: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
      provenance: 'Pemba',
      roles: ["ROLE_ADMIN"],
      username: '',
    },
  }),
  methods: {
    handleSubmit() {
      this.$store
        .dispatch('users/createItem', {
          data: this.users,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Utilizador criado com sucesso',
          })
          this.$emit('close')
          this.$store.dispatch('users/fetchItems')
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
