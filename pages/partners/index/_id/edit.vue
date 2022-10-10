<template>
  <div class="flex flex-wrap w-full">
    <Modal
      :title="'Editar Parceiro'"
      size="xl"
      :loading="$wait.waiting('partner.update.index')"
      @close="$router.push({ name: 'partners' })"
    >
      <div class="grid grid-cols-2 gap-3 space-y-px w-max">
        <TextInput
          v-model="partner.companyName"
          label="Nome do Parceiro"
          placeholder="Nome do Parceiro"
          class="col-span-2"
          required
        />
        <TextInput
          v-model="partner.email"
          label="Email"
          placeholder="gsfsfs@affdss.fds"
          class=""
          required
        />
        <TextInput
          v-model="partner.address"
          label="Endereco"
          placeholder="Mahate"
          class=""
          required
        />
        <TextInput
          v-model="partner.projectName"
          type="text"
          label="Nome do Projecto"
          placeholder="Saldo disponivel"
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
            @click.native="$router.push({ name: 'partners' })"
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
    if (!params.partner) {
      redirect('/partners')
    }
    const partner = params.partner
    return {
      partner,
    }
  },

  methods: {
    handleSubmit(this:any) {
      this.$store
        .dispatch('partners/updateItem', {
          config: {
            URL: `/partners/${(this as any).partner.id}`,
          },
          data: { ...(this as any).partner },
          noStoreUpdate: true,
        })
        .then(() => {

          alert('Actualizado com sucesso!')

          this.$store.dispatch('ui/pushNotification', {
            type: 'success',
            message: 'Parceiro atualizado!',
          })
          this.$store.dispatch('partners/fetchItems')
          this.$router.push({name: 'partners'})
        })
        .catch(() => {
          this.$store.dispatch('ui/pushNotification', {
            type: 'error',
            message: 'Erro ao atualizar parceiro, por favor tente novamente.',
          })
        })
    },
  },
};
</script>
