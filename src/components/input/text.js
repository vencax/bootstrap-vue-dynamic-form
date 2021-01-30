export default {
  props: ['config', 'disabled', 'data'],
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group :state="errors.length === 0" v-bind:label="config.label"
    label-for="nazev-input" :invalid-feedback="errors[0]"
  >
    <b-form-input id="nazev-input" :value="data[config.name]"
      @input="v => data[config.name] = v"
      :state="errors.length === 0" :disabled="disabled">
    </b-form-input>
  </b-form-group>
</validation-provider>
  `
}
