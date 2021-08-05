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
      this.$emit('input', this.$props.data[this.$props.config.name])
    },
    moveup (item) {
      const data = this.$props.data[this.$props.config.name]
      const idx = data.indexOf(item)
      const newIdx = idx === 0 ? (data.length - 1) : (idx - 1)
      const tmp = Object.assign({}, data[idx])
      Object.assign(data[idx], {}, data[newIdx])
      Object.assign(data[newIdx], {}, tmp)
    },
    movedown (item) {
      const data = this.$props.data[this.$props.config.name]
      const idx = data.indexOf(item)
      const newIdx = idx === (data.length - 1) ? 0 : (idx + 1)
      const tmp = Object.assign({}, data[idx])
      Object.assign(data[idx], {}, data[newIdx])
      Object.assign(data[newIdx], {}, tmp)
    },
    onSubmit (newdata) {
      this.$data.visible = false
      if (!newdata) return
      if (this.$data.original) {
        const data = this.$props.data[this.$props.config.name]
        const idx = data.indexOf(this.$data.original)
        data[idx] = newdata
      } else {
        this.$props.data[this.$props.config.name].push(newdata)
      }
      this.$emit('input', this.$props.data[this.$props.config.name])
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
            <b-button variant="warning" @click="edit(i)">
              <i class="fas fa-edit"></i>
            </b-button>
            <b-button variant="danger" @click="remove(i)">
              <i class="fas fa-trash-alt"></i>
            </b-button>
            <b-button variant="info" @click="moveup(i)">
              <i class="fas fa-arrow-up"></i>
            </b-button>
            <b-button variant="secondary" @click="movedown(i)">
              <i class="fas fa-arrow-down"></i>
            </b-button>
          </b-button-group>
        </td>
      </tr>
    </tbody>
  </table>

  <b-modal v-model="visible" size="xl" id="modal-add" title="Upravit" hide-footer>
    <listForm :onSubmit="onSubmit"
      :original="original" :config="config.form" />
  </b-modal>

</validation-provider>
  `
}
