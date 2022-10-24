<template>
  <div class="flex flex-row">
    <div class="self-start mt-2 mr-2 w-5">
      <slot name="icon">
<!--        <document-icon></document-icon>-->
      </slot>
    </div>
    <div class="w-10/12">
      <div class="text-dark font-medium">{{ title }}</div>
      <div class="text-xs text-secondary">{{ description }}</div>
    </div>
  </div>
</template>

<script>
// import DocumentIcon from '~/assets/icons/paper-bag.svg'
export default {
  components: {
    // DocumentIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
