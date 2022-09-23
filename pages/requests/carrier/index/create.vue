<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Adicionar transportadora'"
      size="xl"
      @close="$router.push({ name: 'requests-carrier' })"
    >
      <div class="grid grid-cols-2 gap-4 space-y-px w-max">
        <TextInput
          label="Nome"
          placeholder="Nome"
          v-model="carrier.companyName"
          class="col-span-2"
          required
        />
        <TextInput
          label="E-mail"
          placeholder="email"
          v-model="carrier.email"
          class=""
          required
        />
        <TextInput
          label="Endereco"
          placeholder="endereco"
          v-model="carrier.address"
          class=""
          required
        />
        <TextInput
          label="Nuit"
          placeholder="1236587"
          v-model="carrier.nuit"
          class=""
          required
        />
        <TextInput
          label="Telefone"
          placeholder="telephone"
          v-model="carrier.telephoneFax"
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
            @click.native="$router.push({ name: 'requests-carrier' })"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TextInput from '~/components/common/inputs/TextInput.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
import Modal from '~/components/common/misc/Modal.vue'

export default defineComponent({
  components: { Modal, TextInput, AppButton },
  data: () => ({
    carrier: {
      address: '',
      email: '',
      companyName: '',
      nuit: '',
      telephoneFax: '',
    },
  }),
  methods:{
    handleSubmit(){
        this.$store.dispatch('carriers/createItem', {
            data: this.carrier
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Ttransportadora cadastrada com sucesso',
          })
          this.$store.dispatch('carriers/fetchItems')
          this.$router.push({ name: 'requests-carrier' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao cadastrar transportadora, por favor tente novamente.',
          })
        })
    }
  }
})
</script>
