<template>
  <Page :title="'Novo termo de referencia'" :sub-title="'something'">
    <div class="flex flex-row flex-wrap mx-auto items-start">
      <div class="w-full md:w-2/5 xxl:w-4/12">
        <Card :loading="$wait.waiting('ready-orders.index')">
          <template v-slot:body>
            <div class="flex flex-row flex-wrap px-3 pt-5">
              <div class="w-full">
                <TextInput
                  v-model="materialDescription"
                  label="Descricao do material"
                  placeholder=""
                  class=""
                  required
                />
                <TextInput
                  v-model="qtyDays"
                  label="Quantidade de dias"
                  placeholder=""
                  type="number"
                  class=""
                  required
                />
                <TextInput
                  v-model="qtyMaterial"
                  label="Quantidade do item"
                  placeholder=""
                  type="number"
                  class=""
                  required
                />
                <TextInput
                  v-model="unitValue"
                  label="Preco unitario"
                  placeholder=""
                  type="number"
                  class=""
                  required
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="flex w-full md:w-1/5 xxl:w-4/12 sticky top-0 justify-center">
        <div class="flex flex-wrap flex-row justify-center mt-32">
          <div class="w-full flex flex-wrap justify-center">
            <app-button
              @click.native="moveItems"
              label="Adicionar"
              variant="green"
              size="large"
            />
          </div>
          <div class="w-full flex flex-wrap mt-5 justify-center">
            <app-button
              @click.native="deleteItems"
              label="Remover"
              variant="indigo-500"
              size="large"
            />
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/5 xxl:w-4/12">
        <Card>
          <template v-slot:body>
            <div class="flex flex-wrap flex-row px-3 pt-5 pb-5">
              <div class="w-full">
                <Table
                  class="w-full"
                  :headers="cardHeaders"
                  counter
                  :items="'items'"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </Page>
</template>

<script lang="ts">
import Table from "~/components/common/misc/Table.vue"
import Page from '~/components/common/misc/Page.vue'
import Card from "~/components/common/misc/Card.vue"
import InformationTitle from '~/components/common/misc/InformationTitle.vue'
import UserIcon from '~/assets/icons/person-frame.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
import { generateUUID } from '~/utils'
import TextInput from '~/components/common/inputs/TextInput.vue'
import SelectInput from '~/components/common/inputs/SelectInput.vue'
export default {
  components: {
    Page,
    Card,
    SelectInput,
    InformationTitle,
    Table,
    UserIcon,
    AppButton,
    TextInput,
  },
  data: () => ({
    drag: false,
    // needs: {
    //   items: [],
    // },
    materialDescription: null,
    qtyDays: null,
    qtyMaterial: null,
    sequences: null,
    unitValue: null,
    items:[
    {
    materialDescription: null,
    qtyDays: null,
    qtyMaterial: null,
    sequences: null,
    unitValue: null,
 }
 ],
    cardHeaders: [
      {
        key: 'materialDescription',
        title: 'Descricao',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'qtyDays',
        title: 'Qt Dias',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'qtyMaterial',
        title: 'Qt item',
        class: 'whitespace-no-wrap',
      },
      {
        key: 'unitValue',
        title: 'preco',
        class: 'whitespace-no-wrap',
      },
    ],
    index: 0,

  }),

  methods:{
    moveItems(this: any): [] {
        this.index = this.items.length
        if(this.index<=30){
            this.items[this.index].materialDescription = this.materialDescription
            this.items[this.index].qtyDays = this.qtyDays
            this.items[this.index].qtyMaterial = this.qtyMaterial
            this.items[this.index].sequences = this.sequences
            this.items[this.index].unitValue = this.unitValue
        }
        //this.index = this.index+1
        this.materialDescription = null,
        this.qtyDays = null,
        this.qtyMaterial = null,
        this.sequences = null,
        this.unitValue = null
        return this.items[this.index]
    }
  }
}
</script>
