export default {
  data: () => {
    return {
      options: []
    }
  },
  async created () {
    if (_.isString(this.$props.config.options)) {
      const req = await axios.get(this.$props.config.options)
      const attrmap = this.$props.config.attrmap || {}
      this.$data.options = _.map(req.data, i => {
        return {
          value: i[attrmap.value || 'value'],
          text: i[attrmap.text || 'text']
        }
      })
    }
  },
  computed: {
    opts: function () {
      return this.$data.options || this.$props.config.options
    }
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
      :options="opts" 
      :disabled="disabled">
    </b-form-select>

  </b-form-group>
</validation-provider>
  `
}
