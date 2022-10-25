<template>

  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Criar Ordem de Compra'"
      size="xl"
      @close="$router.push({ name: 'requests-purchaseOrders' })"
    >
      <div class="grid grid-cols-3 gap-3 space-y-px w-max">

        <TextInput
          v-model="purchaseOrder.descriptionPurchase"
          label="Descricao da Ordem de Compra"
          placeholder="descricao da compra"
          class="col-span-3"
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
          v-model="purchaseOrder.monthPurchaseOrder"
          label="Mes"
          placeholder="Mes"
          class=""
          required
        />

        <TextInput
          v-model="purchaseOrder.orderNumber"
          type="number"
          label="Pedido Nr."
          placeholder="numero do pedido"
          class=""
          required
        />

        <TextInput
          v-model="purchaseOrder.budgetNumber"
          type="number"
          label="Orçamento Nr."
          placeholder="numero do orçamento"
          class=""
          required
        />

        <SelectInput
          label="Departamento"
          placeholder="Selecione uma opção"
          v-model="purchaseOrder.department"
          :items="department"
          class=""
          required=""
        />

        <TextInput
          v-model="purchaseOrder.paymentMethods"
          type="number"
          label="Nr. de cheque"
          placeholder=""
          class=""
          required
        />

        <TextInput
          v-model="purchaseOrder.paymentTerms"
          label="Condicoes de Pagamento"
          placeholder=""
          class=""
          required
        />

        <TextInput
          v-model="purchaseOrder.deliveryForecast"
          label="Previsao de Entrega"
          placeholder="previsao de entrega"
          class=""
          required
        />

        <TextInput
          v-model="purchaseOrder.comments"
          label="Comentarios"
          placeholder="Comentarios"
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
            @click.native="$router.push({ name: 'requests-purchaseOrders' })"
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
      balanceTotalActivity : '',
    },

    department: ['Logistica', 'Financas', 'Direccao', 'Contabilidade'],

    purchaseOrder: {
      budgetNumber: '',
      comments: '',
      deliveryForecast: '',
      department: '',
      descriptionPurchase: '',
      monthPurchaseOrder: '',
      orderNumber: '',
      paymentMethods: '',
      paymentTerms: '',
      referenceTerm: ''
    },
  }),
  computed: {
    tdrs(this: any) {
      return Object.values(this.$store.state.tdrs.all).map((item: any) => ({
        id: item.id,
        name: item.descriptionTdR,
        value: item.descriptionTdR,
        balanceTotalActivity : item.balanceTotalActivity,
      }))
    },
  },
  methods: {
    handleSubmit() {
      this.purchaseOrder.referenceTerm = this.referenceSelected.id
      // this.payment.currencyType = this.payment.currencyType.name
      this.$store
        .dispatch('purchases/createItem', {
          data: this.purchaseOrder,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Ordem de Compra efectuada com sucesso',
          })
          this.$store.dispatch('payments/fetchItems')
          this.$router.push({ name: 'requests-payments' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao efectuar a Ordem de Compra, por favor tente novamente.',
          })
        })
    },
  },
})
</script>
