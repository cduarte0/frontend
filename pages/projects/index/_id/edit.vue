<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Editar projecto'"
      size="xl"
      :loading="$wait.waiting('projects.update.index')"
      @close="$router.push({ name: 'projects' })"
    >
      <div class="grid grid-cols-3 gap-3 space-y-px w-max">

        <div v-if="message" style="align-content: center; font-family: Arial; color: red" >
          {{ message }}
        </div>

        <TextInput
          v-model="project.projectName"
          label="Nome do projecto"
          placeholder="Nome do projecto"
          class=""
          required
        />
         <TextInput
          v-model="project.projectCode"
          label="Codigo do projecto"
          placeholder="Codigo"
          class=""
          required
        />
        <TextInput
          v-model="project.localImplementation"
          label="Local de implementação"
          placeholder="Local de implementação"
          class=""
          required
        />
        <TextInput
          v-model="project.budget"
          type="number"
          label="Orçamento"
          placeholder="Orçamento"
          class=""
          required
        />
        <TextInput
          v-model="project.accountNumberProject"
          type="number"
          label="Numero de conta"
          placeholder="Conta"
          class=""
          required
        />
        <TextInput
          v-model="project.balanceAvailable"
          type="number"
          label="Saldo disponivel"
          placeholder="Saldo disponivel"
          class=""
          required
        />
        <TextInput
          v-model="project.typeCurrency"
          label="Tipo de moeda"
          placeholder="Tipo de moeda"
          class=""
          required
        />
        <TextInput
          v-model="newDate"
          type="date"
          label="Data final"
          placeholder="Data final"
          class=""
          required
        />
        <TextInput
          v-model="project.status"
          label="Estado do projecto"
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
            @click.native="$router.push({ name: 'projects' })"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from "~/components/common/misc/Modal.vue";
import AppButton from "~/components/common/misc/AppButton.vue";
import TextInput from "~/components/common/inputs/TextInput.vue";
import SelectInput from "~/components/common/inputs/SelectInput.vue";

export default {
  components: { Modal, AppButton, TextInput, SelectInput },
  // @ts-ignore
  asyncData({ params, redirect }) {
    if (!params.project) {
      redirect('/projects')
    }
    const project = params.project
    return {
      project
    }
  },
  data:()=>({

    message:'',

    newDate: '',
  }),
  methods: {
    formatDate(item:any[]){
      console.log(item)
      // if(item[1]===10 || item[2]===10){
      //   const date = item[0]+'-'+item[1]+''+'-'+item[2]
      // }
      const date = item[0]+'-'+item[1]+'-'+item[2]
      return date
    },
    handleSubmit(this:any) {
      if(this.newDate){
        this.project.dateEnd = this.newDate
      }else{
        //this.project.dateEnd = this.formatDate(this.project.dateEnd)
      }
      this.$store
        .dispatch('projects/updateItem', {
        config: {
              URL: `/projects/${(this as any).project.id}`,
            },
            data: { ...(this as any).project },
            noStoreUpdate: true,
      })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Projecto atualizado',
          })
          this.$store.dispatch('projects/fetchItems')
          this.$router.push({name: 'projects'})
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao atualizar projecto, por favor tente novamente.',
          })
        })
      this.message = 'Erro ao atualizar o projecto.'
    },
  },
};
</script>
