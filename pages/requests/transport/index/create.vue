<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Solicitação de transporte'"
      size="xl"
      @close="$router.push({ name: 'requests-transport' })"
    >
      <div class="grid grid-cols-3 gap-3 space-y-px w-max">

        <div v-if="message" style="align-content: center; font-family: Arial; color: red" >
          {{ message }}
        </div>

        <SelectInput
          v-model="selectedProject"
          label="Projecto"
          :items="projects"
          placeholder="Escolha uma opção"
          class=""
          required
        />
        <SelectInput
          v-model="trasportRequest.vehicleType"
          label="Tipo de Veiculo"
          :items="veicle"
          placeholder="Escolha uma opção"
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.vehicleQty"
          label="Quantidade"
          placeholder=""
          type="number"
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.descriptionRequest"
          label="Descrição da Solicitação"
          placeholder="Descrição"
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.escorts"
          label="Acompanhante"
          placeholder="Nomo do acompanhante"
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.origin"
          label="Origem"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.destiny"
          label="Destino"
          placeholder=""
          class=""
          required
        />
        <SelectInput
          v-model="acomodation"
          label="Alojamento"
          :items="label"
          placeholder="Escolha uma opção"
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.daysToStay"
          v-if="acomodation==='Sim'"
          type="number"
          label="Dias de permanencia"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.dateTravel"
          type="date"
          label="Data de partida"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.dateBack"
          type="date"
          label="Data de regresso"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.numberOfPeoples"
          type="number"
          label="Quantidade de pessoas"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="trasportRequest.reasonToRequest"
          label="Motivo da viagem"
          placeholder=""
          class="col-span-3"
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
            @click.native="$router.push({ name: 'requests-transport' })"
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
import Checkbox from '~/components/common/inputs/Checkbox.vue'
import MultCheckbox from '~/components/common/inputs/MultCheckbox.vue'
export default {
  components: { Modal, AppButton, TextInput, SelectInput, Checkbox, MultCheckbox },
  data: () => ({

    message:'',

    veicle:[
      'Pickup 5 lugares 4*4',
      'Minibus 15 lugares',
      'Minibus >15 lugares',
      'Camião de 2 - 6 Ton',
      'Camião de 7 - 15 Ton',
      'Camião de >15 Ton'
    ],
    trasportRequest: {
      accommodation: null,
      dateBack: '',
      dateTravel: '',
      daysToStay: 0,
      descriptionRequest: '',
      destiny: '',
      escorts: '',
      numberOfPeoples: 0,
      origin: '',
      project: '',
      reasonToRequest: '',
      vehicleQty: 0,
      vehicleType: '',
    },
    label:['Sim', 'Não'],
    selectedProject: { id: '', name: '', value: '' },
    acomodation: ''
  }),

  created(){
    //@ts-ignore
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
  },
  methods: {

    fetch() {
      //@ts-ignore
      this.$store.dispatch('projects/fetchItems')
    },

    handleSubmit(this: any) {
      this.trasportRequest.project = this.selectedProject.id
      if(this.acomodation=='Sim'){
        this.trasportRequest.accommodation = true
      }else{
        this.trasportRequest.accommodation = false
      }
      this.trasportRequest.dateTravel = this.trasportRequest.dateTravel + 'T00:00:00.000Z'
      this.trasportRequest.dateBack = this.trasportRequest.dateBack + 'T00:00:00.000Z'
      this.$store
        .dispatch('transportation/createItem', {
          data: this.trasportRequest,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Solicitação efectuada',
          })
          this.$store.dispatch('transportation/fetchItems')
          this.$router.push({ name: 'requests-transport' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao solicitar o transporte, por favor tente novamente.',
          })
        })
      this.message = 'Erro ao solicitar o transporte, por favor tente novamente.'
    },
  },
}
</script>
