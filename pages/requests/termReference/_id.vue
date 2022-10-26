<template>
  <div>
    <Page
      v-if="tdr.descriptionTdR"
      class="py-10 px-8"
      title="Detalhe da requisicao"
      :sub-title="tdr.descriptionTdR"
    >
      <div class="flex flex-row space-x-2 justify-end">
        <AppButton
          v-if="tdr.status != 'APROVADO'"
          class="flex text-white"
          label="Aprovar"
          variant="green"
          icon
          size="large"
          @click.native="aprove()"
        >
        </AppButton>
        <AppButton
          v-if="tdr.status === 'PENDENTE'"
          class="flex text-white bg-red-500"
          label="Cancelar"
          variant="red"
          icon
          size="large"
          @click.native="openCancelModal(tdr)"
        >
        </AppButton>
        <AppButton
          v-if="tdr.status === 'PENDENTE'"
          class="flex text-white bg-red-700"
          label="Rejeitar"
          icon
          size="large"
          @click.native="openRejectModal(tdr)"
        >
        </AppButton>
      </div>
      <div class="w-full md:w-1/2 flex flex-wrap content-start">
        <information-fields class="w-full" :fields="tdrItem">
          <template v-slot:status="{ field }">
            <div class="flex items-center">
              <div
                :class="getStatus(field.value).class"
                class="
                  rounded-full
                  h-2
                  w-2
                  flex
                  items-center
                  justify-center
                  mr-1
                "
              />
              {{ getStatus(field.value).label }}
            </div>
          </template>
          <template v-slot:updatedAt="{ field }">
            {{ field.value }}
          </template>
        </information-fields>
      </div>
      <nuxt-child />
    </Page>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Page from '~/components/common/misc/Page.vue'
import InformationFields from '~/components/common/misc/InformationFields.vue'
import AppButton from '~/components/common/misc/AppButton.vue'

export default defineComponent({
  components: { Page, InformationFields, AppButton },

  async asyncData({ store, params }) {
    const tdr = await store.dispatch('tdrs/fetchItem', {
      id: params.id,
    })
    return { tdr }
  },
  computed: {
    tdrItem() {
      return [
        {
          id: 'projectName',
          label: 'Nome do Projecto',
          value: (this as any).tdr.project.projectName,
        },
        {
          id: 'locationAndDateActivity',
          label: 'Local da Actividade',
          value: (this as any).tdr.locationAndDateActivity,
        },
        {
          id: 'participants',
          label: 'Participantes',
          value: (this as any).tdr.participants,
        },
        {
          id: 'beneficiary',
          label: 'Beneficiario',
          value: (this as any).tdr.beneficiary,
        },
        {
          id: 'descriptionActivity',
          label: 'Descrição da Atividade',
          value: (this as any).tdr.descriptionActivity,
        },
        {
          id: 'purposeActivity',
          label: 'Objectivo da Atividade',
          value: (this as any).tdr.purposeActivity,
        },
        {
          id: 'balanceTotalActivity',
          label: 'Valor a Pagar',
          value: (this as any).tdr.balanceTotalActivity,
        },
        {
          id: 'elaboratedBy',
          label: 'Elaborado Por',
          value: (this as any).tdr.elaboratedBy,
        },
        {
          id: 'dateElaboration',
          label: 'Data de Elaboração',
          value: (this as any).tdr.dateElaboration,
        },
        {
          id: 'approvedBy',
          label: 'Aprovado Por',
          value: (this as any).tdr.approvedBy,
        },
        {
          id: 'dateApproval',
          label: 'Data de Aprovação',
          value: (this as any).tdr.dateApproval,
        },
        {
          id: 'status',
          label: 'Estado da Requisição',
          value: (this as any).tdr.status,
        },

        {
          id: 'reason_rejection_cancellation',
          label: 'Motivo',
          value: (this as any).tdr.reason_rejection_cancellation,
        },
        {
          id: 'whoRejectedCancellated',
          label: 'Autor que Rejeitou/Cancelou',
          value: (this as any).tdr.whoRejectedCancellated,
        },
        {
          id: 'dateRejectedCancellated',
          label: 'Data de Rejeição/Cancelamento',
          value: (this as any).tdr.dateRejectedCancellated,
        },
      ]
    },
  },
  methods: {
    // formatAcomodation(item: boolean) {
    //   if (item) return 'Sim'
    //   else return 'Nao'
    // },
    // formatDate(item: string) {
    //   const subS1 = item.substr(0, 10)
    //   const subS2 = item.substr(11, 5)
    //   item = subS1 + ' ' + subS2
    //   return item
    // },
    getStatus(item: string) {
      const status = { class: '', label: '' }
      if (item === 'Rejectado') {
        status.class = 'bg-red-900'
        status.label = 'Rejectado'
      }
      if (item === 'APROVADO') {
        status.class = 'bg-green-500'
        status.label = 'Aprovado'
      }
      if (item === 'CANCELADO') {
        status.class = 'bg-red-500'
        status.label = 'Cancelada'
      }
      if (item === 'PENDENTE') {
        status.class = 'bg-yellow-500'
        status.label = 'Pendente'
      }

      return status
    },
    aprove() {
      // this.transportRequest.status = 'APROVADO'
      this.$store
        .dispatch('tdrs/updateItem', {
          config: {
            URL: `/tdrs/approve/${(this as any).tdr.id}`,
          },
          // data: { ...(this as any).transportRequest.status },
          // noStoreUpdate: true,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Aprovado com sucesso',
          })
          this.$store.dispatch('tdrs/fetchItems')
          this.$router.push({ name: 'requests-termReference' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Nao foi possivel aprovar.',
          })
        })
    },
    openCancelModal(tdr: any) {
      this.$router.push({
        name: 'requests-termReference-index-cancelModal',
        params: { tdr: tdr },
      })
    },
    openRejectModal(tdr: any) {
      this.$router.push({
        name: 'requests-termReference-index-rejectModal',
        params: { tdr: tdr },
      })
    },
  },
})
</script>
