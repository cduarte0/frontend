<template>
  <div class="flex flex-wrap w-full items-center h-16 px-4 xl:pl-24 bg-red-500">
    <div class="w-full flex flex-wrap flex-row">
      <div class="flex flex-wrap text-xl text-white font-semibold uppercase">
          <img class="h-12" src="~/assets/images/caritas.png" />
          <span>Caritas Diocesana - Pemba</span>
      </div>
      <div class="flex-grow flex justify-end self-end">
        <avatar-c/>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarC from '~/components/layout/AvatarC.vue'
export default {
  components: {
    AvatarC,
  },
}
</script>

<style></style>
