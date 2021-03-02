export default {
  props: ['config', 'disabled', 'data'],
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >
    <b-form-file
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors.length === 0"
      :disabled="disabled"
      :placeholder="config.placeholder || 'Choose a file or drop it here...'"
    ></b-form-file>

  </b-form-group>
</validation-provider>
  `
}
