<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Adicionar novo projecto'"
      size="xl"
      @close="$router.push({ name: 'requests-termReference' })"
    >
      <div class="grid grid-cols-2 gap-3 space-y-px w-max">
        <TextInput
          v-model="tdr.descriptionActivity"
          label="Descricao da atividade"
          placeholder="Descricao da atividade"
          class="col-span-2"
          required
        />
        <TextInput
          v-model="tdr.descriptionTdR"
          label="Descricao da TDR"
          placeholder="Codigo"
          class=""
          required
        />
        <TextInput
          v-model="tdr.locationAndDateActivity"
          label="Local e data de atividade"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="tdr.participants"
          label="Participante"
          placeholder="Participante"
          class=""
          required
        />
        <SelectInput
          v-model="carrier"
          label="Transportadora"
          placeholder=""
          class=""
          :items="carriers"
          required
        />
        <SelectInput
            label="Nome de projecto"
            placeholder="Selecione uma opcao"
            :items="projects"
            v-model="project"
            class=""
            required
          />
        <TextInput
          v-model="tdr.purposeActivity"
          label="Objectivo"
          placeholder="Objectivo"
          class=""
          required
        />
        <SelectInput
          v-model="transportation"
          label="Requisicao do Transporte"
          placeholder="Transporte"
          :items="transportRequests"
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
            @click.native="$router.push({ name: 'requests-termReference' })"
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
  //   @ts-ignore
  asyncData({ params, redirect }) {
    if (!params.items) {
      redirect('/requests-termReference-create')
    }
    const items = params.items
    return {
      items,
    }
  },

  data: () => ({
    transportation:{},
    carrier:{},
    project:{},
    tdr: {
      carrier: 0,
      descriptionActivity: '',
      descriptionTdR: '',
      locationAndDateActivity: '',
      participants: '',
      project: '',
      purposeActivity: '',
      transportation: '',
      needs: '',
    },
  }),

  created(){
    this.fetchAll()
  },

  computed:{
    projects(this: any) {
      return Object.values(this.$store.state.projects.all).map((item: any) => ({
        id: item.id,
        name: item.projectName,
        value: item.id,
      }))
    },
    carriers(this: any) {
      return Object.values(this.$store.state.carriers.all).map((item: any) => ({
        id: item.id,
        name: item.companyName,
        email: item.email,
        address: item.address,
      }));
    },
    transportRequests(this: any) {
      return Object.values(
        this.$store.state.transportation.all
      ).map((item: any) => ({
        id: item.id,
        name: item.descriptionRequest,
        requestorResponsible: item.requestorResponsible,
        projectName: item.project.projectName
      }))
    },
  },
  methods: {
    fetchAll(){
      this.$store.dispatch('projects/fetchItems')
      this.$store.dispatch('transportation/fetchItems')
      this.$store.dispatch('carriers/fetchItems')

    },
    handleSubmit(this:any) {
      // @ts-ignore
      this.tdr.transportation = this.transportation.id
      this.tdr.carrier = this.carrier.id
      this.tdr.project = this.project.id
      this.tdr.needs = this.items
      this.$store
        .dispatch('tdrs/createItem', {
          data: this.tdr,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Requisicao efectuada',
          })
          this.$store.dispatch('tdrs/fetchItems')
          this.$router.push({ name: 'requests-termReference' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao requisitar.',
          })
        })
    },
  },
}
</script>
