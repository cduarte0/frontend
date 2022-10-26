<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Adicionar novo projecto'"
      size="xl"
      @close="$router.push({ name: 'projects' })"
    >
      <div class="grid grid-cols-2 gap-3 space-y-px w-max">

        <div v-if="message" style="align-content: center; font-family: Arial; color: red" >
          {{ message }}
        </div>

        <TextInput
          v-model="project.projectName"
          label="Nome do projecto"
          placeholder="Nome do projecto"
          class="col-span-2"
          required
        />
        <TextInput
          v-model="project.projectCode"
          label="Codigo do Projecto"
          placeholder="Codigo"
          class=""
          required
        />
        <TextInput
          v-model="project.accountNumberProject"
          label="Numero de conta"
          placeholder=""
          type="number"
          class=""
          required
        />
        <TextInput
          v-model="project.localImplementation"
          label="Local de implementação"
          placeholder="Local de implementação"
          class=""
          required
        />
        <TextInput
          v-model="project.budget"
          type="number"
          label="Orçamento"
          placeholder="Orçamento"
          class=""
          required
        />
        <TextInput
          v-model="project.balanceAvailable"
          type="number"
          label="Saldo disponivel"
          placeholder="Saldo disponivel"
          class=""
          required
        />
        <SelectInput
          label="Tipo de moeda"
          placeholder="Selecione uma opção"
          :items="currencyType"
          v-model="project.typeCurrency"
          class=""
          required
        />
        <TextInput
          v-model="project.dateStart"
          type="date"
          label="Data de inicio"
          placeholder="Data de inicio"
          class=""
          required
        />
        <TextInput
          v-model="project.dateEnd"
          type="date"
          label="Data final"
          placeholder="Data final"
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
            @click.native="$router.push({ name: 'projects' })"
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

    message:'',

    currencyType: [
      { id: 1, name: 'MZN', value: 'MZN' },
      { id: 2, name: 'USD', value: 'USD' },
      { id: 3, name: 'Real', value: 'R$' },
      { id: 4, name: 'Libra', value: 'Libra' },
      { id: 5, name: 'RAND', value: 'RAND' },
      { id: 6, name: 'YEN', value: 'YEN' },
      { id: 7, name: 'EURO', value: 'EURO' },
    ],
    project: {
      balanceAvailable: '',
      budget: '',
      projectName: '',
      dateEnd: '',
      dateStart: '',
      localImplementation: '',
      status: 'Activo',
      typeCurrency: '',
      projectCode: '',
      accountNumberProject: '',
    },
  }),
  methods: {
    handleSubmit(this: any) {
      this.project.typeCurrency = this.project.typeCurrency.name;
      this.$store
        .dispatch('projects/createItem', {
          data: this.project,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Projecto criado com sucesso',
          })
          this.$store.dispatch('projects/fetchItems')
          this.$router.push({ name: 'projects' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao criar projecto, por favor tente novamente.',
          })
        })
      this.message = 'Erro ao criar projecto, por favor, verifique os campos e tente novamente.'
    },
  },
}
</script>
