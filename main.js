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
  template: '<span>Name: {{ row.name }}, URL: {{ row.url }}</span>'
})

new Vue({
  components: formComponents,
  data: {
    config,
    item: {
      nazev: 'rr',
      popis: 'zaklad',
      manager: '',
      cena: '',
      poloha: '',
      stadium: 'uuu',
      approved: moment().toISOString(),
      zanr: '',
      soubor: null,
      obrazky: [
        { url: 'koko', name: 'margot' },
        { url: 'banany', name: 'pomy' }
      ]
    }
  },
  template: `
<ValidationObserver v-slot="{ invalid }">
  <form @submit.prevent="handleSubmit">

    {{ item }}

    <component v-for="i in config" :key="i.name" :is="i.component" :config="i" :data="item">
    </component>

    <b-button type="submit" class="mt-3" block :disabled="invalid">
      Send
    </b-button>
  </form>
</ValidationObserver>
  `
}).$mount('#app')
