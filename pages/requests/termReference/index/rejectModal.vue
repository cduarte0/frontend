<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Informe o motivo'"
      size="xl"
      @close="$router.push({ name: 'requests-termReference' })"
    >
      <div class="grid grid-cols-3 gap-3 space-y-px w-max">
        <TextInput
          v-model="reason"
          label="Motivo da rejeição"
          placeholder="Motivo"
          class="col-span-3"
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
            @click.native="$router.push({ name: 'requests-termReference' })"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Modal from '~/components/common/misc/Modal.vue'
import TextInput from '~/components/common/inputs/TextInput.vue'
import AppButton from '~/components/common/misc/AppButton.vue'

export default defineComponent({
  components: { Modal, TextInput, AppButton },
  // @ts-ignore
  asyncData({ params, redirect }) {
    if (!params.tdr) {
      redirect('/requests-termReference')
    }
    const tdr = params.tdr
    return {
      tdr,
    }
  },
  data: () => ({
    reason: '',
  }),

  methods: {
    handleSubmit(this:any){
        this.$store
        .dispatch('tdrs/updateItem', {
          config: {
            URL: `/tdrs/reject/${(this as any).tdr.id+'/'+this.reason}`,
          },
        //   data:this.reason ,
          // noStoreUpdate: true,
        })
        .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Rejeitado',
          })
          this.$store.dispatch('tdrs/fetchItems')
          this.$router.push({ name: 'requests-termReference' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Problemas ao cancelar.',
          })
        })
    }
  },
})
</script>
