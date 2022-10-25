<template>
  <table :class="{ 'w-full': full }" class="info__body">
    <tbody>
      <tr v-for="field in fields" :key="field.label">
        <slot v-if="field.value" :name="`${field.id}-wrapper`" v-bind="field">
          <td class="text-secondary pr-5 truncate">{{ field.label }}:</td>
          <td :class="field.class" class="font-medium whitespace-normal">
            <slot :name="field.id" :field="field">{{ field.value }}</slot>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
table.info__body {
  border-collapse: separate;
  border-spacing: 0 8px;
  table-layout: fixed;
}
table.info__body tr td {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
