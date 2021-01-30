/* global Vue, VueMarkdown, VeeValidate, VeeValidateRules */
import './vuecustoms.js'
import store from './store.js'
import C from './components/form.js'
import config from './config.js'

Vue.use(VueMarkdown)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)

VeeValidate.extend('required', VeeValidateRules.required)

new Vue({
  store,
  components: { mycomponent: C },
  data: { 
    config,
    item: {
      nazev: 'rr',
      popis: '',
      manager: '',
      cena: '',
      poloha: '',
      stadium: 'uuu',
      zanr: ''
    }
  },
  template: `
  <mycomponent :config="config" :data="item"></mycomponent>
  `
}).$mount('#app')
