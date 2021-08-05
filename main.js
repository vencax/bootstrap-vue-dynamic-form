/* global Vue, VueMarkdown, VeeValidate,
  VueBootstrapTypeahead, VeeValidateRules */
import './vuecustoms.js'
import formComponents from './index.js'
import config from './config.js'

Vue.use(VueMarkdown)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)

VeeValidate.extend('required', VeeValidateRules.required)

Vue.component('obrazekInfo', {
  props: ['row'],
  template: '<span>Name: <b>{{ row.name }}</b>, URL: {{ row.url }}</span>'
})

new Vue({
  components: formComponents,
  data: {
    config,
    validated: false,
    item: {
      nazev: 'rr',
      popis: 'zaklad',
      stadium: 'a',
      stadium2: null,
      cena: null,
      approved: null,
      soubor: null,
      obrazky: [
        { url: 'koko', name: 'margot' },
        { url: 'banany', name: 'pomy' },
        { url: 'vopice', name: 'pomy' }
      ],
      tags: 'b'
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      this.$data.validated = true
      if (isValid) {
        alert('ok')
      }
    }
  },
  template: `
<ValidationObserver v-slot="{ invalid, errors }" ref="observer"
        tag="form" @submit.prevent="submit()">
  <code>{{ item }}</code>

  <component v-for="i in config" :key="i.name" :is="i.component" :config="i" :data="item">
  </component>

  {{ errors }}

  <b-button type="submit" class="mt-3" block :disabled="invalid && validated">
    Send
  </b-button>
</ValidationObserver>
  `
}).$mount('#app')
