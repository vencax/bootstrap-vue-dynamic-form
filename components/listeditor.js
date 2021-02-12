import listForm from './listform.js'

export default {
  data: () => {
    return {
      original: null,
      visible: false
    }
  },
  props: ['config', 'disabled', 'data'],
  methods: {
    edit (item) {
      this.$data.original = item
      this.$data.visible = true
    },
    remove (item) {
      const data = this.$props.data[this.$props.config.name]
      const idx = data.indexOf(item)
      data.splice(idx, 1)
    },
    onSubmit (data) {
      this.$data.visible = false
      if (!data) return
      if (this.$data.original) {
        Object.assign(this.$data.original, data)
      } else {
        this.$props.data[this.$props.config.name].push(data)
      }
    }
  },
  components: { listForm },
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <span>{{ config.label }} <b-button variant="success" v-if="!visible" @click="edit()">+</b-button></span>
  <ul>
    <li v-for="(i, idx) in $props.data[config.name]" :key="idx">
      {{ i }} <b-button-group>
        <b-button variant="warning" @click="edit(i)">edit</b-button>
        <b-button variant="danger" @click="remove(i)">-</b-button>
      </b-button-group>
    </li>
  </ul>

  <listForm v-if="visible" :onSubmit="onSubmit"
    :original="original" :config="config.form" />

</validation-provider>
  `
}
