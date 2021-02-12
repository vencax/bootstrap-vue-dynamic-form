import listForm from './listform.js'

const defaultRowComponent = {
  props: ['row'],
  template: '<span>{{ row }}</span>'
}

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
  components: { listForm, defaultRowComponent },
  template: `
<validation-provider v-bind:rules="config.rules" v-slot="{ errors }">
  <span>{{ config.label }} <b-button variant="success" v-if="!visible" @click="edit()">+</b-button></span>
  <table class="table table-striped">
    <tbody>
      <tr v-for="(i, idx) in $props.data[config.name]" :key="idx">
        <td>
          <component :is="config.rowcomponent || 'defaultRowComponent'" :row="i"/>
        </td>
        <td>
          <b-button-group>
            <b-button variant="warning" @click="edit(i)">edit</b-button>
            <b-button variant="danger" @click="remove(i)">-</b-button>
          </b-button-group>
        </td>
      </tr>
    </tbody>
  </table>

  <listForm v-if="visible" :onSubmit="onSubmit"
    :original="original" :config="config.form" />

</validation-provider>
  `
}
