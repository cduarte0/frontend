<template>
  <div>
    <page class="py-10 px-8" title="Projectos" sub-title="Detalhes do projecto">
      <div class="w-full md:w-1/2 flex flex-wrap content-start">
        <information-fields class="w-full" :fields="projectItem">
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
    </page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Page from '~/components/common/misc/Page.vue'
import InformationTitle from '~/components/common/misc/InformationTitle.vue'
import InformationFields from '~/components/common/misc/InformationFields.vue'

export default defineComponent({
  name: 'Details',

  components: {
    Page,
    InformationTitle,
    InformationFields,
  },

  async asyncData({ store, params }) {
    const project = await store.dispatch('projects/fetchItem', {
      id: params.id,
    })
    return { project }
  },
  data:()=>({
    date: '',
  }),
  computed: {
    projectItem() {
      return [
        {
        id: 'projectName',
        label: 'Nome do Projecto',
        value: (this as any).project.projectName,
      },
      {
        id: 'localImplementation',
        label: 'Local de implementacao',
        value: (this as any).project.localImplementation,
      },
      {
        id: 'projectCode',
        label: 'Codigo do projecto',
        value: (this as any).project.projectCode,
      },
      {
        id: 'dateStart',
        label: 'Data de inicio',
        value: (this as any).formatDate((this as any).project.dateStart),
      },
      {
        id: 'dateEnd',
        label: 'Data de termino',
        value: (this as any).formatDate((this as any).project.dateEnd),
      },
      {
        id: 'budget',
        label: 'Orcamento previsto',
        value: (this as any).project.budget,
      },
      {
        id: 'balanceAvailable',
        label: 'Valor disponivel',
        value: (this as any).project.balanceAvailable,
      },
      {
        id: 'accountNumberProject',
        label: 'Numero de conta',
        value: (this as any).project.accountNumberProject,
      },
            {
        id: 'typeCurrency',
        label: 'Tipo de moeda',
        value: (this as any).project.typeCurrency,
      },
            {
        id: 'status',
        label: 'Estado',
        value: (this as any).project.status,
      },
      ]
    },
  },
  methods:{
    formatDate(item:any[]){
       if(item[1]<10){
        this.date = item[0]+'-'+'0'+item[1]+'-'+item[2]
      }else if(item[2]<10){
        this.date = item[0]+'-'+item[1]+'-'+'0'+item[2]
      }else if(item[1]<10 && item[2]<10){
        this.date = item[0]+'-'+'0'+item[1]+'-'+'0'+item[2]

      }
      return this.date
    },
    getStatus(item: string) {
      const status = { class: '', label: '' }
      if (item === 'Activo' || item === 'Ativo') {
        status.class = 'bg-green-500'
        status.label = 'Activo'
      }
      if (item === 'Bloqueiado') {
        status.class = 'bg-red-500'
        status.label = 'Bloqueiado'
      }

      return status
    },
  }
})
</script>
