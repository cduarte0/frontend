<template>
<div>
    <div class = "inline-block mb-2 text-gray-700">
        <span>
            {{topLabel}}
        </span>
    </div>
    <textarea
      class="
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      rows="3"
      :placeholder="placeholder"
      v-model="inputValue"
      @blur="$emit('blur', inputValue)"
      @focus="$emit('focus', inputValue)"
    ></textarea>
</div>
</template>
<script>
export default {
    name: 'TextArea',
    props: {
        topLabel:{
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'write Your message'
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        inputValue: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            },
        },
    },
}
</script>
