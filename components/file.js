const m = 'Jméno souboru obsahuje diakritiku. Přejmenujete jej a vyberte znovu.'
VeeValidate.extend('filenameWithoutDiacritics', {
  getMessage: field => m,
  validate: value => {
    const m = value.name.match(/[\w.-]+/g)
    return m && m.length > 0 && m[0] === value.name
  }
})

export default {
  async created () {
    this.$props.config.rules = this.$props.config.rules
      ? this.$props.config.rules + '|filenameWithoutDiacritics'
      : 'filenameWithoutDiacritics'
  },
  computed: {
    m: () => m
  },
  props: ['config', 'disabled', 'data'],
  template: `
<validation-provider :name="config.name" :rules="config.rules" v-slot="{ valid, errors }">
  <b-form-group
    :label="config.label"
    :invalid-feedback="m"
  >
    <b-form-file
      :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors[0] ? false : (valid ? true : null)"
      :disabled="disabled"
      :placeholder="config.placeholder || 'Choose a file or drop it here...'"
    ></b-form-file>

  </b-form-group>
</validation-provider>
  `
}
