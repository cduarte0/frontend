<!--<template>
  <Page
    :title="'Detalhe do Projecto'"
    :subTitle="'Detalhe'"
    class="w-full lg:w-11/12 xl:w-9/12 xxl:w-7/12 mx-auto"
  >
  <Card>
  <project-details/>
  </Card>
  <nuxt-child/>
  </Page>
</template>-->

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Card from "~/components/common/misc/Card.vue";
import Page from '~/components/common/misc/Page.vue'
import ProjectDetails from "~/components/partials/project/projectDetails.vue";
export default defineComponent({
  components: { Page, ProjectDetails, Card },
})
</script>