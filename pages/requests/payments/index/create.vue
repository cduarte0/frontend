<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Requisitar pagamento'"
      size="xl"
      @close="$router.push({ name: 'requests-payments' })"
    >
      <div class="grid grid-cols-2 gap-3 space-y-px w-max">
        <TextInput
          v-model="payment.requestedBy"
          label="Nome do requisitante"
          placeholder="Nome do requisitante"
          class="col-span-2"
          required
        />
        <TextInput
          v-model="payment.totalValueExtensive"
          label="Valor em extenso"
          placeholder="Valor em extenso"
          class=""
          required
        />
        <SelectInput
          v-model="referenceSelected"
          label="Termo de referencia"
          :items="tdrs"
          placeholder="Selecione uma opção"
          class=""
          required=""
        />
        <TextInput
          v-model="payment.descriptionPayment"
          label="Descrição"
          placeholder="Descrição"
          class=""
          required
        />
        <TextInput
          v-model="payment.location"
          label="Local"
          placeholder="Local"
          class=""
          required
        />
        <TextInput
          v-model="payment.qhotationProformaAdvanceNumber"
          type="number"
          label="Cotação"
          placeholder="Cotação"
          class=""
          required
        />
        <SelectInput
          label="Tipo de moeda"
          placeholder="Selecione uma opção"
          :items="currencyType"
          v-model="payment.currencyType"
          class=""
          required
        />
        <TextInput
          v-model="payment.dateElaboration"
          type="date"
          label="Data de pagamento"
          placeholder=""
          class=""
          required
        />
        <TextInput
          v-model="payment.requestNumber"
          type="number"
          label="Numero de requisição"
          placeholder=""
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
            @click.native="$router.push({ name: 'requests-payments' })"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SelectInput from '~/components/common/inputs/SelectInput.vue'
import TextInput from '~/components/common/inputs/TextInput.vue'
import Modal from '~/components/common/misc/Modal.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
export default defineComponent({
  components: { Modal, TextInput, SelectInput, AppButton },
  data: () => ({
    referenceSelected: {
      id: '',
      name: '',
      value: '',
    },
    currencyType: [
      { id: 1, name: 'MZN', value: 'MZN' },
      { id: 2, name: 'USD', value: 'USD' },
      { id: 3, name: 'Real', value: 'R$' },
      { id: 4, name: 'Libra', value: 'Libra' },
      { id: 5, name: 'RAND', value: 'RAND' },
      { id: 6, name: 'Yen', value: 'Yen' },
      { id: 7, name: 'EURO', value: 'EURO' },
    ],
    payment: {
      currencyType: '',
      dateElaboration: '',
      descriptionPayment: '',
      location: '',
      qhotationProformaAdvanceNumber: 0,
      requestNumber: '',
      totalValueExtensive: '',
      referenceTerm: '',
      requestedBy: '',
    },
  }),

  created(){
    this.fetch()
  },

  computed: {
    tdrs(this: any) {
      return Object.values(this.$store.state.tdrs.all).map((item: any) => ({
        id: item.id,
        name: item.descriptionTdR,
        value: item.descriptionTdR,
      }))
    },
  },

  methods: {

    fetch() {
      this.$store.dispatch('tdrs/fetchItems')
      this.$store.dispatch('projects/fetchItems')
    },

    handleSubmit() {
      this.payment.referenceTerm = this.referenceSelected.id
      // this.payment.currencyType = this.payment.currencyType.name
      this.$store
        .dispatch('payments/createItem', {
          data: this.payment,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Solicitacao efectuada com sucesso',
          })
          this.$store.dispatch('payments/fetchItems')
          this.$router.push({ name: 'requests-payments' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao efectuar solicitacao, por favor tente novamente.',
          })
        })
    },
  },
})
</script>
