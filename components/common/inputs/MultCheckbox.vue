<template>
  <div class="flex flex-wrap flex-row">
    <div class="text-sm text-black font-medium mb-2">
      {{ label }}
    </div>
    <div class="w-full">
      <Checkbox
        v-for="(checkbox, index) in options"
        :key="index"
        :label="checkbox.label"
        :value="info.includes(checkbox.value)"
        @input="setValue($event, checkbox.value)"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from '~/components/common/inputs/Checkbox'
export default {
  components: {
    Checkbox
  },
  props: {
    label: {
      type: String,
      default: 'Checkbox Group'
    },
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    info: []
  }),
  mounted() {
    this.info = this.value
  },
  methods: {
    setValue(checkBoxStatus, checkBoxValue) {
      if (this.info.includes(checkBoxValue)) {
        const index = this.info.findIndex((value) => value === checkBoxValue)
        this.info.splice(index, 1)
      } else this.info.push(checkBoxValue)
      this.$emit('input', this.info)
    }
  }
}
</script>

<style></style>
