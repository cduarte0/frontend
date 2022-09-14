<template>
  <div>
    <label>
      {{ label }}
      <input
        :id="id"
        v-model="inputValue"
        :name="name"
        :value="value"
        type="checkbox"
      />
      <span class="checkmark"></span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Check',
  props: {
    id: { type: String, default: null },
    name: { type: String, default: 'checkbox' },
    value: { type: Boolean, default: false },
    label: { type: String, default: null }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style scoped>
/* The container */
label {
  display: block;
  position: relative;
  cursor: pointer;
  color: #3c4458;
  font-size: 13px;
  font-weight: 500;
  padding-left: 25px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  left: 0;
  top: 2px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
/*label:hover input ~ .checkmark {*/
/*background-color: #ccc;*/
/*border-radius: 2px;*/
/*}*/

/* When the checkbox is checked, add a blue background */
label input:checked ~ .checkmark {
  background: theme('colors.blue.50') 0% 0% no-repeat padding-box;
  border-radius: 2px;
  opacity: 1;
  width: 17px;
  height: 15px;
}
label input:not(:checked) ~ .checkmark {
  border: 1px solid #b1b4ce;
  border-radius: 2px;
  opacity: 1;
  width: 17px;
  height: 15px;
  background-color: white;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
label .checkmark:after {
  text-align: center;
  left: 6px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 1px 1px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
