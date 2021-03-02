function loadAsBase64(theFile) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()

    reader.onload = function(loadedEvent) {
        var arrayBuffer =  new Uint8Array(loadedEvent.target.result)
        resolve(btoa(String.fromCharCode(...arrayBuffer)))
    }

    reader.readAsArrayBuffer(theFile)
  })
}

export default {
  props: ['config', 'disabled', 'data'],
  methods: {
    async onSelect (item) {
      const data = _.pick(item, 'name', 'size', 'type')
      data.content = await loadAsBase64(item)
      this.$props.data[this.$props.config.name] = data
    }
  },
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <b-form-group
    :state="errors.length === 0"
    :label="config.label"
    :invalid-feedback="errors[0]"
  >
    <b-form-file
      :value="data[config.name]"
      @input="onSelect"
      :state="errors.length === 0"
      :disabled="disabled"
      :placeholder="config.placeholder || 'Choose a file or drop it here...'"
    ></b-form-file>

  </b-form-group>
</validation-provider>
  `
}
