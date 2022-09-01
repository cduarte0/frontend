<template>
  <div class="flex flex-wrap w-full">
    <Modal title="Atenção" size="md" @close="$emit('close')">
      <div class="flex flex-col space-y-4">
        <slot />
      </div>
      <template #actions>
        <div class="flex items-center space-x-4">
          <AppButton
            class="flex text-white px-8 h-10"
            label="Sim"
            variant="red-500"
            @click.native="$emit('remove')"
          />
          <AppButton
            class="flex text-black"
            label="Cancelar"
            variant="white"
            size="large"
            @click.native="$emit('close')"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from '~/components/common/misc/Modal.vue'
import AppButton from '~/components/common/misc/AppButton.vue'
export default {
  components: { Modal, AppButton },
}
</script>
