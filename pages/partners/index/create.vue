<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Adicionar parceiro'"
      size="xl"
      @close="$router.push({ name: 'partners' })"
    >
      <div class="grid grid-cols-2 gap-3 space-y-px w-max">
        <TextInput
          v-model="partner.companyName"
          label="Nome do completo"
          placeholder="Nome do completo"
          class="col-span-2"
          required
        />
        <TextInput
          v-model="partner.nuit"
          label="Nuit"
          placeholder="Nuit"
          type="number"
          class=""
          required
        />
        <TextInput
          v-model="partner.address"
          label="Endereco"
          placeholder="Endereco"
          class=""
          required
        />
        <TextInput
          v-model="partner.email"
          label="E-mail"
          placeholder="E-mail"
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
      </div>
      <template #actions>
        <div class="flex items-center space-x-4">
          <AppButton
            class="flex text-white w-full h-10"
            label="Salvar"
            variant="green"
            :loading="false"
            @click.native="handleSubmit"
          />
          <AppButton
            class="flex text-black"
            label="Cancelar"
            variant="white"
            size="large"
            @click.native="$router.push({ name: 'partners' })"
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

  data: () => ({
    partner: {
      companyName: '',
      nuit: '',
      address: '',
      email: '',
      project: '',
    },
    selectedProject: { id: '', name: '', value: '' },
  }),
  computed: {
    projects(this: any) {
      return Object.values(this.$store.state.projects.all).map((item: any) => ({
        id: item.id,
        name: item.projectName,
        value: item.id,
      }))
    },
  },

  methods: {
    handleSubmit(this: any) {
      this.partner.project = this.selectedProject.id
      this.$store
        .dispatch('partners/createItem', {
          data: this.partner,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Parceiro adicionado com sucesso',
          })
          this.$store.dispatch('partners/fetchItems')
          this.$router.push({ name: 'partners' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao adicionar parceiro, por favor tente novamente.',
          })
        })
    },
  },
}
</script>
