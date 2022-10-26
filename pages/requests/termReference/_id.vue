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
          class="flex text-white"
          label="Cancelar"
          variant="red"
          icon
          size="large"
          @click.native="openCancelModal(tdr)"
        >
        </AppButton>
        <AppButton
          v-if="tdr.status === 'PENDENTE'"
          class="flex text-white"
          label="Rejeitar"
          variant="indigo-500"
          icon
          size="large"
          @click.native="openRejectModal(tdr)"
        >
        </AppButton>
      </div>
      <div class="w-full md:w-1/2 flex flex-wrap content-start">
        <information-fields class="w-full" :fields="tdrItem">
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
    const tdr = await store.dispatch('tdr/fetchItem', {
      id: params.id,
    })
    return { tdr }
  },
  computed: {
    tdrItem() {
      return [
        {
          id: 'elaboratedBy',
          label: 'Elaborado por',
          value: (this as any).tdr.elaboratedBy,
        },
        {
          id: 'dateElaboration',
          label: 'Data de elaboracao',
          value: (this as any).formatDate((this as any).tdr.dateElaboration),
        },
        {
          id: 'beneficiary',
          label: 'Beneficiario',
          value: (this as any).tdr.beneficiary,
        },
        {
          id: 'descriptionActivity',
          label: 'Descricao da atividade',
          value: (this as any).tdr.descriptionActivity,
        },
        {
          id: 'locationAndDateActivity',
          label: 'Local da atividade',
          value: (this as any).tdr.locationAndDateActivity,
        },
        {
          id: 'status',
          label: 'Estado',
          value: (this as any).tdr.status,
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
        const subS1 = item.substr(0, 10)
        const subS2 = item.substr(11, 5)
        item = subS1 + ' ' + subS2
        return item
      }
    },
    aprove() {
      this.transportRequest.status = 'APROVADO'
      this.$store
        .dispatch('tdr/updateItem', {
          config: {
            URL: `/tdr/approve/${(this as any).tdr.id}`,
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
          this.$router.push({ name: 'requests-tdr' })
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
        name: 'requests-tdr-index-cancelModal',
        params: { tdr: tdr },
      })
    },
    openRejectModal(tdr: any) {
      this.$router.push({
        name: 'requests-tdr-index-rejectModal',
        params: { tdr: tdr },
      })
    },
  },
})
</script>
