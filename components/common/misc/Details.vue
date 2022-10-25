<template>
  <div>
    <div class="pr-16">
      <p class="text-gray-400">{{ label }}</p>
      <h5 class="font-medium">
        <slot> {{ value }} </slot>
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Details',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String || Boolean,
      default: '',
    },
  },
}
</script>
