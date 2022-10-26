<template>
  <div>
    <Page
      v-if="transportRequest.descriptionRequest"
      class="py-10 px-8"
      title="Detalhe da requisicao"
      :sub-title="transportRequest.descriptionRequest"
    >
      <div class="flex flex-row space-x-2 justify-end">
        <AppButton
          v-if="transportRequest.status != 'APROVADO'"
          class="flex text-white"
          label="Aprovar"
          variant="green"
          icon
          size="large"
          @click.native="aprove()"
        >
        </AppButton>
        <AppButton
          v-if="transportRequest.status === 'PENDENTE'"
          class="flex text-white"
          label="Cancelar"
          variant="red"
          icon
          size="large"
          @click.native="openCancelModal(transportRequest)"
        >
        </AppButton>
        <AppButton
          v-if="transportRequest.status === 'PENDENTE'"
          class="flex text-white"
          label="Rejeitar"
          variant="indigo-500"
          icon
          size="large"
          @click.native="openRejectModal(transportRequest)"
        >
        </AppButton>
      </div>
      <div class="w-full md:w-1/2 flex flex-wrap content-start">
        <information-fields class="w-full" :fields="trasportItem">
          <template v-slot:project="{ field }">
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
    const transportRequest = await store.dispatch('transportation/fetchItem', {
      id: params.id,
    })
    return { transportRequest }
  },
  computed: {
    trasportItem() {
      return [
        {
          id: 'requestorResponsible',
          label: 'Requisitante',
          value: (this as any).transportRequest.requestorResponsible,
        },
        {
          id: 'projectName',
          label: 'Nome do Projecto',
          value: (this as any).transportRequest.project.projectName,
        },
        {
          id: 'vehicleType',
          label: 'Tipo de veiculo',
          value: (this as any).transportRequest.vehicleType,
        },
        {
          id: 'vehicleQty',
          label: 'Quantidade de Veiculos',
          value: (this as any).transportRequest.vehicleQty,
        },
        {
          id: 'numberOfPeoples',
          label: 'Quantidade de Viajantes',
          value: (this as any).transportRequest.numberOfPeoples,
        },
        {
          id: 'origin',
          label: 'Origem',
          value: (this as any).transportRequest.origin,
        },
        {
          id: 'destiny',
          label: 'Destino',
          value: (this as any).transportRequest.destiny,
        },
        {
          id: 'escorts',
          label: 'Acompanhante',
          value: (this as any).transportRequest.escorts,
        },
        {
          id: 'dateTravel',
          label: 'Data da Viagem',
          value: (this as any).formatDate(
            (this as any).transportRequest.dateTravel
          ),
        },
        {
          id: 'dateBack',
          label: 'Data de Volta',
          value: (this as any).formatDate(
            (this as any).transportRequest.dateBack
          ),
        },
        {
          id: 'accommodation',
          label: 'Necessidade de Acomodação',
          value: (this as any).formatAcomodation((this as any).transportRequest.accommodation),
        },
        {
          id: 'daysToStay',
          label: 'Dias de Permanencia',
          value: (this as any).transportRequest.daysToStay,
        },
        {
          id: 'reasonToRequest',
          label: 'Motivo da Requisição',
          value: (this as any).transportRequest.reasonToRequest,
        },
        {
          id: 'coordinator',
          label: 'Coordenador que Aprovou',
          value: (this as any).transportRequest.coordinator,
        },
        {
          id: 'approvalDateCoordinator',
          label: 'Data de Aprovação',
          value: (this as any).formatDate(
            (this as any).transportRequest.approvalDateCoordinator
          ),
        },
        {
          id: 'logistic',
          label: 'Logistico que Aprovou',
          value: (this as any).transportRequest.logistic,
        },
        {
          id: 'approvalDateLogistic',
          label: 'Data de Aprovação',
          value: (this as any).formatDate(
            (this as any).transportRequest.approvalDateLogistic
          ),
        },

        {
          id: 'status',
          label: 'Estado da Requisição',
          value: (this as any).transportRequest.status,
        },

        {
          id: 'reason_rejection_cancellation',
          label: 'Motivo',
          value: (this as any).transportRequest.reason_rejection_cancellation,
        },
        {
          id: 'who_rejected_cancelled',
          label: 'Autor que Rejeitou/Cancelou',
          value: (this as any).transportRequest.who_rejected_cancelled,
        },
        {
          id: 'date_rejected_cancellated',
          label: 'Data Rejeição/Cancelamento',
          value: (this as any).formatDate(
            (this as any).transportRequest.date_rejected_cancellated
          ),
        },

        {
          id: 'updatedAt',
          label: 'Data de Criação',
          value: (this as any).formatDate(
            (this as any).transportRequest.updatedAt
          ),
        },
      ]
    },
    getStatus(item: string) {
      const status = { class: '', label: '' }
      if (item === 'Rejectado') {
        status.class = 'bg-danger'
        status.label = 'Rejectado'
      }
      if (item === 'APROVADO') {
        status.class = 'bg-success'
        status.label = 'Aberta'
      }
      if (item === 'Cancelada') {
        status.class = 'bg-dark'
        status.label = 'Cancelada'
      }
      if (item === 'Pendente') {
        status.class = 'bg-warning'
        status.label = 'Pendente'
      }

      return status
    },
  },
  methods: {
    formatAcomodation(item: boolean) {
      if (item) return 'Sim'
      else return 'Nao'
    },
    formatDate(item: any) {
      if (item) {
        const dateObj = new Date(item * 1000)
        const dateday = dateObj.getDate()
        const monthday = dateObj.getMonth() + 1
        const yearsDay = dateObj.getFullYear()
        const fulldate = dateday + '-' + monthday + '-' + yearsDay
        return fulldate
      }
    },
    aprove() {
      this.transportRequest.status = 'APROVADO'
      this.$store
        .dispatch('transportation/updateItem', {
          config: {
            URL: `/transportation/approve/${(this as any).transportRequest.id}`,
          },
          // data: { ...(this as any).transportRequest.status },
          // noStoreUpdate: true,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Aprovado com sucesso',
          })
          this.$store.dispatch('transportation/fetchItems')
          this.$router.push({ name: 'requests-transport' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Nao foi possivel aprovar.',
          })
        })
    },
    openCancelModal(transportRequest: any) {
      this.$router.push({
        name: 'requests-transport-index-cancelModal',
        params: { transportRequest: transportRequest },
      })
    },
    openRejectModal(transportRequest: any) {
      this.$router.push({
        name: 'requests-transport-index-rejectModal',
        params: { transportRequest: transportRequest },
      })
    },
  },
})
</script>
