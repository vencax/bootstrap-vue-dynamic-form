import components from './index.js'

export default {
  data: () => {
    return {
      item: {}
    }
  },
  props: ['config', 'onSubmit', 'original'],
  created () {
    this.$props.original && Object.assign(this.$data.item, this.$props.original)
  },
  methods: {
    cancel () {
      this.$props.onSubmit(null)
    },
    save () {
      this.$props.onSubmit(this.$data.item)
    }
  },
  components: components,
  template: `
    <ValidationObserver v-slot="{ invalid }">
      <fieldset style="padding: 2em;">
        <form @submit.prevent="handleSubmit">
          <component v-for="i in config" :key="i.name" :is="i.component"
            :config="i" :data="item">
          </component>
        </form>
        <b-button-group>
          <b-button variant="primary" @click="save()" :disabled="invalid">save</b-button>
          <b-button variant="secondary" @click="cancel()">cancel</b-button>
        </b-button-group>
      </fieldset>
    </ValidationObserver>
  `
}
