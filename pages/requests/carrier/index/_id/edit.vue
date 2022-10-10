<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Editar Transportadora'"
      size="xl"
      :loading="$wait.waiting('carriers.update.index')"
      @close="$router.push({ name: 'requests-carrier' })"
    >
      <div class="grid grid-cols-3 gap-4 space-y-px w-max">
        <TextInput
          v-model="carrier.companyName"
          label="Nome da Transportadora"
          placeholder="Transportadora"
          class=""
          required
        />
        <TextInput
          v-model="carrier.nuit"
          label="NUIT"
          placeholder="NUIT"
          class=""
          required
        />
        <TextInput
          v-model="carrier.address"
          label="Endereco"
          placeholder="Muxara"
          class=""
          required
        />
        <TextInput
          v-model="carrier.telephoneFax"
          label="Telefone/Fax"
          placeholder="Telefone ou Fax"
          class=""
          required
        />
        <TextInput
          v-model="carrier.email"
          label="E-mail"
          placeholder="Eduardo Mondlane"
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
            @click.native="$router.push({ name: 'carriers' })"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from '~/components/common/misc/Modal.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
import TextInput from '~/components/common/inputs/TextInput.vue'
import SelectInput from '~/components/common/inputs/SelectInput.vue'

export default {
  components: { Modal, AppButton, TextInput, SelectInput },
  // @ts-ignore
  asyncData({ params, redirect }) {
    if (!params.carrier) {
      redirect('/carriers')
    }
    const carrier = params.carrier
    return {
      carrier,
    }
  },

  methods: {
    handleSubmit(this:any) {
      this.$store.dispatch('carriers/updateItem', {
        config: {
          // @ts-ignore
              URL: `/carriers/${this.carrier.id}`,
            },
            data: { ...(this as any).carrier },
            noStoreUpdate: true,
      })
      .then(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Os dados da transportadora foram atuaizados',
          })
          this.$store.dispatch('carriers/fetchItems')
          this.$router.push({ name: 'requests-carrier' })
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro, problemas ao atualizar dados da transportadora.',
          })
        })

    },
  },
}
</script>
