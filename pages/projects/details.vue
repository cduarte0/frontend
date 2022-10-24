<template>

  <div>
    <page
      class="py-10 px-8"
      title="Projectos"
      sub-title="Detalhes do projecto"
    >

      <div class="w-full md:w-1/2 flex flex-wrap content-start">

        <information-fields
          class="w-full" :fields="project"
        >
          <template v-slot:status="{ field }">
            <div class="flex items-center">
              <div
                :class="getStatus(field.value).class"
                class="rounded-full h-2 w-2 flex items-center justify-center mr-1"
              />
              {{ getStatus(field.value).label }}
            </div>
          </template>
        </information-fields>
      </div>

    </page>
  </div>

</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  import Page from '~/components/common/misc/Page.vue'
  import InformationTitle from "~/components/common/misc/InformationTitle.vue";
  import InformationFields from "~/components/common/misc/InformationFields.vue";

  export default defineComponent({
    name: 'Details',

    components:{
      Page, InformationTitle, InformationFields
    },

    asyncData({ params, redirect }) {
      if (!params.project) {
        redirect('/projects')
      }
      const project = params.project
      return {
        project,
      }
    },
    computed: {
      getStatus(item: string) {
        const status = {class: '', label: ''}
        if (item === 'Aprovado') {
          status.class = 'bg-danger'
          status.label = 'Fechada'
        }
        if (item === 'Pendente') {
          status.class = 'bg-success'
          status.label = 'Aberta'
        }

        return status
      }
    }
  })
</script>
