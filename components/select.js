import { getOptions } from './utils.js'

export default {
  data: () => {
    return {
      options: []
    }
  },
  async created () {
    this.$data.options = await getOptions(this.$props.config)
  },
  props: ['config', 'disabled', 'data'],
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group 
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >

    <b-form-select 
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors.length === 0" 
      :options="$data.options" 
      :disabled="disabled">
    </b-form-select>

  </b-form-group>
</validation-provider>
  `
}
